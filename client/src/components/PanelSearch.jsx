import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchProductName, getProducts, searchCategoryName, getCategories } from "../Redux/Actions/actions";

const PanelSearch = ({option}) => {

  const dispatch = useDispatch();

  const onChange = (e) => {
    if(option === 'Productos') {
      e.preventDefault();
      e.target.value === '' ? dispatch(getProducts()) :
      dispatch(searchProductName(e.target.value))
    } else if(option === 'Categorias') {
      e.preventDefault();
      e.target.value === '' ? dispatch(getCategories()) :
      dispatch(searchCategoryName(e.target.value))
    }
  }

  return (
    <div className="panel--search-container">
      <form onSubmit={() => {}}>
        <input type="text" placeholder="Buscar..." className="panel--search-input" onChange={onChange} />
      </form>
    </div>
  );
};

export default PanelSearch;
