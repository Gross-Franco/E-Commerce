import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Stars = ({ product, option, starsPoints = 1}) => {
  let stars = [1, 2, 3, 4, 5].map((i) => <BsStar key={i} className="star" />);
  if (option === "multi" && product?.reviews?.length > 0) {
    stars = stars.map((item, index) => {
      let avg =
        product?.reviews
          ?.map((item) => item.starsPoints)
          .reduce((a, b) => a + b, 0) / product?.reviews?.length;
      if (Math.floor(avg) > index) {
        return <BsStarFill className="star" key={index} />;
      } else if (avg > index && avg < index + 1) {
        return <BsStarHalf className="star" key={index} />;
      } else {
        return item;
      }
    });
  } else {
      stars = stars.map((item, index) => {
        if (starsPoints > index) {
          return <BsStarFill className="star" key={index} />;
        } else {
          return item;
        }
      });
  
  }

  return (
    <div className="main-product--points--stars">
      {stars.map((item) => item)}
    </div>
  );
};

export default Stars;
