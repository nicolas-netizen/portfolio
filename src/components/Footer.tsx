import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/nicolas-netizen',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/nicolas-paniagua-dev/',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:nicolas.paniagua05f@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="theme-surface py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <MapPin size={20} className="text-emerald-500" />
            <span>Ituzaingó, Buenos Aires, Argentina</span>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {currentYear} Nicolás Paniagua. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
