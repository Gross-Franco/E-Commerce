import React from "react";
import { Link } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <div className="home-categories--container">
      <div className="home-categories--collection">
        <p className="home-categories--header-title">Categories</p>
        <div className="home-categories--body">
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div>
                <div className="home-categories--collection-bg"></div>
                <p className="home-categories--collection-category-title"></p>
              </div>
            </Link>
          </div>
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div>
                <div className="home-categories--collection-bg"></div>
                <p className="home-categories--collection-category-title"></p>
              </div>
            </Link>
          </div>
          <div className="home-categories--collection-item">
            <Link
              to="/catalogo"
              className="home-categories--collection-item--link"
            >
              <div>
                <div className="home-categories--collection-bg"></div>
                <p className="home-categories--collection-category-title"></p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
