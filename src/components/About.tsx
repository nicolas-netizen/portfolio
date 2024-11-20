import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Code, Gamepad2, Brain, Smartphone, Sparkles } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'details' | 'facts' | 'interests'>('details');

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/src/img/Nicolás-paniaguaa.pdf';
    link.download = 'Nicolas-Paniagua-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li><strong>{t('about.birthday')}:</strong> 24/05/2005</li>
            <li><strong>{t('about.phone')}:</strong> 11 3306-3086</li>
            <li><strong>{t('about.email')}:</strong> nicolas.paniagua05f@gmail.com</li>
            <li><strong>{t('about.location')}:</strong> Ituzaingó, Argentina</li>
          </ul>
        );
      case 'facts':
        return (
          <ul className="space-y-3">
            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Sparkles className="text-emerald-500" size={20} />
              <span>{t('about.funFact1')}</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Sparkles className="text-emerald-500" size={20} />
              <span>{t('about.funFact2')}</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Sparkles className="text-emerald-500" size={20} />
              <span>{t('about.funFact3')}</span>
            </li>
          </ul>
        );
      case 'interests':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
              <Code className="text-emerald-500 mb-2" size={24} />
              <span className="text-gray-600 dark:text-gray-300">{t('about.interest1')}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
              <Gamepad2 className="text-emerald-500 mb-2" size={24} />
              <span className="text-gray-600 dark:text-gray-300">{t('about.interest2')}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
              <Brain className="text-emerald-500 mb-2" size={24} />
              <span className="text-gray-600 dark:text-gray-300">{t('about.interest3')}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
              <Smartphone className="text-emerald-500 mb-2" size={24} />
              <span className="text-gray-600 dark:text-gray-300">{t('about.interest4')}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('about.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download size={20} />
                {t('about.downloadCv')}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveTab('details')}
              >
                {t('about.personalDetails')}
              </button>
              <button
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'facts'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveTab('facts')}
              >
                {t('about.funFact')}
              </button>
              <button
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'interests'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveTab('interests')}
              >
                {t('about.interests')}
              </button>
            </div>
            <div className="min-h-[200px]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;