'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Query = require('./Query.model');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order = function () {
  /**
   * class constructor
   */
  function Order() {
    _classCallCheck(this, Order);

    this.orders = _Query2.default;
  }

  /**
   * Place an Order
   * @param {userId} userId
   * @param {data} data
   * @returns {object} created order object
   */


  _createClass(Order, [{
    key: 'createOrder',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(orderId, userId, foodItems, totalAmount) {
        var queryText, values, _ref2, rows, newOrder, response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryText = 'INSERT INTO orders(order_id, ordered_by, ordered_items, \n      total_mount, order_status, delivery_status, created_at, updated_at)\n      Values($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *';
                values = [orderId, userId, foodItems, totalAmount, 'Pending', 'Pending', new Date(), new Date()];
                _context.prev = 2;
                _context.next = 5;
                return this.orders.query(queryText, values);

              case 5:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                newOrder = {
                  orderId: rows[0].order_id,
                  orderedBy: rows[0].ordered_by,
                  orderedItems: foodItems,
                  totalAmount: totalAmount,
                  orderStatus: rows[0].order_status,
                  deliveryStatus: rows[0].delivery_status,
                  createdAt: rows[0].created_at,
                  updatedAt: rows[0].updated_at
                };
                response = { success: true, newOrder: newOrder };
                return _context.abrupt('return', response);

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);
                _response = { success: false, error: _context.t0 };
                return _context.abrupt('return', _response);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
      }));

      function createOrder(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return createOrder;
    }()

    /**
     * Update an Order
     * @param {userId} userId
     * @param {data} data
     * @returns {object} created order object
     */

  }, {
    key: 'updateOrder',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(orderId, status) {
        var queryText, values, _ref4, rows, updatedData, response, _response2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryText = 'UPDATE orders SET order_status=$1, updated_at=$2 \n      WHERE order_id=$3\n      returning *';
                values = [status, new Date(), orderId];
                _context2.prev = 2;
                _context2.next = 5;
                return this.orders.query(queryText, values);

              case 5:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                updatedData = rows[0];
                response = { success: true, updatedData: updatedData };
                return _context2.abrupt('return', response);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);
                _response2 = { success: false, err: _context2.t0 };
                return _context2.abrupt('return', _response2);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12]]);
      }));

      function updateOrder(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return updateOrder;
    }()

    /**
     * Insert Item into ordered_items table
     * @param {userId} orderId
     * @param {data} data
     * @returns {object} inserted item
     */

  }, {
    key: 'insertOrderedItem',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(orderId, userId, foodItems) {
        var queryText, values, _ref6, rows, orderedItems, response, _response3;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryText = 'INSERT INTO ordered_items(order_id, user_id, item_id, food_id, food_name, food_img, \n      unit_price, quantity, total, itemStatus, created_at, updated_at)\n      Values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\n      returning *';
                values = [orderId, userId, _uuid2.default.v1(), foodItems.foodId, foodItems.foodName, foodItems.foodImg, foodItems.unitPrice, foodItems.quantity, foodItems.total, foodItems.itemStatus, new Date(), new Date()];
                _context3.prev = 2;
                _context3.next = 5;
                return this.orders.query(queryText, values);

              case 5:
                _ref6 = _context3.sent;
                rows = _ref6.rows;


                // console.log('inside_rows: ', rows);

                orderedItems = {
                  foodId: rows[0].food_id,
                  foodName: rows[0].food_name,
                  foodImg: rows[0].food_img,
                  unitPrice: rows[0].unit_price,
                  quantity: rows[0].quantity,
                  total: foodItems.total,
                  itemStatus: rows[0].itemstatus,
                  createdAt: rows[0].created_at,
                  updatedAt: rows[0].updated_at
                };
                response = { success: true, orderedItems: orderedItems };
                return _context3.abrupt('return', response);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](2);
                _response3 = { success: false, err: _context3.t0 };
                return _context3.abrupt('return', _response3);

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 12]]);
      }));

      function insertOrderedItem(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return insertOrderedItem;
    }()

    /**
     * @param {orderId} required
     * @param {userId} (optional)
     * @returns {object} one order object
     */

  }, {
    key: 'findOne',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(orderId) {
        var queryText, _ref8, rows, response, _response4;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryText = 'SELECT * from orders WHERE order_id=$1';
                _context4.prev = 1;
                _context4.next = 4;
                return this.orders.query(queryText, [orderId]);

              case 4:
                _ref8 = _context4.sent;
                rows = _ref8.rows;

                // console.log('rowsX', rows);
                response = { success: true, rows: rows[0] };
                return _context4.abrupt('return', response);

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](1);
                _response4 = { success: false, err: _context4.t0 };
                return _context4.abrupt('return', _response4);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 10]]);
      }));

      function findOne(_x10) {
        return _ref7.apply(this, arguments);
      }

      return findOne;
    }()

    /**
     * @returns {object} all orders object
     */

  }, {
    key: 'findAll',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var queryText, _ref10, rows, response;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryText = 'SELECT * from orders';
                _context5.prev = 1;
                _context5.next = 4;
                return this.orders.query(queryText);

              case 4:
                _ref10 = _context5.sent;
                rows = _ref10.rows;
                return _context5.abrupt('return', rows);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](1);
                response = { success: false, err: _context5.t0 };
                return _context5.abrupt('return', response);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function findAll() {
        return _ref9.apply(this, arguments);
      }

      return findAll;
    }()

    /**
     * @returns {object} all orders object
     */

  }, {
    key: 'findOrdersByUserId',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId) {
        var queryText, _ref12, rows, response;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                queryText = 'SELECT * from orders WHERE ordered_by=$1';
                _context6.prev = 1;
                _context6.next = 4;
                return this.orders.query(queryText, [userId]);

              case 4:
                _ref12 = _context6.sent;
                rows = _ref12.rows;
                return _context6.abrupt('return', rows);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6['catch'](1);
                response = { success: false, err: _context6.t0 };
                return _context6.abrupt('return', response);

              case 13:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 9]]);
      }));

      function findOrdersByUserId(_x11) {
        return _ref11.apply(this, arguments);
      }

      return findOrdersByUserId;
    }()
  }]);

  return Order;
}();

exports.default = new Order();