import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  editCartItemQty,
  deleteItemLocalStorage,
  editLocalQty,
  updateSubtotal,
} from "../Redux/Actions/actions";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartItem = ({ item, session }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.quantity);

  const handleEditQuantity = (session, id, e) => {
    // if (e.target.value === "0" || e.target.value === "") {
    //   if (session.length > 0) {
    //     // dispatch(deleteCartItem(session.id, id));  
    //   } else {
    //     dispatch(deleteItemLocalStorage(id));
    //     dispatch(updateSubtotal());
    //     return;
    //   }
    // }
    // if (session.length > 0) {
    //   dispatch(
    //     editCartItemQty({
    //       sessionId: session,
    //       productId: id,
    //       quantity: e.target.value,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     editLocalQty(
    //       id,
    //       e.target.value,
    //     )
    //   );
    //   dispatch(updateSubtotal());
    // }
    setQty(e.target.value);
  };

  const handleAdd = () => {
    if (session.length > 0) {
      // dispatch(addCartItem(session.id, product.id));
    } else {
      setQty(qty + 1);
      dispatch(editLocalQty(item.id, qty + 1));
      dispatch(updateSubtotal());
    }
  };
  const handleSubstract = () => {
    if (session.length) {
      // dispatch(editCartItemQty(session.id, item.id, qty - 1));
    } else {
      if (qty - 1 === 0) {
        dispatch(deleteItemLocalStorage(item.id));
        dispatch(updateSubtotal());
      }
      setQty(qty - 1);
      dispatch(editLocalQty(item.id, qty - 1));
      dispatch(updateSubtotal());
    }
  };
  const handleDeleteItem = (session, id) => {
    if (session.length > 0) {
      dispatch(deleteCartItem(session, id));
    } else {
      dispatch(deleteItemLocalStorage(id));
      dispatch(updateSubtotal());
    }
  };

  return (
    <div className="item--container">
      <div
        className="item--image"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="item--info">
        <div className="item-info--header">
          <p className="item-info--header-title">{item.name}</p>
          <p className="item-info--header-price">
            ${Number(Math.round(item.price * item.quantity + "e2") + "e-2")}
          </p>
        </div>
        <div className="item-info--body">
          <p className="item-info--body-code">{item.SKU}</p>
        </div>
        <div className="item-info--footer">
          <div className="item-info--footer-qty">
            <FiMinus className="item--icon" onClick={handleSubstract} />
            <input
              className="item-info--footer-qty-input"
              type="number"
              min={0}
              max={100} // item.stock o item.inventory (en tabla de products no esta deberia traerlo de tal forma que pueda hacer item.inventory)
              value={qty}
              onChange={(e) => handleEditQuantity(session, item.id, e)}
            />
            <FiPlus className="item--icon" onClick={handleAdd} />
          </div>
          <p
            className="item-info--footer-delete"
            onClick={() => handleDeleteItem(session, item.id)}
          >
            Eliminar
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
