import React from "react";
import { Link } from "react-router-dom";

const img = [
  "https://cdn.pixabay.com/photo/2019/01/24/23/54/nintendo-switch-3953601_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/10/04/22/11/gopro-1715601_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/01/24/13/26/camera-4790247_960_720.jpg",
];

const Carrousel = () => {
  return (
    <div className="carrousel">
      <div className="carrousel--container">
        {img.map((item, index) => {
          return (
            <div
              key={item + index}
              className="carrousel--gallery"
              style={{ backgroundImage: `url(${item})` }}
            >
              <p className="carrousel--title">
                {" "}
                Deserunt occaecat do magna aliquip reprehenderit ullamco commodo
                qui anim ea cupidatat.
              </p>
              <p carrousel="carrousel--sub-title">Proident labore anim.</p>
              <Link to="/catalogo" className="carrousel--call-to-action">
                Shop Now
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carrousel;
