import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const envType = process.env.ENV_TYPE;

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
   * DB Query Helper
   * @param {string} queryText
   * @param {object} values
   * @returns {object || array}
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
