import React, { useEffect, useState } from "react";
import { ghSession, signIn } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  GithubButton,
  GoogleButton,
  Header,
  Hero,
  Notification,
} from "../components";
import { isFullfilled } from "../services";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const { login, response, done } = useSelector(
    (state) => state.session
  );
  const [show, setShow] = useState(false);

  let dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(form));
  };


  useEffect(() => {
    if (login) {
      navigate("/");
    }
    if (response) {
      setShow(true);
    }
    let code = location.search.split("=")[1];
    if (code && !done) {
      dispatch(ghSession(code));
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
        <Hero title="Login" subtitle="Please enter your credentials to login" />
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
          <span className="register--main--form-span">O continua con</span>
          <GoogleButton />
          <GithubButton />
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
