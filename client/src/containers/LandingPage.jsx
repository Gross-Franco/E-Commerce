import React from "react";
import {Link} from "react-router-dom";
import './estilos/LandingPage.css'

export default function LandingPage() {

    return(
        <div>
            <h1>E-commerce</h1>
            <Link to="/home" >
                <button>Ingresar</button>
            </Link>
        </div>
    )
}