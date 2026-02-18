import { React, useRef, useEffect } from "react";
import './Home_Section.css'
import flowers from '../../../assets/heart-flower-white.svg';
import { NavLink } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

import silverstone from "../../../assets/home/silverstone.webp";
import columns from "../../../assets/home/columns.webp";
import wedding from "../../../assets/home/wedding.webp";
import chairs from "../../../assets/home/chairs.webp";
import christmas from "../../../assets/home/christmas.webp";
import skiing from "../../../assets/home/skiing.webp";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

const photos = [
  { src: silverstone, alt: "One" },
  { src: skiing, alt: "Two" },
  { src: columns, alt: "Three" },
  { src: wedding, alt: "Four" },
  { src: christmas, alt: "Four" },
  { src: chairs, alt: "Four" },
];


  


const PhotoSection = ({scrollTo = "noArrow", goToSectionRef}) => {

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

            <div className="photoSection" ref={bodyRef}>
                <PhotoCarousel photos={photos} />
          
          {scrollTo != "noArrow" && <button className = "downArrow downArrow2" onClick = {()=> scrollTo(goToSectionRef)}></button>}

            </div>
    );
};

export default PhotoSection;