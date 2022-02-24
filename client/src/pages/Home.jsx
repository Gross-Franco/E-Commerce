import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Footer, NavBar, Carrousel, HomeCategories } from "../containers";
/* 
import ProducsTest from "./Utilitis/producsTest.json"; */

import { useDispatch, useSelector } from "react-redux";
import { getProductsPublic, createShoppingSession } from "../Redux/Actions/actions"; /* 
import DisplayItemsHome from '../containers/ItemsDisplayHome/ProductsPresentHome'
import products from "../helpers/mockProducts"; */

export default function Home() {
  /* const [producs, SetProducts] = useState(Object.values(ProducsTest));

  const [ValueRandom, SetValueRandom] = useState([]); */
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
    dispatch(createShoppingSession());
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
      {
        // ------------------------------
      }

      {/* {products?.length > 0 && <DisplayItemsHome items={products}/>} */}

      <br />
      <Container>
        <Image
          variant="top"
          src={"https://i.ibb.co/gDTGrKc/airport-g048af3c6f-1280.jpg"}
          style={{
            position: "relative",
            right: "75px",
            top: "15px",
            transform: "scale(1, 0.8)",
          }}
        />

        <br />
      </Container>
      <Footer />
    </div>
  );
}
