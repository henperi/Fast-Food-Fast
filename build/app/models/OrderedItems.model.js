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

var OrderedItems = function () {
  /**
   * class constructor
   */
  function OrderedItems() {
    _classCallCheck(this, OrderedItems);

    this.orderedItems = _Query2.default;
  }

  /**
   * Update one or more itemStatus's
   * @param {orderId}  optional, null
   * @param {itemId} itemid String
   * @returns {object} updated data
   */


  _createClass(OrderedItems, [{
    key: 'updateItemStatus',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(orderId, itemId, status) {
        var queryText, values, _ref2, rows, updatedData, response, _response, _queryText, _values, _ref3, _rows, _updatedData, _response2, _response3;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!orderId) {
                  _context.next = 19;
                  break;
                }

                queryText = 'UPDATE ordered_items SET itemstatus=$1, updated_at=$2 \n      WHERE order_id=$3\n      returning *';
                values = [status, new Date(), orderId];
                _context.prev = 3;
                _context.next = 6;
                return this.orderedItems.query(queryText, values);

              case 6:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                updatedData = rows[0];
                response = { success: true, updatedData: updatedData };
                return _context.abrupt('return', response);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](3);
                _response = { success: false, err: _context.t0 };
                return _context.abrupt('return', _response);

              case 17:
                _context.next = 35;
                break;

              case 19:
                _queryText = 'UPDATE ordered_items SET itemstatus=$1, updated_at=$2 \n      WHERE item_id=$3\n      returning *';
                _values = [status, new Date(), itemId];
                _context.prev = 21;
                _context.next = 24;
                return this.orderedItems.query(_queryText, _values);

              case 24:
                _ref3 = _context.sent;
                _rows = _ref3.rows;
                _updatedData = _rows[0];
                _response2 = { success: true, updatedData: _updatedData };
                return _context.abrupt('return', _response2);

              case 31:
                _context.prev = 31;
                _context.t1 = _context['catch'](21);
                _response3 = { success: false, err: _context.t1 };
                return _context.abrupt('return', _response3);

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 13], [21, 31]]);
      }));

      function updateItemStatus(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return updateItemStatus;
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(orderId, userId, foodItems) {
        var queryText, values, _ref5, rows, orderedItems, response, _response4;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryText = 'INSERT INTO ordered_items(order_id, user_id, item_id, food_id, food_name, food_img, \n      unit_price, quantity, total, itemStatus, created_at, updated_at)\n      Values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\n      returning *';
                values = [orderId, userId, _uuid2.default.v1(), foodItems.foodId, foodItems.foodName, foodItems.foodImg, foodItems.unitPrice, foodItems.quantity, foodItems.total, foodItems.itemStatus, new Date(), new Date()];
                _context2.prev = 2;
                _context2.next = 5;
                return this.orders.query(queryText, values);

              case 5:
                _ref5 = _context2.sent;
                rows = _ref5.rows;


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
                return _context2.abrupt('return', response);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);
                _response4 = { success: false, err: _context2.t0 };
                return _context2.abrupt('return', _response4);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12]]);
      }));

      function insertOrderedItem(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return insertOrderedItem;
    }()

    /**
     * @param {itemId} required
     * @param {userId} (optional)
     * @returns {object} one order object
     */

  }, {
    key: 'findOne',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(itemId) {
        var queryText, _ref7, rows, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryText = 'SELECT * from ordered_items WHERE item_id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return this.orders.query(queryText, [itemId]);

              case 4:
                _ref7 = _context3.sent;
                rows = _ref7.rows;
                return _context3.abrupt('return', rows[0]);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](1);
                response = { success: false, err: _context3.t0 };
                return _context3.abrupt('return', response);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 9]]);
      }));

      function findOne(_x7) {
        return _ref6.apply(this, arguments);
      }

      return findOne;
    }()

    /**
     * @param {orderId} required
     * @param {userId} (optional)
     * @returns {object} one order object
     */

  }, {
    key: 'findItems',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(orderId) {
        var queryText, _ref9, rows, response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // console.log('insideOrdereItemsModel', orderId);
                queryText = 'SELECT * from ordered_items WHERE order_id = $1';
                _context4.prev = 1;
                _context4.next = 4;
                return this.orderedItems.query(queryText, [orderId]);

              case 4:
                _ref9 = _context4.sent;
                rows = _ref9.rows;
                return _context4.abrupt('return', rows);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](1);
                response = { success: false, err: _context4.t0 };
                return _context4.abrupt('return', response);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function findItems(_x8) {
        return _ref8.apply(this, arguments);
      }

      return findItems;
    }()

    /**
     * @returns {object} all orders object
     */

  }, {
    key: 'findAll',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var queryText, _ref11, rows, response;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryText = 'SELECT * from ordered_items';
                _context5.prev = 1;
                _context5.next = 4;
                return this.orders.query(queryText);

              case 4:
                _ref11 = _context5.sent;
                rows = _ref11.rows;
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
        return _ref10.apply(this, arguments);
      }

      return findAll;
    }()
  }]);

  return OrderedItems;
}();

exports.default = new OrderedItems();