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
  message: 'This endpoint does not exist. Read more about the api endpoints below',
  endpoints: [
    {
      type: 'GET',
      uri: 'api/v1/orders/',
      description: 'This endpoint fetches all users orders stored in memory',
    },
    {
      type: 'GET',
      uri: 'api/v1/orders/:orderId',
      description:
          'This endpoint uses the desired parameters to fetch a specific order stored in memory',
    },
    {
      type: 'PUT',
      uri: 'api/v1/orders/orderId',
      description:
          'This endpoint uses the desired parameters to update the order status of a specific order stored in memory',
    },
  ],
}));

export default router;
