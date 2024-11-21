import React, { useEffect, useState } from 'react';

const AdminStats = () => {
  const [showStats, setShowStats] = useState(false);
  const [analyticsUrl, setAnalyticsUrl] = useState('');

  useEffect(() => {
    // Verificar si estamos en la URL de administración
    const isAdminRoute = window.location.search.includes('admin=true');
    setShowStats(isAdminRoute);
    
    // Construir la URL de Vercel Analytics
    const projectId = 'project'; // Project ID correcto
    setAnalyticsUrl(`https://vercel.com/nicolas-netizen/project/analytics`);
  }, []);

  if (!showStats) return null;

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
      <h3 className="text-lg font-semibold mb-2">Estadísticas de Visitas</h3>
      <a 
        href={analyticsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 hover:text-emerald-700 underline"
      >
        Ver Estadísticas Completas
      </a>
    </div>
  );
};

export default AdminStats;
