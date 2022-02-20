import React from "react";
import { useState , useEffect } from "react";

import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Conntainer from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

import Holder from "react-holder";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Footer, NavBar } from ".";

import ProducsTest from "./Utilitis/producsTest.json";
import { useDispatch , useSelector} from "react-redux";
import {getProducts} from "./../Redux/Actions/actions"
import {GET_PRODUCTS} from  "./../Redux/Actions/actionTypes"


export default function Home() {

const [producs,SetProducts] = useState(Object.values(ProducsTest));

const [ValueRandom,SetValueRandom] = useState([]);

const { products } = useSelector((state) => state);

const dispatch = useDispatch()

useEffect(() => {
console.log(getProducts(GET_PRODUCTS));






})


  return (
    <div>
      {/* <h1>HOME</h1> */}
      <NavBar />
      <Conntainer>
        <Carousel style={{
         transform: "scale(1.21, 0.8)",
         top:"-120px",
         right:"1px"
        }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2020/01/24/13/26/camera-4790247_960_720.jpg"
              alt="First slide"
            />
            <Carousel.Caption style={{
             transform: "scale(1, 2)",

            }}>
            <h3>Go pro Started</h3>
              <p>Precio: 160.00$</p>             
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2016/10/04/22/11/gopro-1715601_960_720.jpg"
              alt="Second slide"
            />

            <Carousel.Caption style={{
             transform: "scale(1, 2)",

            }}> 
              <h3>Kodad con reflex 2.3</h3>
              <p>Precio: 200.00$</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2019/01/24/23/54/nintendo-switch-3953601_960_720.jpg"
              alt="Third slide"
            />

            <Carousel.Caption style={{
             transform: "scale(1, 2)",

            }}>
            <h3 >nintendo-switch lite</h3>
              <p>Precio: 180.00$</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Conntainer>

      {
        // ------------------------------
      }

<Row xs={2} md={1} className="g-5" style={{ 
          position:"relative",
          right: "-100px",
          top:"-130px",
          textAlign:"center",         
           width: "1300px"
            
          }} > 
  {Array.from({ length: 8 }).map((_, idx) => (
    
    <Col style={{ 
       height: "300px",
       width: "300px"
                 }} 
    key ={idx}>
       
    
      <Card   style={{ cursor: "pointer"}} >
        <Card.Img variant="center" src={producs[idx].Image} style={{ 
           position:"relative",
           right: "-5px",
           height: "200px",
           width: "200px",
           margin: "1em",
           padding: "20px",
          
          }} 
          
          />
        <Card.Body>
          <Card.Title >{producs[idx].Nombre}</Card.Title>
         
      <Card.Footer>
      <h4 className="text-muted" style={{
      
      }} >{producs[idx].valor +" " }  <h6 style={{
        color: "green",
        
      }}> %{getRandomInt(0,70) } OFF</h6></h4>
      </Card.Footer>

      <a href="/productDetail" class="stretched-link"></a>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
      <br/>
      

      <Container>
        <Image variant="top" src={"https://i.ibb.co/gDTGrKc/airport-g048af3c6f-1280.jpg"} style={{
        position:"relative",
          right:"75px",
          top: "15px",
          transform: "scale(1, 0.8)",
          
        }} />
       
      
<br/>

      </Container>
      <Footer />
    </div>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}