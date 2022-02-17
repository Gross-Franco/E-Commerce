import React from "react";
import {useState} from "react"


import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Conntainer from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function Registro(){

  let [ValueEmail, setValueEmail]  = useState("")
  let [ValueName, setName]  = useState("")
  let [ValuePasword, setPasword]  = useState("")
  let [ValidatePas, setValidatePas]  = useState("")
  let [ValueDirection, setDirection]  = useState("")
  let [ValueTelefono, setTelefono]  = useState("")
  let [ValuePolitica, setCheakBoxPolitical]  = useState(false)


 function handleSubmit(e)
{
  alert(  ValueEmail     +" / "+  
          ValueName      +" / "+
          ValuePasword   +" / "+   
          ValidatePas    +" / "+    
          ValueDirection +" / "+  
          ValueTelefono  +" / "+  
          ValuePolitica  
    )
  e.preventDefault();
}


    return(
        <div>

<Conntainer style={{
width: "600px",
// alignItems: screenLeft
}} >
            Registro
            <br/><br/>
<Form onSubmit={handleSubmit} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"
     value={ValueEmail}
     onChange={e=>{  setValueEmail(e.target.value)}}
     maxlength="30"
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  {/* --------- Username------------ */}

  <Form.Group className="mb-3" controlId="Username">
    <Form.Label>User name</Form.Label>
    <Form.Control type="User" placeholder="Username"
        onChange={e=>{  setName(e.target.value)}}
        maxlength="25"
    />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>


{/* ----------Password----------- */}
           <br/> 
                
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" 
     onChange={e=>{  setPasword(e.target.value)}}
     maxlength="30"
    />
  </Form.Group>

  {/* ----------RepitePassword----------- */}
  <Form.Group className="mb-3" controlId="RepitePassword">
    <Form.Label>Repite Password</Form.Label>
    <Form.Control type="password" placeholder="Repite Password" 
     onChange={e=>{  setValidatePas(e.target.value)}}
     maxlength="25"
    />
  </Form.Group>
   <br/>
{/* ---------Direccion------------ */}

   <Form.Group className="mb-3" controlId="Direccion">
    <Form.Label>Direccion</Form.Label>
    <Form.Control type="Direccion" placeholder="Direccion" 
    onChange={e=>{  setDirection(e.target.value)}}
     maxlength="25"/>
  </Form.Group>

{/* ---------Telefono Contacto------------ */}
  <br/>
  <label>Telefono de contacto</label>
  <PhoneInput
  country={'us'}
  // value={this.state.phone}
  placeholder="Telefono contacto" 
  onChange={phone => setTelefono({ phone })}
/>
<br/>

{/* -------checkbox politica-------------- */}

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Acepta politica de privacidad" 
    onChange={e=>{  setCheakBoxPolitical(e.target.value)}}
    />
  </Form.Group>



{/* --------------------- */}
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>

 
        </Conntainer>
        </div>
    )
}