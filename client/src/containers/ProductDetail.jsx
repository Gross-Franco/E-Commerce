import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";


import { saveLocalStorage } from "../services";
import { MdAddShoppingCart } from "react-icons/md";

import { Card, Button, Col, Row, Container, Badge, Form, ProgressBar} from "react-bootstrap";


/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { saveLocal, searchProductId, postReview, loadDetails, addToWishlist, removeFromWishlist, getWishlist } from "../Redux/Actions/actions";

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
 
  const { id } = useParams();
  console.log(id)
  const { productDetail, loadReviews } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.session);
  const { wishlist } = useSelector((state) => state.users);
  const [newReview, setNewReview ] = useState({
    description: "",
    starsPoints: 5
  });

  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  
  const [ContStar, setContStar] = useState();
  const [Arry, ArrayStar] = useState([<AiOutlineStar/>, <AiOutlineStar/>, <AiOutlineStar/>,<AiOutlineStar/>,<AiOutlineStar/>]);
  const [heart, setHeart] = useState(wishlist.some(item => item.id === Number(id)));
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(productDetail)
  }, []);


  const  handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postReview({
      ...newReview,
      user_id: user.id,
      product_id: id,
    }))
    setNewReview({
      description: "",
      starsPoints: 5
    })
  }

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    })
  }

  if(loadReviews) dispatch(searchProductId(id))
  
 useEffect(() => {
    user?.id && dispatch(getWishlist(user.id))
  }, [])

  useEffect(() => {
    return dispatch(loadDetails())
  }, [])

  const handleWish = () => {
    if (!heart) {
      dispatch(addToWishlist(user.id, id))
    }
    else {
      dispatch(removeFromWishlist(user.id, id))
    }
    setHeart(!heart)  
  }

  const handleClick = () => {
    saveLocalStorage({ productDetail });
    dispatch(saveLocal());
  };

  return (
    <div>
      <NavBar isScroll={true} />

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
                  Descripcion {productDetail?.description}
                  <br />
                  <br />
                  Categorias
                  <br />
                  <br />
                  <Row style={{ textAlign: "center" }}>
                    {productDetail?.category?.length > 0 ? (
                      productDetail?.category?.map((c, i) => {
                        return <span key={i}>{c}</span>;
                      })
                    ) : (
                      <p>no se encontraron categorias</p>
                    )}

                  </Row>
                </div>
              </Card>
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
              { user?.id &&

              <form onSubmit={handleSubmit}>

                <label>Review:</label>
                <textarea value={newReview.description} name="description" onChange={handleChange}/>

                <label>Score:</label>
                <input className="aaaa" type='number' min='1' max='5' value={newReview.starsPoints} name="starsPoints" onChange={handleChange}/>

                <button type="submit"> POST </button>
              </form>

              }
              {/* <Form  >
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">


                  <Form.Label>Write a review!</Form.Label>

                    <br/>
                  <Form.Control as="textarea" 
                                 name="NewReviwer"
                                value={NewReviwer}
                                placeholder="Añade tu reviwer del producto"
                                onChange={e=>{  SetNewReviwer(e.target.value)} }                
                                rows={3} 
                   />
                   <Form.Control 
                                name="NewReviwer"
                                value={NewReviwer}
                                placeholder="Añade tu reviwer del producto"
                                onChange={e=>{  SetNewReviwer(e.target.value)}}                
                   />

                </Form.Group>
                <h6 type="input" onClick={handleSubmit} style={{ cursor: "pointer" }}> Response</h6>               

              </Form> */}
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
        
        <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/>

        </li>          
                    </Row>                         
        {/* Reviwer gets */}

                <div>
                {
                productDetail?.reviews?.map((e, i) => {
                  return <div key={i}>
                    <p> {e.description} </p>
                    <p> {e.starsPoints} </p>
                    <p> {e.user} </p>
                  </div>})
                  }
               
              </div>
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
                       {
                          heart ? (
                            user?.id && <BsHeartFill onClick={() => handleWish()}/>
                          ) : (
                            user?.id && <BsHeart onClick={() => handleWish()}/>
                          )
                        }

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
