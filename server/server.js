import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import 'babel-polyfill';
// Test things out``
// Test things out``

// Import The Routes Index File =========================================
import allRoutes from './routes/api/v1';

const app = express();

// Static assets
app.use(express.static('server/UI'));

// Some neccessary middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Set Up CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin, x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  return next();
});

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

// Use The Routes Index File
app.use('/api/v1/', allRoutes);

// 404 page
app.use('*/*', express.static('server/UI/404.html'));

// Default to here when an invalid endpoint is entered
app.use('/', (req, res) => res.status(404).json({
  success: false,
  errors: [{ msg: 'This endpoint does not exist' }],
}));

// App use
app.use((errors, req, res) => {
  const msg = errors.message || 'An error occured while processing your request, try again in a moment';
  res.status(errors.status || 500);
  res.json({
    errors: [{ msg }],
  });
});

// Define The Port and Host
const PORT = process.env.PORT || 5000;

// Start the node server
app.listen(PORT, () => {
  console.log(`Server Started Successfully On PORT: ${PORT}`);
});

export default app;
