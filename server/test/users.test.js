import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import TestHelper from './testHelper';

chai.use(chaiHttp);

const [expect] = [chai.expect];

const newUser = {
  emptyData: {},
  validData: {
    fullname: TestHelper.fullname,
    email: TestHelper.userEmail,
    password: TestHelper.userPassword,
    password_confirmation: TestHelper.userPassword,
    mobile: TestHelper.mobile,
    address: TestHelper.address,
  },
  conflict_Data: {
    fullname: TestHelper.fullname,
    email: TestHelper.userEmail,
    password: TestHelper.userPassword,
    password_confirmation: TestHelper.userPassword,
    mobile: TestHelper.mobile,
    address: TestHelper.address,
  },
  missingFullname: {
    email: TestHelper.userEmail,
    password: TestHelper.userPassword,
    password_confirmation: TestHelper.userPassword,
    mobile: TestHelper.mobile,
    address: TestHelper.address,
  },
};
const loginUser = {
  emptyData: {},
  missingPassword: {
    email: TestHelper.email,
  },
  missingEmail: {
    password: TestHelper.password,
  },
  userNotExist: {
    email: 'randomUser@email.com',
    password: TestHelper.userPassword,
  },
  userExist: {
    email: TestHelper.existingEmail,
    password: TestHelper.userPassword,
  },
  wrongPassword: {
    email: TestHelper.userEmail,
    password: TestHelper.randomPassword,
  },
};

/**
 * Test the users route and endpoints
 */
describe('Users Route Tests', () => {
  describe('GET /users', () => {
    it('should fetch all the users from the database', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /auth/signup', () => {
    it('should not create a user if the data sent is invalid or empty', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(newUser.emptyData)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.be.have.property('errors');
          done();
        });
    });
    it('should not Create/Signup a user if the fullname is empty or missing', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(newUser.missingFullname)
        .end((err, result) => {
          console.log(result.body);
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.be.have.property('errors');
          done();
        });
    });
    it('should Create/Signup a user and store it in the database if the data sent is valid', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(newUser.validData)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body)
            .to.have.property('success')
            .to.equal(true);
          expect(result.body)
            .to.have.property('success_msg')
            .to.equal('Signup Successful');
          console.log('loginUser.userExist.email', loginUser.userExist.email);
          loginUser.userExist.email = result.body.createdUser.email;
          console.log('eetEmail', loginUser.userExist.email);
          done();
        });
    });
    it('should return error if the data sent conflicts with an existing user', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(newUser.conflict_Data)
        .end((err, result) => {
          expect(result).to.have.status(409);
          expect(result.body)
            .to.have.property('success')
            .to.equal(false);
          expect(result.body)
            .to.have.property('error_msg')
            .to.equal('This email has already been taken');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    
    it('should return error for logging in a user with invalid or missing data', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(loginUser.emptyData)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('errors');
          expect(result.body)
            .to.have.property('success')
            .to.equal(false);
          done();
        });
    });
    it('should not login a user if the email does not exist in the database', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(loginUser.userNotExist)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('email does not exist');
          done();
        });
    });
    it('should not login a user if the email exist but password is incorrect', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(loginUser.wrongPassword)
        .end((err, result) => {
          console.log('wrongPass', result.body)
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('password is wrong');          done();
        });
    });
    it('should login a user if the email and password are valid in the database', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(loginUser.userExist)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('signin successful');
          done();
        });
    });
  });
});
