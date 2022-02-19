import React from "react";
import { Link } from "react-router-dom";

const PanelHeader = ({ title, setIsOpen }) => {
  return (
    <div className="panel--header">
      <h2>{title}</h2>

      {title !== "Pedidos" && (
        <button
          className="panel--header-button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          + AÑADIR
        </button>
      )}
    </div>
  );
};

export default PanelHeader;
