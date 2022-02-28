import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./estilos/login.css";
import { Link } from "react-router-dom";
// import { getCookie } from "./Utilitis/getCookie";
import { axiosWithCredentials as axios } from "../utilities/axios.js"

export default function Login() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email && inputs.password) {
      axios.post("/api/signin", inputs).then(() => {
        
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        handleClose();
        setInputs({
          email: "",
          password: "",
        });
        alert(`Usu ${inputs.email} contra ${inputs.password}`);
      })
    } else {
      setInputs({
        email: "",
        password: "",
      });
      alert("se tiene q rellenar los espacios en blanco");
    }
  };

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  //Testeo de inicio sesion ---- provicional
  // function ValidateRequest(e) {
  //   //verificamos
  //   if (getCookie("Email") === "") {
  //     //añadimos data a las cokkies
  //     document.cookie = "Email=" + inputs.email;

  //     document.cookie = "Password=" + inputs.password;

  //     //refrest windoms
  //     window.location.reload(false);
  //   }
  //   e.preventDefault();
  // }

  return (
    <>
      <Button variant="btn btn-light" id="header--button" onClick={handleShow}>
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
              <Button variant="secondary" onClick={handleClose}>
                cerrar
              </Button>
              <Button variant="primary" type="submit" >
                Iniciar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

        <Link
          to="/registro"
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
