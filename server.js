import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';

// Routes =========================================
import ordersRoute from './routes/api/v1/orders';

const app = express();

// Some neccessary middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      const namespace = param.split('.');
      const root = namespace.shift();
      let formParam = root;

      while (namespace.length) {
        formParam += `[${namespace.shift()}]`;
      }
      return {
        param: formParam,
        msg,
        value,
      };
    },
  }),
);

app.use('/api/v1/orders', ordersRoute);

app.get('/', (req, res) => res.status(200).send({
  message: 'This is an API, not a website. Read more about the api endpoints below',
  endpoints: [
    {
      type: 'GET',
      uri: 'api/va/users/signin',
      desired_parameters: ['email', 'password'],
      description:
          'This endpoint uses the desired parameters to login or authenticate a visiting user',
    },
  ],
}));

app.use('', (req, res) => res.status(404).json({
  message: 'This endpoint does not exist. Read more about the api endpoints below',
  endpoints: [
    {
      type: 'GET',
      uri: 'api/va/users/signin',
      desired_parameters: ['email', 'password'],
      description:
          'This endpoint uses the desired parameters to login or authenticate a visiting user',
    },
  ],
}));

// Define The Port and Host
const PORT = process.env.PORT || 5000;

// Start the node server
app.listen(PORT, () => {
  console.log(`Server Started Successfully On PORT: ${PORT}`);
});
