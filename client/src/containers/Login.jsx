import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "./../Redux/Actions/actions";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";

export default function Login({ isScroll }) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email && inputs.password) {

      dispatch(signIn(inputs));

      handleClose();
      setInputs({
        email: "",
        password: "",
      });
      
    } else {
      setInputs({
        email: "",
        password: "",
      });
    }
  };

  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <>
      <Button
        variant="btn btn-light"
        id={`header-button--${isScroll ? "on-scroll" : ""}`}
        onClick={handleShow}
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa email"
                name="email"
                onChange={handleInputs}
                value={inputs.email}
              />
              <Form.Text className="text-muted">
                No compartiremos su correo electrónico con nadie más.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleInputs}
                value={inputs.password}
              />
            </Form.Group>

            <Modal.Footer>
              <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button 
                    type="button"
                    className="login--google-btn"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}

                  >
                    <FcGoogle className="login--google-btn--icon" /> Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <Button variant="secondary" onClick={handleClose}>
                cerrar
              </Button>
              <Button variant="primary" type="submit">
                Iniciar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

        <Link
          to="/register"
          onClick={handleClose}
          style={{
            textDecoration: "none",
            color: "blue",
            position: "relative",
            top: "-25px",
            left: "25px",
          }}
        >
          Registro
        </Link>
      </Modal>
    </>
  );
}
