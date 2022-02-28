import React from "react";
import Dropdown from  "react-bootstrap/Dropdown";
import { delete_cookie } from "./Utilitis/getCookie";
import { axiosWithCredentials as axios} from "../utilities/axios";


export default function Dropdowns() {

function Salir()
{
    axios.post("/api/signout");
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
