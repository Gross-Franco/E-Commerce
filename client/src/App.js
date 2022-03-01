import React from "react";
import Routes from "./routes/Routes";
import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API || "https://pghenry.herokuapp.com";

function App() {



  return (
    <Routes />
  );
}

export default App;
