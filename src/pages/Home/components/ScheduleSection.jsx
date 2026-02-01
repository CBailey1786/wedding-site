import { React, useRef, useEffect } from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";



import rehearsal_dinner from "../../../assets/rehearsal_dinner.jpg";
import welcome_party from "../../../assets/welcome_party.jpg";
import wedding_ceremony from "../../../assets/wedding_ceremony.jpg";
import brunch from "../../../assets/brunch.jpg";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import PageHeader from "../../../layouts/PageHeader";
import ScheduleComponent from "./ScheduleComponent";
gsap.registerPlugin(ScrollTrigger)


const ScheduleSection = ({ scrollTo = "noArrow", goToSectionRef }) => {


    const bodyRef = useRef();

    useEffect(() => {

        gsap.fromTo(
            bodyRef.current,
            {
                autoAlpha: 0,
                y: -40,
            },

            {
                y: 0,
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
    }, [])


    return (

        <div className="scheduleSection">


            <div className="scheduleOfEvents" ref={bodyRef}>
                <PageHeader pageName="Schedule of Events"></PageHeader>



                <div className="scheduleBody">
                    <div className="scheduleLeft">
                        <div className="timelineBar"></div>
                        <div className="timelineDot dot1"></div>
                        <div className="timelineDot dot2"></div>
                        <div className="timelineDot dot3"></div>
                        <div className="timelineDot dot4"></div>
                        <div className="timelineDot dot5"></div>

                    </div>
                    <div className="scheduleRight">
                        <ScheduleComponent
                            header="Rehearsal Dinner"
                            date="12 June 2026 18:00 - 19:30"
                            location="Madera at The Treehouse"
                            address="14-15 Langham Place, London, W1B 2QS"
                            dress_code="Smart Casual"
                            photo={rehearsal_dinner}
                        />

                        <ScheduleComponent
                            header="Welcome Party"
                            date="12 June 2026 19:30 - 00:00"
                            location="The Nest"
                            address="14-15 Langham Place, London, W1B 2QS"
                            dress_code="Smart Casual"
                            photo={welcome_party}
                        />

                        <ScheduleComponent
                            header="Wedding Ceremony & Reception"
                            date="13 June 2026 18:00 - 03:00"
                            location="The Natural History Museum"
                            address="Cromwell Road, London, SW7 5BD"
                            dress_code="Formal Evening Wear"
                            photo={wedding_ceremony}
                        />

                        <ScheduleComponent
                            header="Farewell Brunch"
                            date="14 June 2026 10:00 - 12:00"
                            location="The Grosvenor hotel"
                            address="86-90 Park Lane, London, W1K 7TN"
                            dress_code="Casual"
                            photo={brunch}
                        />

                    </div>



                </div>
              

            </div>
            {scrollTo != "noArrow" && <button className="downArrow downArrow2" onClick={() => scrollTo(goToSectionRef)}></button>}

        </div>
    );
};

export default ScheduleSection;