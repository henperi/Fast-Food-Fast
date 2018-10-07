'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Query = require('../models/Query.model');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  validateToken: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decodedToken, queryText, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                success: false,
                error_msg: 'Authorization failed, Please log in to your account to continue'
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken2.default.verify(token, process.env.SECRETE);

            case 6:
              decodedToken = _context.sent;
              queryText = 'SELECT * FROM users WHERE user_id = $1';
              _context.next = 10;
              return _Query2.default.query(queryText, [decodedToken.userId]);

            case 10:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                success: false,
                error_msg: 'Authorization failed, we could not verify your account, please login and try again'
              }));

            case 14:
              req.user = { userId: decodedToken.userId };
              req.userRole = rows[0].role;
              // console.log('role', rows[0].role);
              return _context.abrupt('return', next());

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(401).send({
                success: false,
                error_msg: 'An error occured while attempting to authenticating you, please try to login again'
              }));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 19]]);
    }));

    function validateToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return validateToken;
  }(),


  /**
   * Validate Admin Role
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  isUser: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(req.userRole !== 'User')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.status(401).send({
                success: false,
                error_msg: 'Unauthorized access, only users are allowed to do this'
              }));

            case 2:
              return _context2.abrupt('return', next());

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function isUser(_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return isUser;
  }(),


  /**
   * Validate Admin Role
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  isAdmin: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(req.userRole !== 'Admin')) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', res.status(401).send({
                success: false,
                error_msg: 'Unauthorized access, only admins are allowed to do this'
              }));

            case 2:
              return _context3.abrupt('return', next());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function isAdmin(_x7, _x8, _x9) {
      return _ref4.apply(this, arguments);
    }

    return isAdmin;
  }()
};

exports.default = Auth;