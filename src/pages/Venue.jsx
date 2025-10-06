import React from "react";
import './Venue.css'
import NHMHope from '../../src/assets/nhm-hope.png';
import CameronNHM from '../../src/assets/cameron-nhm.png';




const Venue = () => {
    return (
        <div className="pageBody">
            <div className="header">Venue</div>
            <div className="blurb">
                <h3>Established in 1881, the Natural History Museum is one of London’s true treasures. Sometimes dubbed a <span style = {{fontStyle: "italic"}}>cathedral to nature</span>, more than 80 million specimens are housed within its soaring Romanesque arches, including some collected by Charles Darwin himself (who will be presiding over the evening from his perch atop the grand staircase). </h3>

                <h3>As with all publicly funded museums, the Natural History Museum is free to enter, and in the days before or after the ceremony, we highly encourage you to get lost among its many corridors. Filled to the brim with everything from dinosaurs to giant sequoias, meteorites to creepy crawlies, there is always something new to discover. It is for this reason that Cameron has been making pilgrimages to the museum for as long as he can remember, as you can see in the photo below! </h3>

                <h3>We are incredibly lucky to be celebrating here, and feel honoured to be able to share such a special place with you. </h3>

            </div>

            <div className = "venuePhotos">
                <img className = "venueImg" src={CameronNHM} alt="Cameron at the NHM" />
                <img className = "venueImg" src={NHMHope} alt="NHM Hope the Whale" />
            </div>
        </div>
    );
};

export default Venue;