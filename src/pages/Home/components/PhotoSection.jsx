import React from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

import silverstone from "../../../assets/silverstone.jpg";
import river from "../../../assets/river.jpg";
import columns from "../../../assets/columns.jpg";
import wedding from "../../../assets/wedding.jpg";

const photos = [
  { src: silverstone, alt: "One" },
  { src: river, alt: "Two" },
  { src: columns, alt: "Three" },
  { src: wedding, alt: "Four" },
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