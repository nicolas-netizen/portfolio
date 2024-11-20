import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-2 bg-white dark:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full shadow-lg"
          aria-label="Close PDF viewer"
        >
          <X size={24} />
        </button>
        <iframe
          src={pdfUrl}
          className="w-full h-full rounded-lg"
          title="CV PDF"
        >
          <p>
            Tu navegador no puede mostrar el PDF directamente.{' '}
            <a
              href={pdfUrl}
              download
              className="text-emerald-600 hover:text-emerald-500"
            >
              Haz clic aquí para descargarlo
            </a>
          </p>
        </iframe>
      </div>
    </div>
  );
};

export default PDFViewer;
