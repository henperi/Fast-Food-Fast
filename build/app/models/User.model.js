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

var User = function () {
  /**
   * class constructor
   */
  function User() {
    _classCallCheck(this, User);

    this.users = _Query2.default;
  }

  /**
   * Create user account
   * @param {*} data
   * @returns {object} user ubject
   */


  _createClass(User, [{
    key: 'createUser',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var queryText, values, _ref2, rows, newUser, response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryText = 'INSERT INTO users(user_id, fullname, email, \n      password, mobile, address, role, created_at, updated_at)\n      Values($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *';
                values = [_uuid2.default.v1(), data.fullname, data.email, data.hashPassword, data.mobile, data.address, data.role, new Date(), new Date()];
                _context.prev = 2;
                _context.next = 5;
                return this.users.query(queryText, values);

              case 5:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                newUser = {
                  userId: rows[0].user_id,
                  fullname: rows[0].fullname,
                  email: rows[0].email,
                  mobile: rows[0].mobile,
                  address: rows[0].address,
                  createdAt: rows[0].created_at,
                  updatedAt: rows[0].updated_at
                };
                response = { success: true, newUser: newUser };
                return _context.abrupt('return', response);

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);
                _response = { success: false, err: _context.t0 };
                return _context.abrupt('return', _response);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
      }));

      function createUser(_x) {
        return _ref.apply(this, arguments);
      }

      return createUser;
    }()

    /**
     * Find User By Email
     * @param {email} email
     * @returns {object} user object
     */

  }, {
    key: 'findByEmail',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
        var queryText, _ref4, rows, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryText = 'SELECT * FROM users WHERE email = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return this.users.query(queryText, [email]);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                return _context2.abrupt('return', rows[0]);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](1);
                response = { success: false, err: _context2.t0 };
                return _context2.abrupt('return', response);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function findByEmail(_x2) {
        return _ref3.apply(this, arguments);
      }

      return findByEmail;
    }()

    /**
     * @param {randomId} id
     * @returns {object} user object
     */

  }, {
    key: 'findOne',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
        var queryText, _ref6, rows, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryText = 'SELECT user_id, fullname, email, address, mobile, created_at, updated_at FROM users WHERE userId = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return this.users.query(queryText, [userId]);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
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

      function findOne(_x3) {
        return _ref5.apply(this, arguments);
      }

      return findOne;
    }()

    /**
     *
     */

  }, {
    key: 'findAll',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var queryText, _ref8, rows, response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryText = 'SELECT user_id, fullname, email, address, mobile, created_at, updated_at FROM users';
                _context4.prev = 1;
                _context4.next = 4;
                return this.users.query(queryText);

              case 4:
                _ref8 = _context4.sent;
                rows = _ref8.rows;
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

      function findAll() {
        return _ref7.apply(this, arguments);
      }

      return findAll;
    }()
  }]);

  return User;
}();

exports.default = new User();