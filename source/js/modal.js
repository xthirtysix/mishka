let orderButton = document.querySelector(".product__button");
let addToCartWindow = document.querySelector(".add-to-cart");
let addToCartButtons = document.querySelectorAll(".goods-card__cart");
let modalBack = document.querySelector(".modal-background");

let toggleModal = function (evt) {
  evt.preventDefault();
  if (addToCartWindow.classList.contains("modal--opened")) {
    addToCartWindow.classList.remove("modal--opened");
    modalBack.classList.remove("modal-background--opened");
    addToCartWindow.classList.add("modal--closed");
    modalBack.classList.add("modal-background--closed");
  } else {
    addToCartWindow.classList.add("modal--opened");
    modalBack.classList.remove("modal-background--closed");
    addToCartWindow.classList.add("modal--opened");
    modalBack.classList.remove("modal-background--closed");
  }
};

if (orderButton) {
  orderButton.addEventListener("click", toggleModal);
};

modalBack.addEventListener("click", toggleModal);

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", toggleModal);
}
