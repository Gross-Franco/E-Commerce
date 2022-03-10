import React from "react";
import { IoMdClose } from "react-icons/io";

const UserOrder = ({ order, setOpenModal }) => {
  console.log(order);

  return (
    <div className="order-detail--container">
      <div className="order-detail--header">
        <p className="order-detail--header-title">
          Tu orden <span className="title-span">#{order?.id}</span>
        </p>
        <IoMdClose
          onClick={() => setOpenModal(false)}
          className="order-detail--header-icon"
        />
      </div>
      <div className="order-detail--body">
        {order?.orderItems.map((item) => {
          return (
            <div className="order-detail--item" key={item?.SKU}>
              <div
                className="order-detail--item-image"
                style={{ backgroundImage: `url(${item?.image})` }}
              ></div>
              <div className="order-detail--item-description">
                <div className="order-detail--item-description-title">
                  <p className="order-detail--item-description-product">
                    {item?.product}
                  </p>
                  <p className="order-detail--item-description-total">
                    ${item?.price} x {item?.quantity}
                  </p>
                </div>
                <p className="order-detail--item-description-quantity">
                  Cantidad: {item?.quantity}
                </p>
                <p className="order-detail--item-description-sku">
                  {item?.SKU}
                </p>
              </div>
            </div>
          );
        })}
        <div className="order-detail--meta-info">
          <div className="order-detail--row">
            <p className="order-detail--row--item">Estado de la orden: </p>
            <p className="order-detail--row--item">{order?.status}</p>
          </div>
          <div className="order-detail--row">
            <p className="order-detail--row--item">
              {new Date(order?.createdAt).toLocaleDateString()}
            </p>
            <p className="order-detail--row--item">
              {new Date(order?.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="order-detail--row">
            <p className="order-detail--row--item">Proovedor de pago:</p>
            <p className="order-detail--row--item">{order.payment?.provider}</p>
          </div>
          <div className="order-detail--row">
            <p className="order-detail--row--item">{order.payment?.status}</p>
          </div>
        </div>
      </div>
      <div className="order-detail--footer">
        <p className="order-detail--footer-total">Total</p>
        <p className="order-detail--footer-total">
          $
          {order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default UserOrder;
