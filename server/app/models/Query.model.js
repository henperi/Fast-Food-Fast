import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const envType = process.env.ENV_TYPE;
// const databaseURL = envType === 'DEV'
// ? process.env.LOCAL_DATABASE_URL : envType === 'TEST'
// ? process.env.TEST_DATABASE_URL : process.env.REMOTE_DATABASE_URL;
let databaseURL;

switch (envType) {
  case 'DEV':
    databaseURL = process.env.LOCAL_DATABASE_URL;
    break;

  case 'PROD':
    databaseURL = process.env.REMOTE_DATABASE_URL;
    break;

  case 'TEST':
    databaseURL = process.env.TEST_DATABASE_URL;
    break;

  default:
    databaseURL = process.env.TEST_DATABASE_URL;
    break;
}

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
