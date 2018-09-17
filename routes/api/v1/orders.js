import express from 'express';

// Import Relevant Controllers
import ordersController from '../../../app/controllers/ordersController';

const router = express.Router();

/**
 * Get all the orders.
 */
router.get('/', ordersController.fetchAllOrders);

/**
 * Fetch a specific order.
 */
router.get('/:orderId', ordersController.fetchOneOrder);

/**
 * Place a new order.
 */
// router.post('/', ordersController.makeAnOrder);

/**
 * Update the status of an order.
 */
router.put('/:orderId', ordersController.updateOrderStatus);

module.exports = router;
