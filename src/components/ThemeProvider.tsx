import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { currentTheme, isDark } = useTheme();
  const [themeKey, setThemeKey] = useState(0);

  useEffect(() => {
    // Apply theme classes to body
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-light', 'theme-dark', 'theme-emerald', 'theme-blue', 'theme-purple', 'theme-orange', 'theme-pink', 'theme-cyan');
    
    // Add current theme class
    body.classList.add(`theme-${currentTheme}`);
    
    // Apply dark mode class
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    // Force re-render by updating key
    setThemeKey(prev => prev + 1);

    console.log(`ThemeProvider: Applied theme ${currentTheme}, dark mode: ${isDark}`);
    console.log('Body classes:', body.classList.toString());
    console.log('CSS variables:', {
      background: getComputedStyle(body).getPropertyValue('--color-background'),
      surface: getComputedStyle(body).getPropertyValue('--color-surface'),
      text: getComputedStyle(body).getPropertyValue('--color-text')
    });
  }, [currentTheme, isDark]);

  return <div key={themeKey}>{children}</div>;
};

export default ThemeProvider;
