import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { getLocalStorage } from "../Redux/Actions/actions";
import { IoMdClose } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const { cartStorage, session, subTotal } = useSelector(
    (state) => state.shopping
  );

  let qty =
    cartStorage?.length > 0
      ? cartStorage.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      : 0;

  useEffect(() => {
    dispatch(getLocalStorage());
  }, []);

  const handleCompra = (items) => {
    // dispatch(createOrder(items)) // falta la action de createOrder en redux
    // dispatch(loadCartOnDB(cartStorage)) // falta crear en back
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
      {!cartStorage?.length > 0 && (
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
      {cartStorage?.length > 0 && (
        <div>
          <div className="modal-cart--body">
            {cartStorage.map((item) => (
              <CartItem key={item.id} item={item} session={session} />
            ))}
          </div>
          <div className="modal-cart--footer">
            <div className="modal-cart--footer-total">
              <p className="modal-cart--footer-total-text">Subtotal</p>
              <p className="modal-cart--footer-total-price">${subTotal}</p>
              <p className="modal-cart--footer-total-text">Productos Totales</p>
              <p className="modal-cart--footer-total-price">{qty}</p>
            </div>
            <div className="modal-cart--footer-buttons">
              <Link
                to="/catalogo"
                className="modal-cart--footer-button shopping"
                onClick={handleClick}
              >
                Continuar Comprando
              </Link>
              <StripeButton subtotal={subTotal}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
