import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Code, Briefcase, User, Mail, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'section' | 'project' | 'skill' | 'contact';
  url: string;
  icon: React.ComponentType<any>;
}

const GlobalSearch = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const searchData: SearchResult[] = [
    // Sections
    {
      id: 'home',
      title: 'Home',
      description: 'Main landing page with introduction',
      type: 'section',
      url: '#home',
      icon: User
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about Nicolas and his background',
      type: 'section',
      url: '#about',
      icon: User
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Technical and soft skills showcase',
      type: 'section',
      url: '#skills',
      icon: Code
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Portfolio of completed projects',
      type: 'section',
      url: '#projects',
      icon: Briefcase
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with Nicolas',
      type: 'section',
      url: '#contact',
      icon: Mail
    },
    // Projects
    {
      id: 'juntea',
      title: 'Juntea - Events App',
      description: 'Mobile app for event management built with Flutter',
      type: 'project',
      url: '#projects',
      icon: Briefcase
    },
    {
      id: 'chapiri',
      title: 'Chapiri E-commerce',
      description: 'Full-stack e-commerce platform with React and Node.js',
      type: 'project',
      url: '#projects',
      icon: Briefcase
    },
    {
      id: 'goblin-attack',
      title: 'Goblin Attack',
      description: '2D platformer game developed with Unity and C#',
      type: 'project',
      url: '#projects',
      icon: Briefcase
    },
    // Skills
    {
      id: 'react',
      title: 'React',
      description: 'Frontend library for building user interfaces',
      type: 'skill',
      url: '#skills',
      icon: Code
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Typed superset of JavaScript',
      type: 'skill',
      url: '#skills',
      icon: Code
    },
    {
      id: 'nodejs',
      title: 'Node.js',
      description: 'JavaScript runtime for server-side development',
      type: 'skill',
      url: '#skills',
      icon: Code
    },
    {
      id: 'python',
      title: 'Python',
      description: 'High-level programming language',
      type: 'skill',
      url: '#skills',
      icon: Code
    },
    // Contact
    {
      id: 'email',
      title: 'Email',
      description: 'nicolas.paniagua05f@gmail.com',
      type: 'contact',
      url: 'mailto:nicolas.paniagua05f@gmail.com',
      icon: Mail
    },
    {
      id: 'github',
      title: 'GitHub',
      description: 'View repositories and contributions',
      type: 'contact',
      url: 'https://github.com/nicolas-netizen',
      icon: Github
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      description: 'Professional network profile',
      type: 'contact',
      url: 'https://www.linkedin.com/in/nicolas-paniagua-80150a256',
      icon: ExternalLink
    }
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'contact' && result.url.startsWith('http')) {
      window.open(result.url, '_blank');
    } else if (result.url.startsWith('#')) {
      document.querySelector(result.url)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = result.url;
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        style={{
          position: 'fixed',
          top: '80px',
          right: '8px',
          zIndex: 9999,
          maxWidth: 'calc(100vw - 16px)',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
        }}
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">Ctrl+K</kbd>
      </button>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search sections, projects, skills..."
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {results.length === 0 && query ? (
              <motion.div
                className="p-8 text-center text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No results found for "{query}"
              </motion.div>
            ) : (
              results.map((result, index) => (
                <motion.div
                  key={result.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-emerald-50 dark:bg-emerald-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleResultClick(result)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`p-2 rounded-lg ${
                    result.type === 'section' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' :
                    result.type === 'project' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                    result.type === 'skill' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600' :
                    'bg-orange-100 dark:bg-orange-900/20 text-orange-600'
                  }`}>
                    <result.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 uppercase font-medium">
                    {result.type}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Ctrl+K to open</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GlobalSearch;
