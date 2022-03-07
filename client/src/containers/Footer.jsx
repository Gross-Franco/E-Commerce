import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer--container">
      <div className="footer--content-container">
        <div className="footer--content">
          <p className="footer--content-title">Commerce</p>
          <div className="footer--content-links">
            <div className="footer--content--link">
              <Link to="/docs" className="footer--content-link">
                Documentación
              </Link>
              <Link to="/contacto" className="footer--content-link">
                About us
              </Link>
            </div>
            <div className="footer--content--link">
              <Link to="/ayuda" className="footer--content-link">
                Help
              </Link>
              <Link to="/tyc" className="footer--content-link">
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
        <div className="footer--content">
          <p className="footer--content-title">Follow us</p>
          <div className="footer--content-links">
            <div className="footer--content--link">
              <Link to="/contacto" className="footer--content-link">
                Twitter
              </Link>
              <Link to="/contacto" className="footer--content-link">
                Facebook
              </Link>
            </div>
            <div className="footer--content--link">
              <Link to="/contacto" className="footer--content-link">
                GitHub
              </Link>
              <Link to="/contacto" className="footer--content-link">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="footer--content">
          <p className="footer--content-title">Newsletter</p>
          <form className="footer--content-form">
            <input
              type="email"
              className="footer--content-input"
              placeholder="email address"
            />
            <BsArrowRight  className="footer--content-btn"/>
          </form>
        </div>
      </div>
      <div className="footer--copyright">
        <p className="footer--copyright-text">High Earners Not Rich Yet</p>
        <p className="footer--copyright-text">© 2022 Commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
