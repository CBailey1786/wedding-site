import {React, useRef, useEffect} from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";

import gsap from "gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)


const Home_Section3 = ({scrollTo = "noArrow", goToSectionRef}) => {


        const bodyRef = useRef();

    useEffect(() => {

        gsap.fromTo(
            bodyRef.current,
            {
                autoAlpha: 0,
                y: -40,
            },

            {
                y:0,
                autoAlpha: 1,
                duration: 1,

                scrollTrigger: {
                    scroller: ".homeBody",
                    trigger: bodyRef.current,
                    start: "top 60%",
                    end: "bottom 0%",
                    toggleActions: "play none restart reverse",
                }
                
            }
        )
    },[])


    return (

            <div className="whiteBody">
                <div className="scheduleOfEvents" ref = {bodyRef}>

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
          {scrollTo != "noArrow" && <button className = "downArrow2" onClick = {()=> scrollTo(goToSectionRef)}></button>}

            </div>
    );
};

export default Home_Section3;