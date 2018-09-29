import moment from 'moment';
import randomId from 'uuid';

class Food {
  /**
   * class constructor
   */
  constructor() {
    this.foods = [
      {
        foodId: '4801ac7c-4f19-4299-b709-aab25de4f088',
        foodName: 'Rice and Egg Source',
        foodCat: 'Cooked Foods',
        description: 'nice rice delicacy',
        coverImg: 'uploads/img/4801ac7c-4f19-4299-b709-aab25de4f088',
        unitPrice: 600,
        quantityAvailable: 10,
        createdAt: moment.now(),
        updatedAt: moment.now(),
      },
      {
        foodId: 'a4011391-5f29-457b-b334-23525be32690',
        foodName: 'Fried Chiken',
        foodCat: 'Cooked Foods',
        description: 'Assorted fried chicken',
        coverImg: 'uploads/img/a4011391-5f29-457b-b334-23525be32690',
        unitPrice: 750,
        quantityAvailable: 10,
        createdAt: moment.now(),
        updatedAt: moment.now(),
      },
    ];
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
   *
   */
  findAll() {
    return this.foods;
  }
}

export default new Food();
