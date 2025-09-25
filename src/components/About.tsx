import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Code, Gamepad2, Brain, Smartphone, Sparkles, User, Calendar, Phone, Mail, MapPin, Award, Target, Heart } from 'lucide-react';
import { motion } from 'motion/react';

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
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { icon: Calendar, label: t('about.birthday'), value: '24/05/2005', color: 'text-blue-500' },
              { icon: Phone, label: t('about.phone'), value: '11 3306-3086', color: 'text-green-500' },
              { icon: Mail, label: t('about.email'), value: 'nicolas.paniagua05f@gmail.com', color: 'text-purple-500' },
              { icon: MapPin, label: t('about.location'), value: 'Ituzaingó, Argentina', color: 'text-orange-500' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, x: 8, y: -2 }}
              >
                <motion.div 
                  className={`p-2 sm:p-3 lg:p-4 rounded-2xl bg-white dark:bg-gray-600 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${item.color}`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white font-semibold break-words">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
      case 'facts':
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { icon: Award, text: t('about.funFact1'), color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
              { icon: Target, text: t('about.funFact2'), color: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Heart, text: t('about.funFact3'), color: 'text-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' }
            ].map((fact, index) => (
              <motion.div 
                key={index}
                className={`flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 lg:p-5 rounded-2xl ${fact.bgColor} hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-600`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, x: 8, y: -2 }}
              >
                <motion.div 
                  className={`p-2 sm:p-3 rounded-2xl bg-white dark:bg-gray-600 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <fact.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${fact.color}`} />
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm sm:text-base lg:text-lg">{fact.text}</p>
              </motion.div>
            ))}
          </motion.div>
        );
      case 'interests':
        return (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { icon: Code, text: t('about.interest1'), color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: Gamepad2, text: t('about.interest2'), color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
              { icon: Brain, text: t('about.interest3'), color: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Smartphone, text: t('about.interest4'), color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
            ].map((interest, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col items-center p-4 sm:p-6 rounded-3xl ${interest.bgColor} hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 dark:border-gray-600`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -12, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`p-3 sm:p-4 lg:p-5 rounded-3xl bg-white dark:bg-gray-600 shadow-xl group-hover:shadow-2xl transition-all duration-300 mb-3 sm:mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <interest.icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${interest.color}`} />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300 font-bold text-center group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                  {interest.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('about.title')}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Description and CV */}
          <motion.div 
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ y: -8, scale: 1.02, shadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {t('about.description')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  onClick={handleDownloadCV}
                  className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 relative overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">{t('about.downloadCv')}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Tabs */}
          <motion.div 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02, shadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Tab Navigation */}
              <motion.div 
                className="flex bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-3xl overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {[
                  { key: 'details', label: t('about.personalDetails'), icon: User },
                  { key: 'facts', label: t('about.funFact'), icon: Sparkles },
                  { key: 'interests', label: t('about.interests'), icon: Heart }
                ].map((tab, index) => (
                  <motion.button
                    key={tab.key}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 font-medium transition-all duration-300 relative rounded-t-2xl whitespace-nowrap min-w-0 ${
                      activeTab === tab.key
                        ? 'text-emerald-600 bg-white dark:bg-gray-800 shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:bg-white/50 dark:hover:bg-gray-600/50'
                    }`}
                    onClick={() => setActiveTab(tab.key as any)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.key && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <motion.div 
                className="p-4 sm:p-6 lg:p-8 min-h-[250px] sm:min-h-[300px] rounded-b-3xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {renderTabContent()}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;