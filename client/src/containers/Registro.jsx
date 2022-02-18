import React from "react";
import {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Conntainer from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function Registro(){

  let [ValueEmail, setValueEmail]  = useState("")
  let [ValueFirstName, setFirstName]  = useState("")
  let [ValueSecondName, setSecondName]  = useState("")

  let [ValueName, setName]  = useState("")

  
  let [ValuePasword, setPasword]  = useState("")
  let [ValidatePas, setValidatePas]  = useState("")
  

  let[ValuePayMetode , SetPayMetode] = useState();

  let [ValueDirection, setDirection]  = useState("")
  let [ValueDirection2, setDirection2]  = useState("")

  let [ValueTelefono, setTelefono]  = useState("")
  let [ValuePostalCode , setPostalCode] = useState("")

  let [ValuePolitica, setCheakBoxPolitical]  = useState(false)


 function handleSubmit(e)
{
  alert( 
          "Test Info: "+
          ValueEmail       +" / "+
          ValueFirstName   +" / "+
          ValueSecondName  +" / "+
          ValueName        +" / "+
          ValuePasword     +" / "+   
          ValidatePas      +" / "+   
          ValuePayMetode   +" / "+
          ValueDirection   +" / "+  
          ValueDirection2  +" / "+
          ValueTelefono    +" / "+  
          ValuePostalCode  +" / "+
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
    <Form.Label>Email address*</Form.Label>
    <Form.Control type="email" placeholder="Enter email"
     value={ValueEmail}
     onChange={e=>{  setValueEmail(e.target.value)}}
     maxlength="30"
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>





  {/* --------- First name------------ */}

  <Form.Group className="mb-3" controlId="First name">
    <Form.Label>First name*</Form.Label>
    <Form.Control type="User" placeholder="First name"
        onChange={e=>{  setFirstName(e.target.value)}}
        maxlength="25"
    />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  {/* --------- Last name------------ */}

  <Form.Group className="mb-3" controlId="First name">
    <Form.Label>Last name*</Form.Label>
    <Form.Control type="User" placeholder="First name"
        onChange={e=>{  setSecondName(e.target.value)}}
        maxlength="25"
    />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  
  <br/> 
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
    <Form.Label>Password*</Form.Label>
    <Form.Control type="password" placeholder="Password" 
     onChange={e=>{  setPasword(e.target.value)}}
     maxlength="30"
    />
  </Form.Group>

  {/* ----------RepitePassword----------- */}
  <Form.Group className="mb-3" controlId="VerifitePassword">
    <Form.Label>Verifite Password*</Form.Label>
    <Form.Control type="password" placeholder="Repite Verifite Password" 
     onChange={e=>{  setValidatePas(e.target.value)}}
     maxlength="25"
    />
  </Form.Group>
   <br/>
{/* ---------Metodo de pago------------ */}
  
<Form.Label>Pay Metode*</Form.Label>
   <Form.Select aria-label="Default select example" 
      onChange={e=>{  SetPayMetode(e.target.value)}}
   >
  <option>Open this select option</option>
  <option value="Metodo 1">Metodo 1</option>
  <option value="Metodo 2">Metodo  2</option>
  <option value="Metodo 3">Metodo  3</option>
</Form.Select>


    
    <br/>
{/* ---------address line 1------------ */}

   <Form.Group className="mb-3" controlId="Direccion">
    <Form.Label>address line*</Form.Label>
    <Form.Control type="Direccion" placeholder="address line" 
    onChange={e=>{  setDirection(e.target.value)}}
     maxlength="25"/>
  </Form.Group>
{/* ---------address line 2------------ */}

<Form.Group className="mb-3" controlId="Direccion">
    <Form.Label>Address line 2</Form.Label>
    <Form.Control type="Direccion" placeholder="address line 2" 
    onChange={e=>{  setDirection2(e.target.value)}}
     maxlength="25"/>
  </Form.Group>


{/* ---------Telefono Contacto------------ */}
  <br/>
  <label>Telefono de contacto*</label>
  <PhoneInput
  country={'ar'}
  // value={this.state.phone}
  placeholder="Telefono contacto" 
  onChange={phone => setTelefono({ phone })}
/>


{/* ---------Codigo Postal------------ */}
<br/>
<Form.Group className="mb-3" controlId="Direccion">
    <Form.Label>Codigo Postal*</Form.Label>
    <Form.Control type="number" placeholder="Codigo Postal" 
    onChange={e=>{  setPostalCode(e.target.value)}}
    max="9999"/>
  </Form.Group>

<br/>

{/* -------checkbox politica-------------- */}

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Acepta politica de privacidad*" 
    onChange={e=>{  setCheakBoxPolitical(e.target.value)}}
    />
  </Form.Group>



{/* --------------------- */}
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>

 
        </Conntainer>
        <br />
        </div>
    )
}