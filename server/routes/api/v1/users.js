import express from 'express';

import Auth from '../../../app/middlewares/Auth';

// Import Relevant Controllers
import usersController from '../../../app/controllers/usersController';
import ordersController from '../../../app/controllers/ordersController';

const router = express.Router();
/**
 * Fetch All Users
 */
router.get('/', Auth.validateToken, Auth.isAdmin, usersController.fetchAllUsers);

/**
 * Attempt To Signup A New User
 */
router.post('/signup', usersController.attemptSignup);

/**
 * Attempt Login An Authenticated User
 */
router.post('/login', usersController.attemptSignin);

/**
 * Fetch a users orders
 */
router.get('/:userId/orders', Auth.validateToken, ordersController.fetchAllUserOrders);

// router.post('/orders/:user_id', ordersController.makeAnOrder);
// router.get('/orders/:user_id', ordersController.fetchAllMyOrders);
// router.get('/orders/:user_id/:order_id', ordersController.fetchMySingleOrder);

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

module.exports = router;
