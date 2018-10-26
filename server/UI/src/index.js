const main = document.querySelector('main');
const foodMenu = document.querySelector('.food-menu');
const card = document.querySelector('.card');
const container = document.querySelector('.container');

let cartItems = localStorage.getItem('foodItems') || undefined;
let foodItems = cartItems ? JSON.parse(cartItems) : [];

const userToken = localStorage.getItem('userToken') || undefined;

const localhost = window.location.origin;
const localAPI = `${localhost}/api/v1`;
const remoteAPI = 'https://fast-food-fast-app.herokuapp.com/api/v1';

// alert(window.location.pathname);
if (userToken) {
  document.querySelector('.right-nav').innerHTML = `
  <a href="foods.html" class="active">Foods Menu</a>
  <div class="dropdown hide">
      <button class="dropbtn">My Orders
          <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
          <a class="hide" href="pending-orders.html">Pending Orders</a>
          <a class="hide" href="completed-orders.html">Completed Orders</a>
          <a href="all-orders.html">All My Orders</a>
      </div>
  </div>
  <a href="all-orders.html">My Orders</a>
  <a href="my-profile.html" class="">My Profile</a>
  <a class="btn btn-green" href="my-cart.html">
      <i class="fa fa-shopping-cart"></i>
      <span class="count cart-count">0</span>
  </a>
  <a href="javascript:;" class="btn-rounded logout">Logout</a>
  <a href="javascript:void(0);" class="icon">&#9776;</a>
  `;
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    document.querySelector('.right-nav').innerHTML = `
    <a href="users/foods.html" class="active">Foods Menu</a>>
    <a href="#about">About Us</a>
    <a href="#contact">Contact Us</a>
    <div class="dropdown hide">
        <button class="dropbtn">My Orders
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
            <a class="hide" href="users/pending-orders.html">Pending Orders</a>
            <a class="hide" href="users/completed-orders.html">Completed Orders</a>
            <a class="users/all-orders.html" href="all-orders.html">All My Orders</a>
            </div>
            </div>
    <a class="" href="users/all-orders.html">My Orders</a>
    <a href="users/my-profile.html" class="">My Profile</a>
    <a class="btn btn-green" href="users/my-cart.html">
        <i class="fa fa-shopping-cart"></i>
        <span class="count cart-count">0</span>
    </a>
    <a href="javascript:;" class="btn-rounded logout">Logout</a>
    <a href="javascript:void(0);" class="icon">&#9776;</a>
    `;
  }
}

/**
 * Custom Redirects: redirect the user to a certain page
 * @param {String} url The link to redirect to
 * @param {boolean} canReturn The posibility of coming back with back button
 */
const redirectTo = (url, canReturn) => {
  // Redirect with previous href history
  if (canReturn) {
    window.location.href = url;
    return;
  }
  // Redirect and remove the previous href from history
  window.location.replace(url);
};

const getCart = () => {
  cartItems = localStorage.getItem('foodItems') || undefined;
  foodItems = cartItems ? JSON.parse(cartItems) : [];
};

/**
 * Set A flash to be called on the next page
 * @param {String} flashType The flash type (flash-success || flash-error)
 * @param {String} flashMsg The message to flash
 */
const setFlash = (flashType, flashMsg) => {
  const flash = [flashType, flashMsg];
  localStorage.setItem('flash', JSON.stringify(flash));
};

/**
 * Instantly create the flash object and call the flash method
 * @param {String} flashType The flash type (flash-success || flash-error)
 * @param {String} flashMsg The message to flash
 */
const flash = (flashtype, flashMsg) => {
  const flashbox = document.createElement('div');
  flashbox.className = `card card-shadow flash ${flashtype}`;
  flashbox.innerHTML = `
    <p>${flashMsg}</p>
  `;
  document.querySelector('main').insertAdjacentElement('afterbegin', flashbox);
  //   setInterval(() => {
  //     document.querySelector('main').removeChild(flashbox);
  //   }, 3000);
};

/**
 * Update the cart items counter
 */
const updateCartCounter = () => {
  cartItems = localStorage.getItem('foodItems') || undefined;
  foodItems = cartItems ? JSON.parse(cartItems) : [];

  document.querySelectorAll('.cart-count').forEach((counter) => {
    const count = counter;
    count.innerHTML = `${foodItems.length}`;
  });
};
updateCartCounter();

/**
 * Fetch the Authenticated User Profile
 */
const fetchAuthUserProfile = () => {
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
      if (data.success) {
        const { userId, role, fullname } = data.profile;

        localStorage.setItem('userId', userId);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('role', role);
        return;
      }

      const { errors } = data;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      flash('flash-error', errors[0].msg);
      setFlash('flash-error', errors[0].msg);
      redirectTo('../signin.html');
    })
    .catch((error) => {
      container.classList.add('hide');
      main.innerHTML = renderPoorNetwork();
    });
};

/**
 * Format the cash to money fromat
 * @param {Number} amount the amount to format
 */
const formatCash = amount => amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

const formatDate = date => `${
  date
    .toLocaleString()
    .replace(/-/g, '/')
    .split('T')[0]
} ${
  date
    .toLocaleString()
    .split('T')[1]
    .split('.')[0]
}`;

/**
 * Render the poor network page
 */
