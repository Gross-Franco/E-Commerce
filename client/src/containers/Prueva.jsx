import React from 'react';
import { Button, Collapse, Dropdown, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { postUsuario } from '../Redux/Actions/actions';
import { useNavigate } from "react-router-dom";
export default function Prueva() {
    const dispatch = useDispatch();
    let histori = useNavigate();
    const usuario = {
        nombre: 'pedro',
        contraseña: '1234'
    }

    const [open, setOpen] = React.useState(false)

    const aux = (usu) => {
        dispatch(postUsuario(usu))
    }
    return (
        <div>
            <h1>Adminnistrar?'</h1>
            aqui tienen qir la pagina de administracion

            <input type='button' value='agregar usuario' onClick={e => aux(usuario)} />
            <div>

                

            </div>
        </div>
    )
}