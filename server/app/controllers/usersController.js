import User from '../models/User.model';
import helper from './helper';

const usersController = {
  /**
   *
   */
  async attemptSignup(req, res) {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;
    const { fullname } = req.body;
    const { mobile } = req.body;
    const { address } = req.body;
    const role = 'User';

    const findUser = await User.findByEmail(req, res, email);
    if (findUser) {
      return res.status(409).json({
        success: false,
        errors: [{ msg: 'This email has already been taken' }],
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
    const createdUser = await User.createUser(req, res, newUser);
    if (!createdUser.success) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Request was unsuccessful, try again in a moment' }],
      });
    }
    const userToken = helper.generateToken(createdUser.newUser.userId, createdUser.newUser.email);
    return res.status(201).json({
      success: true,
      responseMsg: 'Signup Successful',
      createdUser: createdUser.newUser,
      userToken,
    });
  },

  /**
   *
   */
  async attemptSignin(req, res) {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const findUser = await User.findByEmail(req, res, email);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'email does not exist' }],
      });
    }

    const checkPassword = helper.comparePassword(findUser.password, password);

    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'password is wrong' }],
      });
    }
    const userToken = helper.generateToken(findUser.user_id, findUser.email);

    findUser.userId = findUser.user_id;
    findUser.user_id = undefined;
    const { fullname, role, userId } = findUser;

    return res.status(200).json({
      success: true,
      responseMsg: 'signin successful',
      userToken,
      userData: { fullname, role, userId },
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

  async fetchProfile(req, res) {
    const { userId } = req.user;
    const findUser = await User.findById(req, res, userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Could not fetch profile, not found' }],
      });
    }
    findUser.userId = findUser.user_id;
    findUser.user_id = undefined;
    return res.status(200).json({
      success: true,
      responseMsg: 'Profile fetched successfully',
      profile: findUser,
    });
  },
};

export default usersController;
