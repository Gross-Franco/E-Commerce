import React, { useState, useEffect } from "react";
import { Login, Dropdowns } from "./";
import { getCookie } from "./Utilitis/getCookie";
import { Link } from "react-router-dom";
import { Nav, Cart } from "../components";

const NavBar = () => {
  const [load, LoadSet] = useState(getCookie("email") !== "");
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    LoadSet(getCookie("Email") === "");
  });

  return (
    <div className="header-container">
      <Nav />
      <Link to="/" className="header-logo">
        commerce
      </Link>
      {/* <SearchBar /> */}
      <div className="header-cart--container">
        {load ? <Login /> : <Dropdowns />}
        <Cart />
      </div>
    </div>
  );
};
export default NavBar;
