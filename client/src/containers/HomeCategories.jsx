import React from "react";
import { Link } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <div className="home-categories--container">
      <div className="home-categories--collection">
        <p className="home-categories--header-title">Categorias</p>
        <div className="home-categories--body">
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div className="home-categories--item-container">
                <div className="home-categories--collection-bg" style={{backgroundImage: `url(/assets/sport-category.jpg)`}} />
                <p className="home-categories--collection-category-title">Deportes</p>
              </div>
            </Link>
          </div>
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div className="home-categories--item-container">
                <div className="home-categories--collection-bg sport" style={{backgroundImage: `url(/assets/videogames-category.jpg)`}}></div>
                <p className="home-categories--collection-category-title">Videojuegos</p>
              </div>
            </Link>
          </div>
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div className="home-categories--item-container">
                <div className="home-categories--collection-bg" style={{backgroundImage: `url(/assets/tools-category.jpg)`}}></div>
                <p className="home-categories--collection-category-title">Herramientas</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
