import moment from 'moment';
import randomId from 'uuid';

class Order {
  /**
   * class constructor
   */
  constructor() {
    this.orders = [];
  }

  /**
   *
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  createOrder(userId, foodItems, totalAmount) {
    const newOrder = {
      orderId: randomId.v1(),
      orderedBy: userId,
      orderedItems: foodItems,
      totalAmount,
      OrderStatus: 'Processing',
      deliveryStatus: 'Pending',
      createdAt: moment.now(),
      updatedAt: moment.now(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  /**
   * @param {orderId} required
   * @param {userId} (optional)
   * @returns {object} one order object
   */
  findOne(orderId, userId) {
    let foundOrder;
    if (!userId) {
      foundOrder = this.orders.find(order => order.orderId === orderId);
    }
    if (orderId && userId) {
      foundOrder = this.orders.find(
        order => order.orderId === orderId && order.orderedBy === userId,
      );
    }
    return foundOrder;
  }

  /**
   * @param {randomId} id
   * @returns {object} orders object
   */
  findUserOrders(userId) {
    return this.orders.find(order => order.orderedBy === userId);
  }

  /**
   * @returns {object} orders object
   */
  findAll() {
    return this.orders;
  }
}

export default new Order();
