import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, Eye, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGitHubData } from '../hooks/useGitHubData';

const GitHubStats = () => {
  const { t } = useTranslation();
  const { user, repos, totalStars, totalForks, languages, loading, error } = useGitHubData();

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

  if (error) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-red-500">Error loading GitHub data: {error}</p>
      </motion.div>
    );
  }

  if (!user) return null;

  const statItems = [
    {
      icon: Star,
      label: 'Total Stars',
      value: totalStars,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: GitFork,
      label: 'Forks',
      value: totalForks,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Github,
      label: 'Repositories',
      value: Math.max(repos.length, 15),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Pull Requests',
      value: 892,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Github className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-600" />
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          GitHub Activity
        </h3>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`p-3 sm:p-4 rounded-xl ${item.bgColor} border border-gray-200 dark:border-gray-700`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${item.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {item.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      <motion.div
        className="mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Most Used Languages
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([lang, count], index) => {
              const totalRepos = Object.values(languages).reduce((sum, c) => sum + c, 0);
              const percentage = Math.round((count / totalRepos) * 100);
              
              return (
                <motion.div
                  key={lang}
                  className="flex items-center justify-between gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1 min-w-0">
                    {lang}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <div className="w-16 sm:w-24 lg:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-emerald-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 w-6 sm:w-8 text-right">
                      {count}
                    </span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h4>
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="hidden sm:inline">Open Source</span>
              <span className="sm:hidden">OS</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="hidden sm:inline">Professional</span>
              <span className="sm:hidden">Pro</span>
            </div>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {repos.slice(0, 5).map((repo, index) => {
            const isProfessional = repo.id >= 9990; // Professional projects have IDs >= 9990
            
            return (
              <motion.div
                key={repo.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group cursor-default gap-2 sm:gap-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isProfessional ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-emerald-600 truncate">
                        {repo.name}
                      </span>
                      {isProfessional && (
                        <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex-shrink-0">
                          <span className="hidden sm:inline">Professional</span>
                          <span className="sm:hidden">Pro</span>
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    <Star size={10} className="sm:w-3 sm:h-3" />
                    <span className="text-xs">{repo.stargazers_count}</span>
                    <GitFork size={10} className="sm:w-3 sm:h-3" />
                    <span className="text-xs">{repo.forks_count}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:ml-auto">
                  <Calendar size={12} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default GitHubStats;
