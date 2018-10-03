import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import TestHelper from './testHelper';

chai.use(chaiHttp);

const [expect] = [chai.expect];

/**
 * SignUp New User Helper
 */
const foodsHelper = {
  emptyData: {},
  existingFoodId: undefined,
  validData: {
    foodName: TestHelper.foodName,
    foodCat: TestHelper.foodCat,
    foodImg: TestHelper.foodImg,
    description: TestHelper.description,
    unitPrice: TestHelper.unitPrice,
    quantityAvailable: TestHelper.quantityAvailable,
  },
  conflict_Data: {
    foodName: TestHelper.foodName,
    foodCat: TestHelper.foodCat,
    foodImg: TestHelper.foodImg,
    description: TestHelper.description,
    unitPrice: TestHelper.unitPrice,
    quantityAvailable: TestHelper.quantityAvailable,
  },
  misisngItems: {
    foodCat: TestHelper.foodCat,
    foodImg: TestHelper.foodImg,
    unitPrice: TestHelper.unitPrice,
    quantityAvailable: TestHelper.quantityAvailable,
  },
};

/**
 * Test the foods route
 */
describe('Foods Route Tests', () => {
  describe('POST /menu', () => {
    it('should return errors if any of the required parameters are missing', (done) => {
      chai
        .request(server)
        .post('/api/v1/menu')
        .send(foodsHelper.misisngItems)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body).to.be.an('object');
          expect(result.body).to.have.property('errors');
          done();
        });
    });

    it('should create a food and store it in database', (done) => {
      chai
        .request(server)
        .post('/api/v1/menu')
        .send(foodsHelper.validData)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an('object');
          expect(result.body.success_msg).to.be.equal('Food item created and added to menu');
          // console.log(result.body.createdFood);
          foodsHelper.existingFoodId = result.body.createdFood.foodId;
          done();
        });
    });
  });

  describe('GET /menu', () => {
    it('should fetch all the foods stored in database', (done) => {
      chai
        .request(server)
        .get('/api/v1/menu')
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body)
            .to.have.property('success')
            .to.equal(true);
          expect(result.body)
            .to.have.property('success_msg')
            .to.equal(`returning ${result.body.totalFoods} availabel food(s)`);
          expect(result.body).to.have.property('foodsInMenu');
          done();
        });
    });
  });
  describe('GET /menu/:foodId', () => {
    it('should not fetch a food when the foodId is not found in the list of existing foodIds', (done) => {
      chai
        .request(server)
        .get('/api/v1/menu/1')
        .end((err, result) => {
          expect(result).to.have.status(404);
          expect(result.body).to.be.an('object');
          expect(result.body.message).to.be.equal('Food not found');
          done();
        });
    });

    it.skip('should fetch a food when the foodId provided is found in the list of existing foodIds', (done) => {
      chai
        .request(server)
        .get(`/api/v1/menu/${foodsHelper.existingFoodId}`)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body.message).to.be.equal('Food found');
          done();
        });
    });
  });

  describe('PUT /menu/:foodId', () => {
    it('it should not update the status of a food when the foodname is required', (done) => {
      chai
        .request(server)
        .put('/api/v1/menu/4801ac7c-4f19-4299-b709-aab25de4f088')
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
        .put('/api/v1/menu/4801ac7c-4f19-4299-b709-aab25de4f088')
        .send(food)
        .end((err, result) => {
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('object');
          done();
        });
    });
  });
});
