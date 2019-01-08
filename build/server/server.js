'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

require('babel-polyfill');

var _v = require('./routes/api/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Static assets


// Import The Routes Index File =========================================
app.use(_express2.default.static('server/UI'));

// Some neccessary middleware
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

// Set Up CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  return next();
});

// Express Validator Middleware
app.use((0, _expressValidator2.default)({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Use The Routes Index File
app.use('/api/v1/', _v2.default);

// 404 page
app.use('*/*', _express2.default.static('server/UI/404.html'));

// Default to here when an invalid endpoint is entered
app.use('/', function (req, res) {
  return res.status(404).json({
    success: false,
    errors: [{ msg: 'This endpoint does not exist' }]
  });
});

// App use
app.use(function (errors, req, res) {
  var msg = errors.message || 'An error occured while processing your request, try again in a moment';
  res.status(errors.status || 500);
  res.json({
    errors: [{ msg: msg }]
  });
});

// Define The Port and Host
var PORT = process.env.PORT || 5000;

// Start the node server
app.listen(PORT, function () {
  console.log('Server Started Successfully On PORT: ' + PORT);
});

exports.default = app;