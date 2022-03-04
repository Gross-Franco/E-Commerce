import React from "react";

const Hero = ({ title, subtitle }) => {
  return (
    <div className="register--main--hero">
      <h1 className="register--main--hero-title">{title}</h1>
      <p className="register--main--hero-subtitle">
        {subtitle}
      </p>
    </div>
  );
};

export default Hero;
