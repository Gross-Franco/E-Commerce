import React, { useEffect, useState } from "react";
import { createUser } from "../Redux/Actions/actions";
import { connectAdvanced, useDispatch, useSelector } from "react-redux";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { isFullfilled } from "../services";
import { useEffect } from "react";
import { validator } from "../helpers/formValidation/register";
import { Notification } from "../components";

export default function Registro() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });
 
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    username: false,
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const validate = async (e) => {
    console.log('value: ', e.target.value)
    console.log('name: ', e.target.name)
    setErrors({
      ...errors,
      [e.target.name]: await validator(e.target.name, e.target.value)
    })
  }
 
  let flag = false;
  const [show, setShow] = useState(false);

  const { response } = useSelector((state) => state.users);

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isFullfilled(form, errors)) {
      dispatch(createUser(form));
      console.log('submitted');
    } else console.log('not submitted')
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    });
  };  
  
  useEffect(() => {
    if (response) {
      setShow(true);
    }
  }, [response]);
  return (
    <div className="register--container">
      <header className="register--header">
        <nav className="register--header-nav">
          <Link to="/" className="register--header-nav--back">
            <BsArrowLeftShort className="register--header-nav--back-icon" />
            <p className="register--header-nav--back-span">Volver</p>
          </Link>
          <Link to="/" className="register--header-nav--logo">
            commerce
          </Link>
        </nav>
      </header>
      {response && <Notification success={response.success} message={response.message} show={show} setShow={setShow} />}
      <div className="register--main--container">
        <div className="register--main--hero">
          <h1 className="register--main--hero-title">Crea tu cuenta</h1>
          <p className="register--main--hero-subtitle">
            {" "}
            Y empieza a comprar productos, con envío a toda Latinoamérica!
            Encontrá miles de marcas y productos.
          </p>
        </div>
        <form className="register--main--form">
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={form.firstName}
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {
            errors.firstName && <span>{errors.firstName}</span>
          }
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            placeholder="Apellido"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {
            errors.lastName && <span>{errors.lastName}</span>
          }
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Nombre de usuario"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {
            errors.username && <span>{errors.username}</span>
          }
          <input
            type="text"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {
            errors.email && <span>{errors.email}</span>
          }
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Contraseña"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {
            errors.password && <span>{errors.password}</span>
          }
          <span className="register--main--form-span tyc">
            Al crear una cuenta aceptas nuestros{" "}
            <Link to="/terminos-y-condiciones" className="register--main--form-link">
              términos y condiciones
            </Link>
          </span>
          <button
            onClick={handleSubmit}
            disabled={isFullfilled(form, errors)}
            className={`register--main--form-submit ${disable ? "disabled" : ""}`}
          >
            Crear cuenta
          </button>
          <span className="register--main--form-span">
            Ya tienes una cuenta?{" "}
            <Link to="/login" className="register--main--form-link">
              Inicia sesión
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
