const orderButton = document.querySelector(".product__button");
const addToCartWindow = document.querySelector(".add-to-cart");
const addToCartButton = document.querySelector(".add-to-cart__button");
const addToCartButtons = document.querySelectorAll(".goods-card__cart");
const modalRadioButtons = document.querySelectorAll(".add-to-cart__radio");
const modalBack = document.querySelector(".modal-background");

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
    modalRadioButtons[0].focus();
  }
};

if (orderButton) {
  orderButton.addEventListener("click", toggleModal);
};

modalBack.addEventListener("click", toggleModal);

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", toggleModal);
}

window.addEventListener("keydown", function (evt) {
  if (addToCartWindow.classList.contains("modal--opened")) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      addToCartWindow.classList.remove("modal--opened");
      modalBack.classList.remove("modal-background--opened");
      addToCartWindow.classList.add("modal--closed");
      modalBack.classList.add("modal-background--closed");
    }

    for (let i = 0; i < modalRadioButtons.length; i++) {
      if (evt.target === modalRadioButtons[i]) {
        if (evt.shiftKey && evt.keyCode == 9) {
          evt.preventDefault();
          addToCartButton.focus();
        }
      } else if (evt.target === addToCartButton) {
        if (evt.keyCode === 9) {
          evt.preventDefault();
          modalRadioButtons[0].focus();
          modalRadioButtons[0].checked = true;
        }
      }
    }
  }
});
