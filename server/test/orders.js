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
    it('should return a status of 400 when food items array is not sent', (done) => {
      const newOrder = {};

      chai
        .request(server)
        .post('/api/v1/orders')
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

    it('should return a status of 404 when the fooditems submitted do not exist in the database', (done) => {
      const newOrder = {
        foodItems: [{ foodId: '4801ac7c', quantity: 2 }],
      };
      chai
        .request(server)
        .post('/api/v1/orders')
        .send(newOrder)
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Order not created');
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
            .request(server)
            .get(`api/vi/orders/${result.body.createdOrder.orderId}`)
            .end((err2, newResult) => {
              expect(newResult).to.have.status(201);
              expect(newResult.body.message).to.be.equal('Order found');
            });
          done();
        });
    });
  });

  describe('PUT /orders/:orderId', () => {
    it('it should not update the status of an orders when the order status body param is not provided', (done) => {
      chai
        .request(server)
        .put('/api/v1/orders/1234')
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body.errors[0].msg).to.be.equal('order status is required');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    it('it should return 409 when a wrong orderId that doesnt exist in the database is provided', (done) => {
      const param = {
        orderStatus: 'Completed'
      }
      chai
        .request(server)
        .put('/api/v1/orders/1234')
        .send(param)
        .end((err, result) => {
          expect(result).to.have.status(409);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.equal('This particular order can not be updated as it does not exist');
          done();
        });
    });

    // it('it should return a status of 200 when the update request is successful', (done) => {
    //   const param = {
    //     orderStatus: 'Completed'
    //   }
    //   chai
    //     .request(server)
    //     .put('/api/v1/orders/1234')
    //     .send(param)
    //     .end((err, result) => {
    //       expect(result).to.have.status(200);
    //       expect(result.body).to.be.an('object');
    //       expect(result.body.message).to.have.equal('Order updated');
    //       done();
    //     });
    // });
  });
});