import React, { useState, useEffect } from "react";
import { Login, Dropdowns } from "./";
// import useStyles from "../helpers/stylesNavBar";
import { Link } from "react-router-dom";
import { Nav, CartButton } from "../components";
import { useDispatch, useSelector } from "react-redux";
// import { createShoppingSession } from "../Redux/Actions/actions";
import { Cart } from "../pages";
import { Modal } from "../containers";

const NavBar = ({ isScroll = false }) => {
  const { authLevel } = useSelector(state => state.session)
  const [load, LoadSet] = useState(authLevel < 2);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
//   let { login } = useSelector((state) => state.session);

//   useEffect(() => {
//     dispatch(createShoppingSession());
//   }, []);
  
  useEffect(() => {
    LoadSet(() => authLevel < 2);
  }, [authLevel]);

  if(isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

//   const classes = useStyles();
//   const handleScroll = () => {
//     if (window.scrollY > 0) {
//       setIsScroll(true);
//     } else {
//       setIsScroll(false);
//     }
//   };
  return (
    <header className="header" >
      <div className={`header--container ${isScroll ? "on-scroll" : ""}`}>
        <Nav isScroll={isScroll} />
        <Link to="/" className={`header-logo ${isScroll ? "scroll" : ""}`}>
          commerce
        </Link>
        {/* <SearchBar /> */}
        <div className={`header-cart--container ${isScroll ? "scroll" : ""}`}>
          {!login ? <Login isScroll={isScroll} /> : <Dropdowns />}
          <CartButton openModal={isOpen} setOpenModal={setIsOpen} />
        </div>
        {!!isOpen && (
          <Modal>
            <Cart openModal={isOpen} setOpenModal={setIsOpen} />
          </Modal>
        )}
      </div>
    </header>
  );
};
export default NavBar;
