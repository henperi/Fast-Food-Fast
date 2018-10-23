const placeOrderBtn = document.querySelector('.place-order');
const placeOrderUrl = `${localAPI}/orders`;
const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');
// const tbody = document.querySelector('tbody');

console.log(foodItems);
const placeOrderData = { foodItems };

const placeOrder = () => {
  responseArea.innerHTML = '';
  loader.classList.remove('hide');

  // Check for login here first

  // Then make request
  fetch(placeOrderUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': userToken,
    },
    body: JSON.stringify(placeOrderData),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      // If no errors and signup is successfull
      if (data.errors) {
        const { errors } = data;
        errors.forEach((error) => {
          responseArea.innerHTML += `<li class="list-item text-red">${error.msg}</li>`;
        });
        loader.classList.add('hide');
        flash('flash-error', errors[0].msg);
      }

      if (data.success) {
        // If no errors and signup is successfull
        loader.classList.add('hide');
        renderEmptyCart();
        flash('flash-success', data.success_msg);

        localStorage.removeItem('foodItems');
        updateCartCounter();

        tbody.innerHTML = '';
        responseArea.innerHTML += `<li class="list-item text-green">${data.success_msg}</li>`;
        document.querySelector('.close-button').click();
      }
    })
    .catch(() => {
      main.innerHTML = renderPoorNetwork();
    });
};

placeOrderBtn.addEventListener('click', placeOrder);
