import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import './estilos/login.css'
export default function Login() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = React.useState(
    {
      email: null,
      contraseña: null
    }
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputs.email && inputs.contraseña) {
      alert(`Usu ${inputs.email} contra ${inputs.contraseña}`)
      handleClose()
      setInputs(
        {
          email: '',
          contraseña: ''
        }
      )
    }else{
      setInputs(
        {
          email: '',
          contraseña: ''
        }
      )
      alert('se tiene q rellenar los espacios en blanco')
    }
  }
  const handleInputs = (e) => {
    setInputs(
      {
        ...inputs,
        [e.target.name]: e.target.value,
      }
    )
  }
  return (
    <>
      <Button variant="btn btn-light" id="header--button" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar secion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa email" name="email" onChange={handleInputs} value={inputs.email}/>
              <Form.Text className="text-muted">
                No compartiremos su correo electrónico con nadie más.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" name="contraseña" onChange={handleInputs} value={inputs.contraseña}/>
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
      </Modal>
    </>
  )
}