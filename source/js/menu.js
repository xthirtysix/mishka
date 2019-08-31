let menuButton = document.querySelector(".main-nav__button");
let menu = document.querySelector(".main-nav");

menu.classList.remove("main-nav--no-js");
menu.classList.remove("main-nav--opened");
menu.classList.add("main-nav--closed");

menuButton.addEventListener("click", function() {
  if (menu.classList.contains("main-nav--closed")) {
    menu.classList.remove("main-nav--closed");
    menu.classList.add("main-nav--opened");
  } else {
    menu.classList.remove("main-nav--opened");
    menu.classList.add("main-nav--closed");
  }
});
