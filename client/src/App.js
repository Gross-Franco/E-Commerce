import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { axiosWithCredentials as axios } from "./utilities/axios";
import store from "./Redux/store";
import Routes from "./routes/Routes";


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
