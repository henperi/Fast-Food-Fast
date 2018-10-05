import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import bodyHelper from './bodyDefinitions';

chai.use(chaiHttp);

const [expect] = [chai.expect];

/**
 * Test the orders route
 */
describe('Orders Route Tests', () => {
  describe('GET /orders', () => {
    it.skip('should fetch all the orders stored in memory', (done) => {
      chai
        .request(server)
        .get('/api/v1/orders')
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          expect(result.body)
            .to.have.property('success')
            .to.equal(true);
          done();
        });
    });
  });

  describe('POST /orders', () => {
    it('should return a status of 400 when food items array is not sent', (done) => {
      const newOrder = {};
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    it('should not create an order if foodId or quantity is missing', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088' }],
      };

      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.error_msg).to.be.equal('food quantities must be valid numbers');
          done();
        });
    });

    // it('should create an order and store it in the database when the foodId is valid', (done) => {
    //   const newOrder = {
    //     foodItems: [{ foodId: bodyHelper.foods.existingFoodId, quantity: 2 }],
    //   };
    //   chai
    //     .request(server)
    //     .post('/api/v1/orders')
    //     .set('x-access-token', bodyHelper.userToken)
    //     .send(newOrder)
    //     .end((err, result) => {
    //       expect(result).to.have.status(201);
    //       expect(result.body).to.be.an('object');
    //       expect(result.body.success_msg).to.be.equal('Order created');
    //       done();
    //     });
    // });

    it('should return a status of 404 when the fooditems submitted do not exist in the database', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c', quantity: 2 }],
      };
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.error_msg).to.be.equal('Unable to create your order');
          done();
        });
    });
  });

  describe('GET /orders/:orderId', () => {
    it('should return a status of 404 when the ordeId url param provided does not match any existing orderIds in db', (done) => {
      chai
        .request(server)
        .get('/api/v1/orders/11233')
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /orders/:orderId', () => {
    it('it should not update the status of an orders when the order status body param is not provided', (done) => {
      chai
        .request(server)
        .put('/api/v1/orders/1234')
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.errors[0].msg).to.be.equal('order status is required');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    // it('it should return 409 when a wrong orderId url param that doesnt exist in the database is provided', (done) => {
    //   const param = {
    //     orderStatus: 2,
    //   };
    //   chai
    //     .request(server)
    //     .put(`/api/v1/orders/${bodyHelper.signUp.validData.fullname}`)
    //     .set('x-access-token', bodyHelper.adminToken)
    //     .send(param)
    //     .end((err, result) => {
    //       console.log(result.body)
    //       expect(result).to.have.status(409);
    //       expect(result.body).to.be.an('object');
    //       expect(result.body.message).to.equal(
    //         'This particular order can not be updated as it does not exist',
    //       );
    //       done();
    //     });
    // });
  });
});
