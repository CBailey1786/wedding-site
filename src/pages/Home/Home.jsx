import React, { useRef } from "react";
import "./Home.css";
import HeroSection from "./components/HeroSection";
import PhotoSection from "./components/PhotoSection";
import ScheduleSection from "./components/ScheduleSection";
import { useParty } from "../../components/Party/PartyContext";

const Home = () => {
  // ✅ Hooks first, always
  const { party, loading, error } = useParty();
  const scrollerRef = useRef(null);

  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);

  // ✅ Now it’s safe to early-return
  if (loading) return <div>Loading…</div>;
  if (error) return <div>Load failed: {String(error.message || error)}</div>;
  if (!party) return <div>No party loaded.</div>;

  const member_in_wedding_party =
    party.guests?.some((g) => g.in_wedding_party) ?? false;

    

  function scrollTo(sectionRef) {
    const scroller = scrollerRef?.current; // make sure scrollerRef exists in your file
    console.log(scrollerRef)
    const el = sectionRef.current;
    if (!scroller || !el) return;

    scroller.classList.add("snapOff");
    scroller.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    window.setTimeout(() => scroller.classList.remove("snapOff"), 500);
  }

  return (
    <div className="homeBody" ref={scrollerRef}>
      <div className="snapPage" ref={section1}>
        <HeroSection scrollTo={scrollTo} goToSectionRef={section2} />
      </div>

      <div className="snapPage" ref={section2}>
        <ScheduleSection scrollTo={scrollTo} goToSectionRef={section3} member_in_wedding_party = {member_in_wedding_party} />
      </div>

      <div className="snapPage" ref={section3}>
        <PhotoSection />
      </div>
    </div>
  );
};

export default Home;
