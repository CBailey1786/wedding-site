import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Burger (always in DOM, visible on mobile) */}
      <button
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Backdrop */}
      <div
        className={`backdrop ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      <nav className="navbar">
        {/* Left links (desktop) */}
        <div className="navBarSection navBarSection--left">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/Story" className="nav-link">Story</NavLink>
          <NavLink to="/Schedule" className="nav-link">Schedule</NavLink>
          <NavLink to="/Venue" className="nav-link">Venue</NavLink>
        </div>

        {/* Logo in center */}
        <img
          className="nhmLogo"
          src="src/assets/natural-history-outline.png"
          alt="natural history museum outline"
        />

        {/* Right links (desktop) */}
        <div className="navBarSection navBarSection--right">
          <NavLink to="/Hotels" className="nav-link">Hotels</NavLink>
          <NavLink to="/Travel" className="nav-link">Travel</NavLink>
          <NavLink to="/London" className="nav-link">London</NavLink>
          <NavLink to="/FAQ" className="nav-link">FAQ</NavLink>
        </div>

        {/* Side drawer (mobile) */}
        <aside id="mobile-menu" className={`sideMenu ${isOpen ? "open" : ""}`}>
          <button className="closeBtn" onClick={closeMenu} aria-label="Close menu">
        <span></span>
        <span></span>
          </button>

          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/Story" className="nav-link" onClick={closeMenu}>Story</NavLink>
          <NavLink to="/Schedule" className="nav-link" onClick={closeMenu}>Schedule</NavLink>
          <NavLink to="/Venue" className="nav-link" onClick={closeMenu}>Venue</NavLink>
          {/* <NavLink to="/Hotels" className="nav-link" onClick={closeMenu}>Hotels</NavLink> */}
          <NavLink to="/Travel" className="nav-link" onClick={closeMenu}>Travel</NavLink>
          <NavLink to="/London" className="nav-link" onClick={closeMenu}>London</NavLink>
          <NavLink to="/FAQ" className="nav-link" onClick={closeMenu}>FAQ</NavLink>

          <button className="actionButton">Hotels</button>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
