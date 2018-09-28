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

app.use('', (req, res) => res.status(404).json({
  message: 'This endpoint does not exist. Read more about the api endpoints below',
  endpoints: [
    {
      type: 'GET',
      uri: 'api/v1/orders/',
      desired_parameters: null,
      description: 'This endpoint fetches all users orders stored in memory',
    },
    {
      type: 'GET',
      uri: 'api/v1/orders/:orderId',
      desired_parameters: null,
      description:
          'This endpoint uses the desired parameters to fetch a specific order stored in memory',
    },
    {
      type: 'PUT',
      uri: 'api/v1/orders/orderId',
      desired_parameters: [{ orderStatus: { type: 'String' } }],
      description:
          'This endpoint uses the desired parameters to update the order status of a specific order stored in memory',
    },
  ],
}));

// Define The Port and Host
const PORT = process.env.PORT || 5000;

// Start the node server
app.listen(PORT, () => {
  console.log(`Server Started Successfully On PORT: ${PORT}`);
});


export default app;
