// import randomId from 'uuid';
import Order from '../models/Order.model';
// import Food from '../models/Food.model';

const ordersController = {
  /**
   * GET /orders route to find and fetch all the orders
   * @returns {object} All the found Orders
   */
  fetchAllOrders(req, res) {
    const fetchOrders = Order.findAll();
    const count = fetchOrders.length;

    if (!fetchOrders) {
      return res.status(404).send({ message: 'No orders were found' });
    }
    if (fetchOrders.length === 0) {
      return res.status(404).send({ message: 'No orders were found' });
    }
    return res.status(200).send({
      message: 'Orders found',
      totalOrders: count,
      orders: fetchOrders,
    });
  },

  /**
   * GET /orders/:id route to find and fetch a particular order given its id.
   * @returns {object} the found Order object
   */
  fetchOneOrder(req, res) {
    const [orderId] = [req.params.orderId];
    const fetchOrder = Order.findOne(orderId);

    if (!fetchOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (fetchOrder.length === 0) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }
    return res.status(201).json({
      message: 'Order found',
      order: fetchOrder,
    });
  },

  /**
   * PUT /orders/:id route to update the status of a particular order given its id.
   * @param {orderStatus} orderStatus is required
   * @returns {object} the updated Order object
   */
  updateOrderStatus(req, res) {
    req.checkBody('orderStatus', 'order status is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }

    const [orderId] = [req.params.orderId];
    const findOrder = Order.findOne(orderId);

    if (!findOrder) {
      return res.status(409).json({
        message: 'This particular order can not be updated as it does not exist',
      });
    }
    if (findOrder.length === 0) {
      return res.status(409).json({
        message: 'This particular order can not be updated as it does not exist',
      });
    }
    findOrder.orderStatus = req.body.orderStatus;

    return res.status(201).json({
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
  //   makeAnOrder(req, res) {
  //     req.checkBody('foodItems', 'Food Item(s) are required').notEmpty();

  //     const errors = req.validationErrors();

  //     if (errors) {
  //       return res.status(400).json({ errors });
  //     }
  //     const userId = req.params.userId || 1; // authenticated userId

  //     const submittedFoodItems = req.body.foodItems;
  //     // console.log('submittedFoodItems=', submittedFoodItems);

  //     const foodItemsOrdered = [];
  //     let totalAmount = 0;
  //     for (let i = 0; i < submittedFoodItems.length; i += 1) {
  //       const [foodId] = [submittedFoodItems[i].foodId];
  //       const [quantity] = [submittedFoodItems[i].quantity];
  //       if (!foodId || !quantity) {
  //         return res.status(400).json({
  //           message: 'Order not created',
  //           reasons:
  //             'Submitted foodItem does not have a valid format. foodId param or quantity param is not defined',
  //           description: `foodItems value must be an array containing object literals which have
  //           foodId and quantity as parameters,
  //           example: \n { foodItems: [{ foodId: 4801ac7c-4f19-4299-b709-aab25de4f088, quantity: 2 }] }.
  //           visit /orders to see sample existing foodIds`,
  //         });
  //       }

  //       const findFood = Food.findOne(submittedFoodItems[i].foodId);
  //       // console.log('findFood:', findFood);
  //       if (findFood) {
  //         const item = {
  //           foodId,
  //           foodName: findFood.foodName,
  //           coverImg: findFood.coverImg || `uploads/img/${foodItemsOrdered[i].foodId}`,
  //           unitPrice: Number(findFood.unitPrice),
  //           quantity: Number(submittedFoodItems[i].quantity),
  //           total: Number(findFood.unitPrice * submittedFoodItems[i].quantity),
  //           itemStatus: 'Processing',
  //         };
  //         foodItemsOrdered.push(item);
  //         totalAmount += findFood.unitPrice * submittedFoodItems[i].quantity;
  //         // console.log('totalAmount', totalAmount);
  //       }
  //     }
  //     if (foodItemsOrdered.length > 0) {
  //       const createdOrder = Order.createOrder(userId, foodItemsOrdered, totalAmount);
  //       return res.status(201).json({
  //         message: 'Order created',
  //         createdOrder,
  //       });
  //     }
  //     return res.status(201).json({
  //       message: 'Order not created',
  //       reasons: 'Submitted fooditem foodId(s) do not exist',
  //     });
  //   },
};

export default ordersController;
