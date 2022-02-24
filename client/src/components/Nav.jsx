import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ isScroll }) {
  return (
    <div className="header-nav">
      <NavLink className={`header-nav--link ${isScroll ? 'scroll-link' : ''}`}to="/">
        Home
      </NavLink>
      <NavLink className={`header-nav--link ${isScroll ? 'scroll-link' : ''}`} to="/catalogo">
        Catalogo
      </NavLink>
    </div>
  );
}
