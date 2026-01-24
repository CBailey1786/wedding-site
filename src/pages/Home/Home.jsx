import React from "react";
import './Home.css'
import flowers from '../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";



const Home = () => {
    return (


        <div className="homeBody">
            <div className="hero">
                <div className="heroColour">
                </div>
                <div className="namesWrapper">
                    <img className="flowers" src={flowers} alt="flower-motif" />
                    <div className="namesSection">
                        <h1 className="names">Amanda </h1> <h2 className="names">&</h2> <h1 className="names"> Cameron</h1>
                    </div>
                </div>

                <div className="heroDetails">
                    <p className = "heroDetail">13 June 2026</p>
                    <p className = "heroDetail">Natural History Museum, London</p>
                </div>

                <div className="heroButtons">
                              <button
            type="button"
            className="heroButton heroPrimary">
                RSVP
          </button>

                                              <button
            type="button"
            className="heroButton heroSecondary">
                Hotels
          </button>
          </div>

            </div>
{/* 
            <div className="scheduleOfEvents">

                <div className="scheduleRight">
                    <div className="header subHeader"> Schedule of Events</div>
                    <div className="event">
                        <div className="eventTop">
                            <div className="eventName">
                                Rehearsal Dinner
                            </div>
                            <div className="eventDate">
                                12 June 2026 18:00 - 19:30
                            </div>
                        </div>
                        <div className="eventBottom">
                            <div className="eventLocation">
                                Madera at The Treehouse
                            </div>
                            <div className="eventAddress">
                                14-15 Langham Place, London, W1B 2QS
                            </div>
                        </div>
                    </div>
                    <div className="event">
                        <div className="eventTop">
                            <div className="eventName">
                                Welcome Party
                            </div>
                            <div className="eventDate">
                                12 June 2026 19:30 - 00:00
                            </div>
                        </div>
                        <div className="eventBottom">
                            <div className="eventLocation">
                                The Nest
                            </div>
                            <div className="eventAddress">
                                14-15 Langham Place, London, W1B 2QS
                            </div>
                        </div>
                    </div>
                    <div className="event">
                        <div className="eventTop">
                            <div className="eventName">
                                Wedding Ceremony & Reception
                            </div>
                            <div className="eventDate">
                                13 June 2026 18:00 - 03:00
                            </div>
                        </div>
                        <div className="eventBottom">
                            <div className="eventLocation">
                                The Natural History Museum
                            </div>
                            <div className="eventAddress">
                                Cromwell Road, London, SW7 5BD
                            </div>
                        </div>
                    </div>
                    <div className="event">
                        <div className="eventTop">
                            <div className="eventName">
                                Farewell Brunch
                            </div>
                            <div className="eventDate">
                                14 June 2026 10:00 - 12:00
                            </div>
                        </div>
                        <div className="eventBottom">
                            <div className="eventLocation">
                                Venue TBC
                            </div>
                            <div className="eventAddress">

                            </div>
                        </div>
                    </div>

                </div>


            </div>

 */}



        </div>
    );
};

export default Home;