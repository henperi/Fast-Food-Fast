import express from 'express';

// Import Relevant Controllers
import usersController from '../../../app/controllers/usersController';
// import ordersController from '../../../app/controllers/ordersController';

const router = express.Router();
/**
 * Fetch All Users
 */
router.get('/', usersController.fetchAllUsers);

/**
 * Attempt To Signup A New User
 */
router.post('/signup', usersController.attemptSignup);

/**
 * Attempt Login An Authenticated User
 */
router.post('/login', usersController.attemptSignin);

// router.post('/orders/:user_id', ordersController.makeAnOrder);
// router.get('/orders/:user_id', ordersController.fetchAllMyOrders);
// router.get('/orders/:user_id/:order_id', ordersController.fetchMySingleOrder);

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

module.exports = router;
