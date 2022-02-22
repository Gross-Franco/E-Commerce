import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getProductsPublic, searchProductNamePublic } from "../Redux/Actions/actions";

export default function SearchBar() {
  const [busqueda, setBusqueda] = React.useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  useEffect(() => {
    busqueda.length > 0 ? dispatch(searchProductNamePublic(busqueda)) :
    dispatch(getProductsPublic())
  }, [busqueda])


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
