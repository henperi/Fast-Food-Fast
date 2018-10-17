import express from 'express';

import Auth from '../../../app/middlewares/Auth';

// Import Relevant Controllers
import usersController from '../../../app/controllers/usersController';
import ordersController from '../../../app/controllers/ordersController';
import validationHelper from '../../../app/middlewares/validation';

const router = express.Router();
/**
 * Fetch All Users
 */
router.get('/', Auth.validateToken, Auth.isAdmin, usersController.fetchAllUsers);

/**
 * Attempt To Signup A New User
 */
router.post('/signup', validationHelper.signup, usersController.attemptSignup);

/**
 * Attempt Login An Authenticated User
 */
router.post('/login', validationHelper.signin, usersController.attemptSignin);

/**
 * Fetch a users orders
 */
router.get(
  '/:userId/orders',
  Auth.validateToken,
  Auth.isAdmin,
  ordersController.fetchAllUserOrders,
);
/**
 * Fetch the authenticated users profile
 */
router.get('/my-profile', Auth.validateToken, usersController.fetchProfile);

// router.post('/orders/:user_id', ordersController.makeAnOrder);
// router.get('/orders/:user_id', ordersController.fetchAllMyOrders);
// router.get('/orders/:user_id/:order_id', ordersController.fetchMySingleOrder);

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

export default router;
