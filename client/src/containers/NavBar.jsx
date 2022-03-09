import React, { useState } from "react";
import { Login, Dropdowns } from "./";
import { Link } from "react-router-dom";
import { Nav, CartButton } from "../components";
import { useSelector } from "react-redux";
import { Cart } from "../pages";
import { Modal } from "../containers";
import { setOverflowY } from "../services";

const NavBar = ({ isScroll = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  let { login } = useSelector((state) => state.session);

  setOverflowY(isOpen);

  return (
    <header className="header">
      <div className={`header--container ${isScroll ? "on-scroll" : ""}`}>
        <Nav isScroll={isScroll} />
        <Link to="/" className={`header-logo ${isScroll ? "scroll" : ""}`}>
          commerce
        </Link>
        {/* <SearchBar /> */}
        <div className={`header-cart--container ${isScroll ? "scroll" : ""}`}>
          {!login ? (
            <Link
              to="/login"
              className={`header-nav--link ${isScroll ? "scroll-link" : ""}`}
            >
              Login
            </Link>
          ) : (
            <Dropdowns />
          )}
          <CartButton openModal={isOpen} setOpenModal={setIsOpen} />
        </div>
        {!!isOpen && (
          <Modal position="end">
            <Cart openModal={isOpen} setOpenModal={setIsOpen} />
          </Modal>
        )}
      </div>
    </header>
  );
};
export default NavBar;
