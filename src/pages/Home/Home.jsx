import { React, useRef } from "react";
import './Home.css'
import { NavLink } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import PhotoSection from "./components/PhotoSection";
import ScheduleSection from "./components/ScheduleSection";

const Home = () => {

    const section1 = useRef();
    const section2 = useRef();
    const section3 = useRef();

  function scrollTo(sectionRef) {
    const scroller = scrollerRef.current;
    const el = sectionRef.current;
    if (!scroller || !el) return;

    // Temporarily disable snap so Safari can't "correct" the final position
    scroller.classList.add("snapOff");

    const top = el.offsetTop; // offset within the scroll container
    scroller.scrollTo({ top, behavior: "smooth" });

    // Re-enable snap after the scroll settles
    window.setTimeout(() => scroller.classList.remove("snapOff"), 500);
  }

    return (


        <div className="homeBody">
            <div ref={section1}>
                <HeroSection
                    scrollTo={scrollTo}
                    goToSectionRef={section2}
                />
            </div>
            <div ref={section2}>
                <ScheduleSection scrollTo={scrollTo}
                    goToSectionRef={section3} />
            </div>
            <div ref={section3}>
                <PhotoSection />
            </div>




        </div>
    );
};

export default Home;