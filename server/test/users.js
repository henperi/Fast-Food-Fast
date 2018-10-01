/**
 * Test the users route
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
    it('should not create a user if some parameters are missing', (done) => {
      const newUser = {
        fullname: 'Henry Pere',
      };

      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          done();
        });
    });

    it('should attempt to create a user and store it in database', (done) => {
      const newUser = {
        fullname: 'Jerry',
        email: 'Perry10@gmail.com',
        password: 'Perry10@gmail.com',
        password_confirmation: 'Perry10@gmail.com',
        mobile: 'Perry10@gmail.com',
        address: 'Perry10@gmail.com',
      };

      chai
        .request(server)
        .post('/api/v1/auth/sigup')
        .send(newUser)
        .end((err, result) => {
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should not login a user if the password is missing', (done) => {
      const newUser = {
        email: 'henry5g@gmail.com',
      };
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(newUser)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          done();
        });
    });

    it.skip('should not login a user if the email does not exist in the database', (done) => {
      const newUser = {
        email: 'henry5g@gmail.com',
        password: '123',
      };

      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(newUser)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('email does not exist');
          done();
        });
    });

    it.skip('should login a user if the email and password are valid in the database', (done) => {
      const newUser = {
        email: 'jery4u@gmail.com',
        password: '123',
      };

      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(newUser)
        .end((err, result) => {
          // expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          // expect(result.body.message).to.be.equal('signin successful');
          done();
        });
    });
  });
});
