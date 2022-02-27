import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Catalog, Registro, PerfilUser } from "../containers";
import Admin from "../pages/Admin";
import PassReset from "../pages/PassReset";
import ProductDetail from "../containers/ProductDetail";
import { getCookie } from "../containers/Utilitis/getCookie";

const Rutas = () => {
  const [AutenCookin, SetAutenCookin] = useState(getCookie("Email") === "");

  useEffect(() => {
    SetAutenCookin(getCookie("Email") === "");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
  );
};

export default Rutas;
