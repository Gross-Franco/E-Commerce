import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { getCartItems } from "../Redux/Actions/actions";
import { IoMdClose } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const { cartItems, loadCart } = useSelector(
    (state) => state.shopping
  );

  if (loadCart) {
      dispatch(getCartItems());
  } 
  const subTotal = Number(Math.round((cartItems?.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0)) + "e2") + "e-2") || 0;
  const handleCompra = (items) => {
    // dispatch(createOrder(items)) // falta la action de createOrder en redux
  };

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="modal-cart--container">
      <div className="modal-cart--header">
        <p className="modal-cart--header-title">Carrito de compras</p>
        <IoMdClose className="modal-cart--close" onClick={handleClick} />
      </div>
      {!cartItems.length > 0 && (
        <div className="modal-cart--empty-container">
          <div className="modal-cart--empty-container-items">
            <BsBag className="modal-cart--empty-container-items-icon" />
            <p className="modal-cart--empty-container-items-text">0</p>
          </div>
          <p className="modal-cart--empty-container-text">
            No hay productos en el carrito
          </p>
        </div>
      )}
      {cartItems?.length > 0 && (
        <div>
          <div className="modal-cart--body">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="modal-cart--footer">
            <div className="modal-cart--footer-total">
              <p className="modal-cart--footer-total-text">Subtotal</p>
              <p className="modal-cart--footer-total-price">${subTotal}</p>
            </div>
            <div className="modal-cart--footer-buttons">
              <Link to="/catalogo" className="modal-cart--footer-button shopping" onClick={handleClick}>
                Continuar Comprando
              </Link>
              <Link to={"/checkout"} className="modal-cart--footer-button checkout">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
