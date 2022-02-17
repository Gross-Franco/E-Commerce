import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Catalog, Header, Login, Registro, Contactar, Blog, Footer } from "../containers";

const Rutas = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactar" element={<Contactar />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Rutas;
