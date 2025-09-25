import { useTranslation } from 'react-i18next';
import { Github, PlayCircle, ExternalLink, Filter, X, Code2 } from 'lucide-react';
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
  category: string;
}

const ProjectsNew = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [iframeErrors, setIframeErrors] = useState<Set<number>>(new Set());

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
      category: 'mobile'
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
      category: 'web'
    },
    {
      title: t('projects.goblinAttack.title'),
      description: t('projects.goblinAttack.description'),
      videoUrl: '/Copia de SUPER PIXEL.mp4',
      technologies: [
        t('projects.tech.unity'), 
        t('projects.tech.csharp')
      ],
      demoUrl: 'https://nico-pano00.itch.io/el-ataque-de-los-goblins',
      sourceUrl: 'https://github.com/nicolas-netizen/Proyecto-7MO-TowerDefense.git',
      category: 'gaming'
    },
    {
      title: 'GG Build',
      description: 'Plataforma web especializada en venta de PC gaming personalizadas. E-commerce moderno con catálogo de componentes, configurador de PC y sistema de pedidos integrado.',
      image: '/images/web3.png',
      websiteUrl: 'https://gg-build.vercel.app/',
      demoUrl: 'https://gg-build.vercel.app/',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.typescript'), 
        t('projects.tech.tailwind'),
        t('projects.tech.nodejs'),
        t('projects.tech.mongodb')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/gg-build',
      category: 'ecommerce'
    },
    {
      title: t('projects.webPresentation.title'),
      description: t('projects.webPresentation.description'),
      videoUrl: '/Presentacion Página Web.mp4',
      technologies: [
        t('projects.tech.html'), 
        t('projects.tech.css'), 
        t('projects.tech.javascript')
      ],
      demoUrl: 'https://nuevomundosolar.com/',
      category: 'web'
    },
    {
      title: t('projects.nuevoMundo.title'),
      description: t('projects.nuevoMundo.description'),
      image: '/images/web3.png',
      websiteUrl: 'https://nuevomundosolar.com/',
      demoUrl: 'https://nuevomundosolar.com/',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.nodejs'), 
        t('projects.tech.tailwind'),
        t('projects.tech.express'),
        t('projects.tech.mongodb')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/nuevo-mundo-ecommerce',
      category: 'ecommerce'
    },
    {
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: '/images.jpeg',
      technologies: [
        t('projects.tech.react'), 
        t('projects.tech.typescript'), 
        t('projects.tech.tailwind'),
        t('projects.tech.framer')
      ],
      sourceUrl: 'https://github.com/nicolas-netizen/portfolio',
      category: 'web'
    }
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

  // Handle iframe load error
  const handleIframeError = (index: number) => {
    setIframeErrors(prev => new Set(prev).add(index));
  };

  return (
    <section id="projects" className="py-20 relative theme-bg">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 theme-gradient-text relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('projects.title')}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 theme-gradient rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl theme-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 theme-surface border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter by Tech</span>
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
          
          <div className="text-sm theme-text-secondary">
            {filteredProjects.length} of {projects.length} projects
          </div>
        </motion.div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mb-8 p-6 theme-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2">
                {availableTechnologies.map((tech) => (
                  <motion.button
                    key={tech}
                    onClick={() => {
                      setSelectedFilter(tech);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedFilter === tech
                        ? 'theme-primary-bg text-white shadow-lg'
                        : 'theme-surface border border-gray-200 dark:border-gray-700 theme-text hover:border-emerald-300 dark:hover:border-emerald-600'
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
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="relative theme-surface rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 h-full flex flex-col">
                  {/* Project Image/Preview */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    {project.videoUrl && project.videoUrl.endsWith('.mp4') ? (
                      <div className="relative w-full h-full">
                        <video
                          src={project.videoUrl}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          autoPlay
                          muted
                          loop
                          playsInline
                          onError={() => handleIframeError(index)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/15 transition-all duration-500"></div>
                      </div>
                    ) : project.websiteUrl && !iframeErrors.has(index) ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/15 transition-all duration-500 z-10"></div>
                        <iframe
                          src={project.websiteUrl}
                          title={project.title}
                          className="absolute inset-0 w-full h-full border-none transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          onError={() => handleIframeError(index)}
                        />
                      </div>
                    ) : project.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/15 transition-all duration-500"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                          <Code2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay with action buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                      <div className="flex space-x-3">
                        {project.sourceUrl && (
                          <motion.a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/80 transition-all duration-300"
                            aria-label="View Source Code"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/80 transition-all duration-300"
                            aria-label="View Demo"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <PlayCircle className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    {/* Project status badge */}
                    <div className="absolute top-3 right-3 z-30">
                      <span className="px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {project.websiteUrl ? 'Live' : 'Project'}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold theme-text mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="theme-text-secondary mb-4 text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 theme-primary-bg text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300 text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink size={16} />
                          View Demo
                        </motion.a>
                      )}
                      {project.sourceUrl && (
                        <motion.a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 theme-text rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github size={16} />
                          Code
                        </motion.a>
                      )}
                    </div>
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

export default ProjectsNew;
