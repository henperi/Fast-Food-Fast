const fetchMenuUrl = `${localAPI}/menu`;
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
    foodMenu.innerHTML = '';
    if (data.success) {
      let item = '';
      if (data.menu.length > 0) {
        for (let i = 0; i < data.menu.length; i += 1) {
          const foodItem = data.menu[i];
          item += `
            <div class="food-item card card-shadow card-shadow">
                <div class="flex">
                    <div class="image-div">
                        <img src="http://127.0.0.1:5500/UI/img/food-items/1.jpg" class="image" width="100%" />
                    </div>
                    <div class="content-div">
                        <div class="item-title">${foodItem.food_name} -
                            <span class="badge price">&#8358;${foodItem.unit_price}</span>
                        </div>
                        <div class="item-subtitle">
                            <a href="">${foodItem.food_cat}</a>
                        </div>
                        <div class="item-description">${foodItem.description}</div>
                        <span class="item-description link">More Details</span>
                    </div>
                </div>
                <div>
                    <a href="${localhost}/UI/users/order-now.html?id=${foodItem.food_id}" 
                      class="btn btn-primary">Order Now
                    </a>
                    <button class="triggerModal btn btn-blue" 
                    data-target="${foodItem.food_id}">Add to Cart</button>
  
                    <div class="modal" id='#${foodItem.food_id}'>
                        <div class="modal-content">
                            <div class="text-center">
                                <span class="close-button btn btn-primary btn-sm push-right">x</span>
                                <h2 class="text-center">Add this food item to existing Cart</h2>
  
                                <div class="content-div">
                                    <div class="item-title">${foodItem.food_name} -
                                      <span class="badge price">&#8358;${foodItem.unit_price}</span>
                                    </div>
                                    <div class="item-description">
                                        <p>${foodItem.description}</p>
                                    </div>
                                </div>
                                <form method="POST" action="javascript:;" class="card card-shadow">
                                    <div class="flex">
                                        <h2>Desired Quantity</h2>
                                        <div class="form-member text-left">
                                            <input type="number" class="form-input" placeholder="Enter Desired Quantity example 3">
                                        </div>
                                        <button class="addToCart btn btn-blue btn-block btn-rounded btn-bg">Add To Cart</button>
                                    </div>
                                </form>
                                <button class="close-button btn btn-primary btn-block btn-rounded btn-bg">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          `;
          // console.log(item);
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
