const flashMsg = localStorage.getItem('flashMsg') || undefined;

if (flashMsg) {
  alert(flashMsg);
  localStorage.removeItem('flashMsg');
}
