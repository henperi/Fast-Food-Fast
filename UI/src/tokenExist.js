const userToken = localStorage.getItem('userToken') || undefined;

if (userToken) {
  localStorage.setItem('flashMsg', 'You are already loged in');
  window.location.replace('users/foods.html');
}
