import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const SortList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Mas relevantes");

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleSelected = (e) => {
    e.preventDefault();
    setSelected(e.target.innerText);
  };

  return (
    <div className="catalog-sort--list-container">
      <button className="catalog-sort--button" onClick={handleClick}>
        {selected}
        <RiArrowDropDownLine className="catalog-sort--button-dropdown" />
        {isOpen && (
          <ul className="catalog-sort--list">
            <li className={`catalog-sort--list-item item-one ${selected === 'Mas relevantes' ? 'selected' : '' }`} onClick={handleSelected}>
              Mas relevantes
            </li>
            <li className={`catalog-sort--list-item item-two ${selected === 'Mas nuevo' ? 'selected' : '' }`} onClick={handleSelected}>
              Mas nuevo
            </li>
            <li className={`catalog-sort--list-item item-three ${selected === 'Mas antiguos' ? 'selected' : '' }`} onClick={handleSelected}>
              Mas antiguos
            </li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default SortList;
