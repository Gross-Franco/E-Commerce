import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";
import { Card, Button, Col, Row, Container, Badge, Modal } from "react-bootstrap";
/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { searchProductId } from "../Redux/Actions/actions";
import { useParams } from "react-router-dom";

import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Login from "./Login";
import Dropdowns from "./Dropdowns";
import { CartButton } from "../components";
import { Cart } from "../pages";
import { setOverflowY } from "../services";

export default function ProductDetail() {
  const { productDetail } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  let { login } = useSelector((state) => state.userSession);
  
  useEffect(() => {
    dispatch(searchProductId(id));
  }, []);
  
  setOverflowY(isOpen);
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
              <Card.Img variant="top" src={productDetail?.image} height='600px' />

              <Card
                style={{
                  width: "auto",
                  textAlign: "left",
                }}
              >
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
              </Card>
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
                {/* <Card.Img variant="top"  src="holder.js/100px180" /> */}
                <p
                  style={{
                    position: "relative",
                    right: "-10px",
                    color: "Grey",
                  }}
                >
                  {" "}
                  Nuevo | 10 vendidos
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
                      <Card.Title> {"<3"}</Card.Title>
                    </Col>
                  </Row>
                  <br />
                  <Badge bg="success">Mas vendido</Badge>
                  <h6
                    style={{
                      textDecorationLine: "underline line-through",
                    }}
                  >
                    1500$
                  </h6>

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
                        off 10%{" "}
                      </h6>{" "}
                    </Col>
                  </Row>
                  <h6>en 12x 9369 pesos sin interés</h6>

                  <Card.Title>
                    {
                      productDetail?.quantity > 0 ? `Stock disponible: ${productDetail?.quantity}` :
                        'Producto no disponible'
                    }

                  </Card.Title>

                  <br />
                  <Button variant="primary">Compra ahora</Button>
                  <br />
                  <br />
                  <Button variant="secondary">Agregar al carrito</Button>
                </Card.Body>
              </Card>
              <br />
              <Card
                style={{
                  width: "20rem",
                  textAlign: "left",
                }}
              >
                <br />
                informacion del vendedor
                <br />
                <br />
                Ubicación
                <br />
                <br />
                <Row style={{ textAlign: "center" }}>
                  <Col>
                    300
                    <br />
                    <p> ventas en los ultimos xx dias</p>
                  </Col>
                  <Col>
                    <p> brinda X atención</p>
                  </Col>

                  <Col>
                    <p>Entrega sus productos a tiempo</p>
                  </Col>
                </Row>
                <br />
                <a
                  href=""
                  className="stretched-link"
                  style={{
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  <h6> Ver mas datos de venderos </h6>
                </a>
                <br />
                <br />
              </Card>
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
