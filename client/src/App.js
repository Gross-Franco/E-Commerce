import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Routes from "./routes/Routes";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || "https://pghenry.herokuapp.com";

function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </Provider>
  );
}

export default App;
