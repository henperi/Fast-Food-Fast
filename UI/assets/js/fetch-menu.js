// const fetchUrl = 'http://localhost:5000/api/v1/menu';

// fetch(fetchUrl)
//   .then(response => response.json())
//   .then(data => console.log(data));

// alert(555);

const menu = document.querySelector('.food-menu');

const newFood = `
  <div class="food-item card card-shadow card-shadow">
    <div class="flex">
      <div class="image-div">
        <img src="img/food-items/1.jpg" class="image" width="100%" />
      </div>
      <div class="content-div">
        <div class="item-title">Chicken Stew and Rice -
          <span class="badge price">&#8358;3,500</span>
        </div>
        <div class="item-subtitle">
          <a href="">Cooked Foods</a>
        </div>
        <div class="item-description">qwewdsc asdfefedv ewdscvev dsfedv ewdvewv svewvfd ewfsfev fvdcvev vre</div>
        <span class="item-description link">More Details</span>
      </div>
    </div>
    <div>
      <a href="users/order-now.html">
        <button class="btn btn-primary">Order Now</button>
      </a>
      <button class="triggerModal btn btn-blue" data-target="cartModal5">Add to Cart</button>

      <div class="modal" id='#cartModal17'>
        <div class="modal-content">
          <div class="text-center">
            <span class="close-button btn btn-primary btn-sm push-right">x</span>
            <h2 class="text-center">Add WWWthis food item to existing Cart</h2>

            <div class="content-div">
              <div class="item-title">Chicken Stew and Rice -
                <span class="badge price">&#8358;3,500</span>
              </div>
              <div class="item-description">
                <p>qwewdsc asdfefedv ewdscvev dsfedv ewdvewv svewvfd ewfsfev fvdcvev vre asc
                  eqwewdsc asdfefedv ewdscvev dsfedv ewdvewv svewvfd ewfsfev fvdcvev vres</p>
              </div>
            </div>
            <form method="POST" class="xform-data xfood-item card card-shadow">
              <div class="flex">
                <h2>Desired Quantity</h2>
                <div class="form-member text-left">
                  <input type="number" class="form-input" placeholder="Enter Desired Quantity example 3">
                </div>
                <button onclick="toggleModal" class="btn btn-blue btn-block btn-rounded btn-bg">Add To Cart</button>
              </div>
            </form>
            <button class="close-button btn btn-primary btn-block btn-rounded btn-bg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
// const textnode = document.createTextNode('Water');
// menu.appendChild(textnode);
// menu.innerHTML = '';

const div = document.createElement('span');
// div.className = 'alert alert-success';
div.innerHTML = newFood;
// menu.innerHTML = '';
menu.insertAdjacentHTML('beforeend', newFood);
// menu.addEventListener('click', toggleModal);
