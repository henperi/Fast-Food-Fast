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
        error_msg: 'Token is not provided',
      });
    }
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRETE);
      const queryText = 'SELECT * FROM users WHERE user_id = $1';

      const { rows } = await db.query(queryText, [decodedToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({
          success: false,
          error_msg: 'The token provided is either expired or invalid, please login and try again',
        });
      }
      req.user = { userId: decodedToken.userId };
      req.userRole = rows[0].role;
      // console.log('role', rows[0].role);
      return next();
    } catch (error) {
      return res.status(401).send({
        success: false,
        error_msg: 'Authentication failed',
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
    console.log('role', req.userRole);
    if (req.userRole !== 'User') {
      return res.status(401).send({
        success: false,
        error_msg: 'Unauthorized access, only users can access this endpoint',
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
    console.log('role', req.userRole);
    if (req.userRole !== 'Admin') {
      return res.status(401).send({
        success: false,
        error_msg: 'Unauthorized access, only admins can access this endpoint',
      });
    }
    return next();
  },
};

export default Auth;
