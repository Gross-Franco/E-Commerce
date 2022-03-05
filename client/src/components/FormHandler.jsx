import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const FormHandler = ({ error }) => {
  return (
    <div className="form-handler">
      <RiErrorWarningLine className="form-handler--icon" />
      <p className="form-handler--text">{error}</p>
    </div>
  );
};

export default FormHandler;
