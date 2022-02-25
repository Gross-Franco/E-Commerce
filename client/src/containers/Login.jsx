import React ,{useState}from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./estilos/login.css";
import { Link } from "react-router-dom";
import {logUser} from './../Redux/Actions/actions.js'
import {useDispatch} from 'react-redux'

export default function Login({isScroll}) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [inputs, setInputs] =useState({
    email:'',
    password: '',
  });
  let dispatch= useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email && inputs.password) {
      alert(`Usu ${inputs.email} contra ${inputs.password}`);
      dispatch(logUser({email:inputs.email,password:inputs.password}))
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
      alert("se tiene q rellenar los espacios en blanco");
    }
  };
  const handleInputs = (e) => {
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    });
  };

  

  return (
    <>
      <Button variant="btn btn-light" id={`header-button--${isScroll ? 'on-scroll' : ''}`} onClick={handleShow}>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={handleInputs}
                value={inputs.password}
              />
            </Form.Group>

            <Modal.Footer>
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
