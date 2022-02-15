import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <Route exact path="/" render={() => <Landing/>} />
    </div>
  );

}

export default App;
