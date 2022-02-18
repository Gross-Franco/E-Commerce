import React from "react";
import Dropdown from  "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import { delete_cookie } from "./Utilitis/getCookie";


export default function Dropdowns() {

function Salir(e)
{
    delete_cookie("Email");
    delete_cookie("Password");
    window.location.reload(false);   
    e.preventDefault();
}

return<div>
   
<Dropdown>
<Dropdown.Toggle variant="primary" id="dropdown-basic">
  User
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item href="/perfilUser">Perfil</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Historia</Dropdown.Item>
  <Dropdown.Item href="#/action-3">configuracion</Dropdown.Item>
  <Dropdown.Item  onClick={Salir} >Salir</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>

</div>

}
