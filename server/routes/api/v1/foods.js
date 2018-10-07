import express from 'express';

import Auth from '../../../app/middlewares/Auth';

// Import Relevant Controllers
import foodsController from '../../../app/controllers/foodsController';

const router = express.Router();

router.get('/', foodsController.fetchAllFoods);
router.post('/', Auth.validateToken, Auth.isAdmin, foodsController.createNewFood);

router.get('/:foodId', foodsController.fetchOneFood);

// Update the name of a food
router.put('/:foodId', Auth.validateToken, Auth.isAdmin, foodsController.updateFood);

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

module.exports = router;
