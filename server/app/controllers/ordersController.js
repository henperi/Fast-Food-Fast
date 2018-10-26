import randomId from 'uuid';
import Order from '../models/Order.model';
import OrderedItems from '../models/OrderedItems.model';
import Food from '../models/Food.model';

const ordersController = {
  /**
   * GET /orders route to find and fetch all the orders(For Admins)
   * @returns {object} All the found Orders
   */
  async fetchAllOrders(req, res) {
    const fetchOrders = await Order.findAll(req, res);
    const count = fetchOrders.length;
    const { host } = req.headers;
    console.log(req.headers);

    for (let i = 0; i < count; i += 1) {
      const qty = fetchOrders[i].ordered_items;
      const id = fetchOrders[i].order_id;

      fetchOrders[i].ordered_items = {
        quantity: qty,
        items_url: `${host}/api/v1/orders/${id}`,
      };
    }

    return res.status(200).send({
      success: true,
      totalOrders: count,
      success_msg: `returning ${count} available orders`,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders route to find and fetch all the orders of a particular user (For Admins)
   * @returns {object} All the found Orderss
   */
  async fetchAllOrderedItems(req, res) {
    const { orderId } = req.params;
    const fetchItems = await OrderedItems.findItems(orderId);
    const count = fetchItems.length;

    if (count > 0) {
      return res.status(200).send({
        success: true,
        success_msg: 'Ordered Items fetched successfully',
        totalItems: count,
        Items: fetchItems,
      });
    }
    return res.status(404).send({
      success: false,
      error_msg: 'No items mathching this order were found',
    });
  },

  /**
   * GET /orders route to find and fetch all the orders of a particular user (For Users)
   * @returns {object} All the found Orders
   */
  async fetchAllUserOrders(req, res) {
    const { userId } = req.params;
    const fetchOrders = await Order.findOrdersByUserId(req, res, userId);
    const count = fetchOrders.length;
    const { host } = req.headers;

    for (let i = 0; i < count; i += 1) {
      const qty = fetchOrders[i].ordered_items;
      const id = fetchOrders[i].order_id;

      fetchOrders[i].ordered_items = {
        quantity: qty,
        items_url: `${host}/api/v1/users/${userId}/orders/${id}`,
      };
    }

    return res.status(200).send({
      success: true,
      totalOrders: fetchOrders.length,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders route to find and fetch all the orders of a particular user (For Admins)
   * @returns {object} All the found Orderss
   */
  async fetchAllUserOrderedItems(req, res) {
    const { orderId } = req.params;
    const { userId } = req.user;
    const fetchItems = await OrderedItems.findUserItems(orderId, userId);
    const count = fetchItems.length;

    // const { orderId } = fetchItems;
    // fetchItems.items.order_id = undefined;

    if (count > 0) {
      return res.status(200).send({
        success: true,
        success_msg: 'Ordered Items fetched successfully',
        totalItems: count,
        orderId,
        items: fetchItems,
      });
    }
    return res.status(404).send({
      success: false,
      error_msg: 'No items mathching this order were found',
    });
  },
  /**
   * GET /orders/:id route to find and fetch a particular order given its id.
   * @returns {object} the found Order object
   */
  /*
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
        error_msg: 'The order could not be found',
      });
    }
    return res.status(404).json({
      success: false,
      error_msg:
        'An error occured while attempting to search for your order,
         ensure the id provided has a valid format',
    });
  },
  */

  /**
   * PUT /orders/:id route to update the status of a particular order given its id.
   * @param {orderStatus} orderStatus is required
   * @returns {object} the updated Order object
   */
  async updateOrderStatus(req, res) {
    let { orderStatus } = req.body;
    const { orderId } = req.params;

    const findOrder = await Order.findOne(req, res, orderId);
    if (findOrder.rows) {
      const orderStatusMaping = [
        'Pending',
        'Processing',
        'Cancelled',
        'Rejected',
        'Completed',
        'Delivered',
      ];

      orderStatus = orderStatusMaping[orderStatus] || orderStatusMaping[0];
      const itemStatus = orderStatus;

      const updatedOrder = await Order.updateOrder(req, res, orderId, orderStatus);
      if (updatedOrder.success) {
        let count = 0;

        for (let i = 0; i < updatedOrder.updatedData.ordered_items; i += 1) {
          OrderedItems.updateItemStatus(orderId, null, itemStatus);

          count += 1;
          if (count === parseInt(updatedOrder.updatedData.ordered_items, 10)) {
            return res.status(200).json({
              success: true,
              success_msg: `The orderStatus has been successfully set to ${
                updatedOrder.updatedData.order_status
              } and all items bellonging to this order are also ${
                updatedOrder.updatedData.order_status
              }`,
              updatedOrder: updatedOrder.updatedData,
            });
          }
        }
      }
    }
    return res.status(409).json({
      success: false,
      error_msg: 'This particular order can not be updated as it does not exist',
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
    const { userId } = req.user;
    const orderId = randomId.v1();
    const submittedFoodItems = req.body.foodItems;

    const foodItemsOrdered = [];
    let totalAmount = 0;
    const theOrderedItem = [];

    for (let i = 0; i < submittedFoodItems.length; i += 1) {
      const { foodId } = submittedFoodItems[i];
      const { quantity } = submittedFoodItems[i];

      /* eslint-disable-next-line */
      const findFood = await Food.findOne(foodId);
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

        /* eslint-disable-next-line */
        const insertOrderedItem = await Order.insertOrderedItem(orderId, userId, item);
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
