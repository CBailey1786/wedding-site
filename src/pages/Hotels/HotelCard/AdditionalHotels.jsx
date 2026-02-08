import React from "react";
import "./HotelCard.css";

const AdditionalHotels = ({ name, address, image, website }) => {
  return (



    <div className="additionalHotelCard">

      <img className="additionalHotelImage" src={image} alt={`${name} Image`} />
      <div className="imageScreen"></div>
      <div className="imageScreenRadial"></div>

      <div className="additionalHotelInfo">

        <div className="additionalHotelInfo"></div>
        <h3 className="additionalHotelName">{name}</h3>

        <div className="additionalHotelSubtitle">{address}</div>
        <div className="additionalHotelInfo"></div>

                <div className="ButtonContainer">
          <a className="hotelButton hotelSecondary" href={website} target="_blank">Visit their website</a>
        </div>
      </div>




    </div>

  );
};

export default AdditionalHotels;
