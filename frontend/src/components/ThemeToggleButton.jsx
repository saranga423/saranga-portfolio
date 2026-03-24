import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  const styles = {
    button: {
      position: 'fixed',
      top: '90px',
      right: '24px',
      zIndex: 1000,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      borderRadius: '999px',
      padding: '8px 14px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',

      // Glass effect
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.15)',

      // Shadow + glow
      boxShadow: isDarkMode
        ? '0 10px 30px rgba(0,0,0,0.4)'
        : '0 10px 30px rgba(0,0,0,0.15)',

      color: '#fff',
      transition: 'all 0.3s ease',
    },

    thumb: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: '#fff',

      background: isDarkMode
        ? 'linear-gradient(135deg, #f59e0b, #fbbf24)'
        : 'linear-gradient(135deg, #1e293b, #334155)',

      boxShadow: isDarkMode
        ? '0 6px 15px rgba(251,191,36,0.4)'
        : '0 6px 15px rgba(30,41,59,0.4)',

      transition: 'all 0.3s ease',
    },

    text: {
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <button style={styles.button} onClick={toggleTheme}>
      <div style={styles.thumb}>
        {isDarkMode ? '🌞' : '🌜'}
      </div>

      <span style={styles.text}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggleButton;