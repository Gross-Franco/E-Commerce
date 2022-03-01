import React from "react";
import { useState } from "react";
import { login } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState();

  let flag = false;

  const { response } = useSelector((state) => state.users);

  let dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(flag);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    console.log('submitted');
  };

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
      {response && response.success && <p>{response.message}</p>}
      {response && !response.success && <p>{response.message}</p>}
      <div className="register--main--container">
        <div className="register--main--hero">
          <h1 className="register--main--hero-title">Lorem ipsum doler sit.</h1>
          <p className="register--main--hero-subtitle">
            {" "}
            Y empieza a comprar productos, con envío a toda Latinoamérica!
            Encontrá miles de marcas y productos.
          </p>
        </div>
        <form className="register--main--form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="register--main--form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="register--main--form-input"
          />
          <button
            onClick={handleSubmit}
            className="register--main--form-submit"
          >
            Inicia Sesion
          </button>
          <span className="register--main--form-span">
            No tienes una cuenta?{" "}
            <Link to="/register" className="register--main--form-link">
                Regístrate
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Login;