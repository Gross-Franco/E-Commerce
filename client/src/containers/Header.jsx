import React from "react";
import { Link } from "react-router-dom";
import { Nav, SearchBar, Cart,Usuario } from "../components";
import { Login } from ".";

import { useSelector, useDispatch } from "react-redux";


export default function NavBar() {
    const login = useSelector(state => state.login);

    return (
        <div className="header-container">
            <Nav />
            <Link to="/" className="header-logo">
                commerce
            </Link>
            {/* <SearchBar /> */}
            <div className='header-cart--container'>
                {
                    login?
                    <Usuario/>:
                    <Login />
                }
                <Cart />
            </div>
        </div>
    )
}