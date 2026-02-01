import React from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

import silverstone from "../../../assets/silverstone-bw.png";
import christmas from "../../../assets/christmas-bw.png";
import columns from "../../../assets/columns-bw.png";
import wedding from "../../../assets/wedding-bw.png";

const photos = [
  { src: silverstone, alt: "One" },
  { src: christmas, alt: "Two" },
  { src: columns, alt: "Three" },
  { src: wedding, alt: "Four" },
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