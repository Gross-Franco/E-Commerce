import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Productos, Blog, Contactar, NavBar } from "../containers";

const Rutas = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactar" element={<Contactar />} />
      </Routes>
    </Router>
  );
};

export default Rutas;
