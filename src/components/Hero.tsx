import React from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              {t('hero.greeting')} <span className="text-emerald-600">Nicolas</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('hero.role')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('hero.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <GithubIcon size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <LinkedinIcon size={24} />
              </a>
              <a href="mailto:nicolas.paniagua05f@gmail.com" className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <MailIcon size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="/public/Nico.JPG"
              alt="Nicolas Paniagua"
              loading="eager"
              className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;