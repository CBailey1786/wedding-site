import React from "react";
import "./HotelCard.css";

const AdditionalHotels = ({ name, address, displayWebsite, website }) => {
  return (
    <article className="hotelCard addtionalHotelCard">
      <header className="cardHeader miniHeader">{name}</header>

<div className = "AdditionalHotelCardInformation">
          <div className="hotelCardInfo">
            <div className="hotelCardInfoLabel">ADDRESS</div>
            <div className="hotelCardInfo">{address}</div>
          </div>

          <div className="hotelCardInfo">
            <div className="hotelCardInfoLabel">WEBSITE</div>
            <a href={website} target="_blank">{displayWebsite}</a>
          </div>
          </div>
    </article>
  );
};

export default AdditionalHotels;
