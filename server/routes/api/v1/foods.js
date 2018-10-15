import express from 'express';

import Auth from '../../../app/middlewares/Auth';

// Import Relevant Controllers
import foodsController from '../../../app/controllers/foodsController';
import validationHelper from '../../../app/middlewares/validation';

const router = express.Router();

router.get('/', foodsController.fetchAllFoods);

// Create a new food
router.post(
  '/',
  Auth.validateToken,
  Auth.isAdmin,
  validationHelper.createNewFood,
  foodsController.createNewFood,
);

router.get('/:foodId', foodsController.fetchOneFood);

// Update the name of a food
router.put(
  '/:foodId',
  Auth.validateToken,
  Auth.isAdmin,
  validationHelper.updateFood,
  foodsController.updateFood,
);

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

export default router;
