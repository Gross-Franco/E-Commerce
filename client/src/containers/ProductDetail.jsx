import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";

import { saveLocalStorage } from "../services";
import { MdAddShoppingCart } from "react-icons/md";

import { Card, Button, Col, Row, Container, Badge, Form } from "react-bootstrap";


/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { saveLocal, searchProductId } from "../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";


import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Login from "./Login";
import Dropdowns from "./Dropdowns";
import { CartButton } from "../components";
import { Cart } from "../pages";
import { setOverflowY } from "../services";

import StripeSingleItem from "../components/StripeSingleItem";

export default function ProductDetail() {

  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };


  const { productDetail } = useSelector((state) => state.products);

  let [heart, setHeart] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  let { login } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(searchProductId(id));
  }, []);

  productDetail.reviews = ['TODAS LAS REVIEWS']

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
              <br />
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Reviews</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <h6 type="input" style={{ cursor: "pointer" }}>Post</h6>
              </Form>
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