'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _testHelper = require('./testHelper');

var _testHelper2 = _interopRequireDefault(_testHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Helper
 */

var userBodies = {
  userToken: undefined,
  adminToken: undefined,
  signUp: {
    emptyData: {},
    validData: {
      fullname: _testHelper2.default.fullname,
      email: _testHelper2.default.userEmail,
      password: _testHelper2.default.userPassword,
      password_confirmation: _testHelper2.default.userPassword,
      mobile: _testHelper2.default.mobile,
      address: _testHelper2.default.address
    },
    conflict_Data: {
      fullname: _testHelper2.default.fullname,
      email: _testHelper2.default.userEmail,
      password: _testHelper2.default.userPassword,
      password_confirmation: _testHelper2.default.userPassword,
      mobile: _testHelper2.default.mobile,
      address: _testHelper2.default.address
    },
    missingFullname: {
      email: _testHelper2.default.userEmail,
      password: _testHelper2.default.userPassword,
      password_confirmation: _testHelper2.default.userPassword,
      mobile: _testHelper2.default.mobile,
      address: _testHelper2.default.address
    }
  },
  logIn: {
    emptyData: {},
    asAdmin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    },
    missingPassword: {
      email: _testHelper2.default.email
    },
    missingEmail: {
      password: _testHelper2.default.password
    },
    userNotExist: {
      email: 'randomUser@email.com',
      password: _testHelper2.default.userPassword
    },
    userExist: {
      email: _testHelper2.default.existingEmail,
      password: _testHelper2.default.userPassword
    },
    wrongPassword: {
      email: _testHelper2.default.userEmail,
      password: _testHelper2.default.randomPassword
    }
  },
  foods: {
    emptyData: {},
    wrongFoodId: _testHelper2.default.randomId,
    existingFoodId: undefined,
    updateFoodName: { foodName: 'A New Food Name' },
    validData: {
      foodName: _testHelper2.default.foodName,
      foodCat: _testHelper2.default.foodCat,
      foodImg: _testHelper2.default.foodImg,
      description: _testHelper2.default.description,
      unitPrice: _testHelper2.default.unitPrice,
      quantityAvailable: _testHelper2.default.quantityAvailable
    },
    conflict_Data: {
      foodName: _testHelper2.default.foodName,
      foodCat: _testHelper2.default.foodCat,
      foodImg: _testHelper2.default.foodImg,
      description: _testHelper2.default.description,
      unitPrice: _testHelper2.default.unitPrice,
      quantityAvailable: _testHelper2.default.quantityAvailable
    },
    misisngItems: {
      foodCat: _testHelper2.default.foodCat,
      foodImg: _testHelper2.default.foodImg,
      unitPrice: _testHelper2.default.unitPrice,
      quantityAvailable: _testHelper2.default.quantityAvailable
    }
  },
  orders: {
    emptyData: {},
    wrongOrderId: _testHelper2.default.randomId,
    existingOrderId: undefined,
    updateOrderStatus: { OrderStatus: 2 },
    undefinedFoodId: {
      foodItems: [{ foodId: undefined, quantity: 2 }]
    },
    undefinedQuantity: {
      foodItems: [{ foodId: _testHelper2.default.randomId, quantity: undefined }]
    },
    quantityIsNaN: {
      foodItems: [{ foodId: _testHelper2.default.randomId, quantity: 'www' }]
    },
    foodIdNotExist: {
      foodItems: [{ foodId: _testHelper2.default.randomId, quantity: 2 }]
    }
  }
};

exports.default = userBodies;