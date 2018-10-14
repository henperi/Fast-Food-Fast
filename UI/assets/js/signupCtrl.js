const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const passwordConfirmInput = document.querySelector('.password_confirm');
const fullnameInput = document.querySelector('.fullname');
const mobileInput = document.querySelector('.mobile');
const addressInput = document.querySelector('.address');
// const signUpBtn = document.querySelector('.signUp');
const signUpForm = document.querySelector('form');
const responseArea = document.querySelector('#response-area');

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const password_confirmation = passwordConfirmInput.value;
  const fullname = fullnameInput.value;
  const mobile = mobileInput.value;
  const address = addressInput.value;

  const signUpParams = {
    email,
    password,
    password_confirmation,
    fullname,
    mobile,
    address,
  };
  // console.log(signUpParams);
  const signinUrl = 'http://localhost:5000/api/v1/auth/signup';

  fetch(signinUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(signUpParams),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if (data.errors) {
        const { errors } = data;
        let errorMsg = '';
        errors.forEach((err) => {
          errorMsg += `<li class='text-left'>${err.msg}</li>`;
          // console.log(msg.msg);
        });
        return (responseArea.innerHTML = errorMsg || data.error_msg || 'An error occurred, try again');
      }
      localStorage.setItem('userToken', data.userToken);
      responseArea.innerHTML = data.success_msg;
      return (window.location.href = 'http://127.0.0.1:5500/UI/users/foods.html');
    })
    .catch(error => (responseArea.innerHTML = 'A connection error occurred, try again'));
});

const userToken = localStorage.getItem('userToken');
if (userToken) {
  alert('You are already logged in');
  window.location.href = 'http://127.0.0.1:5500/UI/users/foods.html';
}
