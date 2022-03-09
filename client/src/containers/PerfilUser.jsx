import React from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Border,
  FormControl,
  Form,
} from "react-bootstrap";
import Holder from "react-holder";
import { useState, useEffect } from "react";
import { Pages } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { NavBar } from ".";
import ProfileTables from "./ProfileTables";

import {
  getProductsPublic,
  createShoppingSession,
  checkSession,
  userDetails,
} from "../Redux/Actions/actions";
import { useNavigate } from "react-router-dom";

export default function PerfilUser() {
  //Desplazamiento

  const [link, setLink] = useState('Payments');
  const [text_1, setText_1] = useState("nav-link active");
  const [text_2, setText_2] = useState("nav-link ");
  const [text_3, setText_3] = useState("nav-link ");
  const [text_4, setText_4] = useState("nav-link ");
  const [text_5, setText_5] = useState("nav-link ");

  // const [Editar, setEditar] = useState(false);

  // const [changeValues, setChangeValues] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   username: "",
  // });

  //traer informacion del usuario.
  const navigate = useNavigate();
  const { user, login } = useSelector((state) => state.session);
  const { details } = useSelector(state => state.users)
  let dispatch = useDispatch();
  
  // const [selectedFile, setSelectedFile] = useState();
  // const changeHandler = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setSelectedFile(URL.createObjectURL(event.target.files[0]));
  //   }
  //   event.preventDefault();
  // };

  // agrgar cards  para

  function ChoiseDir() {
    setText_1("nav-link");
    setText_2("nav-link");
    setText_3("nav-link");
    setText_4("nav-link");
    setText_5("nav-link");

    if (link === "Payments") setText_1("nav-link active");
    else if (link === "Addresses") setText_2("nav-link active");
    else if (link === "Order history") setText_3("nav-link active");
    else if (link === "Reviews") setText_4("nav-link active");
    else setText_5("nav-link active");
  }

  useEffect(() => {
    if(!login) {
      navigate("/");
    }
  }, [login])

  useEffect(() => {
    ChoiseDir();
  }, [link, user]);

  useEffect(() => {
    dispatch(userDetails(user?.id))
  },[]);


  // function handleSubmit(e) {
  //   console.log(changeValues);
  //   setEditar(!Editar);
  //   e.preventDefault();
  // }

  // Main Render

  return ( login &&
    <div>
      <NavBar isScroll={true} />
      <br /> <br />
      <br /> <br />
      <Container>
        <Row>
          <Col>
            <Card
              className="shadow p-3 mb-5 bg-body rounded"
              style={{
                width: "20rem",
                position: "relative",
                // right:"30px"
              }}
            >
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  right: "-20px",
                }}
              >
                <br />
                <br />
                {/* {Editar ? (
                  <div>
                    <Card.Img
                      variant="top"
                      src={details.image}
                      style={{
                        margin: "auto",
                        // width: "100%",
                        position: "relative",
                        right: "30px",
                        border: "4px solid #666",
                        width: "200px",
                        height: "200px",
                        borderRadius: "200px",
                        padding: "5px",
                      }}
                    />
                    <input
                      type="file"
                      onChange={changeHandler}
                      className="filetype"
                    />
                  </div>
                ) : ( */}
                  <div>
                    <Card.Img
                      variant="top"
                      src={details?.image}
                      style={{
                        margin: "auto",
                        // width: "100%",
                        position: "relative",
                        right: "30px",
                        border: "4px solid #666",
                        width: "200px",
                        height: "200px",
                        borderRadius: "200px",
                        padding: "5px",
                      }}
                    />
                  </div>
                <br />
                <h6> Name: {details?.first_name + ' ' + details?.last_name}</h6>
                <h6> Username: {details?.username}</h6>
                <h6> Email: {details?.email}</h6>
              </div>
            </Card>
          </Col>

          <Col
            xs={8}
            style={{
              position: "relative",
              top: "20px",
            }}
          >
            <Card className="shadow p-3 mb-5 bg-body rounded">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <h6
                      className={text_1}
                      type="submit"
                      onClick={(e) => {
                        setLink("Payments");
                        e.preventDefault();
                      }}
                    >
                      Payments
                    </h6>
                  </li>

                  <li className="nav-item">
                    <h6
                      type="button"
                      className={text_2}
                      //  type="submit"
                      onClick={(e) => {
                        setLink("Addresses");
                        e.preventDefault();
                      }}
                    >
                      Addresses{" "}
                    </h6>
                  </li>
                  <li className="nav-item">
                    <h6
                      className={text_3}
                      type="submit"
                      onClick={(e) => {
                        setLink("Order history");

                        e.preventDefault();
                      }}
                    >
                      Order history
                    </h6>
                  </li>

                  <li className="nav-item">
                    <h6
                      className={text_4}
                      type="submit"
                      onClick={(e) => {
                        setLink("Reviews");

                        e.preventDefault();
                      }}
                    >
                      Reviews
                    </h6>
                  </li>
                  <li className="nav-item">
                    <h6
                      className={text_5}
                      type="submit"
                      onClick={(e) => {
                        setLink("Wishlist");

                        e.preventDefault();
                      }}
                    >
                      Wishlist
                    </h6>
                  </li>
                </ul>
              </div>

              <br />
              <ProfileTables link={link} userid={user?.id} />
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
}
