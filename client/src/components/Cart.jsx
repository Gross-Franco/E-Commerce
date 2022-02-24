import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  return (
    <div className="cart-container">
      <FiShoppingCart className="cart-icon" />
      <div className="cart-count">0</div>
    </div>
  );
};
export default Cart;
