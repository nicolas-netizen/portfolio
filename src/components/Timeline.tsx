import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Briefcase, Gamepad2 } from 'lucide-react';

const Timeline = () => {
  const { t } = useTranslation();

  const timelineItems = [
    {
      id: 'technicalDegree',
      icon: GraduationCap,
      type: 'education'
    },
    {
      id: 'gamedev',
      icon: Gamepad2,
      type: 'experience'
    },
    {
      id: 'fullstack',
      icon: Briefcase,
      type: 'experience'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          {t('timeline.title')}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500" />

          {timelineItems.map((timelineItem, index) => (
            <motion.div
              key={timelineItem.id}
              variants={item}
              className={`mb-8 flex justify-center items-start ${
                index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              <div
                className={`relative w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <timelineItem.icon className="w-6 h-6 text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-emerald-500">
                      {t(`timeline.${timelineItem.type}`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t(`timeline.items.${timelineItem.id}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {t(`timeline.items.${timelineItem.id}.institution`)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {t(`timeline.items.${timelineItem.id}.date`)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(`timeline.items.${timelineItem.id}.description`)}
                  </p>
                </div>

                {/* Dot */}
                <div
                  className={`absolute top-8 w-4 h-4 rounded-full bg-emerald-500 transform -translate-y-1/2 ${
                    index % 2 === 0
                      ? 'right-0 translate-x-1/2'
                      : 'left-0 -translate-x-1/2'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
