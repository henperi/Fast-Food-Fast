const main = document.querySelector('main');
const container = document.querySelector('.container');
const userToken = localStorage.getItem('userToken') || undefined;

if (!userToken) {
  localStorage.setItem('flashMsg', 'You need to login');
  window.location.replace('../signin.html');
}
const localAPI = 'http://localhost:5000/api/v1';
const remoteAPI = 'http://localhost:5000/api/v1';

const fetchProfileUrl = `${localAPI}/users/my-profile`;
fetch(fetchProfileUrl, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': userToken,
  },
})
  .then(res => res.json())
  .then((data) => {
    console.log('data', data);
    // If no errors and signup is successfull
    if (data.success) {
      const { userId, role, fullname } = data.profile;

      localStorage.setItem('userId', userId);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('role', role);
      if (role !== 'Admin') {
        localStorage.setItem('flashMsg', 'Only admins can access this page');
        window.location.replace('../users/foods.html');
        return;
      }
    }

    const { errors } = data;
    localStorage.clear();
    localStorage.setItem('flashMsg', errors[0].msg);
    window.location.replace('../signin.html');
  })
  .catch((error) => {
    console.log('err', error);
    container.classList.add('hide');
    main.innerHTML = `
    <div class="container text-center">
      <section class="">
        <h3 class="list-item text-red t-28">Poor network detected, refresh or try again in a moment</h3>
        <div class="loader hide">
          <i class="fa fa-spin fa-spinner"></i>
        </div>
        <button class="btn btn-primary reload">Reconnect</button>
        </section>
    </div>
    `;
  });
