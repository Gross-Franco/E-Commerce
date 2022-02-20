import React, { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CreateCategory } from "../components";
import { createProduct, getCategories } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  SKU: "",
  quantity: "",
};

const AddContainer = ({ option, setIsOpen }) => {
  const [form, setForm] = useState(initialState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(form));
    console.log(form);
    setForm(initialState);
    setIsOpen(false);
  };

  

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (option === "Categorias")
    return <CreateCategory option={option} setIsOpen={setIsOpen} />;

  return (
    <div className="add--container">
      <div className="add--back">
        <button onClick={() => setIsOpen(false)} className="add--back-btn">
          <BsArrowLeftShort /> {option}
        </button>
      </div>
      <form className="add-form--container" onSubmit={handleSubmit}>
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
              <div className="add-form--input-wrapper_row">
                <div className="add-form--input-wrapper_column">
                  <label>SKU</label>
                  <input
                    type="text"
                    name="SKU"
                    className="add-form--input"
                    onChange={handleChange}
                  />
                </div>
                <div className="add-form--input-wrapper_column">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    className="add-form--input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-form--input-wrapper_column">
                <label>Descripción</label>
                <textarea
                  name="description"
                  className="add-form--input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Precio</h3>
                </header>
              </div>
              <div className="add-form--input-wrapper_column">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  className="add-form--input"
                  onChange={handleChange}
                />
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
              <hr />
              <div className="add-form--input-wrapper_row">
                <input type="checkbox" />
                <label>Inactivo </label>
              </div>
            </div>
            <div className="add-form--input-wrapper">
              <header>
                <h3>Categorias</h3>
              </header>
              <div>
                <div
                  className="add-form--input"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  {" "}
                  Elige categoria <RiArrowDropDownLine />{" "}
                </div>
              </div>
            </div>
            {openDropdown  && (
                <div className="add-form--input-wrapper">
                {categories.map((category, i) => (
                    <div key={category + i}>
                      <label>{category}</label>
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        onChange={handleChange}
                        /> 
                    </div>
                ))}
                </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContainer;
