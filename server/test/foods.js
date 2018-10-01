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
        foodName: 'Chiken',
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
