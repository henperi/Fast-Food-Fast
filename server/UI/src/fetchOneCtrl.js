const orderOne = document.querySelector('.order-one');
orderOne.innerHTML = '';

const foodId = window.location.href.split('?id=')[1];
// alert(foodId);

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
    // If no errors and signup is successfull
    // orderOne.innerHTML = '';
    if (data.success) {
      const item = `
      <div class="card card-shadow">
          <div class="flex">
              <div class="image-div">
                  <img src="${localhost}/img/food-items/1.jpg" class="image" width="100%" />
              </div>
              <div class="food-menu">
                <div class="image-item">
                    <img src="${localhost}/img/food-items/1.jpg" class="image" width="20%" />
                    <img src="${localhost}/img/food-items/1.jpg" class="image" width="20%" />
                    <img src="${localhost}/img/food-items/1.jpg" class="image" width="20%" />
                </div>
              </div>
              <div class="content-div">
                  <div class="item-title">${data.food.food_name} -
                      <span class="badge price">&#8358;${data.food.unit_price}</span>
                  </div>
                  <div class="item-description">
                      <p>${data.food.description}</p>
                  </div>
                  
                    <button class="triggerModal btn btn-blue btn-block btn-rounded btn-bg" 
                    data-target="${data.food.food_id}">Add to Cart</button>

                    <div class="modal" id='#${data.food.food_id}'>
                        <div class="modal-content">
                            <div class="text-center">
                                <span class="close-button btn btn-primary btn-sm push-right">x</span>
                                <h2 class="text-center">Add this food item to existing Cart</h2>

                                <div class="content-div">
                                    <div class="image-div">
                                        <img src="../img/food-items/1.jpg" class="image" width="50%" />
                                    </div>

                                    <div class="item-title">${data.food.food_name} -
                                        <span class="badge price">
                                            &#8358;${data.food.unit_price}
                                        </span>
                                    </div>
                                </div>
                                <form action="javascript:;" method="POST" class=" card card-shadow">
                                <div class="flex">
                                    <h2>Desired Quantity</h2>
                                    <div class="form-member text-left">
                                        <input type="number" class="form-input quantity" placeholder="Enter Desired Quantity example 3">
                                    </div>
                                    <button type="submit" class="addToCart btn btn-blue btn-block btn-rounded btn-bg" 
                                        data-foodId=${data.food.food_id}>Add To Cart
                                    </button>
                                </div>
                                </form>
                                <button class="close-button btn btn-primary btn-block btn-rounded btn-bg">Cancel</button>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>   
      `;
      orderOne.innerHTML = item;
      return;
    }
    card.innerHTML = `
    <h2 class="text-center text-red">This food item could not be found</h2>
    `;
  })
  .catch((error) => {
    // console.log(error);
    main.innerHTML = renderPoorNetwork();
  });
