import React, { useState, useEffect } from "react";
import { Footer, NavBar, Carrousel, HomeCategories, HomeProducts } from "../containers";


import { useDispatch, useSelector } from "react-redux";
import { getProductsPublic } from "../Redux/Actions/actions"; 
export const Home = () => {
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  let { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsPublic());
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  return (
    <div>
      <NavBar isScroll={isScroll} handleScroll={handleScroll} />
      <Carrousel />
      <HomeCategories />
      {products?.length > 0 && <HomeProducts products={products} />}
      <Footer />
    </div>
  );
}
export default Home;