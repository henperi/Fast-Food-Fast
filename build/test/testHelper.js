'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestHelper = function TestHelper() {
  _classCallCheck(this, TestHelper);

  this.userToken = undefined;
  this.existingEmail = undefined;
  this.userEmail = _v2.default.v1() + '@gmail.com';
  this.badEmail = _v2.default.v1() + 'gmail.com';
  this.userPassword = 'userPassword';
  this.randomPassword = _v2.default.v1();
  this.fullname = 'Some Random Name Of Mr Man';
  this.randomId = _v2.default.v1();
  this.mobile = _v2.default.v1();
  this.address = _v2.default.v1();

  this.foodName = _v2.default.v1();
  this.foodCat = 'CookedFood';
  this.foodImg = 'uploads/img/' + this.foodName;
  this.description = 'lorem ipsum odolur vasch trek na uguler';
  this.unitPrice = 500;
  this.quantityAvailable = 80;
}

// setExistingEmail(email) {
//   this.existingEmail = email;
// }
;

exports.default = new TestHelper();