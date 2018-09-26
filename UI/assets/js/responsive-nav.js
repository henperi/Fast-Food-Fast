/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * Toggle modals
 */
var modal = document.querySelector(".modal");
var trigger = document.querySelectorAll(".triggerModal");
var closeButton = document.querySelectorAll(".close-button");

toggleModal = () => {
  modal.classList.toggle("show-modal");
};

windowOnClick = event => {
  if (event.target === modal) {
    toggleModal();
  }
};

console.log(trigger[0].data);

for (let i = 0; i < trigger.length; i++) {
  trigger[i].addEventListener("click", toggleModal);
}

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", toggleModal);
}
window.addEventListener("click", windowOnClick);
