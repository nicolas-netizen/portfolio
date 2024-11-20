import React, { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        'service_99k6d6s',
        'template_4ofqoeb',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'nicolas.paniagua05f@gmail.com'
        },
        't66oFDjJXB0IxMlWn'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('contact.description')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder={t('Your name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder={t('Your email')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none"
                placeholder={t('Your message')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {status === 'success' && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle size={20} className="mr-2" />
                    <span>{t('contact.success')}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <AlertCircle size={20} className="mr-2" />
                    <span>{t('contact.error')}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg transition-colors ${
                  sending ? 'opacity-75 cursor-not-allowed' : 'hover:bg-emerald-700'
                }`}
              >
                {sending ? (
                  <>
                    <Mail className="animate-bounce" size={20} />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;