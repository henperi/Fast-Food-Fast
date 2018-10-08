'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../models/User.model');

var _User2 = _interopRequireDefault(_User);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var usersController = {
  /**
   *
   */
  attemptSignup: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var errors, email, password, fullname, mobile, address, role, findUser, hashPassword, newUser, createdUser, userToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req.checkBody('fullname', 'fullname is required').notEmpty();
              req.checkBody('email', 'Email is required').notEmpty();
              req.checkBody('email', 'Email is not valid').isEmail();
              req.checkBody('password', 'Password is required').notEmpty();
              req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);
              req.checkBody('mobile', 'Mobile is required').notEmpty();
              req.checkBody('address', 'Address is required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', res.status(400).json({ success: false, errors: errors }));

            case 10:
              email = req.body.email.toLowerCase();
              password = req.body.password;
              fullname = req.body.fullname;
              mobile = req.body.mobile;
              address = req.body.address;
              role = 'User';

              if (!(fullname.length < 3)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'Your Fullname must be greater than 2 characters'
              }));

            case 18:
              if (!(password.length < 5)) {
                _context.next = 20;
                break;
              }

              return _context.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'Your Password must be at least 5 characters in length'
              }));

            case 20:
              if (!(fullname.length > 35)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'Oops, your name is too long, use a shorter name'
              }));

            case 22:
              if (!(address.length > 50)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt('return', res.status(400).json({
                success: false,
                error_msg: 'Oops, your address is too long, use a shorter version of your address'
              }));

            case 24:
              _context.next = 26;
              return _User2.default.findByEmail(req, res, email);

            case 26:
              findUser = _context.sent;

              if (!findUser) {
                _context.next = 29;
                break;
              }

              return _context.abrupt('return', res.status(409).json({
                success: false,
                error_msg: 'This email has already been taken'
              }));

            case 29:
              hashPassword = _helper2.default.hashPassword(password);

              req.body.password = hashPassword;
              req.body.role = role;

              newUser = {
                email: email,
                hashPassword: hashPassword,
                fullname: fullname,
                mobile: mobile,
                address: address,
                role: role
              };
              _context.next = 35;
              return _User2.default.createUser(newUser);

            case 35:
              createdUser = _context.sent;

              if (!createdUser.success) {
                _context.next = 39;
                break;
              }

              userToken = _helper2.default.generateToken(createdUser.newUser.userId, createdUser.newUser.email);
              return _context.abrupt('return', res.status(201).json({
                success: true,
                success_msg: 'Signup Successful',
                createdUser: createdUser.newUser,
                userToken: userToken
              }));

            case 39:
              return _context.abrupt('return', res.status(500).json({
                success: false,
                success_msg: 'Error occured try again'
              }));

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function attemptSignup(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return attemptSignup;
  }(),


  /**
   *
   */
  attemptSignin: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var errors, email, password, findUser, checkPassword, userToken;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req.checkBody('email', 'Email is required').notEmpty();
              req.checkBody('email', 'Email is not valid').isEmail();
              req.checkBody('password', 'Password is required').notEmpty();

              errors = req.validationErrors();

              if (!errors) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(400).json({ success: false, errors: errors }));

            case 6:
              email = req.body.email.toLowerCase();
              password = req.body.password;
              _context2.next = 10;
              return _User2.default.findByEmail(req, res, email);

            case 10:
              findUser = _context2.sent;

              if (findUser) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({
                success: false,
                error_msg: 'email does not exist'
              }));

            case 13:
              checkPassword = _helper2.default.comparePassword(findUser.password, password);

              if (checkPassword) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({
                success: false,
                error_msg: 'password is wrong'
              }));

            case 16:
              // console.log(findUser);
              userToken = _helper2.default.generateToken(findUser.user_id, findUser.email);
              return _context2.abrupt('return', res.status(200).json({
                success: true,
                success_msg: 'signin successful',
                userToken: userToken
              }));

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function attemptSignin(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return attemptSignin;
  }(),


  /**
   *
   */
  fetchAllUsers: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var fetchUsers;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _User2.default.findAll();

            case 2:
              fetchUsers = _context3.sent;
              return _context3.abrupt('return', res.status(200).json({
                success: true,
                foundUser: fetchUsers
              }));

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function fetchAllUsers(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return fetchAllUsers;
  }()
};

exports.default = usersController;