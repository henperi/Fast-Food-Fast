// import randomId from 'uuid';
import Food from '../models/Food.model';

const foodsController = {
  /**
   * GET /foods route to find and fetch all the foods
   * @returns {object} All the found foods
   */
  async fetchAllFoods(req, res) {
    const fetchFoods = await Food.findAll();
    const count = fetchFoods.length;

    return res.status(200).send({
      success: true,
      success_msg: `returning ${count} availabel food(s)`,
      totalFoods: count,
      foodsInMenu: fetchFoods,
    });
  },

  /**
   * GET /foods/:foodId route to find and fetch a particular food given its id.
   * @param {:foodId} the required foodId param from the url
   * @returns {object} the found food object
   */
  async fetchOneFood(req, res) {
    const { foodId } = req.params;
    const fetchFood = await Food.findOne(foodId);
    // console.log('fetcF', fetchFood);

    if (fetchFood.success) {
      return res.status(200).json({
        message: 'Food found',
        food: fetchFood,
      });
    }
    return res.status(404).json({ message: 'Food not found' });
  },

  /**
   * POST /foods route to creat/make a new food.
   * @param {foodName} foodName is required
   * @param {amount} amount is required
   * @param {quantity} quantity is required
   * @param {coverImg} coverImg is required
   * @returns {object} the created food object
   */
  async createNewFood(req, res) {
    req.checkBody('foodName', 'Name of food is required').notEmpty();
    req.checkBody('foodCat', 'Food Category is required').notEmpty();
    req.checkBody('foodImg', 'Cover image is required').notEmpty();
    req.checkBody('description', 'Food Description is required').notEmpty();
    req.checkBody('unitPrice', 'Food price is not valid').notEmpty();
    req.checkBody('quantityAvailable', 'Quantity available is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }

    const createdFood = await Food.createFood(req.body);
    if (createdFood.success) {
      return res.status(201).json({
        success: true,
        success_msg: 'Food item created and added to menu',
        createdFood: createdFood.newFood,
      });
    }
    return res.status(400).json({
      success: false,
      success_msg: 'Error occured while creating food, try again',
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

    const foodId = req.params;
    const findFood = Food.findOne(foodId);

    if (!findFood) {
      return res.status(409).json({
        message: 'This particular food can not be updated as its id does not exist',
      });
    }
    findFood.foodName = req.body.foodName;

    return res.status(200).json({
      message: 'food updated',
      updatedFood: findFood,
    });
  },
};

export default foodsController;
