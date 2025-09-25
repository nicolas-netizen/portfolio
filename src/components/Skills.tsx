import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiCsharp,
  SiTailwindcss,
  SiGit,
  SiVisualstudiocode,
  SiVisualstudio,
  SiUnity,
  SiPython
} from 'react-icons/si';
import { motion } from 'motion/react';

interface TechSkill {
  name: string;
  icon: React.ComponentType;
  color: string;
}

const Skills = () => {
  const { t } = useTranslation();

  const techSkills: TechSkill[] = [
    { name: 'skills.react', icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'skills.typescript', icon: SiTypescript, color: 'text-[#3178C6]' },
    { name: 'skills.javascript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
    { name: 'skills.htmlcss', icon: SiHtml5, color: 'text-[#E34F26]' },
    { name: 'skills.nodejs', icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'skills.python', icon: SiPython, color: 'text-[#3776AB]' },
    { name: 'skills.csharp', icon: SiCsharp, color: 'text-[#239120]' },
    { name: 'skills.tailwind', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'skills.git', icon: SiGit, color: 'text-[#F05032]' },
    { name: 'skills.vscode', icon: SiVisualstudiocode, color: 'text-[#007ACC]' },
    { name: 'skills.visualstudio', icon: SiVisualstudio, color: 'text-[#5C2D91]' },
    { name: 'skills.unity', icon: SiUnity, color: 'text-gray-200' }
  ];

  const softSkills = [
    'communication',
    'teamwork',
    'problemSolving',
    'adaptability',
    'creativity',
    'timeManagement'
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('skills.title')}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.h2>

        {/* Technical Skills */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xl font-semibold mb-8 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('skills.technicalTitle')}
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <skill.icon className={`w-12 h-12 ${skill.color} mb-3 transition-transform group-hover:scale-110`} />
                </motion.div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {t(skill.name)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xl font-semibold mb-8 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {t('skills.softTitle')}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill}
                className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  backgroundColor: "rgba(16, 185, 129, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`skills.${skill}`)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;