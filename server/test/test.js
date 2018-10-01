import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const PORT = process.env.PORT || 5000;
console.log(PORT);
chai.use(chaiHttp);

const [expect] = [chai.expect];

/**
 * Test the orders route
 */
describe('Orders Route Tests', () => {
  describe('GET /orders', () => {
    it('should fetch all the orders stored in memory', (done) => {
      chai
        .request(server)
        .get('/api/v1/orders')
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /orders', () => {
    it('should not create an order if foodId or quantity is missing', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088' }],
      };

      chai
        .request(server)
        .post('/api/v1/orders')
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.reasons).to.be.equal(
            'Submitted foodItem does not have a valid format. foodId param or quantity param is not defined',
          );
          expect(result.body.message).to.be.equal('Order not created');
          done();
        });
    });

    it('should create an order and store it in memory', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088', quantity: 2 }],
      };
      chai
        .request(server)
        .post('/api/v1/orders')
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Order created');
          done();
        });
    });
  });

  describe('GET /orders/:orderId', () => {
    it('should not fetch an order when the ordeId is not found in the list of existing orderIds', (done) => {
      chai
        .request(server)
        .get('/api/v1/orders/1')
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          done();
        });
    });

    it('should fetch an order when the orderId provided is found in the list of existing orderIds', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088', quantity: 2 }],
      };
      chai
        .request(server)
        .post('/api/v1/orders')
        .send(newOrder)
        .end((err, result) => {
          chai
            .request(`http://localhost:${PORT}/api/v1/orders`)
            .get(`/${result.body.createdOrder.orderId}`)
            .end((err2, newResult) => {
              expect(newResult).to.have.status(201);
              expect(newResult.body.message).to.be.equal('Order found');
            });
          done();
        });
    });
  });

  describe('PUT /orders/:orderId', () => {
    it('it should not update the status of one of the orders when the order status param is not provided', (done) => {
      chai
        .request(server)
        .put('/api/v1/orders/1')
        .end((err, result) => {
          // console.log(result.body.errors[0].msg);
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.errors[0].msg).to.be.equal('order status is required');
          expect(result.body).to.have.property('errors');
          done();
        });
    });
  });
});

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
        password: 'henry5g@gmail,com',
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


/**
 * Test the foods route
 */
describe('Foods Route Tests', () => {
  it('should fetch all the foods stored in database', (done) => {
    chai
      .request(server)
      .get('/api/v1/foods')
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body.message).to.be.equal('Food(s) found');
        expect(result.body).to.be.an('object');
        done();
      });
  });

  describe('GET /foods/:foodId', () => {
    it('should not fetch a food when the foodId is not found in the list of existing foodIds', (done) => {
      chai
        .request(server)
        .get('/api/v1/foods/1')
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Food not found');
          done();
        });
    });

    it('should fetch a food when the foodId provided is found in the list of existing foodIds', (done) => {
      chai
        .request(server)
        .get('/api/v1/foods/4801ac7c-4f19-4299-b709-aab25de4f088')
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body.message).to.be.equal('Food found');
          done();
        });
    });
  });

  describe('POST /foods', () => {
    it('should not create a food if any of the required parameters are missing', (done) => {
      const newFood = {
        foodName: 'Chiken'
      };
      chai
        .request(server)
        .post('/api/v1/foods')
        .send(newFood)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          done();
        });
    });

    it('should create a food and store it in database', (done) => {
      const newFood = {
        foodName: 'food',
        foodCat: 'food',
        description: 'food',
        coverImg: 'food',
        price: 'food',
        quantityAvailable: 'food',
      };
      chai
        .request(server)
        .post('/api/v1/foods')
        .send(newFood)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Food created');
          done();
        });
    });
  });

  describe('PUT /foods/:foodId', () => {
    it('it should not update the status of a food when the foodname is required', (done) => {
      chai
        .request(server)
        .put('/api/v1/foods/4801ac7c-4f19-4299-b709-aab25de4f088')
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.errors[0].msg).to.be.equal('Food name is required');
          expect(result.body).to.have.property('errors');
          done();
        });
    });
    
    it('it should update the status of a food when the foodname is provided', (done) => {
      const food = {
        foodName: 'Henry Pere',
      };
      chai
        .request(server)
        .put('/api/v1/foods/4801ac7c-4f19-4299-b709-aab25de4f088')
        .send(food)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });
});
