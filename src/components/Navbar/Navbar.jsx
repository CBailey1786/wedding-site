import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import nhmLogo from '../../assets/natural-history-outline.png';

async function logout() {
    await fetch("/.netlify/functions/logout", {
        method: "POST",
    });
    window.location.href = "/login";
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);

  onScroll(); // set initial state in case user loads mid-page
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <>
      {/* =======================
      DESKTOP NAVBAR
  ======================= */}
  <nav className={`desktopNav ${scrolled ? "collapsed" : ""}`}>
  <div className="desktopNav-inner">
    <div className="nav-left">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/OurLondon" className="nav-link">Our London</NavLink>
      <NavLink to="/Hotels" className="nav-link">Hotels</NavLink>
      <NavLink to="/Venue" className="nav-link">Venue</NavLink>
    </div>

    <div className="nav-center">
      {scrolled ? (
        <button
          className="burger desktopBurger"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <i />
        </button>
      ) : (
        <a href="/">
        <img className="nhmLogo" src={nhmLogo} alt="Venue" />
        </a>
      )}
    </div>

    <div className="nav-right">
      <NavLink to="/Travel" className="nav-link">Travel</NavLink>
      <NavLink to="/FAQ" className="nav-link">FAQ</NavLink>
      <NavLink to="/DressCode" className="nav-link">Dress Code</NavLink>
      <NavLink to="/RSVP" className="nav-link rsvp-link">RSVP</NavLink>
      
    </div>
    <button className = "nav-link logoutButton logOutDesktop" onClick={logout}>Log out</button>
  </div>
</nav>



  {/* =======================
      MOBILE NAVBAR
  ======================= */}
  <div className="burgerWrapper">
    <button
      className={`burger ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      <i />
    </button>
  </div>

  {isOpen && (
    <div
      className="backdrop open"
      onClick={closeMenu}
      aria-hidden
    />
  )}

        {/* Side drawer (mobile) */}
        <aside id="mobile-menu" className={`sideMenu ${isOpen ? "open" : ""}`}>
          <button className="closeBtn" onClick={closeMenu} aria-label="Close menu">
            <span></span>
            <span></span>
          </button>

          <div className="nav-section">

          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/OurLondon" className="nav-link" onClick={closeMenu}>Our London</NavLink>
          <NavLink to="/Hotels" className="nav-link" onClick={closeMenu}>Hotels</NavLink>
          <NavLink to="/Venue" className="nav-link" onClick={closeMenu}>Venue</NavLink>
          <NavLink to="/Travel" className="nav-link" onClick={closeMenu}>Travel</NavLink>
          <NavLink to="/FAQ" className="nav-link" onClick={closeMenu}>FAQ</NavLink>
          <NavLink to="/DressCode" className="nav-link" onClick={closeMenu}>Dress Code</NavLink>
          {/* <NavLink to="/WeddingParty" className="nav-link" onClick={closeMenu}>Wedding Party</NavLink> */}
          </div>
          <div className="nav-section">
          <NavLink to="/RSVP" className="nav-link rsvp-link" onClick={closeMenu}>RSVP</NavLink>
          <button className = "nav-link logoutButton" onClick={logout}>Log out</button>
          </div>
        </aside>
    </>
  );
};

export default Navbar;
