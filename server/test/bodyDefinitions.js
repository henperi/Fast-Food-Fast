import TestHelper from './testHelper';

/**
 * User Helper
 */
const userBodies = {
  userToken: undefined,
  adminToken: undefined,
  randomValidToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlY2JmYzQxMC1kMThiLTExZTgtYTAwMi1mMzFmZWRlNjg3ZDciLCJlbWFpbCI6Im5hbmN5QGdtYWlsLmNvbSIsImlhdCI6MTUzOTc3NDE0OSwiZXhwIjoxNTM5ODYwNTQ5fQ.Rrdom4AQxL6OfWJFMF6_jyuTfbTwr5lq77U67zmjah0',
  signUp: {
    emptyData: {},
    validData: {
      fullname: TestHelper.fullname,
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      passwordConfirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
    conflict_Data: {
      fullname: TestHelper.fullname,
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      passwordConfirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
    missingFullname: {
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      passwordConfirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
  },
  logIn: {
    emptyData: {},
    asAdmin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
    missingPassword: {
      email: TestHelper.email,
    },
    missingEmail: {
      password: TestHelper.password,
    },
    userNotExist: {
      email: 'randomUser@email.com',
      password: TestHelper.userPassword,
    },
    userExist: {
      email: TestHelper.existingEmail,
      password: TestHelper.userPassword,
    },
    wrongPassword: {
      email: TestHelper.userEmail,
      password: TestHelper.randomPassword,
    },
  },
  foods: {
    emptyData: {},
    wrongFoodId: TestHelper.randomId,
    existingFoodId: undefined,
    updateFoodName: { foodName: 'A New Food Name' },
    validData: {
      foodName: TestHelper.foodName,
      foodCat: TestHelper.foodCat,
      foodImg: TestHelper.foodImg,
      description: TestHelper.description,
      unitPrice: TestHelper.unitPrice,
      quantityAvailable: TestHelper.quantityAvailable,
    },
    conflict_Data: {
      foodName: TestHelper.foodName,
      foodCat: TestHelper.foodCat,
      foodImg: TestHelper.foodImg,
      description: TestHelper.description,
      unitPrice: TestHelper.unitPrice,
      quantityAvailable: TestHelper.quantityAvailable,
    },
    misisngItems: {
      foodCat: TestHelper.foodCat,
      foodImg: TestHelper.foodImg,
      unitPrice: TestHelper.unitPrice,
      quantityAvailable: TestHelper.quantityAvailable,
    },
  },
  orders: {
    emptyData: {},
    wrongOrderId: TestHelper.randomId,
    existingOrderId: undefined,
    updateOrderStatus: { OrderStatus: 2 },
    undefinedFoodId: {
      foodItems: [{ foodId: undefined, quantity: 2 }],
    },
    undefinedQuantity: {
      foodItems: [{ foodId: TestHelper.randomId, quantity: undefined }],
    },
    quantityIsNaN: {
      foodItems: [{ foodId: TestHelper.randomId, quantity: 'www' }],
    },
    foodIdNotExist: {
      foodItems: [{ foodId: TestHelper.randomId, quantity: 2 }],
    },
  },
};

export default userBodies;
