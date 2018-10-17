const email = document.querySelector('.email');
const password = document.querySelector('.password');
const passwordConfirmation = document.querySelector('.passwordConfirmation');
const fullname = document.querySelector('.fullname');
const mobile = document.querySelector('.mobile');
const address = document.querySelector('.address');
const loader = document.querySelector('.loader');
const signup = document.querySelector('.signup');
const responseArea = document.querySelector('.response-area');

const localAPI = 'http://localhost:5000/api/v1';
const remoteAPI = 'http://localhost:5000/api/v1';

window.addEventListener('keypress', () => {
  responseArea.innerHTML = '';
});

signup.addEventListener('click', (e) => {
  e.preventDefault();

  responseArea.innerHTML = '';
  loader.classList.remove('hide');
  let localMsg;
  const localErrors = [];
  let localErrorMsg = '';

  if (email.value.length < 1) {
    localMsg = { msg: 'Your email can not be empty' };
    localErrors.push(localMsg);
  }
  if (password.value.length < 6) {
    localMsg = { msg: 'Your password must be at least 6 characters' };
    localErrors.push(localMsg);
  }
  if (password.value !== passwordConfirmation.value) {
    localMsg = { msg: 'Your passwords must match' };
    localErrors.push(localMsg);
  }
  if (fullname.value.length < 3) {
    localMsg = { msg: 'Your fullname is too short, use a valid name' };
    localErrors.push(localMsg);
  }
  if (fullname.value.length > 35) {
    localMsg = { msg: 'Your Name is too long, shorten it' };
    localErrors.push(localMsg);
  }
  if (address.value.length < 10) {
    localMsg = {
      msg: 'Your Address is too short, at least tell us your city and street number',
    };
    localErrors.push(localMsg);
  }
  if (address.value.length > 60) {
    localMsg = { msg: 'Your address is too long, shorten it' };
    localErrors.push(localMsg);
  }
  if (mobile.value.length !== 11) {
    localMsg = { msg: 'Your mobile number must be a valid 11 digit Nigerian phone number' };
    localErrors.push(localMsg);
  }
  if (localErrors.length > 0) {
    localErrors.forEach((err) => {
      localErrorMsg += `<li class='list-item text-red'>${err.msg}</li>`;
    });
    responseArea.innerHTML = `${localErrorMsg}`;
    loader.classList.add('hide');
    return;
  }
  const signupData = {
    email: email.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    fullname: fullname.value,
    mobile: mobile.value,
    address: address.value,
  };
  const signupUrl = `${localAPI}/auth/signup`;
  fetch(signupUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(signupData),
  })
    .then(res => res.json())
    .then((data) => {
      console.log('data', data);
      // If no errors and signup is successfull
      if (data.success) {
        loader.classList.add('hide');
        responseArea.innerHTML = `<li class="list-item text-green">${data.responseMsg}</li>`;

        const { userToken } = data;
        const { userId, role } = data.createdUser;
        const name = data.createdUser.fullname;

        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('fullname', name);
        localStorage.setItem('role', role);

        // Redirect to admin page if its an admin
        if (role === 'Admin') {
          window.location.replace('admins/foods.html');
          return;
        }
        // Redirect to users page if its not an admin
        window.location.replace('users/foods.html');
        return;
      }

      const { errors } = data;
      errors.forEach((error) => {
        responseArea.innerHTML += `<li class="list-item text-red">${error.msg}</li>`;
      });
      loader.classList.add('hide');
    })
    .catch((error) => {
      console.log('err', error);
      loader.classList.add('hide');
      responseArea.innerHTML = '<li class="list-item text-red">A network error occured tried again</li>';
    });
});
