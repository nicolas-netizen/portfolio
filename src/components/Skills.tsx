import React from 'react';
import { useTranslation } from 'react-i18next';

interface Skill {
  key: string;
  level: number;
}

const technicalSkills: Skill[] = [
  { key: 'skills.javascript', level: 60 },
  { key: 'skills.htmlcss', level: 95 },
  { key: 'skills.react', level: 70 },
  { key: 'skills.nodejs', level: 90 },
  { key: 'skills.typescript', level: 75 },
  { key: 'skills.python', level: 65 },
  { key: 'skills.csharp', level: 80 },
];

const softSkills: Skill[] = [
  { key: 'skills.communication', level: 90 },
  { key: 'skills.teamwork', level: 85 },
  { key: 'skills.problemSolving', level: 80 },
  { key: 'skills.adaptability', level: 85 },
  { key: 'skills.creativity', level: 75 },
  { key: 'skills.timeManagement', level: 88 },
  { key: 'skills.conflictResolution', level: 65 }
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const { t } = useTranslation();
  return (
    <div key={skill.key}>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">{t(skill.key)}</span>
        <span className="text-gray-700 dark:text-gray-300">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-progress"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('skills.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t('skills.technicalTitle')}
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill.key} skill={skill} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t('skills.softTitle')}
            </h3>
            <div className="space-y-4">
              {softSkills.map((skill) => (
                <SkillBar key={skill.key} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;