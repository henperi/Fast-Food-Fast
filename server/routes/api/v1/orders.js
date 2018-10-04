import express from 'express';

import Auth from '../../../app/middlewares/Auth';

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
router.get('/:orderId', Auth.validateToken, Auth.isAdmin, ordersController.fetchOneOrder);

/**
 * Place a new order.
 */
router.post('/', Auth.validateToken, ordersController.makeAnOrder);

/**
 * Update the status of an order.
 */
router.put('/:orderId', Auth.validateToken, Auth.isAdmin, ordersController.updateOrderStatus);

module.exports = router;
