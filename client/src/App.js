import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';


function App() {
  
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage/>} />
    </div>
  );

}

export default App;
