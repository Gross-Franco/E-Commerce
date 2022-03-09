import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Carrousel = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === [1, 2, 3, 4, 5].length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="carrousel--container">
      <div
        className="carrousel--show-slide"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {[1, 2, 3, 4, 5].map((n, index) => (
          <div
            className="carrousel--slide"
            key={index}
            style={{ backgroundImage: `url(/assets/slide-${n}.jpg)` }}
          >
            <div className="carrousel--hero-content">
              <p className="carrousel-hero--header">
                Welcome to Henrry E-commerce.
              </p>
              <p className="carrousel-hero--subheader">
                Devloped by group 6. ENJOY!!!
              </p>
              <Link to="/catalogo" className="carrousel-hero--btn">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carrousel;
