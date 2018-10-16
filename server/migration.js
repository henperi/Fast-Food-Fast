const { Pool } = require('pg');
const dotenv = require('dotenv');
const randomId = require('uuid');
const bcrypt = require('bcryptjs');
// const helper = require('./app/controllers/helper');

require('babel-polyfill');

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

pool.on('connect', () => {
  console.log(`connected to the ${envType} database`, databaseURL);
});

/**
 * Create Tables
 */

const createOrdersTable = () => {
  console.log('db', databaseURL);
  const queryText = `CREATE TABLE IF NOT EXISTS
      orders(
        order_id UUID PRIMARY KEY,
        ordered_by VARCHAR(128) NOT NULL,
        ordered_items VARCHAR(128) NOT NULL,
        total_mount NUMERIC(11, 2) NOT NULL,
        Order_status VARCHAR(128) NOT NULL,
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

const createOrderedItemsTable = () => {
  console.log('db', databaseURL);
  const queryText = `CREATE TABLE IF NOT EXISTS
      ordered_items(
        item_id UUID PRIMARY KEY,
        order_id VARCHAR(128) NOT NULL,
        user_id VARCHAR(128) NOT NULL,
        food_id VARCHAR(128) NOT NULL,
        food_name VARCHAR(128) NOT NULL,
        food_img VARCHAR(128) NOT NULL,
        unit_price VARCHAR(128) NOT NULL,
        quantity NUMERIC(11, 2) NOT NULL,
        total NUMERIC(11, 2) NOT NULL,
        itemStatus VARCHAR(128) NOT NULL,
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

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        user_id UUID PRIMARY KEY,
        fullname VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        mobile VARCHAR(128) NOT NULL,
        address TEXT NOT NULL,
        role TEXT NOT NULL,
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

const insertAdmin = () => {
  // const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  // const password = hashPassword(process.env.ADMIN_PASSWORD);

  // const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8));
  const queryText = `INSERT INTO users(user_id, fullname, email, 
    password, mobile, address, role, created_at, updated_at)
    Values($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
  const values = [
    randomId.v1(),
    'Henry Izontimi',
    process.env.ADMIN_EMAIL,
    '$2a$08$mpwIA1Yk/TpXntTOedpDGeln9qUKcLfA/5CdyOsSh02ZckYnqn8Zq',
    '08067272175',
    'data.address',
    'Admin',
    new Date(),
    new Date(),
  ];
  pool
    .query(queryText, values)
    .then((res) => {
      console.log('res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('err:', err);
      pool.end();
    });
};

const createFoodsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      foods(
        food_id UUID PRIMARY KEY,
        food_name VARCHAR(128) NOT NULL,
        food_cat VARCHAR(128) NOT NULL,
        food_img VARCHAR(128) NOT NULL,
        description TEXT NOT NULL,
        unit_price NUMERIC(11, 2) NOT NULL,
        quantity_available NUMERIC(11) NOT NULL,
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
const dropOrdersTable = () => {
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

const dropOrderedItemsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS ordered_items';
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

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
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

const dropFoodsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS foods';
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

async function createAllTables() {
  await createUsersTable();
  await createOrderedItemsTable();
  await createOrdersTable();
  await createFoodsTable();
}

async function dropAllTables() {
  await dropFoodsTable();
  await dropOrderedItemsTable();
  await dropOrdersTable();
  await dropUsersTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  createOrdersTable,
  createUsersTable,
  createFoodsTable,
  dropAllTables,
  dropUsersTable,
  dropOrdersTable,
  dropFoodsTable,
  insertAdmin,
};

require('make-runnable');
