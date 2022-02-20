import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { createCategory } from "../Redux/Actions/actions";

const CreateCategory = ({ option, setIsOpen }) => {
  const [form, setForm] = useState({
    name: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(form));
    console.log(form);
    setForm({
      name: "",
    });
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
                  <h3>Detalles</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_column">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="add-form--input"
                  onChange={handleChange}
                />
              </div>
              <div className="add-form--input-wrapper_column">
                <label>Descripción</label>
                <textarea className="add-form--input" />
              </div>
            </div>
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Galeria de imagenes</h3>
                </header>
              </div>
              <div>
                <input type="file" className="add-form--input" />
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

export default CreateCategory;
