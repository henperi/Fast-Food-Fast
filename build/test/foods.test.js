'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _bodyDefinitions = require('./bodyDefinitions');

var _bodyDefinitions2 = _interopRequireDefault(_bodyDefinitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var _ref = [_chai2.default.expect],
    expect = _ref[0];

/**
 * Test the foods route
 */

describe('Foods Route Tests', function () {
  describe('GET /menu', function () {
    it('should fetch all the foods stored in database', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/menu').end(function (err, result) {
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('success').to.equal(true);
        expect(result.body).to.have.property('success_msg').to.equal('returning ' + result.body.totalFoods + ' availabel food(s)');
        expect(result.body).to.have.property('foodsInMenu');
        done();
      });
    });
  });

  describe('POST /menu', function () {
    it('should return errors if any of the required parameters are missing', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/menu').set('x-access-token', _bodyDefinitions2.default.adminToken).send(_bodyDefinitions2.default.foods.misisngItems).end(function (err, result) {
        expect(result).to.have.status(400);
        expect(result.body).to.be.an('object');
        expect(result.body).to.have.property('errors');
        done();
      });
    });

    it('should create a food and store it in database', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/menu').set('x-access-token', _bodyDefinitions2.default.adminToken).send(_bodyDefinitions2.default.foods.validData).end(function (err, result) {
        expect(result).to.have.status(201);
        console.log('RB:::', result.body.createdFood.foodId);
        expect(result.body).to.be.an('object');
        expect(result.body.success_msg).to.be.equal('Food item created and added to menu');
        _bodyDefinitions2.default.foods.existingFoodId = result.body.createdFood.foodId;
        done();
      });
    });
  });

  describe('GET /menu/:foodId', function () {
    it('should not fetch a food when the foodId is not found in the list of existing foodIds', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/menu/1').end(function (err, result) {
        expect(result).to.have.status(404);
        expect(result.body).to.be.an('object');
        expect(result.body.message).to.be.equal('Food not found');
        done();
      });
    });

    it('should fetch a food when the foodId provided is found in the list of existing foodIds', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/menu/' + _bodyDefinitions2.default.foods.existingFoodId).end(function (err, result) {
        expect(result).to.have.status(200);
        expect(result.body.message).to.be.equal('Food found');
        done();
      });
    });
  });

  describe('PUT /menu/:foodId', function () {
    it('it should return error when the foodname is required', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/menu/' + _bodyDefinitions2.default.foods.existingFoodId).set('x-access-token', _bodyDefinitions2.default.adminToken).end(function (err, result) {
        expect(result).to.have.status(400);
        expect(result.body).to.be.an('object');
        expect(result.body.errors[0].msg).to.be.equal('Food name is required');
        expect(result.body).to.have.property('errors');
        done();
      });
    });

    it('it should return error when the foodId provided is wrong', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/menu/' + _bodyDefinitions2.default.foods.wrongFoodId).set('x-access-token', _bodyDefinitions2.default.adminToken).send(_bodyDefinitions2.default.foods.updateFoodName).end(function (err, result) {
        expect(result).to.have.status(409);
        expect(result.body).to.be.an('object');
        expect(result.body).to.have.property('success').to.equal(false);
        expect(result.body.error_msg).to.be.equal('This particular food can not be updated as its id does not exist');
        done();
      });
    });

    it('it should update the status of a food when the foodname is provided', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/menu/' + _bodyDefinitions2.default.foods.existingFoodId).set('x-access-token', _bodyDefinitions2.default.adminToken).send(_bodyDefinitions2.default.foods.updateFoodName).end(function (err, result) {
        expect(result).to.have.status(200);
        expect(result.body).to.be.an('object');
        done();
      });
    });
  });
});