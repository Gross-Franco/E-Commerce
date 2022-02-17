import React from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  const [busqueda, setBusqueda] = React.useState("");

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(busqueda);
  };

  return (
    <div className="catalog-search-input--container">
      <form onSubmit={handleSubmit} className="catalog-search-input--container">
        <input
          className="catalog-search--input"
          type="text"
          placeholder="Buscar producto"
          onChange={handleChange}
        />
        <button className="catalog-search--submit-button">
          <BiSearch className="catalog-search--submit-button-icon" />
        </button>
      </form>
    </div>
  );
}
