import React from "react";
import { SearchBar } from "../components";
import { SortContainer, FiltersContainer, ProductsContainer } from "./";

const Catalog = () => {
  return (
    <div className="catalog--container">
      <h1 className="catalog--title">Chequea nuestros productos</h1>
      <div className="catalog-search--container">
        <SearchBar />
        <SortContainer />
      </div>
      <div className="catalog-content--container">
        <FiltersContainer />
        <ProductsContainer />
      </div>
    </div>
  );
};

export default Catalog;
