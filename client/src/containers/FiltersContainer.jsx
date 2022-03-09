import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, filterProducts, getProductsPublic } from "../Redux/Actions/actions";
import { useEffect } from "react";
import Select from 'react-select'

import './styles/estilos.css'



const FiltersContainer = () => {
  const { categories, loadCategories } = useSelector((state) => state.categories);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();
  const options = categories.map(c => {
    return {value: c.name, label: c.name}
  })
  const handleChange = (filter) => {
    setFilteredCategories(filter)
    console.log(filter)
  };

  useEffect(() => {
    const fordispatch = filteredCategories.map(c => c.value)
    fordispatch.length > 0 ? dispatch(filterProducts(fordispatch)) :
      dispatch(getProductsPublic());
  }, [filteredCategories])

  if (loadCategories) dispatch(getCategories());

  return (
    <div>
      <Select isMulti options={options} value={filteredCategories} onChange={handleChange} />      
    </div>
  );
};

export default FiltersContainer;
