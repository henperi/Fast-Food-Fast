const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');
const tbody = document.querySelector('tbody');
tbody.innerHTML = '';

const getUserItmes = () => {
  const orderId = window.location.href.split('?order_id=')[1];
  const userId = localStorage.getItem('userId');
  const getUserItmesUrl = `${localAPI}/orders/${orderId}`;

  fetch(getUserItmesUrl, {
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
      console.log(data);
      // return;
      if (data.success) {
        for (let i = 0; i < data.items.length; i += 1) {
          tbody.innerHTML += UserItmesComponent(data, i);
        }
        // tbody.innerHTML = '';
      }
      // tbody.innerHTML = ' ';
    })
    .catch((error) => {
      console.log(error);
      container.classList.add('hide');
      main.innerHTML = renderPoorNetwork();
    });
};

getUserItmes();

const UserItmesComponent = (data, i) => `
<tr>
  <td>${data.items[i].food_name}</td>
  <td>&#8358; ${data.items[i].unit_price}</td>
  <td>${data.items[i].quantity}</td>
  <td>&#8358; ${data.items[i].total}</td>
  <td>${formatDate(data.items[i].created_at)}</td>
  <td class="text-${data.items[i].itemstatus}">${data.items[i].itemstatus}</td>
  <td class="hide"></td>
</tr>`;
