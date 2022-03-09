import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import {
  Catalog,
  PerfilUser,
  ProductDetail,
  Verificate,
} from "../containers";
import { Home, Admin, PassReset, Cart, Register, Login } from "../pages";

import Checkout from "../pages/Checkout";

const Rutas = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/user/resetpassword/:token" element={<PassReset />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfilUser"
          element={<PerfilUser />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/verification/:ap" element={<Verificate />} />

      </Routes>
  );
};

export default Rutas;
