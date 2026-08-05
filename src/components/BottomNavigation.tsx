import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Home, User, Sparkles, FolderGit2, Mail } from 'lucide-react';

const BottomNavigation = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = useMemo(
    () => [
      { id: 'home', labelKey: 'nav.home', icon: Home },
      { id: 'about', labelKey: 'nav.about', icon: User },
      { id: 'skills', labelKey: 'nav.skills', icon: Sparkles },
      { id: 'projects', labelKey: 'nav.projects', icon: FolderGit2 },
      { id: 'contact', labelKey: 'nav.contact', icon: Mail }
    ],
    []
  );

  // Track the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  // Hide/show the bar based on scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY;
      setVisible(isScrollingUp || currentY < 120);
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (targetId: string) => {
    setActiveSection(targetId);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navContent = (
      <div className="flex w-full max-w-[360px] flex-wrap items-center justify-between gap-1 rounded-2xl border theme-border theme-surface px-2 py-1 text-[11px] theme-text shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:max-w-2xl sm:rounded-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleNavigation(item.id)}
              className={`relative flex flex-1 min-w-[60px] items-center gap-1 overflow-hidden rounded-xl px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors duration-200 sm:min-w-0 sm:justify-center sm:rounded-full sm:px-3 sm:py-2 sm:text-[11px] ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-300'
              }`}
              aria-label={t(item.labelKey)}
              whileHover={{ y: -3, scale: 1.06 }}
              whileTap={{ scale: 0.94, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-xl border border-emerald-400/60 bg-emerald-400/20 dark:bg-emerald-400/15 sm:rounded-full"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-0.5 text-[10px] sm:flex-row sm:gap-1.5">
                <motion.span whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                  <Icon size={18} />
                </motion.span>
                <span className="text-[10px] sm:text-xs">{t(item.labelKey)}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
  );

  return (
    <>
      <div className="hidden sm:flex">
        <motion.nav
          className="fixed inset-x-0 bottom-4 sm:bottom-6 z-[120] flex justify-center px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
          transition={{ duration: 0.25 }}
        >
          {navContent}
        </motion.nav>
      </div>
      <div className="fixed bottom-3 left-0 right-0 z-[120] px-4 sm:hidden">
        {navContent}
      </div>
    </>
  );
};

export default BottomNavigation;

