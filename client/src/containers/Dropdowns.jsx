import React from "react";
import Dropdown from  "react-bootstrap/Dropdown";
import {logout} from './../Redux/Actions/actions'
import {useDispatch,useSelector} from 'react-redux';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

export default function Dropdowns() {
  let dispatch= useDispatch()
  let { user, isAdmin } = useSelector((state) => state.session);
  const navigate = useNavigate()

  function Salir(e) {
    dispatch(logout())
  }

  const redirect = () => {
    navigate('/perfilUser')
  }
  const redirectAdmin = () => {
    navigate('/admin')
  }

  return ( 
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {user.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={redirect}> Perfil </Dropdown.Item>
        {
          isAdmin && <Dropdown.Item onClick={redirectAdmin}> Admin Panel </Dropdown.Item>
        }
        <Dropdown.Item onClick={Salir} > Salir </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
