import React from "react";
import './Home.css'
import nhmOutsideWebp from '../../src/assets/nhm-outside.webp?url';
import nhmOutsidePng from '../../src/assets/nhm-outside.png';
import { NavLink } from "react-router-dom";


const Home = () => {
    return (
        <div className="pageBody">
            <div className="namesSection">
                <h1 className="names">Amanda </h1> <h2 className="namesAnd">and</h2> <h1 className="names"> Cameron</h1>
            </div>

            <div>
                <h2>13 June 2026</h2>
                <h2>Natural History Museum, London</h2>

                <h4>More information and formal invitations to follow.</h4>
            </div>
            {/* 
        <NavLink to="/Hotels" end className="logoLink" aria-label="Home">
          <button className="actionButton">Hotels</button>
        </NavLink>
         */}

            <img className = "nhmImage" src={nhmOutsideWebp} alt="Natural History Museum" loading="lazy" />    
        </div>
    );
};

export default Home;