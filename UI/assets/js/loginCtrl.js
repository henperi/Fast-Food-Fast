const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const loginBtn = document.querySelector('button');
const responseArea = document.querySelector('#response-area');
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  const loginParams = {
    email,
    password,
  };
  const signinUrl = 'http://localhost:5000/api/v1/auth/login';

  fetch(signinUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(loginParams),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem('userToken', data.userToken);
        return (window.location.href = 'http://127.0.0.1:5500/UI/users/foods.html');
      }
      return (responseArea.innerHTML = data.error_msg || 'An error occurred, try again');
    })
    .catch((error) => {
      console.log('error', error);
      return (responseArea.innerHTML = 'An network error occurred, try again later');
    });
});

const userToken = localStorage.getItem('userToken');
if (userToken) {
  alert('You are already logged in');
  window.location.href = 'http://127.0.0.1:5500/UI/users/foods.html';
}
