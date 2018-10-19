const tbody = document.querySelector('tbody');
tbody.innerHTML = '';

let n = 0;
if (!cartItems) {
  renderEmptyCart();
}
if (cartItems) {
  const foodItems = JSON.parse(cartItems);
  let item = '';
  let total = 0;

  for (let i = 0; i < foodItems.length; i += 1) {
    const { foodId, quantity } = foodItems[i];
    const fetchMenuUrl = `${localAPI}/menu/${foodId}`;

    fetch(fetchMenuUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          n += 1;
          total += data.food.unit_price * quantity;
          item += renderCartItemComponent(data, quantity);
        }
        if (n === foodItems.length) {
          item += renderCartTotalComponent(total);
        }
        if (n > 0) {
          tbody.innerHTML = item;
        }
      })
      .catch((error) => {
        console.log(error);
        container.classList.add('hide');
        main.innerHTML = renderPoorNetwork();
      });
  }
}
