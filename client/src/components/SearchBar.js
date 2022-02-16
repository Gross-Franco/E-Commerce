import React from "react";
import './estilos/searchBar.css'
export default function SearchBar(){
    const [busqueda, setBusqueda] = React.useState('');

    return(
        <div className="busqueda">
            <form onSubmit={e=>{
                e.preventDefault()
                alert(busqueda);
            }}>
                <input type='text' placeholder="buscar ..."
                    onChange={e=>setBusqueda(e.target.value)}
                />
                <input type='submit' value='buscar'/>
            </form>
        </div>
    )
}