import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe, Check, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PDFViewer from './PDFViewer';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState('');
  const [notificationIcon, setNotificationIcon] = useState<'theme' | 'language' | null>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuItems = [
    { key: 'nav.home', href: 'home' },
    { key: 'nav.about', href: 'about' },
    { key: 'nav.skills', href: 'skills' },
    { key: 'nav.projects', href: 'projects' },
    { key: 'nav.contact', href: 'contact' }
  ];

  useEffect(() => {
    // Cargar preferencias guardadas
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }

    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    setDarkMode(!darkMode);
    showNotification(
      darkMode ? 'Light mode enabled' : 'Dark mode enabled',
      'theme'
    );
  };

  return (
    <>
      <nav className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-40 shadow-sm">
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
                  onClick={() => setIsPDFOpen(true)}
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

                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  aria-label={t('nav.toggleTheme')}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
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
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.href}`}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500"
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
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 flex items-center space-x-1"
                >
                  <FileText size={20} />
                  <span>CV</span>
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500"
                >
                  <Globe size={20} />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-2 flex items-center space-x-2 z-50 animate-fade-in">
          {notificationIcon === 'theme' ? (
            darkMode ? <Moon size={20} /> : <Sun size={20} />
          ) : (
            <Check size={20} />
          )}
          <span>{notification}</span>
        </div>
      )}

      {/* PDF Viewer */}
      <PDFViewer
        pdfUrl="/Nicolás-paniaguaa.pdf#toolbar=0"
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
      />
    </>
  );
};

export default Navigation;