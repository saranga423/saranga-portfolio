import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './components/Services';

import { ThemeContext } from './contexts/ThemeContext';

import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Skills from './pages/Skills'; // Importing Skills page
import './styles/App.css'; // Adjust path as needed

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Router>
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
          <Navbar toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/:id" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
