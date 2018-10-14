import User from '../models/User.model';
import helper from './helper';

const usersController = {
  /**
   *
   */
  async attemptSignup(req, res) {
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
    const email = req.body.email.toLowerCase();
    const { password } = req.body;
    const { fullname } = req.body;
    const { mobile } = req.body;
    const { address } = req.body;
    const role = 'User';

    errors = [];
    let msg;

    if (fullname.length < 3) {
      msg = { msg: 'Your Fullname must be greater than 2 characters' };
      errors.push(msg);
    }

    if (password.length < 5) {
      msg = { msg: 'Your Password must be at least 5 characters in length' };
      errors.push(msg);
    }

    if (fullname.length > 35) {
      msg = { msg: 'Oops, your name is too long, use a shorter name' };
      errors.push(msg);
    }

    if (address.length > 50) {
      msg = { msg: 'Oops, your address is too long, use a shorter version of your address' };
      errors.push(msg);
    }

    if (mobile.length !== 11) {
      msg = { msg: 'Oops, your mobile number must be 11 digits only' };
      errors.push(msg);
    }
    if (!Number.isInteger(Number(mobile))) {
      msg = { msg: "Your mobile number can't contain characters, only numbers are allowed" };
      errors.push(msg);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const findUser = await User.findByEmail(req, res, email);
    if (findUser) {
      msg = { msg: 'This email has already been taken' };
      errors.push(msg);

      return res.status(409).json({
        success: false,
        errors,
      });
    }

    const hashPassword = helper.hashPassword(password);
    req.body.password = hashPassword;
    req.body.role = role;

    const newUser = {
      email,
      hashPassword,
      fullname,
      mobile,
      address,
      role,
    };
    const createdUser = await User.createUser(newUser);
    if (createdUser.success) {
      const userToken = helper.generateToken(createdUser.newUser.userId, createdUser.newUser.email);
      return res.status(201).json({
        success: true,
        success_msg: 'Signup Successful',
        createdUser: createdUser.newUser,
        userToken,
      });
    }

    return res.status(500).json({
      success: false,
      success_msg: 'Error occured try again',
    });
  },

  /**
   *
   */
  async attemptSignin(req, res) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ success: false, errors });
    }
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const findUser = await User.findByEmail(req, res, email);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        error_msg: 'email does not exist',
      });
    }

    const checkPassword = helper.comparePassword(findUser.password, password);

    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        error_msg: 'password is wrong',
      });
    }
    // console.log(findUser);
    const userToken = helper.generateToken(findUser.user_id, findUser.email);
    return res.status(200).json({
      success: true,
      success_msg: 'signin successful',
      userToken,
    });
  },

  /**
   *
   */
  async fetchAllUsers(req, res) {
    const fetchUsers = await User.findAll();

    return res.status(200).json({
      success: true,
      foundUser: fetchUsers,
    });
  },
};

export default usersController;
