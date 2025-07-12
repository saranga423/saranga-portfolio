import React, { createContext, useState, useEffect, useMemo } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark-mode', theme === 'dark');
    root.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(curr => (curr === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
