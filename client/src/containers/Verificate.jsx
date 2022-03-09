import React, { useEffect } from "react";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

import { Link, useLocation, useParams } from "react-router-dom";

const Verificate = () => {
  //   console [state,setState] = useState();
  const { ap } = useParams();
  const location = useLocation();
  const token = location.search.split("=")[1];

  useEffect(() => {
    // isValidToken(token) [AUTH]
  }, []);

  return (
    token && (
      <div className="verification--container">
        <BsCheckCircleFill className="verification--icon"/>
        <p className="verification--title">Thank You! Your account has been verified.</p>
        <Link to="/login" className="verification--btn">Login</Link>
      </div>
    )
  );
};

export default Verificate;
