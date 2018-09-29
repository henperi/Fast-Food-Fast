import express from 'express';

// Import Relevant Controllers
import foodsController from '../../../app/controllers/foodsController';

const router = express.Router();

router.get('/', foodsController.fetchAllFoods);
router.post('/', foodsController.createNewFood);

router.get('/:foodId', foodsController.fetchOneFood);
router.put('/:foodId', foodsController.updateFood); // Update the name of a food

router.use('', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

module.exports = router;
