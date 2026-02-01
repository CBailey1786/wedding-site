import {React, useRef, useEffect} from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";

import gsap from "gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)



const Home_Section1 = ({scrollTo, goToSectionRef}) => {

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

            <div className="hero">
                <div className="heroColour">
                </div>

                <div className="heroContent" ref = {bodyRef} >
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
          <button className = "downArrow" onClick = {()=> scrollTo(goToSectionRef)}></button>

          </div>

            </div>
    );
};

export default Home_Section1;