'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Food = require('../models/Food.model');

var _Food2 = _interopRequireDefault(_Food);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import randomId from 'uuid';


var foodsController = {
  /**
   * GET /foods route to find and fetch all the foods
   * @returns {object} All the found foods
   */
  fetchAllFoods: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var fetchFoods, count;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Food2.default.findAll();

            case 2:
              fetchFoods = _context.sent;
              count = fetchFoods.length;
              return _context.abrupt('return', res.status(200).send({
                success: true,
                success_msg: 'returning ' + count + ' availabel food(s)',
                totalFoods: count,
                foodsInMenu: fetchFoods
              }));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function fetchAllFoods(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return fetchAllFoods;
  }(),


  /**
   * GET /foods/:foodId route to find and fetch a particular food given its id.
   * @param {:foodId} the required foodId param from the url
   * @returns {object} the found food object
   */
  fetchOneFood: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var foodId, fetchFood;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              foodId = req.params.foodId;
              _context2.next = 3;
              return _Food2.default.findOne(foodId);

            case 3:
              fetchFood = _context2.sent;

              if (!fetchFood.success) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(200).json({
                message: 'Food found',
                food: fetchFood
              }));

            case 6:
              return _context2.abrupt('return', res.status(404).json({ message: 'Food not found' }));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fetchOneFood(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return fetchOneFood;
  }(),


  /**
   * POST /foods route to creat/make a new food.
   * @param {foodName} foodName is required
   * @param {amount} amount is required
   * @param {quantity} quantity is required
   * @param {coverImg} coverImg is required
   * @returns {object} the created food object
   */
  createNewFood: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var errors, createdFood;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req.checkBody('foodName', 'Name of food is required').notEmpty();
              req.checkBody('foodCat', 'Food Category is required').notEmpty();
              req.checkBody('foodImg', 'Cover image is required').notEmpty();
              req.checkBody('description', 'Food Description is required').notEmpty();
              req.checkBody('unitPrice', 'Food price is not valid').notEmpty();
              req.checkBody('quantityAvailable', 'Quantity available is required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt('return', res.status(400).json({ errors: errors }));

            case 9:
              _context3.next = 11;
              return _Food2.default.createFood(req.body);

            case 11:
              createdFood = _context3.sent;

              if (!createdFood.success) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt('return', res.status(201).json({
                success: true,
                success_msg: 'Food item created and added to menu',
                createdFood: createdFood.newFood
              }));

            case 14:
              return _context3.abrupt('return', res.status(400).json({
                success: false,
                success_msg: 'Error occured while creating food, try again'
              }));

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function createNewFood(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return createNewFood;
  }(),


  /**
   * PUT /foods/:foodId route to update the name of a particular food given its id.
   * @param {req.body.foodName} requires the foodName
   * @returns {object} the updated food object
   */

  updateFood: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var errors, foodId, findFood;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req.checkBody('foodName', 'Food name is required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt('return', res.status(400).json({ errors: errors }));

            case 4:
              foodId = req.params.foodId;
              _context4.next = 7;
              return _Food2.default.findOne(foodId);

            case 7:
              findFood = _context4.sent;

              if (!findFood.success) {
                _context4.next = 13;
                break;
              }

              if (!findFood.rows) {
                _context4.next = 12;
                break;
              }

              findFood.foodName = req.body.foodName;
              return _context4.abrupt('return', res.status(200).json({
                success: true,
                success_msg: 'food updated',
                updatedFood: findFood
              }));

            case 12:
              return _context4.abrupt('return', res.status(409).json({
                success: false,
                error_msg: 'This particular food can not be updated as its id does not exist'
              }));

            case 13:
              return _context4.abrupt('return', res.status(500).json({
                success: false,
                error_msg: 'An error occurred, try again and make sure the foodId has a valid format'
                // updatedFood: findFood,
              }));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateFood(_x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return updateFood;
  }()
};

exports.default = foodsController;