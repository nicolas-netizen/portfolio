import React from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const Hero = () => {
  const { t } = useTranslation();
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.greeting')} <motion.span 
                className="text-emerald-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Nicolas
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.role')}
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
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
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon size={24} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/nicolas-paniagua-80150a256" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedinIcon size={24} />
              </motion.a>
              <motion.a 
                href="mailto:nicolas.paniagua05f@gmail.com" 
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <MailIcon size={24} />
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
              className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;