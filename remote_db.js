const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log('REMOTE_DATABASE_URL: ', process.env.REMOTE_DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.REMOTE_DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db', process.env.REMOTE_DATABASE_URL);
});

/**
 * Create Tables
 */
const createOrdersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      orders(
        order_id UUID PRIMARY KEY,
        ordered_by VARCHAR(128) NOT NULL,
        ordered_items VARCHAR(128) NOT NULL,
        Order_status VARCHAR(128) NOT NULL,
        Order_status int(128) NOT NULL,
        delivery_status VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log('res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('err:', err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropOdersTables = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createOrdersTables,
  dropOdersTables,
};

require('make-runnable');
