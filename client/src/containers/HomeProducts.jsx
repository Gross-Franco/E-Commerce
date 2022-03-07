import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeProducts = ({ products }) => {
  return (
    <div className="home-products--container">
      <div className="home-products--header">
        <span className="home-products--header-span">
          Introducción de nuestros últimos productos
        </span>
        <p className="home-products--header-title">
          Reservas limitadas en próximos productos y reposiciones.
        </p>
        <Link to="/catalogo" className="home-products--header-link">
          Ver más productos{" "}
          <BsArrowRight className="home-products--header-arrow" />
        </Link>
      </div>
      <div className="home-products--body">
      {products.map((product, i) => ( i < 4 &&
        <div className="product--item" key={product.SKU}>
          <Link to={`/product/${product.id}`} className="product--link">
            <div
              className="product--image"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <p className="product--title"> {product.name} </p>
            <p className="product--info"> {product.description}</p>
          </Link>
          <div className="product--price-container">
            <p className="product--price"> $ {product.price} </p>
            
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default HomeProducts;