const renderPoorNetwork = () => `
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

/**
 * Render Food Menu (A single food item)
 */
const renderFoodMenuComponent = foodItem => `
<div class="food-item card card-shadow card-shadow">
  <div class="flex">
      <div class="image-div">
          <img src="${localhost}/img/food-items/1.jpg" class="image" width="100%" />
      </div>
      <div class="content-div">
          <div class="item-title">${foodItem.food_name} -
              <span class="badge price">&#8358;${foodItem.unit_price}</span>
          </div>
          <div class="item-subtitle">
              <a href="javascript:;">${foodItem.food_cat}</a>
          </div>
          <div class="item-description">${foodItem.description}</div>
          <span class="item-description link">More Details</span>
      </div>
  </div>
  <div>
      <a href="${localhost}/users/order-now.html?id=${foodItem.food_id}" 
        class="btn btn-primary">View Now
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
                              <input type="number" class="form-input quantity" placeholder="Enter Desired Quantity example 3">
                          </div>
                          <button class="addToCart btn btn-blue btn-block btn-rounded btn-bg" 
                              data-foodId=${foodItem.food_id}>Add To Cart
                          </button>
                      </div>
                  </form>
                  <button class="close-button btn btn-primary btn-block btn-rounded btn-bg">Cancel</button>
              </div>
          </div>
      </div>
  </div>
</div>

`;

/**
 * Render cart component (item row)
 */
const renderCartItemComponent = (data, quantity) => `
  <tr id="#${data.food.food_id}_row">
    <td>${data.food.food_name}</td>
    <td>&#8358; ${data.food.unit_price}</td>
    <td>${quantity}</td>
    <td>&#8358; ${formatCash(data.food.unit_price * quantity)}</td>
    <td class="">
        <button class="hide triggerModal btn btn-primary btn-sm" 
          data-target='${data.food.food_id}_updateModal'>
          Update Qauntity
        </button>
        <button class="triggerModal btn btn-red btn-sm" 
          data-target='${data.food.food_id}_deleteModal'>Remove
          Item
        </button>

        <div class="modal" id='#${data.food.food_id}_updateModal'>
            <div class="modal-content">
                <div class="text-center">
                    <span class="close-button btn btn-primary btn-sm push-right">x</span>
                    <h2 class="text-center">Update Food Item From Cart</h2>

                    <div class="content-div">
                        <div class="item-title">${data.food.food_name} -
                            <span class="badge price">&#8358;${data.food.unit_price}</span>
                        </div>
                    </div>
                    <form action="javascript:;" method="POST" class=" card card-shadow">
                        <div class="">
                            <h3>Input New Quantity</h3>
                            <input type="text" class="form-input quantity" placeholder="Enter New Quantity">
                            <h3>Are you sure you want to update this item's quantity?</h3>
                            <button class="btn btn-green btn-rounded btn-bg update-quantity">Update</button>
                            <button class="close-button btn btn-primary btn-rounded btn-bg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id='#${data.food.food_id}_deleteModal'>
            <div class="modal-content">
                <div class="text-center">
                    <span class="close-button btn btn-primary btn-sm push-right">x</span>
                    <h2 class="text-center">Delete Food Item From Cart</h2>

                    <div class="content-div">
                        <div class="item-title">${data.food.food_name} -
                            <span class="badge price">
                            - &#8358;${formatCash(data.food.unit_price * quantity)}
                            </span>
                        </div>
                    </div>
                    <form action="javascript:;" method="POST" class=" card card-shadow">
                        <div class="">
                            <h3>Are you sure you want to remove this item from cart?</h3>
                            <input class="priceToremove hide" type="number" 
                                value="${data.food.unit_price * quantity}"
                            >
                            <button class="btn btn-red btn-rounded btn-bg removeFromCart" 
                              data-foodId="${data.food.food_id}"
                              data-price="${data.food.unit_price * quantity}">Remove
                            </button>
                            <button class="close-button btn btn-primary btn-rounded btn-bg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </td>
  </tr>
`;

/**
 * Render the total cart component (table row)
 */
const renderCartTotalComponent = total => `

<tr id="#total">
  <td>
      <h2>Total</h2>
  </td>
  <td></td>
  <td></td>
  <td>
      <input class="calcTotal hide" type="number" value="${total}">
      <h2>&#8358;<span class="show-total">${formatCash(total)}</span></h2>
  </td>
  <td class="">
  </td>
</tr>
`;

/**
 * Flush irrelevant details on the my-cart-page when the cart is empty
 */
const renderEmptyCart = () => {
  document
    .querySelector('.table')
    .insertAdjacentHTML('afterend', '<h3 class="text-center">No food Items in cart</h3>');
  document.querySelector('.place-order').classList.add('hide');
  document.querySelector('.placeOrderModal').classList.add('hide');
};

// Check for flash messages
const flashMsg = localStorage.getItem('flash') || undefined;
if (flashMsg) {
  const flashContent = JSON.parse(flashMsg);
  flash(flashContent[0], flashContent[1]);
  localStorage.removeItem('flash');
}

// Default actions that can be performed on a few app pages
const appAction = (event) => {
  if (event.target.classList.contains('logout')) {
    localStorage.clear();
    redirectTo('../signin.html', false);
    setFlash('flash-error', 'You have logged out from Fast Food Fast');
  }
  if (event.target.classList.contains('reload')) {
    document.querySelector('.loader').classList.remove('hide');
    setInterval(() => {
      window.location.reload();
    }, 800);
  }
};

window.addEventListener('click', appAction);
