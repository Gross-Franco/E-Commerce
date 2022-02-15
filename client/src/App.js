import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );

}

export default App;
