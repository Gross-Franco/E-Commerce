import React, { useEffect, useState } from "react"; /* 
import Carousel from "react-bootstrap/"; */
import { NavBar, Footer } from "./";


import { saveLocalStorage } from "../services";
import { MdAddShoppingCart, MdKeyboardArrowRight } from "react-icons/md";

import { Card, Button, Col, Row, Container, Badge, Form, ProgressBar} from "react-bootstrap";


/* import Holder from "react-holder";
import { color, textAlign } from "@mui/system"; */
import { useDispatch, useSelector } from "react-redux";
import { saveLocal, searchProductId, postReview, loadDetails, addToWishlist, removeFromWishlist, getWishlist } from "../Redux/Actions/actions";

import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import { Link } from "react-router-dom";
import Login from "./Login";
import Dropdowns from "./Dropdowns";
import { CartButton, Stars } from "../components";
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
      user_id: user?.id,
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
    dispatch(getWishlist(user?.id))
  }, [])

  useEffect(() => {
    return dispatch(loadDetails())
  }, [])

  const handleWish = () => {
    if (!heart) {
      dispatch(addToWishlist(user?.id, id))
    }
    else {
      dispatch(removeFromWishlist(user?.id, id))
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
      <div className="main-product--content">
        <div className="main-product--content--left">
          <div className="main-product--breadcrumb">
            <Link to="/catalogo" className="main-product--breadcrumb--link">
              Productos
            </Link>
            <span className="main-product--breadcrumb--separator">
              {" "}
              <MdKeyboardArrowRight className="icon" />{" "}
            </span>
            <span className="main-product--breadcrumb--span">
              {productDetail?.name}
            </span>
          </div>
          <div className="main-product--side-bar">
            <p className="main-product--side-bar--title">Categorias</p>
            {productDetail?.category?.map((item, index) => (
              <p className="main-product--side-bar--item" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div
          className="main-product--content--center"
          style={{
            backgroundImage: `url(${productDetail?.image})`,
          }}
        />
        <div className="main-product--content--right">
          <div className="main-product--points">
            <Stars product={productDetail} option="multi" />
            <p className="main-product--points--avg">
              {(productDetail?.reviews?.length > 0 &&
                (
                  productDetail?.reviews?.reduce(
                    (a, b) => a + b.starsPoints,
                    0
                  ) / productDetail?.reviews?.length
                ).toFixed(1)) ||
                1}
              /5
            </p>
          </div>
          <div className="main-product--header">
            <h1 className="main-product--product-title">
              {productDetail?.name}
            </h1>
            {heart ? (
              <BsHeartFill className="heart red" onClick={() => handleWish()} />
            ) : (
              <BsHeart className="heart" onClick={() => handleWish()} />
            )}
          </div>
          <p className="main-product--description">
            {productDetail?.description}
          </p>
          <p className="main-product--stock">
            {productDetail?.quantity > 0 ? "En stock " : "Agotado"}
            {productDetail?.quantity > 0 && (
              <span className="main-product--stock--quantity">
                {productDetail?.quantity}
              </span>
            )}
          </p>
          <StripeSingleItem product={productDetail} />
          <button className="main-product--button" onClick={handleClick}>
            <span className="main-product--btn-span">Agregar al carrito</span>
            <span className="main-product--btn-price">
              ${productDetail?.price}
            </span>
          </button>
        </div>
      </div>
      {productDetail?.reviews?.length > 0 && (
        <div className="main-product--reviews">
          <p className="main-product--reviews--title">
            {productDetail?.reviews?.length} Comentarios de los usuarios
          </p>
          <div className="main-product--reviews--content">
            {productDetail?.reviews?.map((item, index) => ( index < 3 &&
              <div className="main-product--reviews--content--item" key={index}>
                <div className="main-product--points">
                  <Stars option="single" starsPoints={item.starsPoints} />
                  <p className="main-product--points--avg">
                    {item.starsPoints}/5
                  </p>
                </div>
                <p className="main-product--reviews--content--item--title">
                  Sin titulo
                </p>
                <p className="main-product--reviews--content--item--description">
                  {item.description}
                </p>
                <span className="main-product--reviews--content--item--user">
                  {item.user} | {item?.created_at || "09/03/2022"}
                </span>
              </div>
            ))}
          </div>
          {productDetail?.reviews?.length > 5 && (
            <button className="main-product--reviews--more">
                Ver mas comentarios
            </button>
          )}
        </div>
      )}
      {user?.id && (
        <form onSubmit={handleSubmit}>
          <label>Review:</label>
          <textarea
            value={newReview.description}
            name="description"
            onChange={handleChange}
          />

          <label>Score:</label>
          <input
            className="aaaa"
            type="number"
            min="1"
            max="5"
            value={newReview.starsPoints}
            name="starsPoints"
            onChange={handleChange}
          />

          <button type="submit"> POST </button>
        </form>
      )}
      <Footer />
    </div>
  );
}