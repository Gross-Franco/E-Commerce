import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Catalog, Registro, PerfilUser, ProductDetail , Verificate } from "../containers";
import { Home, Admin, PassReset, Cart } from "../pages"
import { getCookie } from "../containers/Utilitis/getCookie";
import Checkout from "../pages/Checkout";


const Rutas = () => {

  let { login } = useSelector((state) => state.userSession);

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/user/resetpassword/:token" element={<PassReset />} />
      <Route path="/admin" element={<Admin />} />
      <Route
          path="/perfilUser"
        //  element={login ? <Navigate to="/" replace /> : <PerfilUser />}
        element={ <PerfilUser />}
        />
//       <Route path="/productDetail/:id" element={<ProductDetail />} />
       <Route path="/product/:id" element={<ProductDetail />} />
  
          <Route path="/checkout" element={<Checkout />} />
     <Route
          path="/registro"
          element={login ? <Registro /> : <Navigate to="/" replace />}
        />
            
         <Route path="/verificate/:ap" element={<Verificate/>} />
    </Routes>

  );//clase render
};

export default Rutas;
