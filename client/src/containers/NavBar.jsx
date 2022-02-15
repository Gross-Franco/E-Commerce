import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Rutas from "../components/Rutas";
import './estilos/navBar.css'

export default function NavBar() {

    return (
        <div className="navbar">
            <h1>aqui va el tittulo</h1>
            <Rutas />
            <SearchBar />
            <div>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                    <span>login | </span>
                </Link>
                <Link to="/registro" style={{ textDecoration: 'none', color: 'white' }}>
                    <span>| registro</span>
                </Link>

            </div>
        </div>
    )
}