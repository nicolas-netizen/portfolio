import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, Eye, Calendar, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  languages: { [key: string]: number };
  recentActivity: any[];
}

const GitHubStats = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Simulated GitHub API data (in a real app, you'd use actual GitHub API)
        const mockStats: GitHubStats = {
          totalStars: 47,
          totalForks: 23,
          totalRepos: 15,
          totalCommits: 892,
          languages: {
            'TypeScript': 35,
            'JavaScript': 28,
            'Python': 20,
            'C#': 12,
            'Dart': 5
          },
          recentActivity: [
            { repo: 'portfolio', commits: 12, date: '2024-01-15' },
            { repo: 'juntea-app', commits: 8, date: '2024-01-14' },
            { repo: 'nuevo-mundo-ecommerce', commits: 15, date: '2024-01-13' }
          ]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (err) {
        setError('Failed to fetch GitHub stats');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !stats) {
    return null;
  }

  const statItems = [
    {
      icon: Star,
      label: 'Total Stars',
      value: stats.totalStars,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: GitFork,
      label: 'Forks',
      value: stats.totalForks,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Github,
      label: 'Repositories',
      value: stats.totalRepos,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Commits',
      value: stats.totalCommits,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Github className="w-8 h-8 text-emerald-600" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          GitHub Activity
        </h3>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`p-4 rounded-xl ${item.bgColor} border border-gray-200 dark:border-gray-700`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-6 h-6 ${item.color}`} />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Most Used Languages
        </h4>
        <div className="space-y-3">
          {Object.entries(stats.languages).map(([lang, percentage], index) => (
            <motion.div
              key={lang}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {lang}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {percentage}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {stats.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {activity.repo}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.commits} commits
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
                {new Date(activity.date).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* GitHub Link */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <motion.a
          href="https://github.com/nicolas-netizen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
          View on GitHub
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats;
