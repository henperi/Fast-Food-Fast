'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Auth = require('../../../app/middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _usersController = require('../../../app/controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _ordersController = require('../../../app/controllers/ordersController');

var _ordersController2 = _interopRequireDefault(_ordersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Relevant Controllers
var router = _express2.default.Router();
/**
 * Fetch All Users
 */
router.get('/', _Auth2.default.validateToken, _Auth2.default.isAdmin, _usersController2.default.fetchAllUsers);

/**
 * Attempt To Signup A New User
 */
router.post('/signup', _usersController2.default.attemptSignup);

/**
 * Attempt Login An Authenticated User
 */
router.post('/login', _usersController2.default.attemptSignin);

/**
 * Fetch a users orders
 */
router.get('/:userId/orders', _Auth2.default.validateToken, _Auth2.default.isAdmin, _ordersController2.default.fetchAllUserOrders);

// router.post('/orders/:user_id', ordersController.makeAnOrder);
// router.get('/orders/:user_id', ordersController.fetchAllMyOrders);
// router.get('/orders/:user_id/:order_id', ordersController.fetchMySingleOrder);

router.use('', function (req, res) {
  return res.status(404).json({ message: 'This endpoint does not exist' });
});

module.exports = router;