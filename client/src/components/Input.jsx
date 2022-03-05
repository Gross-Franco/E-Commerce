import React from "react";

const Input = ({ value, handleChange, label, name, type = "text", step = "", min, placeholder = '', handleBlur}) => {
  return (
    <div className="add-form--input-wrapper_column">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          className="add-form--input"
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          min={min}
          step={step}
          placeholder={placeholder}
          className="add-form--input"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Input;
