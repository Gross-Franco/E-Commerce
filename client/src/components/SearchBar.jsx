import React from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { searchProductName } from "../Redux/Actions/actions";

export default function SearchBar() {
  const [busqueda, setBusqueda] = React.useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    dispatch(searchProductName(busqueda))
  };

  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(searchProductName(busqueda))
  //   setBusqueda("");
  // };

  return (
    <div className="catalog-search-input--container">
      <form className="catalog-search-input--container">
        <input
          className="catalog-search--input"
          type="text"
          placeholder="Buscar producto"
          onChange={handleChange}
        />
        {/* <button className="catalog-search--submit-button">
          <BiSearch className="catalog-search--submit-button-icon" />
        </button> */}
      </form>
    </div>
  );
}
