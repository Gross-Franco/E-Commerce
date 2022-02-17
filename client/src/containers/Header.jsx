import React from "react";
import { Link } from "react-router-dom";
import { Nav, SearchBar, Cart, } from "../components";
import { Login } from ".";
import { getCookie } from "./Utilitis/getCookie";
import { useState} from "react";


export default function NavBar() {


    const[load, LoadSet] = useState(getCookie("email"));



    return (
        <div className="header-container">
            <Nav />
            <Link to="/" className="header-logo">
                commerce
            </Link>
            {/* <SearchBar /> */}
            <div className='header-cart--container'>
            
               <Login/>
                <Cart />
            </div>
        </div>
    )
}