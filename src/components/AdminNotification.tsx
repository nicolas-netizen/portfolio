import React, { useEffect, useState } from 'react';

const AdminNotification = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isAdmin = window.location.search.includes('admin=true');
    if (isAdmin) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg z-[9999] animate-bounce">
      Modo Administrador Activado 🔓
    </div>
  );
};

export default AdminNotification;
