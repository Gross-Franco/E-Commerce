import React, { useEffect } from "react";
import Routes from "./routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { checkSession } from "./Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isAdmin, loading } = useSelector((state) => state.session);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(checkSession(token));
  }, [location.pathname, loading]);

  useEffect(() => {
      if(location.pathname === "/admin" && !isAdmin) {
      navigation("/login");
    }
  }, [isAdmin]);

  return loading ? <h1>Loading...</h1> : <Routes />;
}

export default App;
