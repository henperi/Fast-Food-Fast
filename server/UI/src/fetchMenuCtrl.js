const fetchMenuUrl = `${localAPI}/menu`;
foodMenu.innerHTML = '';
fetch(fetchMenuUrl, {
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
    // If no errors and signup is successfull
    if (data.success) {
      let item = '';
      if (data.menu.length > 0) {
        for (let i = 0; i < data.menu.length; i += 1) {
          const foodItem = data.menu[i];
          item += renderFoodMenuComponent(foodItem);
        }
        foodMenu.innerHTML = item;
        return;
      }
      card.innerHTML = `
      <h2 class="text-center">No food items in menu yet</h2>
      `;
    }
  })
  .catch(() => {
    main.innerHTML = renderPoorNetwork();
  });
