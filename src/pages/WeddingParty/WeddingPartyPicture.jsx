import React from "react";
import './WeddingParty.css'





const WeddingPartyPicture = ({img,name}) => {
    return (
        <div className="weddingPartyCard">
            <img src={img} className = "partyImage" />
            <p className="partyName">{name}</p>
        </div>
    );
};

export default WeddingPartyPicture;