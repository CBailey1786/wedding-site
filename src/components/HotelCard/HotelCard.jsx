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



          <div>
            <div className="hotelCardInfoLabel">RATE</div>
            <div>{info.rate}</div>
          </div>

          <div>
            <div className="hotelCardInfoLabel">BOOKING DETAILS</div>
            <div>{info.details}</div>
          </div>
          
        <div className = "websiteButton">
            <a href={info.website} target="_blank">Visit their website</a>
          </div>
        </div>

<div className="hotelCardMedia">
        <img className="hotelCardImage" src={img} alt={`${name} image`} />
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
