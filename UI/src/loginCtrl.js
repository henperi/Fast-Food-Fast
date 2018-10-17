const email = document.querySelector('.email');
const password = document.querySelector('.password');
const login = document.querySelector('.login');
const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');

const localAPI = 'http://localhost:5000/api/v1';
const remoteAPI = 'http://localhost:5000/api/v1';

window.addEventListener('keypress', () => {
  responseArea.innerHTML = '';
});

login.addEventListener('click', (e) => {
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
  if (password.value.length < 1) {
    localMsg = { msg: 'Your password can not be empty' };
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
  const loginData = {
    email: email.value,
    password: password.value,
  };
  const loginUrl = `${localAPI}/auth/login`;
  fetch(loginUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(loginData),
  })
    .then(res => res.json())
    .then((data) => {
      console.log('data', data);
      // If no errors and login is successfull
      if (data.success) {
        loader.classList.add('hide');
        responseArea.innerHTML = `<li class="list-item text-green">${data.responseMsg}</li>`;

        const { userToken } = data;
        const { userId, role, fullname } = data.userData;

        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('fullname', fullname);
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
