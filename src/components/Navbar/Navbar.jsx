import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import nhmLogo from '../../assets/natural-history-outline.png';

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

      <nav className="navbar">
        {/* Left links (desktop) */}
        <div className="navBarSection navBarSection--left">
          <NavLink to="/" className="nav-link">Home</NavLink>
          {/* <NavLink to="/Story" className="nav-link">Story</NavLink>
          <NavLink to="/Schedule" className="nav-link">Schedule</NavLink>
          <NavLink to="/Venue" className="nav-link">Venue</NavLink> */}
        </div>

        <NavLink to="/" end className="logoLink" aria-label="Home">
          <img className="nhmLogo" src={nhmLogo} alt="natural history museum outline" />
        </NavLink>


        {/* Right links (desktop) */}
        <div className="navBarSection navBarSection--right">
          <NavLink to="/Hotels" className="nav-link">Hotels</NavLink>
          {/* <NavLink to="/Travel" className="nav-link">Travel</NavLink>
          <NavLink to="/London" className="nav-link">London</NavLink>
          <NavLink to="/FAQ" className="nav-link">FAQ</NavLink> */}
        </div>

        {/* Side drawer (mobile) */}
        <aside id="mobile-menu" className={`sideMenu ${isOpen ? "open" : ""}`}>
          <button className="closeBtn" onClick={closeMenu} aria-label="Close menu">
            <span></span>
            <span></span>
          </button>

          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/Hotels" className="nav-link" onClick={closeMenu}>Hotels</NavLink>

          {/* <NavLink to="/Story" className="nav-link" onClick={closeMenu}>Story</NavLink>
          <NavLink to="/Schedule" className="nav-link" onClick={closeMenu}>Schedule</NavLink>
          <NavLink to="/Venue" className="nav-link" onClick={closeMenu}>Venue</NavLink>
          <NavLink to="/Travel" className="nav-link" onClick={closeMenu}>Travel</NavLink>
          <NavLink to="/London" className="nav-link" onClick={closeMenu}>London</NavLink>
          <NavLink to="/FAQ" className="nav-link" onClick={closeMenu}>FAQ</NavLink>

          <NavLink to="/Hotels" end className="nav-link" onClick={closeMenu} aria-label="Home">
            <button className="actionButton">Hotels</button>
          </NavLink> */}
        </aside>

      </nav>
    </>
  );
};

export default Navbar;
