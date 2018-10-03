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
   * Place an Order
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  async createOrder(orderId, userId, foodItems, totalAmount) {
    const queryText = `INSERT INTO orders(order_id, ordered_by, ordered_items, 
      total_mount, order_status, delivery_status, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

    const values = [
      orderId,
      userId,
      foodItems,
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
        orderStatus: rows[0].order_status,
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
   * Update an Order
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  async updateOrder(orderId, status) {
    const queryText = `UPDATE orders SET order_status=$1, updated_at=$2 
      WHERE order_id=$3
      returning *`;

    const values = [status, new Date(), orderId];

    try {
      const { rows } = await this.orders.query(queryText, values);

      const updatedData = rows[0];
      const response = { success: true, updatedData };
      return response;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * Insert Item into ordered_items table
   * @param {userId} orderId
   * @param {data} data
   * @returns {object} inserted item
   */
  async insertOrderedItem(orderId, foodItems) {
    const queryText = `INSERT INTO ordered_items(order_id, item_id, food_id, food_name, food_img, 
      unit_price, quantity, total, itemStatus, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;

    const values = [
      orderId,
      randomId.v1(),
      foodItems.foodId,
      foodItems.foodName,
      foodItems.foodImg,
      foodItems.unitPrice,
      foodItems.quantity,
      foodItems.total,
      foodItems.itemStatus,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await this.orders.query(queryText, values);

      const orderedItems = {
        foodId: rows[0].food_id,
        foodName: rows[0].food_name,
        foodImg: rows[0].food_img,
        unitPrice: rows[0].unit_price,
        quantity: rows[0].quantity,
        total: rows[0].unit_price,
        itemStatus: rows[0].item_status,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };

      const response = { success: true, orderedItems };
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
      console.log(rows[0]);
      return rows[0];
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

  /**
   * @returns {object} all orders object
   */
  async findOrdersByUserId(userId) {
    const queryText = 'SELECT * from orders WHERE ordered_by=$1';
    try {
      const { rows } = await this.orders.query(queryText, [userId]);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }
}

export default new Order();
