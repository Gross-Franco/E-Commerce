import React from "react";
import styled, { keyframes } from "styled-components";



const img = [
  "https://cdn.pixabay.com/photo/2019/01/24/23/54/nintendo-switch-3953601_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/10/04/22/11/gopro-1715601_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/01/24/13/26/camera-4790247_960_720.jpg",
];

const fader = keyframes`
  0% { background-image: url(${img[0]}); }
  25% { background-image: url(${img[1]}); }
  50% { background-image: url(${img[2]}); }
  75% { background-image: url(${img[1]}); }
  100% { background-image: url(${img[0]}); }
`;

const CarrouselStyled = styled.div`
  animation: ${fader} 16s cubic-bezier(1,0,0,1) infinite;
  width: 100%;
  background-size: cover;
`;

const Carrousel = () => {
    return (
      <div className="carrousel">
      <CarrouselStyled className="carrousel--container" >
        <img src={img[0]} alt="img" className="carrousel--img" />
      </CarrouselStyled>
    </div>
    );
  
};

export default Carrousel;
