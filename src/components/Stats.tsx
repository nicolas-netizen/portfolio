import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Briefcase, Coffee, Calendar } from 'lucide-react';
import GitHubStats from './GitHubStats';

const Stats = () => {
  const { t } = useTranslation();
  const [animatedStats, setAnimatedStats] = useState({
    completedProjects: 0,
    technologies: 0,
    activeProjects: 0,
    yearsExperience: 0
  });

  // Datos reales calculados
  const calculateRealStats = () => {
    // Proyectos completados (basado en tu portafolio actual)
    const completedProjects = 7; // Juntea, Chapiri, Goblin Attack, GG Build, Web Presentation, Mundo Nuevo, Portfolio
    
    // Tecnologías que dominas (basado en tu sección de skills)
    const technologies = [
      'React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Node.js', 'Python', 
      'C#', 'Tailwind CSS', 'Git', 'VS Code', 'Visual Studio', 'Unity',
      'Flutter', 'Dart', 'Express', 'MongoDB'
    ].length; // 16 tecnologías
    
    // Proyectos activos (estimación basada en tu perfil)
    const activeProjects = 8; // Universidad + trabajo actual + proyectos personales
    
    // Años de experiencia (desde que empezaste a programar a los 15)
    const startYear = 2022; // Año aproximado cuando empezaste
    const currentYear = new Date().getFullYear();
    const yearsExperience = Math.max(1, currentYear - startYear); // Mínimo 1 año
    
    return {
      completedProjects,
      technologies,
      activeProjects,
      yearsExperience
    };
  };

  const finalStats = calculateRealStats();

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const animations = {
      completedProjects: { step: finalStats.completedProjects / steps, current: 0 },
      technologies: { step: finalStats.technologies / steps, current: 0 },
      activeProjects: { step: finalStats.activeProjects / steps, current: 0 },
      yearsExperience: { step: finalStats.yearsExperience / steps, current: 0 }
    };

    const timer = setInterval(() => {
      setAnimatedStats(() => ({
        completedProjects: Math.min(Math.ceil(animations.completedProjects.current += animations.completedProjects.step), finalStats.completedProjects),
        technologies: Math.min(Math.ceil(animations.technologies.current += animations.technologies.step), finalStats.technologies),
        activeProjects: Math.min(Math.ceil(animations.activeProjects.current += animations.activeProjects.step), finalStats.activeProjects),
        yearsExperience: Math.min(Math.ceil(animations.yearsExperience.current += animations.yearsExperience.step), finalStats.yearsExperience)
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const statsItems = [
    { 
      icon: Briefcase, 
      value: animatedStats.completedProjects, 
      label: t('stats.completedProjects'),
      color: 'text-emerald-500'
    },
    { 
      icon: Code2, 
      value: animatedStats.technologies, 
      label: t('stats.technologies'),
      color: 'text-blue-500'
    },
    { 
      icon: Coffee, 
      value: animatedStats.activeProjects, 
      label: t('stats.activeProjects'),
      color: 'text-purple-500'
    },
    { 
      icon: Calendar, 
      value: animatedStats.yearsExperience, 
      label: t('stats.yearsExperience'),
      color: 'text-orange-500'
    }
  ];

  return (
    <section className="py-20 theme-bg">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold theme-text mb-4 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('stats.title')}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-700">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.2 + index * 0.1,
                      type: "spring"
                    }}
                    viewport={{ once: true }}
                    className="mb-4"
                  >
                    <item.icon className={`w-10 h-10 ${item.color}`} />
                  </motion.div>
                  
                  <motion.span 
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + index * 0.1,
                      type: "spring"
                    }}
                    viewport={{ once: true }}
                  >
                    {item.value.toLocaleString()}
                  </motion.span>
                  
                  <motion.span 
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6 + index * 0.1 
                    }}
                    viewport={{ once: true }}
                  >
                    {item.label}
                  </motion.span>
                </div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GitHubStats />
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
