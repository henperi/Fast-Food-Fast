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

var _orders = require('./routes/api/v1/orders');

var _orders2 = _interopRequireDefault(_orders);

var _users = require('./routes/api/v1/users');

var _users2 = _interopRequireDefault(_users);

var _foods = require('./routes/api/v1/foods');

var _foods2 = _interopRequireDefault(_foods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Some neccessary middleware


// Routes =========================================
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

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

app.use('/api/v1/auth', _users2.default);
app.use('/api/v1/users', _users2.default);
app.use('/api/v1/orders', _orders2.default);
app.use('/api/v1/menu', _foods2.default);

app.use('', function (req, res) {
  return res.status(404).json({
    message: 'This endpoint does not exist. Read more about the api endpoints below',
    endpoints: [{
      type: 'GET',
      uri: 'api/v1/orders/',
      desired_parameters: null,
      description: 'This endpoint fetches all users orders stored in memory'
    }, {
      type: 'GET',
      uri: 'api/v1/orders/:orderId',
      desired_parameters: null,
      description: 'This endpoint uses the desired parameters to fetch a specific order stored in memory'
    }, {
      type: 'PUT',
      uri: 'api/v1/orders/orderId',
      desired_parameters: [{ orderStatus: { type: 'String' } }],
      description: 'This endpoint uses the desired parameters to update the order status of a specific order stored in memory'
    }]
  });
});

// Define The Port and Host
var PORT = process.env.PORT || 5000;

// Start the node server
app.listen(PORT, function () {
  console.log('Server Started Successfully On PORT: ' + PORT);
});

exports.default = app;