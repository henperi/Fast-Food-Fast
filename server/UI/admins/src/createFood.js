const foodName = document.querySelector('.foodName');
const description = document.querySelector('.description');
const unitPrice = document.querySelector('.unitPrice');
const foodImg = document.querySelector('.foodImg');
const quantityAvailable = document.querySelector('.quantityAvailable');
const foodCat = document.querySelector('.foodCat');
const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');
const createFoodForm = document.querySelector('form');

window.addEventListener('keypress', () => {
  responseArea.innerHTML = '';
});

createFoodForm.addEventListener('submit', (e) => {
  e.preventDefault();

  responseArea.innerHTML = '';
  loader.classList.remove('hide');
  let localMsg;
  const localErrors = [];
  let localErrorMsg = '';

  if (!foodName.value) {
    localMsg = { msg: 'Food name can not be empty' };
    localErrors.push(localMsg);
  }
  if (foodName.value.length < 3) {
    localMsg = {
      msg: 'Food name is too short, please give it a proper name with at least 3 characters',
    };
    localErrors.push(localMsg);
  }
  if (foodName.value.length > 30) {
    localMsg = {
      msg: 'Food name is too long, please give it a name with a maximum of 30 characters',
    };
    localErrors.push(localMsg);
  }
  if (!description.value) {
    localMsg = { msg: 'Food description can not be emptty' };
    localErrors.push(localMsg);
  }
  if (description.value.split(' ').length < 5) {
    localMsg = {
      msg: 'Description is too short, please give a proper description with at least 5 words',
    };
    localErrors.push(localMsg);
  }
  if (description.value.split(' ').length > 10) {
    localMsg = {
      msg: 'Description is too long, please give a description with a maximum of 10 words',
    };
    localErrors.push(localMsg);
  }
  if (!unitPrice.value) {
    localMsg = { msg: 'Your passwords must match' };
    localErrors.push(localMsg);
  }
  if (!foodImg.value) {
    localMsg = { msg: 'Your fullname is too short, use a valid name' };
    localErrors.push(localMsg);
  }
  if (!quantityAvailable.value) {
    localMsg = { msg: 'Your Name is too long, shorten it' };
    localErrors.push(localMsg);
  }
  if (!foodCat.value) {
    localMsg = {
      msg: 'Your Address is too short, at least tell us your city and street number',
    };
    localErrors.push(localMsg);
  }
  if (localErrors.length > 0) {
    localErrors.forEach((err) => {
      localErrorMsg += `<li class='list-item text-red'>${err.msg}</li>`;
    });
    responseArea.innerHTML = `${localErrorMsg}`;
    loader.classList.add('hide');
    return;
  }
  // Upload the image to cloudinary first

  // Then submit the food, its data and cloudinary image URL to my API
  const createFoodData = {
    foodName: foodName.value,
    description: description.value,
    unitPrice: unitPrice.value,
    foodImg: foodImg.value,
    quantityAvailable: quantityAvailable.value,
    foodCat: foodCat.value,
  };
  const createFoodUrl = `${localAPI}/menu`;
  fetch(createFoodUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': userToken,
    },
    body: JSON.stringify(createFoodData),
  })
    .then(res => res.json())
    .then((data) => {
      // console.log('data', data);
      // If no errors and food creation is successfull
      if (data.success) {
        loader.classList.add('hide');
        responseArea.innerHTML = `<li class="list-item text-green">${data.success_msg}</li>`;

        // Empty the input fields
        // foodName.value = '';
        // description.value = '';
        // unitPrice.value = '';
        // foodImg.value = '';
        // quantityAvailable.value = '';
        // foodCat.value = '';
        flash('flash-success', `${data.success_msg}`);
        return;
      }

      const { errors } = data;
      errors.forEach((error) => {
        responseArea.innerHTML += `<li class="list-item text-red">${error.msg}</li>`;
      });
      loader.classList.add('hide');
    })
    .catch((error) => {
      console.log('err', error);
      loader.classList.add('hide');
      responseArea.innerHTML = '<li class="list-item text-red">A network error occured tried again</li>';
      flash('flash-error', `<li class="list-item">${error}</li>`);
    });
});
