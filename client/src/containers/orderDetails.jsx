import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus } from "../Redux/Actions/actions";

const OrderDetails = ({ option, setIsOpen }) => {
  const { addOrUpdate } = useSelector(state => state.general)
  const initialState = {
        id: addOrUpdate.id,
        total: addOrUpdate.total,
        status: addOrUpdate.status,
        date: addOrUpdate.createdAt,
        paymentDetails: addOrUpdate.payment_id,
        userDetails: addOrUpdate.user_id,
        orderiIems: addOrUpdate.CartItems,
    }
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setForm({
      ...form,
      status: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeOrderStatus(form.status));
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
                  <h3>Detalles del pedido {form.id}</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_row">
                <div className="add-form--input-wrapper_column">
                    <label>Total</label>
                    <input type="text" name="description" className="add-form--input" value={form.total} disabled/>
                </div>
                <div className="add-form--input-wrapper_column">
                    <label>Status</label>
                        <select name="estados" id="estados" onChange={handleStatusChange}>
                            {
                                form.status === "Created" && 
                                <option value="Created" selected>Created</option>
                            }
                            {
                                form.status === "Created" && 
                                <option value="Processing">Processing</option>
                            }
                            {
                                form.status === "Processing" &&
                                <option value="Processing" selected>Processing</option>
                            }
                            {
                                form.status === "Processing" &&
                                <option value="Completed">Completed</option>
                            }
                            <option value="Cancelled">Cancelled</option>
                        </select>
                </div>
                <div className="add-form--input-wrapper_column">
                    <label>Fecha</label>
                    <input type="text" name="description" className="add-form--input" value={form.date} disabled/>
                </div>
              </div>
            </div>
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Usuario</h3>
                </header>
              </div>
              <div>
                <input type="text" className="add-form--input" value={form.userDetails} disabled/>
              </div>
            </div>
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
                <h3>Categoria Padre</h3>
              </header>
              <div>
                <div className="add-form--input">
                  {" "}
                  Elige categoria <RiArrowDropDownLine />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
