import React from 'react';
import { useTranslation } from 'react-i18next';
import Card3D from './Card3D';
import { Github, PlayCircle, Video } from 'lucide-react';

interface ProjectType {
  title: string;
  description: string;
  websiteUrl?: string;
  image?: string;
  technologies: string[];
  sourceUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
}

const Projects = () => {
  const { t } = useTranslation();

  const projects: ProjectType[] = [
    {
      title: t('projects.chapiri.title'),
      description: t('projects.chapiri.description'),
      image: '/images/web1.png',
      websiteUrl: 'https://psico-olive.vercel.app/',
      demoUrl: 'https://psico-olive.vercel.app/',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.typescript'), 
        t('projects.tech.tailwind')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/psico',
    },
    {
      title: t('projects.goblinAttack.title'),
      description: t('projects.goblinAttack.description'),
      image: '/images/Screenshot_2.png',
      technologies: [
        t('projects.tech.unity'), 
        t('projects.tech.csharp')
      ],
      demoUrl: 'https://nico-pano00.itch.io/el-ataque-de-los-goblins',
      sourceUrl: 'https://github.com/nicolas-netizen/Proyecto-7MO-TowerDefense.git',
      videoUrl: 'https://www.canva.com/design/DAF-kxKxGzs/watch',
    },
    {
      title: t('projects.webPresentation.title'),
      description: t('projects.webPresentation.description'),
      image: '/images/web3.png',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.nodejs')
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      sourceUrl: 'https://github.com/nicolas-netizen/TecnicaWeb',
    },
    {
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: '/images/web2.png',
      technologies: [
        t('projects.tech.csharp'), 
        t('projects.tech.sqlserver')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/NetWinForm_sql',
      videoUrl: 'https://www.canva.com/design/DAF-kxKxGzs/watch',
    },
    {
      title: t('projects.nuevoMundo.title'),
      description: t('projects.nuevoMundo.description'),
      websiteUrl: 'https://nuevomundosolar.com/',
      image: '/images/hero.png',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.nodejs'), 
        t('projects.tech.tailwind'), 
        t('projects.tech.express'), 
        t('projects.tech.mongodb')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/nuevo-mundo-ecommerce',
      demoUrl: 'https://nuevomundosolar.com/',
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card3D
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.websiteUrl ? (
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    <iframe
                      src={project.websiteUrl}
                      title={project.title}
                      className="absolute inset-0 w-full h-full border-none pointer-events-auto"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                    />

                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 transition-colors"
                      aria-label={t('projects.viewSourceCode')}
                    >
                      <Github className="w-8 h-8" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 transition-colors"
                      aria-label={t('projects.playDemo')}
                    >
                      <PlayCircle className="w-8 h-8" />
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 transition-colors"
                      aria-label={t('projects.watchVideo')}
                    >
                      <Video className="w-8 h-8" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover-underline-animation">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {t('projects.playDemo')}
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      {t('projects.viewSourceCode')}
                    </a>
                  )}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
