import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ darkMode, toggleDarkMode }) => (
  <nav className="navbar">
    <h1>Saranga Rasingolla</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/skills">Skills</Link></li>
      <li><Link to="/resume">Resume</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
    <button onClick={toggleDarkMode} className="dark-mode-toggle" aria-label="Toggle Dark Mode">
      {darkMode ? "🌙" : "☀️"}
    </button>
  </nav>
);

export default Navbar;
