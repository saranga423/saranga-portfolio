import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={() => setIsOpen(false)}>Saranga</Link>
        </div>

        {/* Hamburger menu for mobile */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        

        {/* Navigation Links */}
        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
              
            </li>
            
          ))}
          {/* Theme toggle button */}
        <button className="mode-toggle" onClick={toggleTheme}>
          🌓
        </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
