import jwt from 'jsonwebtoken';
import db from '../models/Query.model';

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async validateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        success: false,
        error_msg: 'Authorization failed, Please log in to your account to continue',
      });
    }
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRETE);
      const queryText = 'SELECT * FROM users WHERE user_id = $1';

      const { rows } = await db.query(queryText, [decodedToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({
          success: false,
          error_msg:
            'Authorization failed, we could not verify your account, please login and try again',
        });
      }
      req.user = { userId: decodedToken.userId };
      req.userRole = rows[0].role;
      // console.log('role', rows[0].role);
      return next();
    } catch (error) {
      return res.status(401).send({
        success: false,
        error_msg:
          'An error occured while attempting to authenticating you, please try to login again',
      });
    }
  },

  /**
   * Validate Admin Role
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async isUser(req, res, next) {
    // console.log('role', req.userRole);
    if (req.userRole !== 'User') {
      return res.status(401).send({
        success: false,
        error_msg: 'Unauthorized access, only users are allowed to do this',
      });
    }
    return next();
  },

  /**
   * Validate Admin Role
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async isAdmin(req, res, next) {
    // console.log('role', req.userRole);
    if (req.userRole !== 'Admin') {
      return res.status(401).send({
        success: false,
        error_msg: 'Unauthorized access, only admins are allowed to do this',
      });
    }
    return next();
  },
};

export default Auth;
