'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Order = require('../models/Order.model');

var _Order2 = _interopRequireDefault(_Order);

var _OrderedItems = require('../models/OrderedItems.model');

var _OrderedItems2 = _interopRequireDefault(_OrderedItems);

var _Food = require('../models/Food.model');

var _Food2 = _interopRequireDefault(_Food);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ordersController = {
  /**
   * GET /orders route to find and fetch all the orders
   * @returns {object} All the found Orders
   */
  fetchAllOrders: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var fetchOrders, count, i, qty, id;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Order2.default.findAll();

            case 2:
              fetchOrders = _context.sent;
              count = fetchOrders.length;


              for (i = 0; i < count; i += 1) {
                qty = fetchOrders[i].ordered_items;
                id = fetchOrders[i].order_id;


                fetchOrders[i].ordered_items = {
                  quantity: qty,
                  items_url: 'https://api-fast-food-fast.herokuapp.com/api/v1/orders/' + id
                };
              }

              return _context.abrupt('return', res.status(200).send({
                success: true,
                totalOrders: count,
                success_msg: 'returning ' + count + ' available orders',
                orders: fetchOrders
              }));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function fetchAllOrders(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return fetchAllOrders;
  }(),


  /**
   * GET /orders route to find and fetch all the orders of a particular user
   * @returns {object} All the found Orders
   */
  fetchAllUserOrders: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var userId, fetchOrders;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.params.userId;
              _context2.next = 3;
              return _Order2.default.findOrdersByUserId(userId);

            case 3:
              fetchOrders = _context2.sent;
              return _context2.abrupt('return', res.status(200).send({
                success: true,
                totalOrders: fetchOrders.length,
                orders: fetchOrders
              }));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fetchAllUserOrders(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return fetchAllUserOrders;
  }(),


  /**
   * GET /orders route to find and fetch all the orders of a particular user
   * @returns {object} All the found Orderss
   */
  fetchAllOrderedItems: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var orderId, fetchItems, count;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              orderId = req.params.orderId;
              // console.log(orderId);

              _context3.next = 3;
              return _OrderedItems2.default.findItems(orderId);

            case 3:
              fetchItems = _context3.sent;
              count = fetchItems.length;

              if (!(count > 0)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt('return', res.status(200).send({
                success: true,
                success_msg: 'Ordered Items fetched successfully',
                totalItems: count,
                Items: fetchItems
              }));

            case 7:
              return _context3.abrupt('return', res.status(404).send({
                success: false,
                error_msg: 'No items mathching this order were found'
              }));

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function fetchAllOrderedItems(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return fetchAllOrderedItems;
  }(),


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
  updateOrderStatus: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var errors, orderStatus, orderId, findOrder, orderStatusMaping, itemStattus, updatedOrder, count, i;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req.checkBody('orderStatus', 'order status is required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt('return', res.status(400).json({ errors: errors }));

            case 4:
              orderStatus = req.body.orderStatus;
              /* eslint-disable-next-line */

              if (!(isNaN(orderStatus) || orderStatus > 5)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'The order status sent is not valid'
              }));

            case 7:
              orderId = req.params.orderId;
              _context4.next = 10;
              return _Order2.default.findOne(orderId);

            case 10:
              findOrder = _context4.sent;

              if (!findOrder.success) {
                _context4.next = 32;
                break;
              }

              if (!findOrder.rows) {
                _context4.next = 31;
                break;
              }

              // console.log('INside ROWS:::', findOrder.rows);
              orderStatusMaping = ['Pending', 'Processing', 'Cancelled', 'Rejected', 'Completed', 'Delivered'];


              orderStatus = orderStatusMaping[orderStatus] || orderStatusMaping[0];
              itemStattus = orderStatus;
              _context4.next = 18;
              return _Order2.default.updateOrder(orderId, orderStatus);

            case 18:
              updatedOrder = _context4.sent;

              if (!updatedOrder.success) {
                _context4.next = 30;
                break;
              }

              // console.log('Trying to update:::', updatedOrder);
              count = 0;
              i = 0;

            case 22:
              if (!(i < updatedOrder.updatedData.ordered_items)) {
                _context4.next = 30;
                break;
              }

              _OrderedItems2.default.updateItemStatus(orderId, null, itemStattus);

              count += 1;

              if (!(count === parseInt(updatedOrder.updatedData.ordered_items, 10))) {
                _context4.next = 27;
                break;
              }

              return _context4.abrupt('return', res.status(200).json({
                success: true,
                success_msg: 'The orderStatus has been successfully set to ' + updatedOrder.updatedData.order_status + ' and all items bellonging to this order are also ' + updatedOrder.updatedData.order_status,
                updatedOrder: updatedOrder.updatedData
              }));

            case 27:
              i += 1;
              _context4.next = 22;
              break;

            case 30:
              return _context4.abrupt('return', res.status(500).json({
                success: false,
                error_msg: 'Error occured while trying to update this order, try again'
              }));

            case 31:
              return _context4.abrupt('return', res.status(409).json({
                success: false,
                error_msg: 'This particular order can not be updated as it does not exist'
              }));

            case 32:
              return _context4.abrupt('return', res.status(500).json({
                success: false,
                error_msg: 'An error occurred while trying to update the order, please try again',
                guides: 'Make sure the order_id being sent is a valid uuid character, read the doccumentation for help'
              }));

            case 33:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateOrderStatus(_x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return updateOrderStatus;
  }(),


  /**
   * POST /orders route to creat/make a new order.
   * @param {foodItems} foodItems object is required
   * @param {amount} amount is required
   * @param {quantity} quantity is required
   * @param {coverImg} coverImg is required
   * @returns {object} the created Order object
   */
  makeAnOrder: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var errors, userId, orderId, submittedFoodItems, foodItemsOrdered, totalAmount, theOrderedItem, k, foodId, quantity, i, _foodId, _quantity, findFood, item, insertOrderedItem, createdOrder;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req.checkBody('foodItems', 'Food Item(s) are required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt('return', res.status(400).json({ errors: errors }));

            case 4:
              userId = req.user.userId;
              orderId = _uuid2.default.v1();
              submittedFoodItems = req.body.foodItems;
              foodItemsOrdered = [];
              totalAmount = 0;
              theOrderedItem = [];
              k = 0;

            case 11:
              if (!(k < submittedFoodItems.length)) {
                _context5.next = 24;
                break;
              }

              foodId = submittedFoodItems[k].foodId;
              quantity = submittedFoodItems[k].quantity;

              console.log('Here::::', submittedFoodItems[k]);

              if (foodId) {
                _context5.next = 17;
                break;
              }

              return _context5.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'The foodId is a required field in foodItems array',
                guides: 'Please see doccumentation, for help'
              }));

            case 17:
              if (quantity) {
                _context5.next = 19;
                break;
              }

              return _context5.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'The quantity is a required field in foodItems array',
                guides: 'Please see doccumentation, for help'
              }));

            case 19:
              if (Number.isInteger(quantity)) {
                _context5.next = 21;
                break;
              }

              return _context5.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'One or more of the food item quantities supplied is not a valid number',
                guides: 'Please see doccumentation, for help'
              }));

            case 21:
              k += 1;
              _context5.next = 11;
              break;

            case 24:
              i = 0;

            case 25:
              if (!(i < submittedFoodItems.length)) {
                _context5.next = 42;
                break;
              }

              _foodId = submittedFoodItems[i].foodId;
              _quantity = submittedFoodItems[i].quantity;

              /* eslint-disable-next-line */

              _context5.next = 30;
              return _Food2.default.findOne(_foodId);

            case 30:
              findFood = _context5.sent;

              if (!(findFood.success && findFood.rows)) {
                _context5.next = 39;
                break;
              }

              item = {
                foodId: _foodId,
                foodName: findFood.rows.food_name,
                foodImg: findFood.rows.food_img || 'uploads/img/' + submittedFoodItems[i].foodId,
                unitPrice: Number(findFood.rows.unit_price),
                quantity: Number(submittedFoodItems[i].quantity),
                total: Number(findFood.rows.unit_price * submittedFoodItems[i].quantity),
                itemStatus: 'Pending'
              };


              foodItemsOrdered.push(item);
              totalAmount += findFood.rows.unit_price * _quantity;

              /* eslint-disable-next-line */
              _context5.next = 37;
              return _Order2.default.insertOrderedItem(orderId, userId, item);

            case 37:
              insertOrderedItem = _context5.sent;

              // console.log(insertOrderedItem);
              theOrderedItem.push(insertOrderedItem.orderedItems);

            case 39:
              i += 1;
              _context5.next = 25;
              break;

            case 42:
              if (!(foodItemsOrdered.length > 0)) {
                _context5.next = 48;
                break;
              }

              _context5.next = 45;
              return _Order2.default.createOrder(orderId, userId, foodItemsOrdered.length, totalAmount);

            case 45:
              createdOrder = _context5.sent;

              // console.log('CO:: ', createdOrder);
              createdOrder.newOrder.orderedItems = theOrderedItem;
              return _context5.abrupt('return', res.status(201).json({
                success: true,
                success_msg: 'Your order has been created successfully',
                createdOrder: createdOrder.newOrder
              }));

            case 48:
              return _context5.abrupt('return', res.status(404).json({
                success: false,
                error_msg: 'Unable to create your order',
                reasons: 'The fooditems sent do not exist in the list of available foods'
              }));

            case 49:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function makeAnOrder(_x9, _x10) {
      return _ref5.apply(this, arguments);
    }

    return makeAnOrder;
  }()
};

exports.default = ordersController;