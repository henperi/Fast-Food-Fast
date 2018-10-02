// import moment from 'moment';
import randomId from 'uuid';
import db from './Query.model';

class Food {
  /**
   * class constructor
   */
  constructor() {
    this.foods = db;
  }

  async createFood(data) {
    // console.log(data);
    const queryText = `INSERT INTO foods(food_id, food_name, food_cat, food_img,
      description, unit_price, quantity_available, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;

    const values = [
      randomId.v4(),
      data.foodName,
      data.foodCat,
      data.foodImg,
      data.description,
      data.unitPrice,
      data.quantityAvailable,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await this.foods.query(queryText, values);

      const newFood = {
        foodId: rows[0].food_id,
        foodName: rows[0].food_name,
        foodCat: rows[0].food_cat,
        foodImg: rows[0].food_img,
        description: rows[0].description,
        unitPrice: rows[0].unit_price,
        quantityAvailable: rows[0].quantity_available,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };

      const response = { success: true, newFood };
      return response;
    } catch (err) {
      console.log('err:', err);
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * @param {randomId} id
   * @returns {object} food object
   */
  findByName(foodName) {
    return this.foods.find(food => food.foodName === foodName);
  }

  /**
   * @param {request.params.foodCat} foodCat
   * @returns {object} food objects belonging to a category
   */
  findFoodsByCategory(foodCat) {
    return this.foods.find(food => food.foodCat === foodCat);
  }

  /**
   * @param {request.params.foodId} foodId
   * @returns {object} food object
   */
  async findOne(foodId) {
    const queryText = 'SELECT * from foods WHERE food_id = $1';
    try {
      const { rows } = await this.foods.query(queryText, [foodId]);
      console.log(rows[0]);
      return rows[0];
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * Find All foods
   * @param null
   * @returns {object:} All foods stored in the database
   */
  async findAll() {
    const queryText = 'SELECT * from foods';
    try {
      const { rows } = await this.foods.query(queryText);
      console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
      const response = { success: false, err };
      return response;
    }
  }
}

export default new Food();
