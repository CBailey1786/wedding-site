import { React, useRef, useEffect } from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";



import rehearsal_dinner from "../../../assets/schedule/rehearsal_dinner.webp";
import welcome_party from "../../../assets/schedule/welcome_party.webp";
import wedding_ceremony from "../../../assets/schedule/wedding_ceremony.webp";
import brunch from "../../../assets/schedule/brunch.webp";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import PageHeader from "../../../layouts/PageHeader";
import ScheduleComponent from "./ScheduleComponent";
gsap.registerPlugin(ScrollTrigger)


const ScheduleSection = ({ scrollTo = "noArrow", goToSectionRef, member_in_wedding_party }) => {


    const bodyRef = useRef();

    useEffect(() => {
  const mm = window.matchMedia("(max-width: 767px)");

  if (!mm.matches) return; // 🚫 Do nothing on desktop

  const ctx = gsap.context(() => {
    gsap.fromTo(
  bodyRef.current,
  {
    autoAlpha: 0,
    y: -16,        // smaller movement
  },
  {
    y: 0,
    autoAlpha: 1,
    duration: 0.8, // slightly quicker
    ease: "power2.out",
    scrollTrigger: {
      scroller: ".homeBody",
      trigger: bodyRef.current,
      start: "top 75%",   // triggers later = less dramatic
      toggleActions: "play none none reverse",
    }
  }
);
  });

  return () => ctx.revert(); // ✅ proper GSAP cleanup
}, []);


    return (

        <div className="scheduleSection">


            <div className="scheduleOfEvents" ref={bodyRef}>
                <PageHeader pageName="Schedule of Events"></PageHeader>



                <div className="scheduleBody">
                    <div className="scheduleLeft">
                         <div className={`timelineDots ${member_in_wedding_party ? "isRehearsal" : ""}`}>
    {(member_in_wedding_party ? [1,2,3,4,5] : [1,2,3,4]).map((_, i) => (
      <div key={i} className="timelineDot" />
    ))}
  </div>
                    
                        

                    </div>
                    <div className="scheduleRight scheduleList">
                        {member_in_wedding_party && 
                        <ScheduleComponent
                        id = "rehearsal"
                            header="Rehearsal Dinner"
                            date="12 June 2026 18:00 - 19:30"
                            location="Madera at The Treehouse,"
                            address="14-15 Langham Place, London, W1B 2QS"
                            dress_code="Smart Casual"
                            photo={rehearsal_dinner}
                        />
                        }
                        <ScheduleComponent
                        id = "welcome"
                            header="Welcome Party"
                            date="12 June 2026 19:00 - 00:00"
                            location="The Nest,"
                            address="14-15 Langham Place, London, W1B 2QS"
                            dress_code="Smart Casual"
                            photo={welcome_party}
                        />

                        <ScheduleComponent
                        id = "wedding"
                            header="Wedding Ceremony & Reception"
                            date="13 June 2026 18:30 - 03:00.<br>Ceremony at 19:15."
                            location="The Natural History Museum,"
                            address="Cromwell Road, London, SW7 5BD"
                            dress_code="Black Tie Encouraged"
                            photo={wedding_ceremony}
                        />

                        <ScheduleComponent
                            id = "brunch"
                            header="Farewell Brunch"
                            date="14 June 2026 10:00 - 12:00"
                            location="JW Marriott Grosvenor House London,"
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