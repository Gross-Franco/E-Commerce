import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { axiosWithCredentials as axios } from "./utilities/axios";
import store from "./Redux/store";
import Routes from "./routes/Routes";

// npm start for dev mode and npm run build for production mode
// set in .env file your base url for dev and production on client side root directory
// pd: it should starts with REACT_APP_

function App() {

  useEffect(() => {
    axios.post("/api/session");
  }, [])

  return (
    <Provider store={store}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </Provider>
  );
}

export default App;
