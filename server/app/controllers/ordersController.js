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
      const qty = fetchOrders[i].ordered_items;
      const id = fetchOrders[i].order_id;

      fetchOrders[i].ordered_items = {
        quantity: qty,
        items_url: `https://api-fast-food-fast.herokuapp.com/api/v1/orders/${id}`,
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
   * GET /orders route to find and fetch all the orders of a particular user
   * @returns {object} All the found Orders
   */
  async fetchAllUserOrders(req, res) {
    const { userId } = req.params;
    const fetchOrders = await Order.findOrdersByUserId(userId);

    return res.status(200).send({
      success: true,
      totalOrders: fetchOrders.length,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders route to find and fetch all the orders of a particular user
   * @returns {object} All the found Orderss
   */
  async fetchAllOrderedItems(req, res) {
    const { orderId } = req.params;
    // console.log(orderId);
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
        'An error occured while attempting to search for your order, ensure the id provided has a valid format',
    });
  },
  */

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
    let { orderStatus } = req.body;
    /* eslint-disable-next-line */
    if (isNaN(orderStatus) || orderStatus > 5) {
      return res.status(400).json({
        success: false,
        error_msg: 'The order status sent is not valid',
      });
    }

    const { orderId } = req.params;
    const findOrder = await Order.findOne(orderId);

    if (findOrder.success) {
      if (findOrder.rows) {
        // console.log('INside ROWS:::', findOrder.rows);
        const orderStatusMaping = [
          'Pending',
          'Processing',
          'Cancelled',
          'Rejected',
          'Completed',
          'Delivered',
        ];

        orderStatus = orderStatusMaping[orderStatus] || orderStatusMaping[0];
        const itemStattus = orderStatus;

        const updatedOrder = await Order.updateOrder(orderId, orderStatus);
        if (updatedOrder.success) {
          // console.log('Trying to update:::', updatedOrder);
          let count = 0;

          for (let i = 0; i < updatedOrder.updatedData.ordered_items; i += 1) {
            OrderedItems.updateItemStatus(orderId, null, itemStattus);

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
        return res.status(500).json({
          success: false,
          error_msg: 'Error occured while trying to update this order, try again',
        });
      }
      return res.status(409).json({
        success: false,
        error_msg: 'This particular order can not be updated as it does not exist',
      });
    }

    return res.status(500).json({
      success: false,
      error_msg: 'An error occurred while trying to update the order, please try again',
      guides:
        'Make sure the order_id being sent is a valid uuid character, read the doccumentation for help',
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

    const foodItemsOrdered = [];
    let totalAmount = 0;
    const theOrderedItem = [];

    for (let k = 0; k < submittedFoodItems.length; k += 1) {
      const { foodId } = submittedFoodItems[k];
      const { quantity } = submittedFoodItems[k];
      console.log('Here::::', submittedFoodItems[k]);
      if (!foodId) {
        return res.status(400).json({
          success: false,
          error_msg: 'The foodId is a required field in foodItems array',
          guides: 'Please see doccumentation, for help',
        });
      }
      if (!quantity) {
        return res.status(400).json({
          success: false,
          error_msg: 'The quantity is a required field in foodItems array',
          guides: 'Please see doccumentation, for help',
        });
      }

      if (!Number.isInteger(quantity)) {
        return res.status(400).json({
          success: false,
          error_msg: 'One or more of the food item quantities supplied is not a valid number',
          guides: 'Please see doccumentation, for help',
        });
      }
    }

    for (let i = 0; i < submittedFoodItems.length; i += 1) {
      const { foodId } = submittedFoodItems[i];
      const { quantity } = submittedFoodItems[i];

      /* eslint-disable-next-line */
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

        /* eslint-disable-next-line */
        const insertOrderedItem = await Order.insertOrderedItem(orderId, userId, item);
        // console.log(insertOrderedItem);
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
      // console.log('CO:: ', createdOrder);
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
