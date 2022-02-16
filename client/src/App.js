import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './containers/LandingPage';
import NavBar from './containers/NavBar';
import Home from './containers/Home';
import Productos from './containers/Productos';
import Blog from './containers/Blog';
import Contactar from './containers/Contactar';
import Registro from './containers/Registro';
import Login from './containers/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/productos" element={<Productos/>} />
        <Route exact path="/blog" element={<Blog/>} />
        <Route exact path="/contactar" element={<Contactar/>} />
        <Route exact path="/registro" element={<Registro/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </div>
  );

}

export default App;
