// Redirect To location
if (!userToken) {
  flash('flash-error', 'You need to login to access this page');
  setFlash('flash-error', 'You need to login to access this page');
  redirectTo('../signin.html');
}

// Fetch the user profile
fetchAuthUserProfile();
