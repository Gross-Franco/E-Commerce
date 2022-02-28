import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {
  Catalog,
  PerfilUser,
  ProductDetail,
  Verificate,
} from "../containers";
import { Home, Admin, PassReset, Cart, Register } from "../pages";
import Checkout from "../pages/Checkout";

const Rutas = () => {


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
          element={<PerfilUser />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/registro"
          element={<Register />}
        />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/verificate/:ap" element={<Verificate />} />
      </Routes>
    </Router>
  );
};

export default Rutas;
