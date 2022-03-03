export const setOverflowY = (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "unset";
};

export const isFullfilled = (form) => {
  return Object.keys(form).some((key) => form[key] === "");
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
  window.localStorage.setItem("cartItems", JSON.stringify(newCart));
};
