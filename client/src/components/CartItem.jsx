import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem, editCartItemQty } from "../Redux/Actions/actions";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.quantity);

  const handleEditQuantity = (product, e) => {
    setQty(e.target.value);
    if (e.target.value === "0") {
      dispatch(deleteCartItem(product));
    }
    dispatch(
      editCartItemQty({
        productId: product,
        quantity: e.target.value,
      })
    );
  };

  const handleDeleteItem = ( product) => {
    dispatch(deleteCartItem( product));
  };

  return (
    <div className="item--container">
      <div
        className="item--image"
        style={{ backgroundImage: `url(${item.product.image})` }}
      />
      <div className="item--info">
        <div className="item-info--header">
          <p className="item-info--header-title">{item.product.name}</p>
          <p className="item-info--header-price">
            ${item.product.price * item.quantity}
          </p>
        </div>
        <div className="item-info--body">
          <p className="item-info--body-code">{item.product.SKU}</p>
        </div>
        <div className="item-info--footer">
          <div className="item-info--footer-qty">
            <FiMinus
              className="item--icon"
              onClick={() =>
                handleEditQuantity(item.product.id, {
                  target: { value: item.quantity - 1 },
                })
              }
            />
            <input
              className="item-info--footer-qty-input"
              type="number"
              min={1}
              max={item.product.quantity}
              value={qty}
              onChange={(e) => handleEditQuantity(item.product.id, e)}
            />
            <FiPlus
              className="item--icon"
              onClick={() =>
                handleEditQuantity(item.product.id, {
                  target: { value: item.quantity + 1 },
                })
              }
            />
          </div>
          <p
            className="item-info--footer-delete"
            onClick={() => handleDeleteItem(item.product.id)}
          >
            Eliminar
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
