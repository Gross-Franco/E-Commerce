import React, { useEffect, useState } from "react";
import { createUser } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isFullfilled } from "../services";
import { validator } from "../helpers/formValidation/register";
import { Button, FormHandler, Header, Hero, Notification } from "../components";

export default function Registro() {
  const [show, setShow] = useState(false);
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
  });
  const { response } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validate = async (e) => {
    setErrors({
      ...errors,
      [e.target.name]: await validator(e.target.name, e.target.value),
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFullfilled(form, errors)) {
      dispatch(createUser(form));
    }
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

  let disable = isFullfilled(form, errors);
  return (
    <div className="register--container">
      <Header />
      {response && (
        <Notification
          success={response.success}
          message={response.message}
          show={show}
          setShow={setShow}
        />
      )}
      <div className="register--main--container">
        <Hero
          title="Crea tu cuenta"
          subtitle="Y empieza a comprar productos, con envío a toda Latinoamérica!
            Encontrá miles de marcas y productos."
        />
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
          {errors.firstName && <FormHandler error={errors.firstName} />}
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            placeholder="Apellido"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.lastName && <FormHandler error={errors.lastName} />}
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Nombre de usuario"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.username && <FormHandler error={errors.username} />}
          <input
            type="text"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.email && <FormHandler error={errors.email} />}
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Contraseña"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.password && <FormHandler error={errors.password} />}
          <span className="register--main--form-span tyc">
            Al crear una cuenta aceptas nuestros{" "}
            <Link
              to="/terminos-y-condiciones"
              className="register--main--form-link"
            >
              términos y condiciones
            </Link>
          </span>
          <Button
            placeholder="Crear cuenta"
            action={handleSubmit}
            disable={disable}
          />
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
