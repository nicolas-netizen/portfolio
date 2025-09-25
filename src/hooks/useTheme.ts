import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'emerald' | 'blue' | 'purple' | 'orange' | 'pink' | 'cyan';

interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280'
    },
    gradients: {
      primary: 'from-emerald-500 to-emerald-600',
      secondary: 'from-emerald-400 to-emerald-500',
      background: 'from-gray-50 to-emerald-50'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db'
    },
    gradients: {
      primary: 'from-emerald-500 to-emerald-600',
      secondary: 'from-emerald-400 to-emerald-500',
      background: 'from-gray-900 to-gray-800'
    }
  },
  emerald: {
    name: 'Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#064e3b',
      surface: '#065f46',
      text: '#ecfdf5',
      textSecondary: '#a7f3d0'
    },
    gradients: {
      primary: 'from-emerald-400 to-emerald-600',
      secondary: 'from-emerald-300 to-emerald-500',
      background: 'from-emerald-900 to-emerald-800'
    }
  },
  blue: {
    name: 'Ocean',
    colors: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      background: '#1e3a8a',
      surface: '#1e40af',
      text: '#dbeafe',
      textSecondary: '#93c5fd'
    },
    gradients: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'from-blue-400 to-blue-500',
      background: 'from-blue-900 to-blue-800'
    }
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      background: '#581c87',
      surface: '#6b21a8',
      text: '#f3e8ff',
      textSecondary: '#c4b5fd'
    },
    gradients: {
      primary: 'from-purple-500 to-purple-600',
      secondary: 'from-purple-400 to-purple-500',
      background: 'from-purple-900 to-purple-800'
    }
  },
  orange: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      background: '#9a3412',
      surface: '#c2410c',
      text: '#fff7ed',
      textSecondary: '#fed7aa'
    },
    gradients: {
      primary: 'from-orange-500 to-orange-600',
      secondary: 'from-orange-400 to-orange-500',
      background: 'from-orange-900 to-orange-800'
    }
  },
  pink: {
    name: 'Pink',
    colors: {
      primary: '#ec4899',
      secondary: '#db2777',
      accent: '#f472b6',
      background: '#831843',
      surface: '#be185d',
      text: '#fdf2f8',
      textSecondary: '#f9a8d4'
    },
    gradients: {
      primary: 'from-pink-500 to-pink-600',
      secondary: 'from-pink-400 to-pink-500',
      background: 'from-pink-900 to-pink-800'
    }
  },
  cyan: {
    name: 'Cyan',
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#22d3ee',
      background: '#164e63',
      surface: '#155e75',
      text: '#ecfeff',
      textSecondary: '#a5f3fc'
    },
    gradients: {
      primary: 'from-cyan-500 to-cyan-600',
      secondary: 'from-cyan-400 to-cyan-500',
      background: 'from-cyan-900 to-cyan-800'
    }
  }
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const savedDarkMode = localStorage.getItem('portfolio-dark-mode') === 'true';
    
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedDarkMode) {
      setIsDark(true);
    } else {
      // Check system preference
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const theme = themes[currentTheme];
    
    // Set CSS custom properties
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);

    // Apply dark mode class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('portfolio-theme', currentTheme);
    localStorage.setItem('portfolio-dark-mode', isDark.toString());
  }, [currentTheme, isDark]);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const getThemeConfig = () => themes[currentTheme];

  return {
    currentTheme,
    isDark,
    changeTheme,
    toggleDarkMode,
    getThemeConfig,
    themes: Object.keys(themes) as Theme[],
    themeConfig: themes[currentTheme]
  };
};
