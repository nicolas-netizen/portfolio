import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-emerald-50 dark:bg-gray-900 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-800 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin"
          style={{ borderRightColor: 'transparent', borderTopColor: 'transparent' }}
        ></div>
      </div>
      <div className="w-64 h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 text-emerald-700 dark:text-emerald-300 font-medium">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;
