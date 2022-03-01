import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { passwordResetToken } from "../Redux/Actions/actions";

const PassReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordResetToken(token, newPassword));
    navigate("/login", { replace: true });
  };
  return (
    <>
      <h1> New Password</h1>
      <input type="text" name="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default PassReset;
