import React, { useState } from "react";
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

  return (
    <>
      <div className="burgerWrapper">
        <button
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
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
