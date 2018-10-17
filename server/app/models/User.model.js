// import moment from 'moment';
import randomId from 'uuid';
import db from './Query.model';

class User {
  /**
   * class constructor
   */
  constructor() {
    this.users = db;
  }

  /**
   * Create user account
   * @param {*} data
   * @returns {object} user ubject
   */
  async createUser(req, res, data) {
    const queryText = `INSERT INTO users(user_id, fullname, email, 
      password, mobile, address, role, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      randomId.v1(),
      data.fullname,
      data.email,
      data.hashPassword,
      data.mobile,
      data.address,
      data.role,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await this.users.query(queryText, values);
      const newUser = {
        userId: rows[0].user_id,
        fullname: rows[0].fullname,
        email: rows[0].email,
        mobile: rows[0].mobile,
        address: rows[0].address,
        role: rows[0].role,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };
      const response = { success: true, newUser };
      return response;
    } catch (err) {
      return res.status(500).json({
        success: false,
        error_msg: 'An error occured while creating your account, try again in a moment',
      });
    }
  }

  /**
   * Find User By Email
   * @param {email} email
   * @returns {object} user object
   */
  async findByEmail(req, res, email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await this.users.query(queryText, [email]);
      return rows[0];
    } catch (err) {
      return res.status(500).json({
        success: false,
        error_msg: 'An error occured while attempting to validate you, try again',
      });
    }
  }

  /**
   * Find User By Email
   * @param {email} email
   * @returns {object} user object
   */
  async findById(req, res, userId) {
    const queryText = 'SELECT user_id, fullname, email, mobile, address, role FROM users WHERE user_id = $1';
    try {
      const { rows } = await this.users.query(queryText, [userId]);
      return rows[0];
    } catch (err) {
      return res.status(500).json({
        success: false,
        error_msg: 'An error occured while attempting to validate you, try again',
      });
    }
  }

  /**
   * @param {randomId} id
   * @returns {object} user object
   */
  async findOne(userId) {
    const queryText = 'SELECT user_id, fullname, email, address, mobile, created_at, updated_at FROM users WHERE userId = $1';
    try {
      const { rows } = await this.users.query(queryText, [userId]);
      return rows[0];
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   *
   */
  async findAll() {
    const queryText = 'SELECT user_id, fullname, email, address, mobile, created_at, updated_at FROM users';
    try {
      const { rows } = await this.users.query(queryText);
      return rows;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }
}

export default new User();
