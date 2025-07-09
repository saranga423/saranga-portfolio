import React, { createContext, useState, useEffect, useMemo } from 'react';

// Create the context
export const ThemeContext = createContext();

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Sync theme to localStorage and update HTML classes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }, [theme]);

  // Optional: Listen to system theme changes in real-time
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
