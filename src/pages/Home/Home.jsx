import {React, useRef} from "react";
import './Home.css'
import { NavLink } from "react-router-dom";
import Home_Section1 from "./components/Home_Section1";
import Home_Section2 from "./components/Home_Section2";
import Home_Section3 from "./components/Home_Section3";

const Home = () => {

    const section1 = useRef();
    const section2 = useRef();
    const section3 = useRef();

    function scrollTo(section){
        section.current.scrollIntoView({ behavior: "smooth"});
    }

    return (


        <div className="homeBody">
            <div ref = {section1}>
            <Home_Section1 
            scrollTo = {scrollTo}
            goToSectionRef = {section2}
            />
            </div>
            <div ref = {section2}>
            <Home_Section2 scrollTo = {scrollTo}
                goToSectionRef = {section3}/>
            </div>
            <div ref = {section3}>
            <Home_Section3/>
            </div>

            


        </div>
    );
};

export default Home;