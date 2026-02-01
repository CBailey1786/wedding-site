import React from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

const photos = [
  { src: "src/assets/langham-outside.jpg", alt: "One" },

  { src: "src/assets/northern-lights-enhanced-bw.webp", alt: "Two" },
  { src: "src/assets/nhm-outside.webp", alt: "Three" },
  { src: "src/assets/the-royal-horseguards.jpg", alt: "Four" },
];



const Home_Section2 = ({scrollTo = "noArrow", goToSectionRef}) => {
    return (

            <div className="whiteBody">
                <PhotoCarousel photos={photos} />
          
          {scrollTo != "noArrow" && <button className = "downArrow downArrow2" onClick = {()=> scrollTo(goToSectionRef)}></button>}

            </div>
    );
};

export default Home_Section2;