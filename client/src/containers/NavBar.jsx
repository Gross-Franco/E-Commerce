import React, { useState, useEffect } from "react";
import { Login, Dropdowns } from "./";
import { getCookie } from "./Utilitis/getCookie";
import { Link } from "react-router-dom";
import { Nav, Cart } from "../components";

const NavBar = ({isScroll = false}) => {
  const [load, LoadSet] = useState(getCookie("email") !== "");
  

  useEffect(() => {
    LoadSet(getCookie("Email") === "");
  }, []);

  return (
    <header className="header" onScrollCapture={() => console.log("hola")}>
      <div className={`header--container ${isScroll ? "on-scroll" : ""}`}>
        <Nav isScroll={isScroll} />
        <Link to="/" className={`header-logo ${isScroll ? "scroll" : ""}`}>
          commerce
        </Link>
        {/* <SearchBar /> */}
        <div className={`header-cart--container ${isScroll ? "scroll" : ""}`}>
          {load ? <Login isScroll={isScroll} /> : <Dropdowns />}
          <Link
            to="/cart"
            className={`header-cart ${isScroll ? "scroll" : ""}`}
          >
            <Cart />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
