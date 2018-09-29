// import randomId from 'uuid';
import Food from '../models/Food.model';

const foodsController = {
  /**
   * GET /foods route to find and fetch all the foods
   * @returns {object} All the found foods
   */
  fetchAllFoods(req, res) {
    const fetchFoods = Food.findAll();
    const count = fetchFoods.length;

    if (!fetchFoods) {
      return res.status(404).send({ message: 'No food found' });
    }
    if (fetchFoods.length === 0) {
      return res.status(404).send({ message: 'No food found' });
    }
    return res.status(200).send({
      message: 'Food(s) found',
      totalfoods: count,
      foods: fetchFoods,
    });
  },

  /**
   * GET /foods/:foodId route to find and fetch a particular food given its id.
   * @param {:foodId} the required foodId param from the url
   * @returns {object} the found food object
   */
  fetchOneFood(req, res) {
    const [foodId] = [req.params.foodId];
    const fetchFood = Food.findOne(foodId);

    if (!fetchFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    if (fetchFood.length === 0) {
      return res.status(404).json({
        message: 'Food not found',
      });
    }
    return res.status(201).json({
      message: 'Food found',
      food: fetchFood,
    });
  },

  /**
   * POST /foods route to creat/make a new food.
   * @param {foodName} foodName is required
   * @param {amount} amount is required
   * @param {quantity} quantity is required
   * @param {coverImg} coverImg is required
   * @returns {object} the created food object
   */
  createNewFood(req, res) {
    req.checkBody('foodName', 'Name of food is required').notEmpty();
    req.checkBody('foodCat', 'Food Category is required').notEmpty();
    req.checkBody('description', 'Food Description is required').notEmpty();
    req.checkBody('coverImg', 'Cover image is required').notEmpty();
    req.checkBody('price', 'Food price is not valid').notEmpty();
    req.checkBody('quantityAvailable', 'Quantity available is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }

    const createdFood = Food.createFood(req.body);
    return res.status(201).json({
      message: 'Food created',
      createdFood,
    });
  },

  /**
   * PUT /foods/:foodId route to update the name of a particular food given its id.
   * @param {req.body.foodName} requires the foodName
   * @returns {object} the updated food object
   */
  updateFood(req, res) {
    req.checkBody('foodName', 'Food name is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }

    const [foodId] = [req.params.foodId];
    const findFood = Food.findOne(foodId);

    if (!findFood) {
      return res.status(409).json({
        message: 'This particular food can not be updated as its id does not exist',
      });
    }
    if (findFood.length === 0) {
      return res.status(409).json({
        message: 'This particular food can not be updated as its id does not exist',
      });
    }
    findFood.foodName = req.body.foodName;

    return res.status(201).json({
      message: 'food updated',
      updatedFood: findFood,
    });
  },
};

export default foodsController;
