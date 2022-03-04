export const setOverflowY = (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "unset";
};

export const isFullfilled = (form, errors) => {
  if (form && errors) {
    return Object.keys(form).some((key) => form[key] === "") && Object.keys(errors).every((key) => errors[key] === false);
  } else {
    return Object.keys(form).some((key) => form[key] === "");
  }
};

export const saveLocalStorage = (product) => {
  const cart = JSON.parse(window.localStorage.getItem("cartItems"));
  let newCart = [];
  if (!cart) {
    newCart = [product];
  } else {
    newCart = cart.every((item) => item.id !== product.id)
      ? [...cart, product]
      : cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
  }
  let subTotal = Number(
    Math.round(
      newCart.reduce((acc, item) => acc + item.price * item.quantity, 0) + "e2"
    ) + "e-2"
  );
  window.localStorage.setItem("subTotal", JSON.stringify(subTotal));
  window.localStorage.setItem("cartItems", JSON.stringify(newCart));
};
