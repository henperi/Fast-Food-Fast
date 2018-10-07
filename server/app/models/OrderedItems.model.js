import randomId from 'uuid';
import db from './Query.model';

class OrderedItems {
  /**
   * class constructor
   */
  constructor() {
    this.orderedItems = db;
  }

  /**
   * Update one or more itemStatus's
   * @param {orderId}  optional, null
   * @param {itemId} itemid String
   * @returns {object} updated data
   */
  async updateItemStatus(orderId, itemId, status) {
    if (orderId) {
      const queryText = `UPDATE ordered_items SET itemstatus=$1, updated_at=$2 
      WHERE order_id=$3
      returning *`;

      const values = [status, new Date(), orderId];

      try {
        const { rows } = await this.orderedItems.query(queryText, values);

        const updatedData = rows[0];
        const response = { success: true, updatedData };
        return response;
      } catch (err) {
        const response = { success: false, err };
        return response;
      }
    } else {
      const queryText = `UPDATE ordered_items SET itemstatus=$1, updated_at=$2 
      WHERE item_id=$3
      returning *`;

      const values = [status, new Date(), itemId];

      try {
        const { rows } = await this.orderedItems.query(queryText, values);

        const updatedData = rows[0];
        const response = { success: true, updatedData };
        return response;
      } catch (err) {
        const response = { success: false, err };
        return response;
      }
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
   * @param {itemId} required
   * @param {userId} (optional)
   * @returns {object} one order object
   */
  async findOne(itemId) {
    const queryText = 'SELECT * from ordered_items WHERE item_id = $1';
    try {
      const { rows } = await this.orders.query(queryText, [itemId]);
      // console.log(rows);
      return rows[0];
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
  async findItems(orderId) {
    // console.log('insideOrdereItemsModel', orderId);
    const queryText = 'SELECT * from ordered_items WHERE order_id = $1';
    try {
      const { rows } = await this.orderedItems.query(queryText, [orderId]);
      // console.log('orderIts::', rows);
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
    const queryText = 'SELECT * from ordered_items';
    try {
      const { rows } = await this.orders.query(queryText);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }
}

export default new OrderedItems();
