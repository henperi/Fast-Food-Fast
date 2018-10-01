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
  async verifyUserToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRETE);
      const queryText = 'SELECT * FROM users WHERE user_id = $1';

      const { rows } = await db.query(queryText, [decodedToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { userId: decodedToken.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyAdminToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRETE);
      const queryText = 'SELECT * FROM admins WHERE admin_id = $1';

      const { rows } = await db.query(queryText, [decodedToken.adminId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { adminId: decodedToken.adminId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Auth;
