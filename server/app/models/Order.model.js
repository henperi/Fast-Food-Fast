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
      'Pending',
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
    } catch (error) {
      const response = { success: false, error };
      return response;
    }
  }

  /**
   * Update an Order
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  async updateOrder(req, res, orderId, status) {
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
      return res.status(500).json({
        success: false,
        error_msg: 'Error occured while trying to update this order, try again',
      });
    }
  }

  /**
   * Insert Item into ordered_items table
   * @param {userId} orderId
   * @param {data} data
   * @returns {object} inserted item
   */
  async insertOrderedItem(orderId, userId, foodItems) {
    const queryText = `INSERT INTO ordered_items(order_id, user_id, item_id, food_id, food_name, food_img, 
      unit_price, quantity, total, itemStatus, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning *`;

    const values = [
      orderId,
      userId,
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

      // console.log('inside_rows: ', rows);

      const orderedItems = {
        foodId: rows[0].food_id,
        foodName: rows[0].food_name,
        foodImg: rows[0].food_img,
        unitPrice: rows[0].unit_price,
        quantity: rows[0].quantity,
        total: foodItems.total,
        itemStatus: rows[0].itemstatus,
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
  async findOne(req, res, orderId) {
    const queryText = 'SELECT * from orders WHERE order_id=$1';
    try {
      const { rows } = await this.orders.query(queryText, [orderId]);
      console.log(rows);
      const response = { success: true, rows: rows[0] };
      return response;
    } catch (err) {
      return res.status(500).json({
        success: false,
        error_msg: 'An error occurred while trying to update the order, please try again',
        guides:
          'Make sure the order_id being sent is a valid uuid character, read the doccumentation for help',
      });
    }
  }

  /**
   * @returns {object} all orders object
   */
  async findAll(req, res) {
    const queryText = 'SELECT * from orders';
    try {
      const { rows } = await this.orders.query(queryText);
      return rows;
    } catch (err) {
      return res.status(500).send({
        success: false,
        error_msg: 'An error occured while processing your request',
      });
    }
  }

  /**
   * @returns {object} all orders object
   */
  async findOrdersByUserId(req, res, userId) {
    const queryText = 'SELECT * from orders WHERE ordered_by=$1';
    try {
      const { rows } = await this.orders.query(queryText, [userId]);
      return rows;
    } catch (err) {
      return res.status(500).send({
        success: false,
        error_msg: 'An error occured',
      });
    }
  }

  /**
   * Delete an Order
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */
  async deleteOrder(orderId) {
    const queryText = 'DELETE FROM orders WHERE order_id = $1 returning *';

    const values = [orderId];

    try {
      const { rows } = await this.orders.query(queryText, values);
      const data = rows[0];
      const response = { success: true, data };

      return response;
    } catch (error) {
      const response = { success: false, error };
      return response;
    }
  }
}

export default new Order();
