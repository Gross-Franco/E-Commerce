import React, { useEffect, useState } from "react";
import { signIn } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Header, Hero, Notification } from "../components";
import { isFullfilled } from "../services";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login, response } = useSelector((state) => state.session);
  const [show, setShow] = useState(false);

  let dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(form));
  };

  if (response?.message === "Login succesfully") {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  }

  useEffect(() => {
    if (response) {
      setShow(true);
    }
  }, [response]);

  let disable = isFullfilled(form);
  return (
    <div className="register--container">
      <Header />
      {response && (
        <Notification
          show={show}
          setShow={setShow}
          success={response.success}
          message={response.message}
        />
      )}

      <div className="register--main--container">
        <Hero
          title="Login"
          subtitle="Please enter your credentials to login"
        />
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
          <Button
            action={handleSubmit}
            placeholder="Iniciar sesión"
            disable={disable}
          />
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
