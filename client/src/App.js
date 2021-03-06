import React, { useEffect } from "react";
import Routes from "./routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { checkSession } from "./Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./pages";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, loading } = useSelector((state) => state.session);

  useEffect(() => {
    if(loading) {
      const token = localStorage.getItem("token");
      dispatch(checkSession(token));
    }
      if(location.pathname === "/admin" && !isAdmin) {
      navigate("/login");
    }
  }, [loading]);

  return loading ? <Loading /> : <Routes />;
}

export default App;
