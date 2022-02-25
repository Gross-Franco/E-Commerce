import React from "react";
import { useEffect,useLayoutEffect,useState} from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Footer, NavBar, Carrousel } from ".";
/* 
import ProducsTest from "./Utilitis/producsTest.json"; */

import { useDispatch, useSelector } from "react-redux";
import { getProductsPublic } from "./../Redux/Actions/actions"; 
import DisplayItemsHome from '../containers/ItemsDisplayHome/ProductsPresentHome'
import {checkSession} from './../Redux/Actions/actions'

export default function Home() {
  const [ValueRandom, SetValueRandom] = useState([]);
  let {login}= useSelector(state=> state.userSesion)
  let { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useLayoutEffect(()=>{
    if(JSON.parse(localStorage.getItem('eCUs'))){
      let {Token,session}=JSON.parse(localStorage.getItem('eCUs'))
      if(Token&&!login){
        dispatch(checkSession(Token))
      }
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
