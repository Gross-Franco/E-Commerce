import React from "react";
import { Link } from "react-router-dom";
import { Nav, SearchBar, Cart } from "../components";

export default function NavBar() {

    return (
        <div className="header-container">
            <Nav />
            <Link to="/" className="header-logo">
                commerce
            </Link>
            {/* <SearchBar /> */}
            <div className='header-cart--container'>
                <Link to="/login" className="header-cart--login">
                    Login
                </Link>
                <Cart />
            </div>
        </div>
    )
}