import React from "react";
import "./HotelCard2.css";

const HotelCard = ({ name, img, info, reversed = false }) => {
  return (
//     <article className={`hotelCard ${reversed ? "reversed" : ""}`}>
//       <header className="cardHeader">{name}</header>

//       <div className="hotelCardBody">
//         <div className="hotelCardInformation">
//           <div>{info.blurb}</div>

//           <div>
//             <div className="hotelCardInfoLabel">ADDRESS</div>
//             <div>{info.address}</div>
//           </div>

          
//             <a className = "websiteButton" href={info.website} target="_blank">Visit their website</a>
//         </div>

// <div className="hotelCardMedia">
//         <img className="hotelCardImage" src={img} alt={`${name} image`} />
//         </div>
//       </div>
//     </article>

<article className = "hotelCard">
  <div className = "hotelCardLeft">
    <img className="hotelCardImage" src={img} alt={`${name} image`} />
  </div>
  <div className = "hotelCardRight">
    <div className="hotelCardInformation">

      <div className = "hotelHeader">
      <div className = "hotelName">{name}</div>
      <div className = "hotelAddress hotelCardText">{info.address}</div>
      </div>
         <div className = "hotelBlurb hotelCardText">{info.blurb}</div>


          
          <a className = "websiteButton" href={info.website} target="_blank">Visit their website</a>
       </div>
  </div>
</article>
  );
};

export default HotelCard;
