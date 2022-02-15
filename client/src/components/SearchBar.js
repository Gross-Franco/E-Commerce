import React from "react";
import './estilos/searchBar.css'
export default function SearchBar(){

    return(
        <div className="busqueda">
            <form onSubmit={e=>{
                e.preventDefault()
            }}>
                <input type='text' placeholder="buscar ..."/>
                <input type='submit' value='buscar'/>
            </form>
        </div>
    )
}