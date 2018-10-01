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
  async createUser(data) {
    const queryText = `INSERT INTO users(user_id, fullname, email, 
      password, mobile, address, created_at, updated_at)
      Values($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      randomId.v1(),
      data.fullname,
      data.email,
      data.hashPassword,
      data.mobile,
      data.address,
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
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };
      const response = { success: true, newUser };
      return response;
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * Find User By Email
   * @param {email} email
   * @returns {object} user object
   */
  async findByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await this.users.query(queryText, [email]);
      // console.log(rows[0]);
      return rows[0];
    } catch (err) {
      const response = { success: false, err };
      return response;
    }
  }

  /**
   * @param {randomId} id
   * @returns {object} user object
   */
  async findOne(userId) {
    const queryText = 'SELECT * FROM users WHERE userId = $1';
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
  // async findAll() {
  //   const queryText = 'SELECT * FROM users WHERE 1';
  //   try {
  //     const { rows } = await this.users.query(queryText);
  //     return rows[0];
  //   } catch (err) {
  //     const response = { success: false, err };
  //     return response;
  //   }
  // }
}

export default new User();
