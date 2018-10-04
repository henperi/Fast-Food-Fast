import TestHelper from './testHelper';

/**
 * User Helper
 */

const userBodies = {
  userToken: undefined,
  adminToken: undefined,
  signUp: {
    emptyData: {},
    validData: {
      fullname: TestHelper.fullname,
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      password_confirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
    conflict_Data: {
      fullname: TestHelper.fullname,
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      password_confirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
    missingFullname: {
      email: TestHelper.userEmail,
      password: TestHelper.userPassword,
      password_confirmation: TestHelper.userPassword,
      mobile: TestHelper.mobile,
      address: TestHelper.address,
    },
  },
  logIn: {
    emptyData: {},
    asAdmin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
    missingPassword: {
      email: TestHelper.email,
    },
    missingEmail: {
      password: TestHelper.password,
    },
    userNotExist: {
      email: 'randomUser@email.com',
      password: TestHelper.userPassword,
    },
    userExist: {
      email: TestHelper.existingEmail,
      password: TestHelper.userPassword,
    },
    wrongPassword: {
      email: TestHelper.userEmail,
      password: TestHelper.randomPassword,
    },
  },
};

export default userBodies;
