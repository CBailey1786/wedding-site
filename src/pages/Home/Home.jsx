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

    function scrollTo(section) {
        section.current.scrollIntoView({ behavior: "smooth" });
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