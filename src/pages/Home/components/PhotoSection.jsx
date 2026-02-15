import React from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

import silverstone from "../../../assets/home/silverstone.webp";
import columns from "../../../assets/home/columns.webp";
import wedding from "../../../assets/home/wedding.webp";
import chairs from "../../../assets/home/chairs.webp";
import christmas from "../../../assets/home/christmas.webp";
import skiing from "../../../assets/home/skiing.webp";

const photos = [
  { src: silverstone, alt: "One" },
  { src: skiing, alt: "Two" },
  { src: columns, alt: "Three" },
  { src: wedding, alt: "Four" },
  { src: christmas, alt: "Four" },
  { src: chairs, alt: "Four" },
];



const PhotoSection = ({scrollTo = "noArrow", goToSectionRef}) => {
    return (

            <div className="photoSection">
                <PhotoCarousel photos={photos} />
          
          {scrollTo != "noArrow" && <button className = "downArrow downArrow2" onClick = {()=> scrollTo(goToSectionRef)}></button>}

            </div>
    );
};

export default PhotoSection;