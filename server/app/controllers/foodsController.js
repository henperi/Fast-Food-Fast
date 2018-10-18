// import randomId from 'uuid';
import Food from '../models/Food.model';

const foodsController = {
  /**
   * GET /foods route to find and fetch all the foods
   * @returns {object} All the found foods
   */
  async fetchAllFoods(req, res) {
    const fetchFoods = await Food.findAll(req, res);
    const count = fetchFoods.length;
    return res.status(200).send({
      success: true,
      responseMsg: 'Available food itmes in menu fetched',
      totalFoods: count,
      menu: fetchFoods,
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

    if (fetchFood.success) {
      return res.status(200).json({
        success: true,
        responseMsg: 'Food found',
        food: fetchFood.rows,
      });
    }
    return res.status(404).json({ success: false, errors: [{ msg: 'Food not found' }] });
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

  async updateFood(req, res) {
    const { foodId } = req.params;
    const findFood = await Food.findOne(foodId);
    if (findFood.success) {
      if (findFood.rows) {
        findFood.foodName = req.body.foodName;
        return res.status(200).json({
          success: true,
          success_msg: 'food updated',
          updatedFood: findFood,
        });
      }
      return res.status(409).json({
        success: false,
        error_msg: 'This particular food can not be updated as its id does not exist',
      });
    }

    return res.status(500).json({
      success: false,
      error_msg: 'An error occurred, try again and make sure the foodId has a valid format',
    });
  },
};

export default foodsController;
