// import User from '../models/User.model';
// import helper from './helper';

// eslint-ignore-below
const validationHelper = {
  /**
   * Validate signup
   */
  signup(req, res, next) {
    req.checkBody('fullname', 'fullname is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);
    req.checkBody('mobile', 'Mobile is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    const { password, fullname, address } = req.body;

    errors = [];
    let msg;

    if (fullname.length < 3) {
      msg = { msg: 'Your Fullname must be greater than 2 characters' };
      errors.push(msg);
    }
    if (fullname.length > 35) {
      msg = { msg: 'Oops, your name is too long, use a shorter name' };
      errors.push(msg);
    }
    if (password.length < 5) {
      msg = { msg: 'Your Password must be at least 5 characters in length' };
      errors.push(msg);
    }
    if (address.length > 50) {
      msg = { msg: 'Oops, your address is too long, use a shorter version of your address' };
      errors.push(msg);
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  },

  /**
   * Validate signin
   */
  signin(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    return next();
  },

  /**
   * Validate makeAnOrder method in ordersController
   */
  makeAnOrder(req, res, next) {
    req.checkBody('foodItems', 'Food Item(s) are required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    errors = [];
    let msg;

    const submittedFoodItems = req.body.foodItems;
    for (let k = 0; k < submittedFoodItems.length; k += 1) {
      const { foodId, quantity } = submittedFoodItems[k];
      if (!foodId) {
        msg = { msg: 'Selected food item(s) must have a corresponding foodId' };
        errors.push(msg);
      }
      if (!quantity) {
        msg = { msg: 'Please input the quantity for the food item(s) selected' };
        errors.push(msg);
      }
      if (!Number.isInteger(quantity)) {
        msg = { msg: 'Ensure the quantity typed is a valid number' };
        errors.push(msg);
      }
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors,
          guides: 'Please see doccumentation, for help',
        });
      }
    }
    return next();
  },

  /**
   * Validate updateOrderStatus method in ordersController
   */
  updateOrderStatus(req, res, next) {
    // console.log(req.body);
    req.checkBody('orderStatus', 'order status is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    const { orderStatus } = req.body;
    if (!Number.isInteger(Number(orderStatus)) || orderStatus > 4) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'The order status sent is not valid' }],
      });
    }
    return next();
  },

  /**
   * Validate createNewFood in foodsController
   */
  createNewFood(req, res, next) {
    req.checkBody('foodName', 'Name of food is required').notEmpty();
    req.checkBody('foodCat', 'Food Category is required').notEmpty();
    req.checkBody('foodImg', 'Cover image is required').notEmpty();
    req.checkBody('description', 'Food Description is required').notEmpty();
    req.checkBody('unitPrice', 'Food price is not valid').notEmpty();
    req.checkBody('quantityAvailable', 'Quantity available is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }

    const { unitPrice, quantityAvailable } = req.body;
    errors = [];
    console.log(unitPrice, quantityAvailable);
    if (!Number.isInteger(Number(unitPrice))) {
      const msg = { msg: 'Food price must be a valid number' };
      errors.push(msg);
    }
    if (unitPrice < 1) {
      const msg = { msg: 'Oops, Food price can not be less than 1' };
      errors.push(msg);
    }

    if (!Number.isInteger(Number(quantityAvailable))) {
      const msg = { msg: 'Available quantity must be a valid number' };
      errors.push(msg);
    }
    if (quantityAvailable < 1) {
      const msg = { msg: 'Oops, Available quantity can not be less than 1' };
      errors.push(msg);
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  },

  /**
   * validate updateFood method in foodsController
   */
  updateFood(req, res, next) {
    req.checkBody('foodName', 'Food name is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    return next();
  },
};

export default validationHelper;
