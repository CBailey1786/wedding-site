import React from "react";
import './Home.css'
import nhmOutside from '../../src/assets/nhm-outside.png';



const Home = () => {
    return (
        <div className = "homeBody">
        <div className = "namesSection">
            <h1 className = "names">Amanda </h1> <h2 className = "namesAnd">and</h2> <h1 className = "names"> Cameron</h1>
        </div>

        <div>
        <h2>13 June 2026</h2>
        <h2>Natural History Museum, London</h2>
        
        <h4>More information and formal invitations to follow.</h4>
</div>

        <button className="actionButton">Hotels</button>

        <img className = "nhmImage" src={nhmOutside} alt="natural history museum outside" />
        </div>
    );
};

export default Home;