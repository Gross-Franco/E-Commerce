import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, getLocalStorage } from "../Redux/Actions/actions";

const CartButton = ({ setOpenModal, openModal }) => {
  const { cartItems, loadCart, session, cartStorage } = useSelector(
    (state) => state.shopping
  );
  const dispatch = useDispatch();

  let strgQty =
    cartStorage?.length > 0
      ? cartStorage.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      : 0;
  let dbQty =
    cartItems?.length > 0
      ? cartItems.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      : 0;
  let qty = cartItems?.length > 0 ? dbQty : strgQty;

  useEffect(() => {
    if (session.length > 0) {
      dispatch(getCartItems(session.id));
    }
    {
      dispatch(getLocalStorage());
    }
  }, []);

  const handelClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="cart-container" onClick={handelClick}>
      <FiShoppingCart className="cart-icon" />
      <div className="cart-count">{qty}</div>
    </div>
  );
};
export default CartButton;
