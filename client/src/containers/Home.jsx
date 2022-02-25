import React from "react";
import { useEffect,useLayoutEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Footer, NavBar, Carrousel } from ".";
/* 
import ProducsTest from "./Utilitis/producsTest.json"; */

import { useDispatch, useSelector } from "react-redux";
import { getProductsPublic } from "./../Redux/Actions/actions"; /* 
import DisplayItemsHome from '../containers/ItemsDisplayHome/ProductsPresentHome'
import products from "../helpers/mockProducts"; */

export default function Home() {
  /* const [producs, SetProducts] = useState(Object.values(ProducsTest));

  const [ValueRandom, SetValueRandom] = useState([]); */

  let { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useLayoutEffect(()=>{
    if(JSON.parse(localStorage.getItem('eCUs'))){
      console.log("hay un token")
    }else{
      console.log('nada')
    }

  },[])

  useEffect(() => {
    dispatch(getProductsPublic());
  }, []);

  return (
    <div>
      <NavBar />
      <Carrousel />
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
