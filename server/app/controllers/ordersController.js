import randomId from 'uuid';
import Order from '../models/Order.model';
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
      totalOrders: count,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders/:id route to find and fetch a particular order given its id.
   * @returns {object} the found Order object
   */
  async fetchOneOrder(req, res) {
    const [orderId] = [req.params.orderId];
    const fetchOrder = await Order.findOne(orderId);
    console.log(fetchOrder);
    if (!fetchOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({
      message: 'Order found',
      order: fetchOrder,
    });
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

    const [orderId] = [req.params.orderId];
    const findOrder = await Order.findOne(orderId);

    if (!findOrder) {
      return res.status(409).json({
        message: 'This particular order can not be updated as it does not exist',
      });
    }
    findOrder.orderStatus = req.body.orderStatus;

    for (let i = 0; i < findOrder.orderedItems.length; i += 1) {
      findOrder.orderedItems[i].itemStatus = req.body.orderStatus;
    }

    return res.status(200).json({
      message: 'Order updated',
      order: findOrder,
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
    const userId = req.params.userId || 1; // authenticated userId
    const orderId = randomId.v1();

    const submittedFoodItems = req.body.foodItems;
    // console.log('submittedFoodItems=', submittedFoodItems);

    const foodItemsOrdered = [];
    let totalAmount = 0;
    for (let i = 0; i < submittedFoodItems.length; i += 1) {
      const [foodId] = [submittedFoodItems[i].foodId];
      const [quantity] = [submittedFoodItems[i].quantity];
      if (!foodId || !quantity) {
        return res.status(400).json({
          message: 'Order not created',
          reasons:
            'Submitted foodItem does not have a valid format. foodId param or quantity param is not defined',
          description: `foodItems  value must be an array containing object literals which have
            foodId and quantity as parameters,
            example: \n { foodItems: [{ foodId: 4801ac7c-4f19-4299-b709-aab25de4f088, quantity: 2 }] }.
            visit /orders to see sample existing foodIds`,
        });
      }

      const findFood = Food.findOne(submittedFoodItems[i].foodId);
      // console.log('findFood:', findFood);
      if (findFood) {
        const item = {
          foodId,
          foodName: findFood.foodName,
          foodImg: findFood.foodImg || `uploads/img/${submittedFoodItems[i].foodId}`,
          unitPrice: Number(findFood.unitPrice),
          quantity: Number(submittedFoodItems[i].quantity),
          total: Number(findFood.unitPrice * submittedFoodItems[i].quantity),
          itemStatus: 'Processing',
        };

        foodItemsOrdered.push(item);
        totalAmount += findFood.unitPrice * submittedFoodItems[i].quantity;

        const orderedItems = Order.insertOrderedItem(orderId, item);
        console.log('orderdItems', orderedItems);
      }
    }
    if (foodItemsOrdered.length > 0) {
      const createdOrder = await Order.createOrder(
        orderId,
        userId,
        foodItemsOrdered.length,
        totalAmount,
      );

      return res.status(201).json({
        message: 'Order created',
        createdOrder: createdOrder.newOrder,
      });
    }
    return res.status(404).json({
      message: 'Order not created',
      reasons: 'Submitted fooditem foodId(s) do not exist',
    });
  },
};

export default ordersController;
