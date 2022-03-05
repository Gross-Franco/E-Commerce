import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";

const BackButton = ({option, handleClick}) => {
  return (
    <div className="add--back">
      <button onClick={handleClick} className="add--back-btn">
        <BsArrowLeftShort /> {option}
      </button>
    </div>
  );
};

export default BackButton;
