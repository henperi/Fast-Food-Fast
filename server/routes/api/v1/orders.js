import express from 'express';

import Auth from '../../../app/middlewares/Auth';
import validationHelper from '../../../app/middlewares/validation';

// Import Relevant Controllers
import ordersController from '../../../app/controllers/ordersController';

const router = express.Router();

/**
 * Get all the orders.
 */
router.get('/', Auth.validateToken, Auth.isAdmin, ordersController.fetchAllOrders);

/**
 * Fetch a specific order.
 */
router.get('/:orderId', Auth.validateToken, Auth.isAdmin, ordersController.fetchAllOrderedItems);

/**
 * Place a new order.
 */
router.post(
  '/',
  Auth.validateToken,
  Auth.isUser,
  validationHelper.makeAnOrder,
  ordersController.makeAnOrder,
);

/**
 * Update the status of an order.
 */
router.put(
  '/:orderId',
  Auth.validateToken,
  Auth.isAdmin,
  validationHelper.updateOrderStatus,
  ordersController.updateOrderStatus,
);

export default router;
