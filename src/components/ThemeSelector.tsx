import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const ThemeSelector = () => {
  const { currentTheme, isDark, changeTheme, toggleDarkMode, themes, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar el dropdown cuando se selecciona un tema
  const handleThemeChange = (theme: Theme) => {
    console.log('Theme button clicked:', theme, 'current theme:', currentTheme);
    changeTheme(theme);
    setIsOpen(false);
  };

  const handleDarkModeToggle = () => {
    console.log('Dark mode toggle clicked, current isDark:', isDark);
    toggleDarkMode();
    setIsOpen(false);
  };

  const themeColors = {
    light: 'bg-white border-gray-200',
    dark: 'bg-gray-800 border-gray-700',
    emerald: 'bg-emerald-900 border-emerald-700',
    blue: 'bg-blue-900 border-blue-700',
    purple: 'bg-purple-900 border-purple-700',
    orange: 'bg-orange-900 border-orange-700',
    pink: 'bg-pink-900 border-pink-700',
    cyan: 'bg-cyan-900 border-cyan-700'
  };

  const themeIcons = {
    light: Sun,
    dark: Moon,
    emerald: Palette,
    blue: Palette,
    purple: Palette,
    orange: Palette,
    pink: Palette,
    cyan: Palette
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => {
          console.log('ThemeSelector clicked, current theme:', currentTheme);
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 theme-surface border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={16} />
        <span className="text-sm font-medium theme-text">{themeConfig.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-64 theme-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <h3 className="font-semibold theme-text mb-3">
                Choose Theme
              </h3>
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between mb-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-2">
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                  <span className="text-sm font-medium theme-text">
                    Dark Mode
                  </span>
                </div>
                <button
                  onClick={handleDarkModeToggle}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    isDark ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: isDark ? 20 : 4 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </div>

              {/* Theme Colors */}
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const Icon = themeIcons[theme];
                  const isSelected = currentTheme === theme;
                  const themeName = theme === 'light' ? 'Light' :
                                  theme === 'dark' ? 'Dark' :
                                  theme === 'emerald' ? 'Emerald' :
                                  theme === 'blue' ? 'Ocean' :
                                  theme === 'purple' ? 'Purple' :
                                  theme === 'orange' ? 'Sunset' :
                                  theme === 'pink' ? 'Pink' :
                                  theme === 'cyan' ? 'Cyan' : theme;
                  
                  return (
                    <motion.button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-emerald-500 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      } ${themeColors[theme]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-white" />
                        <span className="text-sm font-medium text-white">
                          {themeName}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={10} className="text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Preview */}
              <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Preview:
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.accent }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                    {themeConfig.name}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
