import React from 'react';
import { useTranslation } from 'react-i18next';
import Card3D from './Card3D';
import { Github, PlayCircle, Video } from 'lucide-react';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.modernShop.title'),
      description: t('projects.modernShop.description'),
      canvaEmbed: 'https://www.canva.com/design/DAGXsx96HaU/gZkJmIKpXBKgHpvBJwv0MA/view?embed&autoplay=true&loop=true',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.typescript'), 
        t('projects.tech.tailwind')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/modernshop-react',
    },
    {
      title: t('projects.goblinAttack.title'),
      description: t('projects.goblinAttack.description'),
      canvaEmbed: 'https://www.canva.com/design/DAFqY6rmns8/Yj93o9qlTGiJ9xUHi5KcjQ/view?embed&autoplay=true&loop=true',
      technologies: [
        t('projects.tech.unity'), 
        t('projects.tech.csharp')
      ],
      demoUrl: 'https://nico-pano00.itch.io/el-ataque-de-los-goblins',
      sourceUrl: 'https://github.com/nicolas-netizen/Proyecto-7MO-TowerDefense.git',
    },
    {
      title: t('projects.webPresentation.title'),
      description: t('projects.webPresentation.description'),
      canvaEmbed: 'https://www.canva.com/design/DAFzm5Hh0uc/Yg5YMCvmctMgyWpj2SERYw/view?embed&autoplay=true&loop=true',
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
      image: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=800&q=80',
      technologies: [
        t('projects.tech.csharp'), 
        t('projects.tech.sqlserver')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/NetWinForm_sql',
    },
    {
      title: t('projects.nuevoMundo.title'),
      description: t('projects.nuevoMundo.description'),
      canvaEmbed: 'https://www.canva.com/design/DAGbcNdBRSw/RXqcEGN-uxTJIYYAzSeUnw/view?embed&autoplay=true&loop=true',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.nodejs'), 
        t('projects.tech.tailwind'), 
        t('projects.tech.express'), 
        t('projects.tech.mongodb')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/nuevo-mundo-ecommerce',
      demoUrl: 'https://solarr-production-fa18.up.railway.app/',
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
              {project.canvaEmbed ? (
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-none"
                    src={project.canvaEmbed}
                    allowFullScreen
                    title={project.title}
                  ></iframe>
                </div>
              ) : (
                <div className="relative aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
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
              )}
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
                      {t(`projects.tech.${tech}`)}
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
