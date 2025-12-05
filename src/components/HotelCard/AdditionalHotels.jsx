import React from "react";
import "./HotelCard2.css";

const AdditionalHotels = ({ name, address, image, website }) => {
  return (



    <div className="additionalHotelCard">

      <img className="additionalHotelImage" src={image} alt={`${name} Image`} />

      <div className="additionalHotelInfo">


        <div className = "additionalHotelInfoTop">
          <div className="hotelName additionalHotelName">{name}</div>
        </div>

        <div className = "additionalHotelInfoBottom">
<div className="hotelAddress hotelCardText">{address}</div>
        <a className="websiteButton secondaryButton" href={website} target="_blank">Visit their website</a>
        </div>




      </div>

    </div>

  );
};

export default AdditionalHotels;
