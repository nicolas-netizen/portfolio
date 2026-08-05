import { Suspense, lazy, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import { useAnalytics } from './hooks/useAnalytics';
import ThemeProvider from './components/ThemeProvider';
import CustomCursor from './components/CustomCursor';
import BottomNavigation from './components/BottomNavigation';

const DynamicBackground = lazy(() => import('./components/DynamicBackground'));
const ParticleNetwork = lazy(() => import('./components/ParticleNetwork'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Stats = lazy(() => import('./components/Stats'));
const Timeline = lazy(() => import('./components/Timeline'));
const GitHubActivity = lazy(() => import('./components/GitHubActivity'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const InteractiveTerminal = lazy(() => import('./components/InteractiveTerminal'));
const PWAInstallBanner = lazy(() => import('./components/PWAInstallBanner'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
import emailjs from '@emailjs/browser';
const SectionSkeleton = () => (
  <div className="mx-auto my-12 h-48 w-full max-w-6xl animate-pulse rounded-3xl bg-white/40 shadow-lg dark:bg-gray-800/40" />
);
import { motion, useScroll, useSpring } from 'motion/react';

type ScrollDirection = 'down' | 'up';

const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');
  const [progressColors, setProgressColors] = useState({
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399'
  });
  
  // Analytics hook
  const analytics = useAnalytics();
  
  // Scroll progress for progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    emailjs.init('t66oFDjJXB0IxMlWn');
    
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Ajuste sutil del tiempo de carga

    return () => {
      clearTimeout(timer);
    };
  }, []);


  // Prevenir el cursor por defecto
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Actualizar colores del progress bar según tema activo
  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setProgressColors({
        primary: rootStyles.getPropertyValue('--color-primary').trim() || '#10b981',
        secondary: rootStyles.getPropertyValue('--color-secondary').trim() || '#059669',
        accent: rootStyles.getPropertyValue('--color-accent').trim() || '#34d399'
      });
    };

    updateColors();
    window.addEventListener('themeChanged', updateColors);

    return () => {
      window.removeEventListener('themeChanged', updateColors);
    };
  }, []);

  // Detectar dirección del scroll para animar barra de progreso
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY + 2) {
        setScrollDirection('down');
      } else if (current < lastScrollY - 2) {
        setScrollDirection('up');
      }
      lastScrollY = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressBarStyle = {
    scaleX,
    background:
      scrollDirection === 'down'
        ? `linear-gradient(90deg, ${progressColors.primary}, ${progressColors.secondary})`
        : `linear-gradient(90deg, ${progressColors.accent}, ${progressColors.primary})`,
    boxShadow:
      scrollDirection === 'down'
        ? `0 0 12px ${hexToRgba(progressColors.primary, 0.45)}`
        : `0 0 12px ${hexToRgba(progressColors.accent, 0.45)}`
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 origin-left z-50 rounded-full"
            style={progressBarStyle}
          />
          
          <div className="min-h-screen flex flex-col relative theme-bg">
            <Suspense fallback={null}>
              <DynamicBackground />
            </Suspense>
            <CustomCursor />
            <Suspense fallback={null}>
              <ParticleNetwork />
            </Suspense>
            <Navigation />
            <main className="flex-grow pb-28 md:pb-0">
              <Hero />
              <Suspense fallback={<SectionSkeleton />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Stats />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Timeline />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <GitHubActivity />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            {/* Interactive Terminal */}
            <Suspense fallback={null}>
              <InteractiveTerminal />
            </Suspense>

            {/* PWA Install Banner */}
            <Suspense fallback={null}>
              <PWAInstallBanner />
            </Suspense>

            {/* Global Search */}
            <Suspense fallback={null}>
              <GlobalSearch />
            </Suspense>

            {/* Floating Bottom Navigation */}
            <Suspense fallback={null}>
              <BottomNavigation />
            </Suspense>

            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-10">
              <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
            </div>
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;