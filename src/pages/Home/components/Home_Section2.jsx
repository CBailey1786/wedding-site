import React from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";



const Home_Section2 = ({scrollTo = "noArrow", goToSectionRef}) => {
    return (

            <div className="whiteBody">
                photos
          
          {scrollTo != "noArrow" && <button className = "downArrow downArrow2" onClick = {()=> scrollTo(goToSectionRef)}></button>}

            </div>
    );
};

export default Home_Section2;