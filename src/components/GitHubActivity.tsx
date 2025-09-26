import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Activity } from 'lucide-react';
import { getGitHubHeaders } from '../config/github';

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

const GitHubActivity = () => {
  const { t } = useTranslation();
  const [repos, setRepos] = useState<Repository[]>([]);
  const username = 'nicolas-netizen';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: getGitHubHeaders()
        });
        
        if (!response.ok) {
          console.error('GitHub API Error:', response.status, response.statusText);
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        
        const data = await response.json();
        const formattedRepos = data
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
          }));
        setRepos(formattedRepos);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section className="py-20 theme-surface">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold theme-text mb-4">
            {t('github.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('github.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <Github className="w-6 h-6 text-emerald-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {repo.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">
                {repo.description || 'No description available'}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {repo.stars}
                  </span>
                </div>
                <div className="flex items-center">
                  <GitFork className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {repo.forks}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubActivity;
