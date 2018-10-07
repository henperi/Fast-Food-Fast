'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');
var randomId = require('uuid');
var bcrypt = require('bcryptjs');

dotenv.config();

var envType = process.env.ENV_TYPE;

var databaseURL = void 0;
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

var pool = new Pool({
  connectionString: databaseURL
});

pool.on('connect', function () {
  console.log('connected to the ' + envType + ' database', databaseURL);
});

/**
 * Create Tables
 */

var createOrdersTable = function createOrdersTable() {
  console.log('db', databaseURL);
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      orders(\n        order_id UUID PRIMARY KEY,\n        ordered_by VARCHAR(128) NOT NULL,\n        ordered_items VARCHAR(128) NOT NULL,\n        total_mount NUMERIC(11, 2) NOT NULL,\n        Order_status VARCHAR(128) NOT NULL,\n        delivery_status VARCHAR(128) NOT NULL,\n        created_at TIMESTAMP,\n        updated_at TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log('res:', res);
    pool.end();
  }).catch(function (err) {
    console.log('err:', err);
    pool.end();
  });
};

var createOrderedItemsTable = function createOrderedItemsTable() {
  console.log('db', databaseURL);
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      ordered_items(\n        item_id UUID PRIMARY KEY,\n        order_id VARCHAR(128) NOT NULL,\n        user_id VARCHAR(128) NOT NULL,\n        food_id VARCHAR(128) NOT NULL,\n        food_name VARCHAR(128) NOT NULL,\n        food_img VARCHAR(128) NOT NULL,\n        unit_price VARCHAR(128) NOT NULL,\n        quantity NUMERIC(11, 2) NOT NULL,\n        total NUMERIC(11, 2) NOT NULL,\n        itemStatus VARCHAR(128) NOT NULL,\n        created_at TIMESTAMP,\n        updated_at TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log('res:', res);
    pool.end();
  }).catch(function (err) {
    console.log('err:', err);
    pool.end();
  });
};

var createUsersTable = function createUsersTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        user_id UUID PRIMARY KEY,\n        fullname VARCHAR(128) NOT NULL,\n        email VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        mobile VARCHAR(128) NOT NULL,\n        address TEXT NOT NULL,\n        role TEXT NOT NULL,\n        created_at TIMESTAMP,\n        updated_at TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log('res:', res);
    pool.end();
  }).catch(function (err) {
    console.log('err:', err);
    pool.end();
  });
};

var insertAdmin = function insertAdmin() {
  var password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8));
  var queryText = 'INSERT INTO users(user_id, fullname, email, \n    password, mobile, address, role, created_at, updated_at)\n    Values($1, $2, $3, $4, $5, $6, $7, $8, $9)\n    returning *';
  var values = [randomId.v1(), 'Henry Izontimi', process.env.ADMIN_EMAIL, password, '08067272175', 'data.address', 'Admin', new Date(), new Date()];
  pool.query(queryText, values).then(function (res) {
    console.log('res:', res);
    pool.end();
  }).catch(function (err) {
    console.log('err:', err);
    pool.end();
  });
};

var createFoodsTable = function createFoodsTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      foods(\n        food_id UUID PRIMARY KEY,\n        food_name VARCHAR(128) NOT NULL,\n        food_cat VARCHAR(128) NOT NULL,\n        food_img VARCHAR(128) NOT NULL,\n        description TEXT NOT NULL,\n        unit_price NUMERIC(11, 2) NOT NULL,\n        quantity_available NUMERIC(11) NOT NULL,\n        created_at TIMESTAMP,\n        updated_at TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log('res:', res);
    pool.end();
  }).catch(function (err) {
    console.log('err:', err);
    pool.end();
  });
};

/**
 * Drop Tables
 */
var dropOrdersTable = function dropOrdersTable() {
  var queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropOrderedItemsTable = function dropOrderedItemsTable() {
  var queryText = 'DROP TABLE IF EXISTS ordered_items';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropUsersTable = function dropUsersTable() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropFoodsTable = function dropFoodsTable() {
  var queryText = 'DROP TABLE IF EXISTS foods';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var createAllTables = function createAllTables() {
  createUsersTable();
  createOrderedItemsTable();
  createOrdersTable();
  createFoodsTable();
};

var dropAllTables = function dropAllTables() {
  dropFoodsTable();
  dropOrderedItemsTable();
  dropOrdersTable();
  dropUsersTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables: createAllTables,
  createOrdersTable: createOrdersTable,
  createUsersTable: createUsersTable,
  createFoodsTable: createFoodsTable,
  dropAllTables: dropAllTables,
  dropUsersTable: dropUsersTable,
  dropOrdersTable: dropOrdersTable,
  dropFoodsTable: dropFoodsTable,
  insertAdmin: insertAdmin
};

require('make-runnable');