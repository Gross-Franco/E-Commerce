import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus } from "../Redux/Actions/actions";

const OrderDetails = ({ option, setIsOpen }) => {
  const { addOrUpdate } = useSelector((state) => state.general);
  const initialState = {
    id: addOrUpdate.id,
    total: addOrUpdate.total,
    status: addOrUpdate.status,
    date: new Date(addOrUpdate.createdAt).toLocaleDateString(),
    paymentDetails: addOrUpdate.payment,
    userDetails: addOrUpdate.user,
    orderiIems: addOrUpdate.orderItems,
  };
  const [form, setForm] = useState(initialState);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    dispatch(changeOrderStatus(form.id, value));
    e.preventDefault();
    setForm(initialState);
    setIsOpen(false);
  };

  return (
    <div className="add--container">
      <div className="add--back">
        <button onClick={() => setIsOpen(false)} className="add--back-btn">
          <BsArrowLeftShort /> {option}
        </button>
      </div>
      <form className="add-form--container">
        <header>
          <h2>Añadir {option}</h2>
        </header>
        <div className="add-form--inputs">
          <div className="add-form--main-space">
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Detalles del pedido {form?.id}</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_row">
                <div className="add-form--input-wrapper_column">
                  <label>Total</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.total || ""}
                    disabled
                  />
                </div>
                <div className="add-form--input-wrapper_column">
                  <label>Fecha</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.date || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            {Object.keys(form.userDetails).length!=0  ? 
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Pedido del usuario {form?.userDetails.id}</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_row">
                <div className="add-form--input-wrapper_column">
                  <label>Username</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.userDetails.user || ""}
                    disabled
                  />
                </div>
                <div className="add-form--input-wrapper_column">
                  <label>Email</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.userDetails.email || ""}
                    disabled
                  />
                </div>
              </div>
            </div> :
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Pedido del Invitado</h3>
                </header>
              </div>
            </div>
            } 
            {Object.keys(form.paymentDetails).length!=0  ? 
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Pago mediante el proveedor {form?.paymentDetails.provider}</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_row">
                <div className="add-form--input-wrapper_column">
                  <label>Amount</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.paymentDetails.amount || ""}
                    disabled
                  />
                </div>
                <div className="add-form--input-wrapper_column">
                  <label>Status</label>
                  <input
                    type="text"
                    name="description"
                    className="add-form--input"
                    value={form?.paymentDetails.status || ""}
                    disabled
                  />
                </div>
              </div>
            </div> :
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Detalles del pago no encontrados</h3>
                </header>
              </div>
            </div>
            }
          </div>
          <div className="add-form--side-space">
            <div className="add-form--input-wrapper">
              <button
                type="submit"
                className="add-form--save-btn"
                onClick={handleSubmit}
              >
                Guardar cambios
              </button>
            </div>
            <div className="add-form--input-wrapper">
              <header>
                <h4>Order Status</h4>
              </header>
              <div>
                <p>{form.status}</p>
              </div>
              {(form?.status === "Created" && (
                <div className="add-form--input-wrapper_column">
                  <h4> Cambiar estado </h4>
                  <div className="add-form--input-wrapper_row">
                    <label>Processing</label>
                    <input type="radio" name="status" value="Processing" onClick={handleStatusChange} />
                  </div>
                  <div className="add-form--input-wrapper_row">
                    <label>Cancelled</label>
                    <input type="radio" name="status" value="Completed" onClick={handleStatusChange} />
                  </div>
                </div>
              )) ||
                (form?.status === "Processing" && (
                  <div className="add-form--input-wrapper_column">
                  <h4> Cambiar estado </h4>
                  <div className="add-form--input-wrapper_row">
                    <label>Completed</label>
                    <input type="radio" name="status" value="Completed" onClick={handleStatusChange} />
                  </div>
                  <div className="add-form--input-wrapper_row">
                    <label>Cancelled</label>
                    <input type="radio" name="status" value="Cancelled" onClick={handleStatusChange} />
                  </div>
                </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
