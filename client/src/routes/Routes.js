import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Productos, Header, Login, Registro } from "../containers";

const Rutas = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
};

export default Rutas;
