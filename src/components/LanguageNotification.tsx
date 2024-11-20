import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, X } from 'lucide-react';

const LanguageNotification = () => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detectar el idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['es', 'en'];
    const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

    // Si el idioma detectado es diferente al actual, mostrar la notificación
    if (detectedLang !== i18n.language) {
      setShow(true);
    }

    // Guardar en localStorage que ya mostramos la notificación
    const hasShownNotification = localStorage.getItem('languageNotificationShown');
    if (!hasShownNotification) {
      setShow(true);
      localStorage.setItem('languageNotificationShown', 'true');
    }
  }, [i18n.language]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mx-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Languages className="h-6 w-6 text-emerald-500" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {t('language.notification')}
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleChangeLanguage('es')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-100 dark:hover:bg-emerald-700 transition-colors"
              >
                Español
              </button>
              <button
                onClick={() => handleChangeLanguage('en')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-100 dark:hover:bg-emerald-700 transition-colors"
              >
                English
              </button>
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">{t('common.close')}</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageNotification;
