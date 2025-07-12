import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '6px',
        border: '1px solid #0077b6',
        backgroundColor: theme === 'dark' ? '#023e8a' : '#caf0f8',
        color: theme === 'dark' ? '#caf0f8' : '#023e8a',
        fontWeight: '600',
        margin: '10px',
      }}
    >
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggleButton;
