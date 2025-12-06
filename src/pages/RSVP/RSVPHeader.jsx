import { useEffect, useState } from "react";
import flowers from '../../assets/heart-flower.svg';
import "./RSVPMain.css"


export default function RSVPHeader({guest}) {
 

  return (
    <header className="RSVPHeader">
        <img src={flowers} alt="flower-motif" />
        <div className = "headerText">
            <h1>RSVP</h1>
            {guest && <p>{guest.first_name} {guest.last_name}</p>}
        </div>
        
        
    </header>
  );
}




