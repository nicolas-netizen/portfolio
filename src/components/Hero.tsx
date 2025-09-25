import { useTranslation } from 'react-i18next';
import { GithubIcon, LinkedinIcon, MailIcon, ChevronDown, Code, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const { t } = useTranslation();
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Advanced Particle Background */}
      <ParticleBackground />
      
      {/* Floating code symbols - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 0 : 8)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute text-emerald-400/20 text-2xl md:text-4xl hidden md:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {i % 2 === 0 ? <Code size={24} /> : <Sparkles size={24} />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.greeting')} <motion.span 
                className="text-emerald-600 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Nicolas
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-emerald-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.role')}
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a 
                href="https://github.com/nicolas-netizen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-3 text-gray-600 hover:text-emerald-600 transition-all duration-300 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <GithubIcon size={24} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/nicolas-paniagua-80150a256" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-3 text-gray-600 hover:text-emerald-600 transition-all duration-300 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -5,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <LinkedinIcon size={24} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              <motion.a 
                href="mailto:nicolas.paniagua05f@gmail.com" 
                className="group relative p-3 text-gray-600 hover:text-emerald-600 transition-all duration-300 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <MailIcon size={24} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y, opacity }}
          >
            <motion.img
              src="/Fotonico.jpg"
              alt="Nicolas Paniagua"
              loading="eager"
              className="rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center text-emerald-600"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;