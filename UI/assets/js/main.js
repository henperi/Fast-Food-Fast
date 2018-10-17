/**
 * Event to fire as the page sets up
 */
window.addEventListener('load', () => {
  document.querySelector('.setup-page').classList.remove('hide');
  setInterval(() => {
    document.querySelector('.setup-page').classList.add('hide');
    document.querySelector('.container').classList.remove('hide');
  }, 2000);
});

/**
 * Toggle Items on the dom
 */
const toggler = (event) => {
  if (event.target.classList.contains('triggerModal')) {
    const targetModal = event.srcElement.getAttribute('data-target');
    document.getElementById(`#${targetModal}`).classList.toggle('show-modal');
  }
  if (event.target.classList.contains('close-button')) {
    const modalToClose = event.target.offsetParent.offsetParent.getAttribute('id');
    document.getElementById(modalToClose).classList.toggle('show-modal');
  }
  if (event.target.classList.contains('modal')) {
    event.target.classList.toggle('show-modal');
  }
  if (event.target.parentElement.parentElement.classList.contains('topnav')) {
    event.target.parentElement.parentElement.classList.toggle('responsive');
  }
  if (event.target.classList.contains('reload')) {
    document.querySelector('.loader').classList.remove('hide');
    setInterval(() => {
      window.location.reload();
    }, 800);
  }
};

/**
 * Custom Redirects with or without flash messages
 */
const redirectWithFlash = (url, flashMsg, canReturn) => {
  if (!flashMsg && !canReturn) {
    window.location.href = url;
  }
  if (flashMsg && !canReturn) {
    localStorage.setItem('flashMsg', flashMsg);
    window.location.href = url;
  }
  localStorage.setItem('flashMsg', flashMsg);
  window.location.replace(url);
};

// Add an event listener to the dom to listen for certain types of events
window.addEventListener('click', toggler);
