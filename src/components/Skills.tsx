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
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('skills.title')}
        </h2>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
            {t('skills.technicalTitle')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techSkills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <skill.icon className={`w-12 h-12 ${skill.color} mb-3 transition-transform group-hover:scale-110`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {t(skill.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
            {t('skills.softTitle')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill) => (
              <div
                key={skill}
                className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              >
                {t(`skills.${skill}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;