import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = ['colleague1', 'colleague2', 'client1'];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonialId, index) => (
            <motion.div
              key={testimonialId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Quote className="w-10 h-10 text-emerald-500 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                {t(`testimonials.items.${testimonialId}.text`)}
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {t(`testimonials.items.${testimonialId}.name`).charAt(0)}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {t(`testimonials.items.${testimonialId}.name`)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(`testimonials.items.${testimonialId}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
