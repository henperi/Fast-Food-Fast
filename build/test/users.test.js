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
 * Test the users route and endpoints
 */

describe('Users Route Tests', function () {
  describe('POST /auth/signup', function () {
    it('should return error of one or more fields required are empty', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send(_bodyDefinitions2.default.signUp.emptyData).end(function (err, result) {
        expect(result).to.have.status(400);
        expect(result.body).to.be.an('object');
        expect(result.body).to.be.have.property('errors');
        done();
      });
    });
    it('should return error if the fullname is undefined', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send(_bodyDefinitions2.default.signUp.missingFullname).end(function (err, result) {
        expect(result).to.have.status(400);
        expect(result.body).to.be.an('object');
        expect(result.body).to.be.have.property('errors');
        done();
      });
    });
    it('should Create/Signup a user and store it in the database if the data sent is valid', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send(_bodyDefinitions2.default.signUp.validData).end(function (err, result) {
        expect(result).to.have.status(201);
        expect(result.body).to.be.an('object');
        expect(result.body).to.have.property('success').to.equal(true);
        expect(result.body).to.have.property('success_msg').to.equal('Signup Successful');
        _bodyDefinitions2.default.logIn.userExist.email = result.body.createdUser.email;
        done();
      });
    });
    it('should return error if the data sent conflicts with an existing user', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send(_bodyDefinitions2.default.signUp.conflict_Data).end(function (err, result) {
        expect(result).to.have.status(409);
        expect(result.body).to.have.property('success').to.equal(false);
        expect(result.body).to.have.property('error_msg').to.equal('This email has already been taken');
        done();
      });
    });
  });

  describe('POST /auth/login', function () {
    it('should return error for logging in a user with invalid or missing data', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(_bodyDefinitions2.default.logIn.emptyData).end(function (err, result) {
        expect(result).to.have.status(400);
        expect(result.body).to.be.an('object');
        expect(result.body).to.have.property('errors');
        expect(result.body).to.have.property('success').to.equal(false);
        done();
      });
    });
    it('should not login a user if the email does not exist in the database', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(_bodyDefinitions2.default.logIn.userNotExist).end(function (err, result) {
        expect(result).to.have.status(404);
        expect(result.body).to.be.an('object');
        expect(result.body.error_msg).to.be.equal('email does not exist');
        done();
      });
    });
    it('should not login a user if the email exist but password is incorrect', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(_bodyDefinitions2.default.logIn.wrongPassword).end(function (err, result) {
        expect(result).to.have.status(404);
        expect(result.body).to.be.an('object');
        expect(result.body.error_msg).to.be.equal('password is wrong');
        done();
      });
    });
    it('should login a user if the email and password are valid in the database', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(_bodyDefinitions2.default.logIn.userExist).end(function (err, result) {
        _bodyDefinitions2.default.userToken = result.body.userToken;
        expect(result).to.have.status(200);
        expect(result.body).to.be.an('object');
        expect(result.body.success_msg).to.be.equal('signin successful');
        done();
      });
    });
  });

  describe('GET /users for Admins', function () {
    it('should login a valid admin and fetch his token', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(_bodyDefinitions2.default.logIn.asAdmin).end(function (err, result) {
        expect(result).to.have.status(200);
        expect(result.body).to.be.an('object');
        expect(result.body.success_msg).to.be.equal('signin successful');
        _bodyDefinitions2.default.adminToken = result.body.userToken;
        done();
      });
    });

    it('should fetch all the users from the database', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users/').set('x-access-token', _bodyDefinitions2.default.adminToken).end(function (err, result) {
        expect(result).to.have.status(200);
        expect(result.body).to.be.an('object');
        done();
      });
    });
  });
});