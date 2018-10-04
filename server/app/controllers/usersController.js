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

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({ errors });
    }
    const email = req.body.email.toLowerCase();
    const [password] = [req.body.password];
    const [fullname] = [req.body.fullname];
    const [mobile] = [req.body.mobile];
    const [address] = [req.body.address];
    const role = 'User';

    const findUser = await User.findByEmail(email);
    if (findUser) {
      return res.status(409).json({
        success: false,
        error_msg: 'This email has already been taken',
      });
    }

    const hashPassword = helper.hashPassword(password);
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
      return res.status(201).json({
        success: true,
        success_msg: 'Signup Successful',
        createdUser: createdUser.newUser,
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

    const findUser = await User.findByEmail(email);
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
    console.log(findUser);
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
