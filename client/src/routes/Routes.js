import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Productos, Blog, Contactar, NavBar, Login, Registro } from "../containers";

const Rutas = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactar" element={<Contactar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
};

export default Rutas;
