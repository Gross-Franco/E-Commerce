import React from "react";

const Button = ({placeholder, action, disable }) => {
  return (
    <button onClick={action} className={`register--main--form-submit ${disable ? 'disabled' : ''}`} disabled={disable} >
        {placeholder}
    </button>
  );
};

export default Button;
