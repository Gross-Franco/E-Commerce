import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Catalog, Registro, PerfilUser, ProductDetail } from "../containers";
import { Home, Admin, PassReset, Cart } from "../pages"
import { getCookie } from "../containers/Utilitis/getCookie";

const Rutas = () => {
  const [AutenCookin, SetAutenCookin] = useState(getCookie("Email") === "");

  useEffect(() => {
    SetAutenCookin(getCookie("Email") === "");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/user/resetpassword/:token" element={<PassReset />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/perfilUser"
          element={AutenCookin ? <Navigate to="/" replace /> : <PerfilUser />}
        />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route
          path="/perfilUser"
          element={AutenCookin ? <Navigate to="/" replace /> : <PerfilUser />}
        />
        <Route
          path="/registro"
          element={AutenCookin ? <Registro /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default Rutas;
