import React from "react";
import { Form, Button, Modal, ModalBody, ModalFooter, ModalTitle, FormGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import './estilos/login.css'
import { Link } from "react-router-dom";


export default function Login() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              cerrar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Iniciar
          </Button>
        </Modal.Footer>
        <Link to="/registro"  onClick={handleClose} style={{ 
          textDecoration: 'none',
                   color: 'blue',
                position:"relative",
                     top:"-25px",
                    left:"25px" 
                     }}>Registro</Link>
      </Modal>
    </>
  )
}