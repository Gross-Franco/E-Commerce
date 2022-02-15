import React from "react";
import { NavLink } from 'react-router-dom';
import './estilos/rutas.css'
export default function Rutas() {

    return (
        <div className='mid'>
            <NavLink className={(data) => data.isActive ? 'active' : 'desactive'} to='/'> Home </NavLink>
            <NavLink className={(data) => data.isActive ? 'active' : 'desactive'} to='/productos'>Productos</NavLink>
            <NavLink className={(data) => data.isActive ? 'active' : 'desactive'} to='/blog'>B log</NavLink>
            <NavLink className={(data) => data.isActive ? 'active' : 'desactive'} to='/contactar'>contactanos</NavLink>
        </div>
    )
}