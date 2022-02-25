import React, { useState, useEffect } from "react";
import { Login, Dropdowns } from "./";
import { getCookie } from "./Utilitis/getCookie";
import { Link } from "react-router-dom";
import { Nav, Cart } from "../components";
import {useSelector} from 'react-redux';

const NavBar = () => {
  const [load, LoadSet] = useState(getCookie("email") !== "");
  const [isScroll, setIsScroll] = useState(false);
  let {user}= useSelector(state => state.userSesion) 

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    LoadSet(getCookie("Email") === "");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header className="header" onScrollCapture={() => console.log('hola')}>
      <div className={`header--container ${isScroll ? 'on-scroll' : ''}`}>
        <Nav isScroll={isScroll} />
        <Link to="/" className={`header-logo ${isScroll ? 'scroll' : ''}`}>
          commerce
        </Link>
        {/* <SearchBar /> */}
        <div className={`header-cart--container ${isScroll ? 'scroll' : ''}`}>
          
          {!user? <Login isScroll={isScroll} /> : <Dropdowns />}
          <Cart />
        </div>
      </div>
    </header>
  );
};
export default NavBar;
