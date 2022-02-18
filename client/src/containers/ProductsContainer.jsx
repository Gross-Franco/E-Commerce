import React, { useState, useEffect } from "react";
import { Products } from "../containers";
import { commerce } from "../lib/commerce";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  
  return (
    <div className="products--container">
      <Products products={products} />
    </div>
  );
};

export default ProductsContainer;
