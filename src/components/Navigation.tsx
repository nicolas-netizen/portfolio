import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe, Check, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'motion/react';
import PDFViewer from './PDFViewer';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../hooks/useTheme';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [notificationIcon, setNotificationIcon] = useState<'theme' | 'language' | null>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDark, toggleDarkMode } = useTheme();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const menuItems = [
    { key: 'nav.home', href: 'home' },
    { key: 'nav.about', href: 'about' },
    { key: 'nav.skills', href: 'skills' },
    { key: 'nav.projects', href: 'projects' },
    { key: 'nav.contact', href: 'contact' }
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNotification = (message: string, icon: 'theme' | 'language') => {
    setNotification(message);
    setNotificationIcon(icon);
    setTimeout(() => {
      setNotification('');
      setNotificationIcon(null);
    }, 3000);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    showNotification(
      newLang === 'en' ? 'English language selected' : 'Idioma español seleccionado',
      'language'
    );
  };

  const toggleTheme = () => {
    toggleDarkMode();
    showNotification(
      isDark ? 'Light mode enabled' : 'Dark mode enabled',
      'theme'
    );
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 theme-primary-bg origin-left z-[101]"
        style={{ scaleX }}
      />
      
      <motion.nav 
        className={`fixed w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? 'theme-surface/95 backdrop-blur-md shadow-lg' 
            : 'theme-surface/80 backdrop-blur-sm shadow-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors cursor-pointer">
              Nicolas.dev
            </span>
            
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.href}`}
                  className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors relative group"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
                </a>
              ))}
              
              <div className="flex items-center space-x-2 border-l pl-2 border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    console.log('CV button clicked, opening PDF viewer');
                    setIsPDFOpen(true);
                  }}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 hover:rotate-12 transition-all duration-300 flex items-center space-x-1"
                  aria-label="View CV"
                >
                  <FileText size={20} />
                  <span className="text-sm font-medium">CV</span>
                </button>

                <button
                  onClick={toggleLanguage}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  aria-label={t('nav.toggleLanguage')}
                >
                  <Globe size={20} />
                </button>

                <ThemeSelector />
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden theme-surface shadow-lg relative z-[99]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.href}`}
                  className="block px-3 py-2 theme-text hover:text-emerald-600 dark:hover:text-emerald-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="flex items-center justify-around px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setIsPDFOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="p-2 theme-text hover:text-emerald-600 dark:hover:text-emerald-500 flex items-center space-x-1"
                >
                  <FileText size={20} />
                  <span>CV</span>
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 theme-text hover:text-emerald-600 dark:hover:text-emerald-500"
                >
                  <Globe size={20} />
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 theme-surface shadow-lg rounded-lg px-4 py-2 flex items-center space-x-2 z-50 animate-fade-in">
          {notificationIcon === 'theme' ? (
            isDark ? <Moon size={20} /> : <Sun size={20} />
          ) : (
            <Check size={20} />
          )}
          <span className="theme-text">{notification}</span>
        </div>
      )}

      {/* PDF Viewer */}
      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
      />
    </>
  );
};

export default Navigation;