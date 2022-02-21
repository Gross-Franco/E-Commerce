import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="header-nav">
      <NavLink className="header-nav--link" to="/">
        Home
      </NavLink>
      <NavLink className="header-nav--link" to="/catalogo">
        Catalogo
      </NavLink>
    </div>
  );
}
