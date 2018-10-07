'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Auth = require('../../../app/middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _ordersController = require('../../../app/controllers/ordersController');

var _ordersController2 = _interopRequireDefault(_ordersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * Get all the orders.
 */


// Import Relevant Controllers
router.get('/', _Auth2.default.validateToken, _Auth2.default.isAdmin, _ordersController2.default.fetchAllOrders);

/**
 * Fetch a specific order.
 */
router.get('/:orderId', _Auth2.default.validateToken, _Auth2.default.isAdmin, _ordersController2.default.fetchAllOrderedItems);

/**
 * Place a new order.
 */
router.post('/', _Auth2.default.validateToken, _ordersController2.default.makeAnOrder);

/**
 * Update the status of an order.
 */
router.put('/:orderId', _Auth2.default.validateToken, _Auth2.default.isAdmin, _ordersController2.default.updateOrderStatus);

module.exports = router;