import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './containers/LandingPage';
import NavBar from './containers/NavBar';


function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );

}

export default App;
