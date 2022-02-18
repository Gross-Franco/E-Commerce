import React from "react";
import { Link } from "react-router-dom";
import { Nav, SearchBar, Cart, } from "../components";
import { Login } from ".";
import { getCookie } from "./Utilitis/getCookie";
import { useState, useEffect} from "react";
import { Alert } from "bootstrap";
import Dropdowns from "./Dropdowns";



export default function NavBar() {



    const [load, LoadSet] = useState(getCookie("email") !== "");

    

    useEffect(() => {

      //  let validator= getCookie("email") !==  null;
        LoadSet(getCookie("Email") === "")
        // alert(getCookie("Email"));
        
      });

    return (
        <div className="header-container">
            <Nav />
            <Link to="/" className="header-logo">
                commerce
            </Link>
            {/* <SearchBar /> */}
            <div className='header-cart--container'>
            
            {load
                ? <Login/>
                : <Dropdowns/>
             }
                <Cart />
            </div>
        </div>
    )
}