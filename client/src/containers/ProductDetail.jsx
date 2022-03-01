import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";
import { Card, Button, Col, Row, Container, Badge ,Form} from "react-bootstrap";
/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { searchProductId } from "../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import { BsHeart,BsHeartFill } from "react-icons/bs";


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

  let [heart, setHeart] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
   
    dispatch(searchProductId(id));
  }, []);

  function Favorite(e)
  {
    if(heart === false) 
return <div>
    <BsHeartFill/>
</div> 
else  
return <div>
<BsHeart/>
 </div>
    e.preventDefault()
  }


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
              <Card.Img variant="top" src={productDetail?.image} />

              <Card
                style={{
                  width: "auto",
                  textAlign: "left",
                  position:"relative",
                  top:"20px"
                }}
              >
                <div style={{
                  position:"relative",
                  right:"-20px"

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
                    productDetail?.category?.map((c) => {
                      return <p>{c}</p>;
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
                <Form.Label>Reviewers</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <h6 type="input" style={{ cursor: "pointer" }}> Response</h6>
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
                {/* <Card.Img variant="top"  src="holder.js/100px180" /> */}
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
                        {productDetail?.name }
                      </Card.Title>
                    </Col>
                    <Col>
                      {/* <Card.Title> {"<3"}</Card.Title> */}
                      {/* <img src={heart} />
                      <Card.Img src={heart}   alt="Card image"
                      onMouseEnter={()=>{
                        setHeart(BsHeartFill)
                      }} onmouseleave={()=>setHeart(BsHeart)}
                      /> */}
                    <div  onMouseEnter={(e)=>{
                        setHeart(false)
                      e.preventDefault()
                    }}
                    onClick={(e)=>{
                      console.log("add-to-favorite")
                    e.preventDefault()
                  }}
                    onMouseLeave={(e)=>{
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
                      productDetail?.quantity > 0 ? `Stock disponible: ${productDetail?.quantity}`:
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
