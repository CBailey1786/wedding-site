import {React, useRef, useEffect} from "react";
import './Home_Section.css'




const ScheduleComponent = ({id, header, date, location, address, dress_code, photo}) => {

    return(
        <div className = "scheduleComponentBody">
            <div className="scheduleComponentTextSection">
                <div className="scheduleComponentHeader">
                    <h2 className="scheduleComponentHeader">{header}</h2>
                    <p className="scheduleComponentText">{date}</p>
                </div>

                <div className="scheduleComponentAddress">
                    <p className="scheduleComponentText">{location}</p>
                    <p className="scheduleComponentText">{address}</p>
                </div>

                <p className="scheduleComponentText">Dress Code: {dress_code}</p>
            </div>

            <img className = {`scheduleComponentImage image_${id}`} src={photo} alt="" />

        </div>
    )

};

export default ScheduleComponent;