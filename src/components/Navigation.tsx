import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Check, FileText, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'motion/react';
import PDFViewer from './PDFViewer';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../hooks/useTheme';

const toRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Navigation = () => {
  const [notification, setNotification] = useState('');
  const [notificationIcon, setNotificationIcon] = useState<'theme' | 'language' | null>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeColors, setThemeColors] = useState({
    primary: '#10b981',
    surface: '#ffffff',
    text: '#111827',
  });
  const { t, i18n } = useTranslation();
  const { isDark, toggleDarkMode } = useTheme();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  useEffect(() => {
    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      setThemeColors({
        primary: styles.getPropertyValue('--color-primary').trim() || '#10b981',
        surface: styles.getPropertyValue('--color-surface').trim() || '#ffffff',
        text: styles.getPropertyValue('--color-text').trim() || '#111827',
      });
    };

    updateColors();
    window.addEventListener('themeChanged', updateColors);
    return () => window.removeEventListener('themeChanged', updateColors);
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


  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 theme-primary-bg origin-left z-[101]"
        style={{ scaleX }}
      />
      
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="max-w-7xl mx-auto"
          style={{
            background: scrolled
              ? `linear-gradient(135deg, ${toRgba(themeColors.surface, 0.95)}, ${toRgba(themeColors.surface, 0.85)})`
              : `linear-gradient(135deg, ${toRgba(themeColors.surface, 0.9)}, ${toRgba(themeColors.surface, 0.75)})`,
            border: `1px solid ${toRgba(themeColors.primary, 0.2)}`,
            boxShadow: scrolled
              ? `0 20px 45px ${toRgba(themeColors.primary, 0.2)}`
              : `0 12px 35px ${toRgba(themeColors.primary, 0.15)}`,
            borderRadius: 28,
            padding: '14px 20px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors cursor-pointer">
                  Nicolas.dev
                </span>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-900/40 dark:text-gray-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Disponible
                </div>
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={() => setIsPDFOpen(true)}
                  className="rounded-full border border-white/20 bg-emerald-500/90 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-emerald-600"
                  aria-label="View CV"
                >
                  CV
                </button>
                <motion.button
                  onClick={toggleLanguage}
                  className="rounded-full border border-white/20 bg-white/80 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800/80 dark:text-gray-200"
                  aria-label={t('nav.toggleLanguage')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i18n.language === 'es' ? 'ES' : 'EN'}
                </motion.button>
                <ThemeSelector variant="compact" />
              </div>
            </div>

            <div className="hidden lg:flex flex-1 items-center justify-center min-w-[240px]">
              <div className="flex items-center gap-6 rounded-2xl border border-gray-200/70 bg-white/95 px-6 py-3 text-sm shadow-xl dark:border-white/10 dark:bg-gray-900/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 ring-2 ring-emerald-500/40">
                    <Sparkles size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Experiencias</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Web · Interacción · Motion</p>
                  </div>
                </div>
                <span className="hidden h-10 w-px bg-gradient-to-b from-transparent via-gray-300/70 to-transparent dark:via-gray-600/60 xl:block"></span>
                <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-500 dark:text-emerald-400 xl:flex">
                  <Rocket size={16} />
                  <span>Proyectos 2026</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-end gap-3 rounded-2xl border border-gray-200/70 bg-white/95 px-3 py-2 shadow-xl dark:border-white/10 dark:bg-gray-900/60">
              <button
                onClick={() => {
                  console.log('CV button clicked, opening PDF viewer');
                  setIsPDFOpen(true);
                }}
                className="flex items-center space-x-1.5 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-700"
                aria-label="View CV"
              >
                <FileText size={18} />
                <span className="text-sm font-semibold">CV</span>
              </button>

              <div className="flex items-center space-x-2 rounded-full bg-white/70 px-2 py-1 text-sm dark:bg-gray-800/70">
                <motion.button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-500 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 group relative"
                  aria-label={t('nav.toggleLanguage')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Globe size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <span className="text-sm font-semibold">
                    {i18n.language === 'es' ? 'ES' : 'EN'}
                  </span>
                </motion.button>

                <ThemeSelector />
              </div>
            </div>
          </div>
        </div>
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