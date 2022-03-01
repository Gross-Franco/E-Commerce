import React from "react";
import Routes from "./routes/Routes";
import axios from 'axios';
const { REACT_APP_API } = process.env;



axios.defaults.baseURL = REACT_APP_API || "https://pghenry.herokuapp.com";

function App() {



  return (
    <Routes />
  );
}

export default App;
