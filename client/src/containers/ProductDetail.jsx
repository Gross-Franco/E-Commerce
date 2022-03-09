import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";


import { saveLocalStorage } from "../services";
import { MdAddShoppingCart } from "react-icons/md";

import { Card, Button, Col, Row, Container, Badge, Form, ProgressBar} from "react-bootstrap";


/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { saveLocal, searchProductId, PostReviwer } from "../Redux/Actions/actions";

import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill ,BsArrowLeftShort} from "react-icons/bs";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";

import { Link } from "react-router-dom";
import Login from "./Login";
import Dropdowns from "./Dropdowns";
import { CartButton } from "../components";
import { Cart } from "../pages";
import { setOverflowY } from "../services";


import StripeSingleItem from "../components/StripeSingleItem";

export default function ProductDetail() {

// postear un Reviwer por card
// Add post 

// Traerse los comentarios (Card para comentario ya puestos)

  const [Reviwer, SetReviwer] = useState(["comentario 1", "Comentario 2"]);
  const [NewReviwer, SetNewReviwer ] = useState("");
  const [isScroll, setIsScroll] = useState(false);

  let { user } = useSelector((state) => state.session);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  
  const [ContStar, setContStar] = useState(2);
  const [SelectStar, setSelectStar] = useState(false);
  const [ArryStar, setArrayStar] = useState([1,2,3,4,5]);

  function TempFuntion(e){
  
    e.preventDefault()
  }
function StarFuntion (e)
{
  
//cargar la star
return ArryStar.map((E,I)=>{

  if(ContStar < I){
  return <a onMouseEnter={(F) =>{
   
   if(SelectStar === false)
    setContStar(I)
  F.preventDefault()
}}

onClick={(e) => {
  setSelectStar(true)
  e.preventDefault()
}}

> 
<AiOutlineStar/>
  </a>
}
else{
  return <a onMouseEnter={(F) =>{
  
    if(SelectStar === false)
    setContStar(I)
  F.preventDefault()
}}

onClick={(e) => {
  setSelectStar(true)
  e.preventDefault()
}}
>
  <AiFillStar/>
  </a>
}

})
  
}

function StarRenderFuntion (e)
{
  //cargar la star
  return ArryStar.map((E,I)=>{
    
    
  if(e.startNumValue >= I){
  return <a> 
<AiFillStar/>
  </a>
}
// else{
//   return <a>
// <AiOutlineStar/>
//   </a>
// }

})
  
}

function MensajeValueStart(e)
{
  switch (e.value) {
    case 0:
      return "Malo"
      break;
    case 1:
      return "Regular"
      break;
    case 2:
      return "bueno"
      break;
    case 3:
      return "Muy bueno"
      break;
    case 4:
      return "Excelente"
      break;
    default:
      console.log('Fuera de rango verifica el valor ');
  }

}




  const { productDetail } = useSelector((state) => state.products);

  let [heart, setHeart] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  let { login } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(searchProductId(id));
    // console.log(productDetail) 
  }, []);


  useEffect(() => {    
    console.log(productDetail.reviews)
  }, [productDetail]);
  // productDetail.reviews = ['TODAS LAS REVIEWS']

  const  handleSubmit = async (e) => {
  
    // postear-reviwer
   await dispatch(PostReviwer({
      "description": NewReviwer,
      "starsPoints":ContStar,
      "userid": 1,
      "idProduct": parseInt(id)
    }))

    SetNewReviwer("")
    setSelectStar(false);
    dispatch(searchProductId(id));   

    e.preventDefault()
  }



  function Favorite(e) {
    if (heart === false)
      return <div>
        <BsHeartFill />
      </div>
    else
      return <div>
        <BsHeart />
      </div>
    e.preventDefault()
  }


  let product = productDetail;

  const handleClick = () => {
    saveLocalStorage({ product });
    dispatch(saveLocal());
  };
  // console.log("PRODUCT IN PAGE", productDetail)
  // console.log("PRODUCT IN STRIPE", product)
  return (
    <div>
      <header className="register--header">
        <nav className="header--container">
          <Link to="/catalogo" className="register--header-nav--back">
            <BsArrowLeftShort className="register--header-nav--back-icon" />
            <p className="register--header-nav--back-span">Volver</p>
          </Link>
          <Link to="/" className="register--header-nav--logo">
            commerce
          </Link>

          {/* <div className={`header-cart--container ${true ? "scroll" : ""}`}>
          {!login ? <Login isScroll={true} /> : <Dropdowns />}
          <CartButton openModal={isOpen} setOpenModal={setIsOpen} />
        </div>
        {!isOpen && (
          <Modal>
            <Cart openModal={isOpen} setOpenModal={setIsOpen} />
          </Modal>
        )} */}

        </nav>
      </header>

      <br />
      <br />
      <br />
      <br />
      <Container>
        <Card>
          <br />
          <br />
          <Row
            style={{
              position: "relative",
              right: "-90px",
            }}
          >
            <Col>
              <Card.Img variant="top" src={productDetail?.image} style={{
               transform: "scale(1.2, 1)"
              }} />

              <Card
                style={{
                  width: "auto",
                  textAlign: "left",
                  position: "relative",
                  top: "20px"
                }}
              >
                <div style={{
                  position: "relative",
                  right: "-20px"

                }}>
                  <br />
                  Descripcion: {productDetail?.description}
                  <br />
                  <br />
                  Categorias:{" "}  {productDetail?.category?.length > 0 ? (
                      productDetail?.category?.map((c, i) => {
                        return <span key={i}>{c}</span>;
                      })
                    ) : (
                      <p>no se encontraron categorias</p>
                    )}
                  
                 

                 
                </div>
              </Card>
              <br />
              <br />
   
            {/*Start info */}
              <Card style={{ 
              width: '30rem', 
              height: '13rem'  
                }}>
  
           <Row>
            <Col >
            <br/>           
             <h1 style={{              
               fontSize:"450%",
               
               textAlign: "right"
}             }>5
             </h1>
             <Row style={
               { position:"relative",
               right:" -180px",
               transform: "scale(2, 2)"
                 }
             }>
             <li style={{
              listStyleType:"none"

              }}>
              <AiOutlineStar/> 
              <AiOutlineStar />
              <AiOutlineStar/>
              <AiOutlineStar/>
              <AiOutlineStar/>

             </li>     
             </Row>
             <br />
             <h6 style={{
                textAlign: "right",
                fontSize:"80%"
             }} >promedio entre xxx personas</h6>
            </Col>
           {/* segunda parte */}
            <Col>
            <br />
            <br />
            <Row>
              <Col xs={3} md={4}>
            <h6 style={{               
                fontSize:"70%"
             }}> X estrellas</h6>
            
             </Col>
             <Col xs={6} md={20} style={
               {
                 position:"relative",
                  right:"25px"
                                    }}>
             <ProgressBar now={10} />
             </Col>
             <Col xs={2} md={2}  style={
               {
                 position:"relative",
                  right:"35px",
                  top:"-5px"
                                    }}>xx</Col>

             </Row>
             <Row>
              <Col xs={3} md={4}>
            <h6 style={{               
                fontSize:"70%"
             }}> X estrellas</h6>
            
             </Col>
             <Col xs={6} md={20} style={
               {
                 position:"relative",
                  right:"25px"
                                    }}>
             <ProgressBar now={10} />
             </Col>
             <Col xs={2} md={2}  style={
               {
                 position:"relative",
                  right:"35px",
                  top:"-5px"
                                    }}>xx</Col>

             </Row>
             
             
            </Col>
          </Row>
          </Card>
 

                    {/* Mensaje star  */}
              <Form  >
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">


                  <Form.Label>Reviewers</Form.Label>

                    <br/>
                  <Form.Control as="textarea" 
                                name="NewReviwer"
                                value={NewReviwer}
                                placeholder="Añade tu reviwer del producto"
                                onChange={e=>{  SetNewReviwer(e.target.value)}}                
                                rows={3} 
                   />
                </Form.Group>
                <h6 type="input" onClick={handleSubmit} style={{ cursor: "pointer" }}> Response</h6>               

              </Form>
               {/* estrellas  */}
               <Row style={
                 {
                      width: '8rem'
                    }
                  }>
        
        <li style={{
         listStyleType:"none",
         transform: "scale(2, 2)",
         position:"relative",
         right:"-450px",
         top:"-30px"
        }}>
        {

        }
        {/* Array  de estrellas */}        
        <StarFuntion/>

        </li>          
                    </Row>                         
        {/* Reviwer gets */}
                <br />
                <br />
              {
              productDetail?.reviews?.map(e=>{               
              
               return (<div>
                 
               
                 <li style={{
                  listStyleType:"none"
    
                  }}>

                    
                   <StarRenderFuntion startNumValue={parseInt( e.starsPoints)}/>                  
                      </li> 
                      <h5 
                      style={{
                        fontWeight:"CSS1"
                      }}
                      >
                           {<MensajeValueStart value={parseInt( e.starsPoints)}/>}
                      </h5>
               
                          <p style={{
                                width: "400px",
                                   }}>
                          { e.description}
                          </p>
                      <br />
                      </div>
                      
                      )           
              }
              )
              }
            </Col>

            <Col
              style={{
                position: "relative",
                right: "-70px",
              }}
            >
              <Card
                style={{
                  width: "20rem",
                  textAlign: "left",
                }}
              >

                <p
                  style={{
                    position: "relative",
                    right: "-10px",
                    color: "Grey",
                  }}
                >
                  {" "}

                </p>

                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title
                        style={{
                          width: "200px",
                        }}
                      >
                        {productDetail?.name}
                      </Card.Title>
                    </Col>
                    <Col>

                      <div onMouseEnter={(e) => {
                        setHeart(false)
                        e.preventDefault()
                      }}
                        onClick={(e) => {
                          console.log("add-to-favorite")
                          e.preventDefault()
                        }}
                        onMouseLeave={(e) => {
                          setHeart(true)
                          e.preventDefault()
                        }}
                      >
                        <Favorite />
                      </div>

                    </Col>
                  </Row>
                  <br />
                  <Badge bg="success">Mas vendido</Badge>


                  <br />
                  <Row>
                    <Col>
                      {" "}
                      <Card.Title>{productDetail?.price}</Card.Title>
                    </Col>
                    <Col>
                      {" "}
                      <h6
                        style={{
                          position: "relative",
                          right: "80px",
                          color: "green",
                        }}
                      >

                      </h6>{" "}
                    </Col>
                  </Row>


                  <Card.Title>
                    {
                      productDetail?.quantity > 0 ? `Stock disponible: ${productDetail?.quantity}` :
                        'Producto no disponible'
                    }

                  </Card.Title>

                  <br />
                  <StripeSingleItem subtotal={productDetail}/>
                  <br />
                  <br />
                  <Button variant="secondary" onClick={handleClick}>Agregar al carrito
                    <MdAddShoppingCart
                      className="product--cart-icon"
                    />
                  </Button>
                </Card.Body>
              </Card>
              <br />

            </Col>
          </Row>
          <br />
          <br />
        </Card>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}