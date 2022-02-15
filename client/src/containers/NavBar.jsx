import React from "react";
import SearchBar from "../components/SearchBar";
import './estilos/navBar.css'

export default function NavBar(){

    return(
        <div className="navbar">
            <h1>aqui va el tittulo</h1>
            <SearchBar/>
        </div>
    )
}