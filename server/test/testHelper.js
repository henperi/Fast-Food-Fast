import randomId from 'uuid/v4';

class TestHelper {
  constructor() {
    this.userToken = undefined;
    this.existingEmail = undefined;
    this.userEmail = `${randomId.v1()}@gmail.com`;
    this.badEmail = `${randomId.v1()}gmail.com`;
    this.userPassword = 'userPassword';
    this.randomPassword = randomId.v1();
    this.fullname = randomId.v1();
    this.mobile = randomId.v1();
    this.address = randomId.v1();
  }

  // setExistingEmail(email) {
  //   this.existingEmail = email;
  // }
}

export default new TestHelper();
