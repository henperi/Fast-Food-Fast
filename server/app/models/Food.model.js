import moment from 'moment';
import randomId from 'uuid';
import db from './Query.model';

class Food {
  /**
   * class constructor
   */
  constructor() {
    this.foods = db;
  }

  /**
   *
   * @param {*} data
   * @returns {object} food ubject
   */
  createFood(data) {
    const newFood = {
      foodId: randomId.v4(),
      foodName: data.foodName,
      foodCat: data.foodCat,
      description: data.description,
      coverImg: data.coverImg,
      unitPrice: data.UnitPrice,
      quantityAvailable: data.quantity,
      createdAt: moment.now(),
      updatedAt: moment.now(),
    };

    this.foods.push(newFood);
    return newFood;
  }

  /**
   * @param {randomId} id
   * @returns {object} food object
   */
  findByName(foodName) {
    return this.foods.find(food => food.foodName === foodName);
  }

  /**
   * @param {request.params.foodId} foodId
   * @returns {object} food object
   */
  findOne(foodId) {
    return this.foods.find(food => food.foodId === foodId);
  }

  /**
   * @param {request.params.foodCat} foodCat
   * @returns {object} food objects belonging to a category
   */
  findFoodsByCategory(foodCat) {
    return this.foods.find(food => food.foodCat === foodCat);
  }

  /**
   * Find All foods
   * @param null
   * @returns {object:} All foods stored in the database
   */
  async findAll() {
    const queryText = 'SELECT * from foods';
    try {
      const { rows } = await this.orders.query(queryText);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }
}

export default new Food();
