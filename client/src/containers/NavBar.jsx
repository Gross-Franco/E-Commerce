import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Rutas from "../components/Rutas";
import './estilos/navBar.css'
import { Login } from ".";

export default function NavBar() {
    const [aux, setaux] = React.useState(false)
    return (
        <div className="navbar">
            <h1>aqui va el tittulo</h1>
            <Rutas />
            <SearchBar />
            <div>
                <Login/>
                <Link to="/registro" style={{ textDecoration: 'none', color: 'white' }}>
                    <span>| registro</span>
                </Link>

            </div>
        </div>
    )
}