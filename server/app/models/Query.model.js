import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const envType = process.env.ENV_TYPE;
const databaseURL = envType === 'DEV' ? process.env.LOCAL_DATABASE_URL : process.env.REMOTE_DATABASE_URL;

const pool = new Pool({
  connectionString: databaseURL,
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
