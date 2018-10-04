import randomId from 'uuid';
import Order from '../models/Order.model';
import OrderedItems from '../models/OrderedItems.model';
import Food from '../models/Food.model';

const ordersController = {
  /**
   * GET /orders route to find and fetch all the orders
   * @returns {object} All the found Orders
   */
  async fetchAllOrders(req, res) {
    const fetchOrders = await Order.findAll();
    const count = fetchOrders.length;

    for (let i = 0; i < count; i += 1) {
      /**
       * for each fetchOrders fetch its ordered_items from an ordered_items table
       * Then append each item to the fetchOrders.orderedItems
       */
    }

    return res.status(200).send({
      success: true,
      totalOrders: count,
      success_msg: `returning ${count} available orders`,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders route to find and fetch all the orders of a particular user
   * @returns {object} All the found Orders
   */
  async fetchAllUserOrders(req, res) {
    const userId = req.user.userId || 'rand';
    const fetchOrders = await Order.findOrdersByUserId(userId);
    const count = fetchOrders.length;

    for (let i = 0; i < count; i += 1) {
      /**
       * for each fetchOrders fetch its ordered_items from an ordered_items table
       * Then append each item to the fetchOrders.orderedItems
       */
    }

    return res.status(200).send({
      totalOrders: count,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders/:id route to find and fetch a particular order given its id.
   * @returns {object} the found Order object
   */
  async fetchOneOrder(req, res) {
    const { orderId } = req.params;
    const fetchOrder = await Order.findOne(orderId);
    if (fetchOrder.success) {
      if (fetchOrder.rows) {
        return res.status(200).json({
          success: true,
          success_msg: 'Order found',
          order: fetchOrder.rows,
        });
      }
      return res.status(404).json({
        success: false,
        success_msg: 'The order could not be found',
      });
    }
    return res.status(404).json({ message: 'Order not found' });
  },

  /**
   * PUT /orders/:id route to update the status of a particular order given its id.
   * @param {orderStatus} orderStatus is required
   * @returns {object} the updated Order object
   */
  async updateOrderStatus(req, res) {
    req.checkBody('orderStatus', 'order status is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }

    if (Number.isNaN(req.body.orderStatus) || req.body.orderStatus > 5) {
      return res.status(400).json({
        message: 'The order status is not valid',
      });
    }

    const [orderId] = [req.params.orderId];
    const findOrder = await Order.findOne(orderId);

    if (!findOrder) {
      return res.status(409).json({
        message: 'This particular order can not be updated as it does not exist',
      });
    }

    const orderStatusMaping = [
      'Pending',
      'Processing',
      'Cancelled',
      'Rejected',
      'Completed',
      'Delivered',
    ];

    // console.log('type', typeof parseInt(req.body.orderStatus, 10));
    const orderStatus = orderStatusMaping[req.body.orderStatus] || orderStatusMaping[0];
    const itemStattus = orderStatus;

    // findOrder.orderStatus = req.body.orderStatus;
    const updatedOrder = await Order.updateOrder(orderId, orderStatus);
    console.log('returned', updatedOrder);
    if (updatedOrder.success) {
      let count = 1;
      for (let i = 0; i < updatedOrder.updatedData.ordered_items; i += 1) {
        OrderedItems.updateItemStatus(orderId, null, itemStattus);
        console.log(count, parseInt(updatedOrder.updatedData.ordered_items, 10));
        count += 1;
        if (count === parseInt(updatedOrder.updatedData.ordered_items, 10)) {
          return res.status(200).json({
            message: 'Order updated',
            updatedOrder: updatedOrder.updatedData,
          });
        }
      }
    }
    return res.status(200).json({
      success: updatedOrder.success,
      message: 'Order not updated',
    });
  },

  /**
   * POST /orders route to creat/make a new order.
   * @param {foodItems} foodItems object is required
   * @param {amount} amount is required
   * @param {quantity} quantity is required
   * @param {coverImg} coverImg is required
   * @returns {object} the created Order object
   */
  async makeAnOrder(req, res) {
    req.checkBody('foodItems', 'Food Item(s) are required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }
    const { userId } = req.user;
    const orderId = randomId.v1();

    const submittedFoodItems = req.body.foodItems;
    // console.log('submittedFoodItems=', submittedFoodItems);

    const foodItemsOrdered = [];
    let totalAmount = 0;
    const theOrderedItem = [];

    for (let k = 0; k < submittedFoodItems.length; k += 1) {
      const { foodId } = submittedFoodItems[k];
      const { quantity } = submittedFoodItems[k];

      if (!Number.isInteger(quantity)) {
        return res.status(400).json({
          success: false,
          error_msg: 'food quantities must be valid numbers',
          guides: 'Please see doccumentation, for help',
        });
      }

      if (!foodId || !quantity) {
        return res.status(400).json({
          success: false,
          error_msg: 'foodId and quantity are required fields of foodItems when making an order',
          guides: 'Please see doccumentation, for help',
        });
      }
    }

    for (let i = 0; i < submittedFoodItems.length; i += 1) {
      const { foodId } = submittedFoodItems[i];
      const { quantity } = submittedFoodItems[i];

      const findFood = await Food.findOne(foodId);
      // console.log('findFood:', findFood);
      if (findFood.success && findFood.rows) {
        const item = {
          foodId,
          foodName: findFood.rows.food_name,
          foodImg: findFood.rows.food_img || `uploads/img/${submittedFoodItems[i].foodId}`,
          unitPrice: Number(findFood.rows.unit_price),
          quantity: Number(submittedFoodItems[i].quantity),
          total: Number(findFood.rows.unit_price * submittedFoodItems[i].quantity),
          itemStatus: 'Pending',
        };

        foodItemsOrdered.push(item);
        totalAmount += findFood.rows.unit_price * quantity;

        const insertOrderedItem = await Order.insertOrderedItem(orderId, userId, item);
        console.log(insertOrderedItem);
        theOrderedItem.push(insertOrderedItem.orderedItems);
      }
    }
    if (foodItemsOrdered.length > 0) {
      const createdOrder = await Order.createOrder(
        orderId,
        userId,
        foodItemsOrdered.length,
        totalAmount,
      );
      createdOrder.newOrder.orderedItems = theOrderedItem;
      return res.status(201).json({
        success: true,
        success_msg: 'Your order has been created successfully',
        createdOrder: createdOrder.newOrder,
      });
    }
    return res.status(404).json({
      success: false,
      error_msg: 'Unable to create your order',
      reasons: 'The fooditems sent do not exist in the list of available foods',
    });
  },
};

export default ordersController;
