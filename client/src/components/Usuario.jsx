import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cerrarSesion } from "../Redux/Actions/actions";
export default function Usuario(){
    let histori = useNavigate();
    const dispatch = useDispatch()
    return(
        <div>
            <Dropdown>
                    <Dropdown.Toggle style={{background:"none",padding:'0px', border:'none',color:'red'}}>
                        <img src='https://i.pinimg.com/550x/72/df/30/72df30b8b200848e492625ef95dd2e50.jpg' height='70px' style={{borderRadius:'50px'}}/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={e=>histori('/admin')}>Configuraccion</Dropdown.Item>
                        <Dropdown.Item onClick={e=>histori('/')}>home</Dropdown.Item>
                        <Dropdown.Item onClick={e=>dispatch(cerrarSesion())}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </div>
    )
}