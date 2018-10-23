updateCartCounter();

/**
 * Add an item to cart
 */
const addToCart = (event) => {
  if (event.target.classList.contains('addToCart')) {
    // cartItems = localStorage.getItem('foodItems') || undefined;
    // foodItems = cartItems ? JSON.parse(cartItems) : [];
    getCart();
    // Get the foodId and quantity to add
    const foodId = event.srcElement.getAttribute('data-foodId');
    const quantity = Number(document.getElementById(`#${foodId}`).querySelector('.quantity').value) || 1;

    let n = 0;
    // Check if the foodId is in cart already
    for (let i = 0; i < foodItems.length; i += 1) {
      const isInCart = foodItems[i].foodId.indexOf(foodId);

      if (isInCart !== -1) {
        // The food is in cart already so increment it
        foodItems[i].quantity += Math.abs(quantity);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateCartCounter(foodItems);
        flash(
          'flash-success',
          `Increased the quantity of this item in your cart by ${Math.abs(quantity)}`,
        );
        n += 1;
      }
    }
    if (n === 0) {
      // It is not in cart so add it
      const newItem = { foodId, quantity };

      foodItems.push(newItem);
      localStorage.setItem('foodItems', JSON.stringify(foodItems));

      updateCartCounter(foodItems);
      flash('flash-success', 'Item added to cart');
    }
    document
      .getElementById(`#${foodId}`)
      .querySelector('.close-button')
      .click();
  }
};

/**
 * Remove an item to cart
 */
const removeFromCart = (event) => {
  if (event.target.classList.contains('removeFromCart')) {
    // Get the current foodItems in cart
    cartItems = localStorage.getItem('foodItems') || undefined;
    foodItems = cartItems ? JSON.parse(cartItems) : [];

    const foodId = event.srcElement.getAttribute('data-foodId');
    const price = event.srcElement.getAttribute('data-price');
    const totalInput = document.querySelector('.calcTotal');

    // Check if the food being deleted exists in cart
    for (let i = 0; i < foodItems.length; i += 1) {
      const isInCart = foodItems[i].foodId.indexOf(foodId);

      // Set the currrent total here
      let curretnTotal = totalInput.value;
      if (isInCart !== -1) {
        // The food is in cart so delete it from cart and view
        foodItems.splice(i, 1);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
        document.querySelector('tbody').removeChild(document.getElementById(`#${foodId}_row`));

        flash('flash-error', 'Item deleted from cart');
        updateCartCounter(foodItems);
        curretnTotal -= price;
        document.querySelector('.show-total').innerHTML = curretnTotal;
        totalInput.value = curretnTotal;
      }
    }
    if (foodItems.length === 0) {
      // No foodItems so remove delete the currentTotal
      // And remove foodItems from local storage and hide the place order btn
      localStorage.removeItem('foodItems');
      document.querySelector('tbody').removeChild(document.getElementById('#total'));
      document.querySelector('.place-order').classList.toggle('hide');
      renderEmptyCart();
    }
    // close the modal
    document
      .getElementById(`#${foodId}_deleteModal`)
      .querySelector('.close-button')
      .click();
  }
};

/**
 * Empty the cart
 */
const emptyCart = (event) => {
  if (event.target.classList.contains('emptyCart')) {
    localStorage.removeItem('foodItems');
  }
};

window.addEventListener('click', addToCart);
window.addEventListener('click', removeFromCart);
window.addEventListener('click', emptyCart);
