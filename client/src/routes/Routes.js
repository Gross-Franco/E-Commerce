import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import { Home, Catalog, Header, Login, Registro, Contactar, Blog, Footer, PerfilUser, NavBar } from "../containers";
import ProductDetail from "../containers/ProductDetail";

import { getCookie } from "../containers/Utilitis/getCookie";


const Rutas = () => {
  
 const [AutenCookin, SetAutenCookin] = useState(getCookie("Email") === "");
 
 useEffect(() => {  
  SetAutenCookin(getCookie("Email") === "")    
  });

 
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactar" element={<Contactar />} />

        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/perfilUser" element={
        
         AutenCookin?  <Navigate to="/" replace /> :  <PerfilUser />                             
                           
                                          }
        />
   
        <Route path="/registro" element={

        AutenCookin?  <Registro />   :      <Navigate to="/" replace />
        
                                        }
       />
      </Routes> 
      <Footer />
    </Router>
  );
};

export default Rutas;
