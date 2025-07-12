import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = ({ toggleTheme }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={handleLinkClick}>Saranga</Link>
        </div>

        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="mode-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
            >
              {isDarkMode ? <FaSun style={{ marginRight: '6px' }} /> : <FaMoon style={{ marginRight: '6px' }} />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
