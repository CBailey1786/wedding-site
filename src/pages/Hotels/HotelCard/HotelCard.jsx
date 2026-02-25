import React from "react";
import "./HotelCard.css";

const HotelCard = ({ name, img, info,discount_subheader, link , discount_text  }) => {
  console.log(name, discount_subheader)
  return (

    <div className="HotelCard">

      <div className="cardImageWrapper">
        <img
          src={img}
          alt={name || "Hotel image"}
          className="cardImage"
        />
      </div>

      <div className="HotelCardBottom">

          <div className="hotelCardTitleRow">
            <h2 className="hotelCardTitle">{name}</h2>
            <p className="hotelCardSubtitle">{info.address ?? ""}</p>

          </div>
        <div className="hotelCardText">


        <p className="hotelCardBody">{info.blurb}</p>

        </div>

                {discount_subheader != null &&
        
        <div className="roomBlockDiv">
        <h3>{discount_subheader}</h3>
        <p>{discount_text}</p>
        <a className = "links" href={link} target="_blank">Room block rate link</a>
        </div>
        }

        <div className="ButtonContainer">
          <a className="hotelButton hotelPrimary" href={info.website} target="_blank">Visit their website</a>
        </div>



      </div>
    </div>

  );
};

export default HotelCard;
