import React from "react";
import { Form, Button, Modal, ModalBody, ModalFooter, ModalTitle, FormGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import './estilos/login.css'
export default function Login() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="btn btn-light" onClick={handleShow}>
        login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar secion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e=>{
            e.preventDefault()
          }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa email" />
              <Form.Text className="text-muted">
                No compartiremos su correo electrónico con nadie más.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="remenber me" />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cerrar
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Iniciar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}