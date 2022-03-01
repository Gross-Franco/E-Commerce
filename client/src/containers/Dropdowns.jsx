import React from "react";
import Dropdown from  "react-bootstrap/Dropdown";
import {logout} from './../Redux/Actions/actions'
import {useDispatch,useSelector} from 'react-redux';

export default function Dropdowns() {
let dispatch= useDispatch()


function Salir(e)
{
  dispatch(logout())
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
