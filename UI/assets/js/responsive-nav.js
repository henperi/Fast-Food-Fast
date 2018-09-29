/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
/**Source W3schools.com */
function myFunction() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * Toggle modals
 */
let modal = document.querySelector(".modal");
let trigger = document.querySelectorAll(".triggerModal");
let closeButton = document.querySelectorAll(".close-button");

toggleModal = event => {
  targetModal = event.srcElement.getAttribute("data-target");
  // console.log(event.target.getAttribute("data-target"));
  modalItem = document.getElementById(`#${targetModal}`);
  // console.log(modalItem);
  modalItem.classList.toggle("show-modal");
};
// console.log(modal);
closeModal = () => {
  // if(event.target)
  modal.classList.toggle("show-modal");
};

windowOnClick = event => {
  // console.log(event.target.className);
  if (event.target.className == "modal show-modal") {
    // console.log(event.target.className);
    // console.log(event);
    event.target.classList.toggle("show-modal");
    // closeModal();
  }
};
// console.log(trigger[0].data);

for (let i = 0; i < trigger.length; i++) {
  trigger[i].addEventListener("click", toggleModal);
}

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", event => {
    modalToClose = event.target.offsetParent.offsetParent.getAttribute("id");
    // console.log(modalToClose);
    document.getElementById(modalToClose).classList.toggle("show-modal");
  });
}
window.addEventListener("click", windowOnClick);
