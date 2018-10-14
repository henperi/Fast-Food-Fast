'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import moment from 'moment';


var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Query = require('./Query.model');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Food = function () {
  /**
   * class constructor
   */
  function Food() {
    _classCallCheck(this, Food);

    this.foods = _Query2.default;
  }

  _createClass(Food, [{
    key: 'createFood',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var queryText, values, _ref2, rows, newFood, response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log(data);
                queryText = 'INSERT INTO foods(food_id, food_name, food_cat, food_img,\n      description, unit_price, quantity_available, created_at, updated_at)\n      Values($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *';
                values = [_uuid2.default.v4(), data.foodName, data.foodCat, data.foodImg, data.description, data.unitPrice, data.quantityAvailable, new Date(), new Date()];
                _context.prev = 2;
                _context.next = 5;
                return this.foods.query(queryText, values);

              case 5:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                newFood = {
                  foodId: rows[0].food_id,
                  foodName: rows[0].food_name,
                  foodCat: rows[0].food_cat,
                  foodImg: rows[0].food_img,
                  description: rows[0].description,
                  unitPrice: rows[0].unit_price,
                  quantityAvailable: rows[0].quantity_available,
                  createdAt: rows[0].created_at,
                  updatedAt: rows[0].updated_at
                };
                response = { success: true, newFood: newFood };
                return _context.abrupt('return', response);

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);

                // console.log('err:', err);
                _response = { success: false, err: _context.t0 };
                return _context.abrupt('return', _response);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
      }));

      function createFood(_x) {
        return _ref.apply(this, arguments);
      }

      return createFood;
    }()

    /**
     * @param {request.params.foodId} foodId
     * @returns {object} food object
     */

  }, {
    key: 'findOne',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(foodId) {
        var queryText, _ref4, rows, response, _response2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryText = 'SELECT * from foods WHERE food_id = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return this.foods.query(queryText, [foodId]);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                response = { success: true, rows: rows[0] };
                return _context2.abrupt('return', response);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);
                _response2 = { success: false, error: _context2.t0 };
                return _context2.abrupt('return', _response2);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function findOne(_x2) {
        return _ref3.apply(this, arguments);
      }

      return findOne;
    }()

    /**
     * Find All foods
     * @param null
     * @returns {object:} All foods stored in the database
     */

  }, {
    key: 'findAll',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var queryText, _ref6, rows, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryText = 'SELECT * from foods';
                _context3.prev = 1;
                _context3.next = 4;
                return this.foods.query(queryText);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
                return _context3.abrupt('return', rows);

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

      function findAll() {
        return _ref5.apply(this, arguments);
      }

      return findAll;
    }()
  }]);

  return Food;
}();

exports.default = new Food();