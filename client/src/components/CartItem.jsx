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
import { editQuantity } from "../services";

const CartItem = ({ item, session }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.quantity);
  
  const handleEditQuantity = (e) => {
    let ammount = Number(e.target.value)
    if(ammount > item.inventory) {
      alert('Not enogh stock')
    } else if(ammount < 1) {
      setQty(1);
    } else {
      setQty(ammount)
      dispatch(editLocalQty(item.id, ammount));
    }
  };

  const handleAdd = () => {
    if(item.quantity < item.inventory) {
      setQty(qty + 1);
      dispatch(editLocalQty(item.id, qty + 1));
      dispatch(updateSubtotal());
    } else alert('Not enough stock')
  };
  const handleSubstract = () => {
    if (qty-1 < 1) {
      handleDeleteItem(item.id);
    } else {
      setQty(qty - 1);
      dispatch(editLocalQty(item.id, qty - 1));
      dispatch(updateSubtotal());
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItemLocalStorage(id));
    dispatch(updateSubtotal());
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
              max={item.inventory} // item.stock o item.inventory (en tabla de products no esta deberia traerlo de tal forma que pueda hacer item.inventory)
              value={qty}
              onChange={handleEditQuantity}
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
