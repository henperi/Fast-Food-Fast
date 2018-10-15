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
    req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);
    req.checkBody('mobile', 'Mobile is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    const { password } = req.body;
    const { fullname } = req.body;
    const { address } = req.body;

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

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ success: false, errors });
    }

    const submittedFoodItems = req.body.foodItems;
    for (let k = 0; k < submittedFoodItems.length; k += 1) {
      const { foodId } = submittedFoodItems[k];
      const { quantity } = submittedFoodItems[k];

      if (!foodId) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: 'The foodId is a required field in foodItems array' }],
          guides: 'Please see doccumentation, for help',
        });
      }

      if (!quantity) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: 'The quantity is a required field in foodItems array' }],
          guides: 'Please see doccumentation, for help',
        });
      }

      if (!Number.isInteger(quantity)) {
        return res.status(400).json({
          success: false,
          errors: [
            { msg: 'One or more of the food item quantities supplied is not a valid number' },
          ],
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
    req.checkBody('orderStatus', 'order status is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    const { orderStatus } = req.body;
    if (!Number.isInteger(orderStatus) || orderStatus > 5) {
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

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
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
