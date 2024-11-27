import React, { useEffect, useState } from 'react';

const AdminStats = () => {
  const [showStats, setShowStats] = useState(false);
  const [analyticsUrl, setAnalyticsUrl] = useState('');

  useEffect(() => {
    // Verificar si estamos en la URL de administración
    const isAdminRoute = window.location.search.includes('admin=true');
    console.log('Admin route:', isAdminRoute); // Debug
    setShowStats(isAdminRoute);
    
    // Construir la URL de Vercel Analytics
    const projectId = 'project';
    const url = `https://vercel.com/nicolas-netizen/project/analytics`;
    console.log('Analytics URL:', url); // Debug
    setAnalyticsUrl(url);
  }, []);

  if (!showStats) {
    console.log('Stats hidden'); // Debug
    return null;
  }

  console.log('Rendering stats panel'); // Debug

  return (
    <div className="fixed top-20 right-4 bg-emerald-600 text-white p-6 rounded-lg shadow-xl z-[9999] min-w-[200px]">
      <h3 className="text-xl font-bold mb-4">Panel de Administración</h3>
      <div className="space-y-2">
        <a 
          href={analyticsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-white text-emerald-600 py-2 px-4 rounded-md hover:bg-emerald-50 transition-colors font-semibold"
        >
          Ver Estadísticas 📊
        </a>
      </div>
    </div>
  );
};

export default AdminStats;
