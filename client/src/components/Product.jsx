import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveLocal } from "../Redux/Actions/actions";
import { saveLocalStorage } from "../services";
import { BsBagPlus } from "react-icons/bs";

const Product = ({ product }) => {
  
  const dispatch = useDispatch();

  const handleClick = () => {
    saveLocalStorage({product});
    dispatch(saveLocal());
  };

  return (
    <div className="product--item">
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
        <BsBagPlus
          className="product--cart-icon"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Product;
