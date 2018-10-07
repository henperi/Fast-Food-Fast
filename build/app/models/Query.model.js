'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var envType = process.env.ENV_TYPE;

var databaseURL = void 0;
switch (envType) {
  case 'DEV':
    databaseURL = process.env.LOCAL_DATABASE_URL;
    break;

  case 'PROD':
    databaseURL = process.env.REMOTE_DATABASE_URL;
    break;

  case 'TEST':
    databaseURL = process.env.TEST_DATABASE_URL;
    break;

  default:
    databaseURL = process.env.TEST_DATABASE_URL;
    break;
}

var pool = new _pg.Pool({
  connectionString: databaseURL
});

exports.default = {
  /**
   * DB Query Helper
   * @param {string} queryText
   * @param {object} values
   * @returns {object || array}
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};