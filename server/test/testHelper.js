import randomId from 'uuid/v4';

class TestHelper {
  constructor() {
    this.userToken = undefined;
    this.existingEmail = undefined;
    this.userEmail = `${randomId.v1()}@gmail.com`;
    this.badEmail = `${randomId.v1()}gmail.com`;
    this.userPassword = 'userPassword';
    this.randomPassword = randomId.v1();
    this.fullname = 'Some Random Name Of Mr Man';
    this.randomId = randomId.v1();
    this.mobile = randomId.v1();
    this.address = randomId.v1();

    this.foodName = randomId.v1();
    this.foodCat = 'CookedFood';
    this.foodImg = `uploads/img/${this.foodName}`;
    this.description = 'lorem ipsum odolur vasch trek na uguler';
    this.unitPrice = 500;
    this.quantityAvailable = 80;
  }

  // setExistingEmail(email) {
  //   this.existingEmail = email;
  // }
}

export default new TestHelper();
