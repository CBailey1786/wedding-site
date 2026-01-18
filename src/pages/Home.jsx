import React from "react";
import './Home.css'
import northernLights from '../../src/assets/northern-lights-enhanced.png';
import nhmOutside from '../../src/assets/nhm-outside.png';
import { NavLink } from "react-router-dom";
import PageHeader from "../layouts/PageHeader";


const Home = () => {
    return (
        // <div className="pageBody">
        //     <div className="namesSection">
        //         <h1 className="names">Amanda </h1> <h2 className="namesAnd">and</h2> <h1 className="names"> Cameron</h1>
        //     </div>

        //     <div>
        //         <h2>13 June 2026</h2>
        //         <h2>Natural History Museum, London</h2>

        //         <h4>More information and formal invitations to follow.</h4>
        //     </div>

        // <NavLink to="/Hotels" end className="logoLink" aria-label="Home">
        //   <button className="actionButton">Hotels</button>
        // </NavLink>


        //     <img className = "nhmImage" src={nhmOutsideWebp} alt="Natural History Museum" loading="lazy" />    
        // </div>

        <div className="mainBody">
                    <PageHeader pageName = "" />
            <div className="hero">
                <div className="heroLeft">
                    <div className="namesSectionHero">
                        <h1 className="namesHero name1">Amanda </h1> <h2 className="namesAndHero">and</h2> <h1 className="namesHero name2"> Cameron</h1>
                    </div>
                    <div className="heroSubText">
                        <h2>13 June 2026</h2>
                        <h2>Natural History Museum, London</h2>
                    </div>
                    <div className="heroButtons">
                        <a className="primaryButton" href="/RSVP">RSVP</a>
                        <a className="otherButton" href="/Hotels">Hotels</a>

                    </div>
                </div>
                <img className="heroPicture" src={northernLights} alt="Us with the Northern Lights" loading="lazy" />

            </div>

            <div className="scheduleOfEvents">
<div className="scheduleLeft">
                <img className="nhmOutside" src={nhmOutside} alt="Us with the Northern Lights" loading="lazy" />
                </div>
                <div className="scheduleRight">
                    <div className="header subHeader"> Schedule of Events</div>
                        <div className = "event">
                            <div className = "eventTop">
                                <div className = "eventName">
                                    Rehearsal Dinner
                                </div>
                                <div className = "eventDate">
                                    12 June 2026 18:00 - 19:30
                                </div>
                            </div>
                            <div className = "eventBottom">
                                <div className = "eventLocation">
                                    Madera at The Treehouse
                                </div>
                                <div className = "eventAddress">
                                    14-15 Langham Place, London, W1B 2QS
                                </div>
                            </div>
                        </div>
                                        <div className = "event">
                        <div className = "eventTop">
                            <div className = "eventName">
                                Welcome Party
                            </div>
                            <div className = "eventDate">
                                12 June 2026 19:30 - 00:00
                            </div>
                        </div>
                        <div className = "eventBottom">
                            <div className = "eventLocation">
                                The Nest
                            </div>
                            <div className = "eventAddress">
                                14-15 Langham Place, London, W1B 2QS
                            </div>
                        </div>
                    </div>
                                        <div className = "event">
                        <div className = "eventTop">
                            <div className = "eventName">
                                Wedding Ceremony & Reception
                            </div>
                            <div className = "eventDate">
                                13 June 2026 18:00 - 03:00
                            </div>
                        </div>
                        <div className = "eventBottom">
                            <div className = "eventLocation">
                                The Natural History Museum
                            </div>
                            <div className = "eventAddress">
                                Cromwell Road, London, SW7 5BD
                            </div>
                        </div>
                    </div>
                                        <div className = "event">
                        <div className = "eventTop">
                            <div className = "eventName">
                                Farewell Brunch
                            </div>
                            <div className = "eventDate">
                                14 June 2026 10:00 - 12:00
                            </div>
                        </div>
                        <div className = "eventBottom">
                            <div className = "eventLocation">
                                Venue TBC
                            </div>
                            <div className = "eventAddress">
                                
                            </div>
                        </div>
                    </div>
                    
                </div>


            </div>





        </div>
    );
};

export default Home;