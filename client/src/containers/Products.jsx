import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../components";
import { getProductsPublic } from "../Redux/Actions/actions";

const Products = () => {

  const {products} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(products.length === 0) dispatch(getProductsPublic());
  }, [])

  return (
    <div className="products--list">
      {products?.map((product) => (
        <Product key={product.SKU} product={product} />
      ))}
    </div>
  );
};

export default Products;
