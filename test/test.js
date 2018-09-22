import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
// import ordersController from '../app/controllers/ordersController';


const PORT = process.env.PORT || 5000;
console.log(PORT)
chai.use(chaiHttp);

const [expect] = [chai.expect];

/**
 * Test the orders route
 */

describe('Orders Route Tests', () => {
  describe('GET /orders', () => {
    it('should fetch all the orders stored in memory', (done) => {
      chai
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .get('/')
        .end((err, result) => {
          // console.log('orders:', result.body.orders);
          if (result.body.orders) {
            expect(result).to.have.status(200);
            expect(result.body.message).to.be.equal('Orders found');
            expect(result.body).to.be.an('object');
            done();
          } else {
            expect(result).to.have.status(404);
            expect(result.body.message).to.be.equal('No orders were found');
            expect(result.body).to.be.an('object');
            done();
          }
        });
      // .catch(err => console.log(err));
    });
  });

  describe('POST /orders', () => {
    it('should not create an order if foodId or quantity is missing', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088' }],
      };

      chai
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .post('/')
        .send(newOrder)
        .end((err, result) => {
          // console.log(result.body);
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.reasons).to.be.equal(
            'Submitted foodItem does not have a valid format. foodId param or quantity param is not defined',
          );
          expect(result.body.message).to.be.equal('Order not created');
          done();
        });
      // .catch(err => console.log(err));
    });

    it('should create an order and store it in memory', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c-4f19-4299-b709-aab25de4f088', quantity: 2 }],
      };

      chai
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .post('/')
        .send(newOrder)
        .end((err, result) => {
          // console.log(result.body);
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Order created');
          done();
        });
      // .catch(err => console.log(err));
    });
  });

  describe('GET /orders/:orderId', () => {
    it('should not fetch an order when the ordeId is not found in the list of existing orderIds', (done) => {
      chai
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .get('/1')
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
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .post('/')
        .send(newOrder)
        .end((err, result) => {
          // console.log(result.body);
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
        .request(`http://localhost:${PORT}/api/v1/orders`)
        .put('/1')
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
