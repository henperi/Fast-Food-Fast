import express from 'express';
import userRoute from './users';
import ordersRoute from './orders';
import foodRoute from './foods';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/users', userRoute);
router.use('/orders', ordersRoute);
router.use('/menu', foodRoute);

router.use('', (req, res) => res.status(404).json({
  message: 'This API endpoint does not exist. See the docs, for help',
  AvailableEndpoints: [
    {
      uri: 'api/v1/orders/',
      type: 'GET',
      description: 'This endpoint fetches all users orders from the data base',
    },
    {
      type: 'GET',
      uri: 'api/v1/orders/:orderId',
      description:
          'This endpoint uses the desired :orderId to fetch a specific order from the data base',
    },
    {
      type: 'PUT',
      uri: 'api/v1/orders/:orderId',
      description:
          'This endpoint uses the desired parameters to update the order status of a specific order in the data base',
    },
    {
      type: 'POST',
      uri: 'api/v1/orders',
      description: 'This endpoint creates a new order',
    },
    {
      type: 'POST',
      uri: 'api/v1/auth/signup',
      description: 'This endpoint creates a new user account',
    },
    {
      type: 'POST',
      uri: 'api/v1/auth/login',
      description: 'This endpoint logs in an existing user',
    },
  ],
}));

export default router;
