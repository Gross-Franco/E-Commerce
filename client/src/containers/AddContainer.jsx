import React, { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CreateCategory } from "../components";

import { createProduct, getCategories, updateProduct, setAddOrUpdate } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";

const AddContainer = ({ option, setIsOpen }) => {
  const { categories, addOrUpdate } = useSelector((state) => state);

  const initialState = {
    name: addOrUpdate?.name || "",
    description: addOrUpdate?.description || "",
    price: addOrUpdate?.price || "",
    category: addOrUpdate?.category || [],
    SKU: addOrUpdate?.SKU || "",
    quantity: addOrUpdate?.quantity || "",
    image: addOrUpdate?.image || "",
  };

  const [form, setForm] = useState(initialState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "category") {
      if (e.target.checked) {
        setForm({
          ...form,
          category: [...form.category, e.target.value],
        });
      } else {
        setForm({
          ...form,
          category: form.category.filter((item) => item !== e.target.value),
        });
      }
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    if (addOrUpdate === "add") {
      dispatch(createProduct(form));
      setForm(initialState);
      setIsOpen(false);
    } else {
      dispatch(updateProduct({...form, id: addOrUpdate.id}));
      dispatch(setAddOrUpdate("add"));
      setForm(initialState);
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    dispatch(setAddOrUpdate("add"));
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
        <button onClick={handleClick} className="add--back-btn">
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
                  value={form.name}
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
                    value={form.SKU}
                    name="SKU"
                    className="add-form--input"
                    onChange={handleChange}
                  />
                </div>
                <div className="add-form--input-wrapper_column">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    value={form.quantity}
                    min="0"
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
                  value={form.description}
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
                  step="0.01"
                  value={form.price}
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
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  className="add-form--input"
                  placeholder="https://ipsum/200/300"
                  onChange={handleChange}
                />
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
                  className="add-form--input add-form--input-dropdown"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <span>Elige categoria</span>
                  <RiArrowDropDownLine
                    className={`add-form--arrow-dropdown ${
                      openDropdown ? "open" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            {openDropdown && (
              <div className="add-form--input-wrapper">
                {categories.map((category) => (
                  <div key={category.id} className="add-form--dropdown-option">
                    <label>{category.name}</label>
                    <input
                      type="checkbox"
                      checked={form.category.includes(category.name)}
                      name="category"
                      value={category.name}
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
