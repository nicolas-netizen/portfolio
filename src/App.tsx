import React, { useEffect, useState } from 'react';
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
import emailjs from '@emailjs/browser';
import { ChevronUp } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    emailjs.init('t66oFDjJXB0IxMlWn');
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Ajuste sutil del tiempo de carga

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevenir el cursor por defecto
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <CustomCursor />
          <ParticleNetwork />
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
            <Navigation />
            <main className="flex-grow">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
            <LanguageNotification />

            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-24 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-6 w-6" />
              </button>
            )}

            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-10">
              <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;