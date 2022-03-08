import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BackButton, CreateCategory, Input } from "../components";
import { OrderDetails, InputRow } from "./";
import { validator } from "../helpers/formValidation/createproduct";

import {
  createProduct,
  getCategories,
  updateProduct,
  setAddOrUpdate,
} from "../Redux/Actions/actions";

const AddContainer = ({ option, setIsOpen }) => {
  const { categories } = useSelector((state) => state.categories);
  const { addOrUpdate } = useSelector((state) => state.general);

  const initialState = {
    name: addOrUpdate?.name || "",
    description: addOrUpdate?.description || "",
    price: addOrUpdate?.price || "",
    category: addOrUpdate?.category || [],
    SKU: addOrUpdate?.SKU || "",
    quantity: addOrUpdate?.quantity || "",
    image: addOrUpdate?.image || "",
    inactive: addOrUpdate?.inactive || false
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({
    price: false,
    SKU: false,
    quantity: false,
    image: false,
  });
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();

  const validate = async (e) => {
    setErrors({
      ...errors,
      [e.target.name]: await validator(e.target.name, e.target.value),
    });
  };

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
    } else if (e.target.name === "inactive") {
      setForm({
        ...form,
        inactive: e.target.checked
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addOrUpdate === "add") {
      dispatch(createProduct(form));
      setForm(initialState);
      setIsOpen(false);
    } else {
      dispatch(updateProduct({ ...form, id: addOrUpdate.id }));
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

  if (option === "Pedidos")
    return <OrderDetails option={option} setIsOpen={setIsOpen} />;


  return (
    <div className="add--container">
      <BackButton option={option} handleClick={handleClick} />
      <form className="add-form--container" onSubmit={handleSubmit}>
        <header>
          <h2> {`${addOrUpdate === "add" ? "Añadir" : "Editar"} ` + option}</h2>
        </header>
        <div className="add-form--inputs">
          <div className="add-form--main-space">
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Detalles</h3>
                </header>
              </div>
              <Input
                value={form.name}
                handleChange={handleChange}
                label="Nombre"
                name="name"
              />
              <InputRow>
                <Input
                  value={form.SKU}
                  handleChange={handleChange}
                  label="SKU"
                  name="SKU"
                  handleBlur={validate}
                />
                {errors.SKU && <span>{errors.SKU}</span>}
                <Input
                  value={form.quantity}
                  handleChange={handleChange}
                  label="Cantidad"
                  name="quantity"
                  type="number"
                  min="0"
                  onBlur={validate}
                />

                {errors.quantity && <span>{errors.quantity}</span>}
              </InputRow>
              <Input
                value={form.description}
                handleChange={handleChange}
                label="Descripción"
                name="description"
                type="textarea"
              />
            </div>
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Precio</h3>
                </header>
              </div>
              <Input
                value={form.price}
                handleChange={handleChange}
                label="Precio"
                name="price"
                type="number"
                step="0.01"
                min="0"
                onBlur={validate}
              />
              {errors.price && <span>{errors.price}</span>}
            </div>
            <div className="add-form--input-wrapper">
              <div>
                <header>
                  <h3>Galeria de imagenes</h3>
                </header>
              </div>
              <Input
                value={form.image}
                handleChange={handleChange}
                label="Imagen"
                name="image"
                onBlur={validate}
              />
              {errors.image && <span>{errors.image}</span>}
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
              <div>
                <label>
                  Inactivo
                  <input type="checkbox" onChange={handleChange} name="inactive" checked={form.inactive}/>
                </label>
              </div>
            </div>
            <div className="add-form--input-wrapper">
              <header>
                <h3>Categorias</h3>
              </header>
              <div>
                <div
                  className={`add-form--input add-form--input-dropdown ${openDropdown ? "selected" : ""
                    }`}
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <span>Elige categoria</span>
                  <RiArrowDropDownLine
                    className={`add-form--arrow-dropdown ${openDropdown ? "open" : ""
                      }`}
                  />
                </div>
              </div>
            </div>
            {openDropdown && (
              <div className="add-form--input-wrapper">
                {categories.map((category) => (
                  <div key={category.id} className="add-form--dropdown-option">
                    <label>{category.name}
                      <input
                        type="checkbox"
                        checked={form.category.includes(category.name)}
                        name="category"
                        value={category.name}
                        onChange={handleChange}
                      />
                    </label>
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
