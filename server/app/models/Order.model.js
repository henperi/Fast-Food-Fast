import randomId from 'uuid';
import db from './Query.model';

class Order {
  /**
   * class constructor
   */
  constructor() {
    this.orders = db;
  }

  /**
   *
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  async createOrder(userId, foodItems, totalAmount) {
    const queryText = `INSERT INTO orders(order_id, ordered_by, ordered_items, 
      total_mount, order_status, delivery_status, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

    const values = [
      randomId.v1(),
      userId,
      'foodItems',
      totalAmount,
      'Processing',
      'Pending',
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await this.orders.query(queryText, values);

      const newOrder = {
        orderId: rows[0].order_id,
        orderedBy: rows[0].ordered_by,
        orderedItems: foodItems,
        totalAmount,
        OrderStatus: rows[0].order_status,
        deliveryStatus: rows[0].delivery_status,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };

      const response = { success: true, newOrder };
      return response;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * @param {orderId} required
   * @param {userId} (optional)
   * @returns {object} one order object
   */
  async findOne(orderId) {
    const queryText = 'SELECT * from orders WHERE order_id = $1';
    try {
      const { rows } = await this.orders.query(queryText, [orderId]);
      console.log(rows);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * @returns {object} all orders object
   */
  async findAll() {
    const queryText = 'SELECT * from orders';
    try {
      const { rows } = await this.orders.query(queryText);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }
}

export default new Order();
