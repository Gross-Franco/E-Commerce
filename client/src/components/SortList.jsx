import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { getProductsPublic, orderProducts } from "../Redux/Actions/actions";

const SortList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("No order");
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleSelected = (e) => {
    e.preventDefault();
    const order = e.target.innerText;
    setSelected(order);
    switch(order) {

      case "No order":
        return dispatch(getProductsPublic())
      
      case "Precio ASC":
        return dispatch(orderProducts('price', 'ASC'))
        
      case "Precio DESC":
        return dispatch(orderProducts('price', 'DESC'))

      case "Alfabetico ASC":
        return dispatch(orderProducts('name', 'ASC'))
    
      case "Alfabetico DESC":
        return dispatch(orderProducts('name', 'DESC'))
      
      default: alert('Not a valid order');
    }
  };

  return (
    <div className="catalog-sort--list-container">
      <button className="catalog-sort--button" onClick={handleClick}>
        {selected}
        <RiArrowDropDownLine className="catalog-sort--button-dropdown" />
        {isOpen && (
          <ul className="catalog-sort--list">
            <li className={`catalog-sort--list-item item-one ${selected === 'No order' ? 'selected' : '' }`} onClick={handleSelected}>
              No order
            </li>
            <li className={`catalog-sort--list-item item-one ${selected === 'Precio ASC' ? 'selected' : '' }`} onClick={handleSelected}>
              Precio ASC
            </li>
            <li className={`catalog-sort--list-item item-one ${selected === 'Precio DESC' ? 'selected' : '' }`} onClick={handleSelected}>
              Precio DESC
            </li>
            <li className={`catalog-sort--list-item item-one ${selected === 'Alfabetico ASC' ? 'selected' : '' }`} onClick={handleSelected}>
              Alfabetico ASC
            </li>
            <li className={`catalog-sort--list-item item-one ${selected === 'Alfabetico DESC' ? 'selected' : '' }`} onClick={handleSelected}>
              Alfabetico DESC
            </li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default SortList;
