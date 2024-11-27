import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Briefcase, Coffee, Clock } from 'lucide-react';

const Stats = () => {
  const { t } = useTranslation();
  const [animatedStats, setAnimatedStats] = useState({
    completedProjects: 0,
    technologies: 0,
    activeProjects: 0,
    yearsExperience: 0
  });

  const finalStats = {
    completedProjects: 5,
    technologies: 12,
    activeProjects: 3,
    yearsExperience: 2
  };

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
      setAnimatedStats(prev => ({
        completedProjects: Math.min(Math.ceil(animations.completedProjects.current += animations.completedProjects.step), finalStats.completedProjects),
        technologies: Math.min(Math.ceil(animations.technologies.current += animations.technologies.step), finalStats.technologies),
        activeProjects: Math.min(Math.ceil(animations.activeProjects.current += animations.activeProjects.step), finalStats.activeProjects),
        yearsExperience: Math.min(Math.ceil(animations.yearsExperience.current += animations.yearsExperience.step), finalStats.yearsExperience)
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const statsItems = [
    { icon: Briefcase, value: animatedStats.completedProjects, label: 'Completed Projects' },
    { icon: Code2, value: animatedStats.technologies, label: 'Technologies' },
    { icon: Clock, value: animatedStats.activeProjects, label: 'Active Projects' },
    { icon: Clock, value: animatedStats.yearsExperience, label: 'Years Experience' }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
              <span className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {item.value.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
