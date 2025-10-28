import React from "react";
import "./HotelCard.css";

const HotelCard = ({ name, img, info, reversed = false }) => {
  return (
    <article className={`hotelCard ${reversed ? "reversed" : ""}`}>
      <header className="cardHeader">{name}</header>

      <div className="hotelCardBody">
        <div className="hotelCardInformation">
          <div>{info.blurb}</div>

          <div>
            <div className="hotelCardInfoLabel">ADDRESS</div>
            <div>{info.address}</div>
          </div>

          
            <a className = "websiteButton" href={info.website} target="_blank">Visit their website</a>
        </div>

<div className="hotelCardMedia">
        <img className="hotelCardImage" src={img} alt={`${name} image`} />
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
