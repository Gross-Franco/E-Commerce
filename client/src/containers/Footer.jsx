import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <div>
            <footer className="text-white py-4 bg-dark">
                <div>
                    <nav className="row">   
                    <Link to="/" className="col-12 col-md-3 d-flex align-items-center justyfy-content-center" style={{ textDecoration: 'none', color:'white' }}> LOGO DEL ecommerce</Link>
                    <ul className="col-12 col-md-2 list-unstyled" >
                        <li>Redes Sociales</li>
                        <li><i className="bi bi-instagram"/><a href="https://www.instagram.com/" style={{ textDecoration: 'none', color:'white' }}>Instagram</a></li>
                        <li><i className="bi bi-facebook" /><a href="https://www.facebook.com/" style={{ textDecoration: 'none', color:'white' }}>Facebook</a></li>
                        <li><i className="bi bi-twitter"/><a href="https://www.twitter.com/" style={{ textDecoration: 'none', color:'white' }}>Twitter</a></li>
                        <li><i className="bi bi-youtube"/><a href="https://www.youtube.com/" style={{ textDecoration: 'none', color:'white' }}>Youtube</a></li>                   
                    </ul>
                    <ul className="col-12 col-md-2 list-unstyled">
                        <li>Terminos y condiciones</li>
                    </ul>
                    <ul className="col-12 col-md-2 list-unstyled">
                        <li>Ayuda</li>
                    </ul>
                    <ul className="col-12 col-md-2 list-unstyled">
                        <li>Mi cuenta</li>
                        <li>login</li>
                        <li><Link to="/registro" style={{ textDecoration: 'none', color:'white' }}>Registrarse</Link></li>
                    </ul>
                    </nav>
                </div>
            </footer>
        </div>
    )
}