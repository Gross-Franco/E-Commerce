import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../Redux/Actions/actions";

const Cart = ({ setOpenModal, openModal }) => {
  const { cartItems, loadCart, session } = useSelector(
    (state) => state.shopping
  );
  const dispatch = useDispatch();

  if (loadCart) dispatch(getCartItems(session.id));

  const handelClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="cart-container" onClick={handelClick}>
      <FiShoppingCart className="cart-icon" />
      <div className="cart-count">{cartItems.length || 0}</div>
    </div>
  );
};
export default Cart;
