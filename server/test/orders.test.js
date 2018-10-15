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
    it('should fetch all the orders stored in memory', (done) => {
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
    it('should return a status of 400 when foodItems params is not not sent', (done) => {
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(bodyHelper.orders.emptyData)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    it('should return a status of 400 when foodId param is undefined', (done) => {
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(bodyHelper.orders.undefinedFoodId)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body)
            .to.have.property('error_msg')
            .to.equal('The foodId is a required field in foodItems array');
          done();
        });
    });

    it('should return a status of 400 when quantity param is undefined', (done) => {
      // console.log('undefined q:::', bodyHelper.orders.undefinedQuantity);
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(bodyHelper.orders.undefinedQuantity)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body)
            .to.have.property('error_msg')
            .to.equal('The quantity is a required field in foodItems array');
          done();
        });
    });

    it('should return a status of 400 when quantity param is not an Integer', (done) => {
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(bodyHelper.orders.quantityIsNaN)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body)
            .to.have.property('error_msg')
            .to.equal('One or more of the food item quantities supplied is not a valid number');
          done();
        });
    });

    it('should return a status of 404 when the fooditems submitted do not exist in the database', (done) => {
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(bodyHelper.orders.foodIdNotExist)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.error_msg).to.be.equal('Unable to create your order');
          done();
        });
    });

    it('should create an order and store it in the database when the foodId is valid', (done) => {
      const newOrder = {
        foodItems: [{ foodId: bodyHelper.foods.existingFoodId, quantity: 2 }],
      };
      chai
        .request(server)
        .post('/api/v1/orders')
        .set('x-access-token', bodyHelper.userToken)
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body.success_msg).to.be.equal('Your order has been created successfully');
          bodyHelper.orders.existingOrderId = result.body.createdOrder.orderId;
          done();
        });
    });
  });


  describe('GET /orders/:orderId', () => {
    it('should return a status of 404 when the ordeId url param provided does not match any existing orderIds in db', (done) => {
      chai
        .request(server)
        .get(`/api/v1/orders/${bodyHelper.orders.wrongOrderId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('error_msg').to.equal('No items mathching this order were found');
          done();
        });
    });

    it('should return a status of 200 when the ordeId url param exists in the db', (done) => {
      chai
        .request(server)
        .get(`/api/v1/orders/${bodyHelper.orders.existingOrderId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('success_msg').to.equal('Ordered Items fetched successfully');
          done();
        });
    });
  });

  describe('PUT /orders/:orderId', () => {
    it('it should not update the status of an orders when the order status body param is not provided', (done) => {
      chai
        .request(server)
        .put(`/api/v1/orders/${bodyHelper.orders.existingOrderId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.errors[0].msg).to.be.equal('order status is required');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    it('it should return 400 when the orderStatus provided is not an Integer', (done) => {
      const param = {
        orderStatus: 'www',
      };
      chai
        .request(server)
        .put(`/api/v1/orders/${bodyHelper.orders.existingOrderId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .send(param)
        .end((err, result) => {
          // console.log(result.body);
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.error_msg).to.equal(
            'The order status sent is not valid',
          );
          done();
        });
    });


    it('it should return 200 when everythin is valid', (done) => {
      const param = {
        orderStatus: 2,
      };
      chai
        .request(server)
        .put(`/api/v1/orders/${bodyHelper.orders.existingOrderId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .send(param)
        .end((err, result) => {
          // console.log(result.body);
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          expect(result.body.success).to.equal(true);
          done();
        });
    });

    it('it should return 409 when the orderId is not found in db', (done) => {
      const param = {
        orderStatus: 2,
      };
      chai
        .request(server)
        .put(`/api/v1/orders/${bodyHelper.foods.existingFoodId}`)
        .set('x-access-token', bodyHelper.adminToken)
        .send(param)
        .end((err, result) => {
          // console.log(result.body);
          expect(result).to.have.status(409);
          expect(result.body).to.be.an('object');
          expect(result.body.error_msg).to.equal(
            'This particular order can not be updated as it does not exist',
          );
          done();
        });
    });
  });
});
