import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LanguageNotification from './components/LanguageNotification';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ParticleNetwork from './components/ParticleNetwork';
import Timeline from './components/Timeline';
import DynamicBackground from './components/DynamicBackground';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import GitHubActivity from './components/GitHubActivity';
import InteractiveTerminal from './components/InteractiveTerminal';
import PWAInstallBanner from './components/PWAInstallBanner';
import GlobalSearch from './components/GlobalSearch';
import ThemeProvider from './components/ThemeProvider';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useSpring } from 'motion/react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
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

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 theme-primary-bg origin-left z-50"
            style={{ scaleX }}
          />
          
          <div className="min-h-screen flex flex-col relative theme-bg">
            <DynamicBackground />
            <CustomCursor />
            <ParticleNetwork />
            <Navigation />
            <main className="flex-grow">
              <Hero />
              <About />
              <Skills />
              <Stats />
              <Timeline />
              <GitHubActivity />
              <Testimonials />
              <Projects />
              <Contact />
            </main>
            <Footer />
            <LanguageNotification />


            {/* Interactive Terminal */}
            <InteractiveTerminal />

            {/* PWA Install Banner */}
            <PWAInstallBanner />

            {/* Global Search */}
            <GlobalSearch />

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