import { useTranslation } from 'react-i18next';
import { Github, PlayCircle, Video, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';

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
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Available technologies for filtering
  const availableTechnologies = [
    'all',
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'C#',
    'Unity',
    'Flutter',
    'Dart',
    'MongoDB',
    'Express',
    'Tailwind CSS',
    'HTML5/CSS3'
  ];

  const projects: ProjectType[] = [
    {
      title: t('projects.juntea.title'),
      description: t('projects.juntea.description'),
      websiteUrl: 'https://triven.com.ar/',
      image: '/images/hero.png',
      technologies: [
        t('projects.tech.flutter'), 
        t('projects.tech.dart'), 
        t('projects.tech.express'),
        t('projects.tech.mongodb')
      ],
      demoUrl: 'https://triven.com.ar/',
    },
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

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    );
  }, [projects, selectedFilter]);

  return (
    <section id="projects" className="py-20 relative bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('projects.title')}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('projects.subtitle') || 'A collection of my recent work and personal projects'}
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={18} className="sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">Filter by Technology</span>
              </motion.button>
              
              {selectedFilter !== 'all' && (
                <motion.button
                  onClick={() => setSelectedFilter('all')}
                  className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedFilter}
                  <X size={16} />
                </motion.button>
              )}
            </div>
            
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableTechnologies.map((tech) => (
                    <motion.button
                      key={tech}
                      onClick={() => {
                        setSelectedFilter(tech);
                        setShowFilters(false);
                      }}
                      className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        selectedFilter === tech
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech === 'all' ? 'All Projects' : tech}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedFilter}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 group-hover:border-emerald-200 dark:group-hover:border-emerald-700">
                {/* Project Image/Preview */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  {project.websiteUrl ? (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/10 group-hover:to-black/20 transition-all duration-500 z-10"></div>
                      <iframe
                        src={project.websiteUrl}
                        title={project.title}
                        className="absolute inset-0 w-full h-full border-none transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/10 group-hover:to-black/20 transition-all duration-500"></div>
                    </div>
                  )}
                  
                  {/* Overlay with action buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                    <div className="flex space-x-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.sourceUrl && (
                        <motion.a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/80 transition-all duration-300 hover:scale-110"
                          aria-label={t('projects.viewSourceCode')}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/80 transition-all duration-300 hover:scale-110"
                          aria-label={t('projects.playDemo')}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlayCircle className="w-6 h-6" />
                        </motion.a>
                      )}
                      {project.videoUrl && (
                        <motion.a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/80 transition-all duration-300 hover:scale-110"
                          aria-label={t('projects.watchVideo')}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Video className="w-6 h-6" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  {/* Project status badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {project.websiteUrl ? 'Live' : 'Project'}
                    </span>
                  </div>
                </div>
                {/* Project Content */}
                <div className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-700"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.3 + techIndex * 0.1 
                          }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            borderColor: "rgba(16, 185, 129, 0.3)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlayCircle className="w-4 h-4" />
                        {t('projects.playDemo')}
                      </motion.a>
                    )}
                    {project.sourceUrl && (
                      <motion.a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        {t('projects.viewSourceCode')}
                      </motion.a>
                    )}
                    {project.videoUrl && (
                      <motion.a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 border border-blue-200 dark:border-blue-700"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Video className="w-4 h-4" />
                        {t('projects.watchVideo')}
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
