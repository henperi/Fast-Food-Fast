// const userToken = localStorage.getItem('userToken') || undefined;

if (userToken) {
  flash('flash-success', 'You are already logged in');
  setFlash('flash-success', 'You are already logged in');
  window.location.replace('users/foods.html');
}
