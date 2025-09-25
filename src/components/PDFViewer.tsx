import React from 'react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose }) => {
  console.log('PDFViewer render - isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
      <div className="relative w-full max-w-4xl h-[95vh] sm:h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 sm:p-2 bg-white dark:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full shadow-lg z-10"
          aria-label="Close PDF viewer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="sm:w-6 sm:h-6"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Contenido principal */}
        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* Botón para abrir en nueva pestaña */}
          <div className="absolute top-4 left-4 z-20">
            <a
              href="/Nicolas-Paniagua-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Abrir CV
            </a>
          </div>
          
          {/* Botón de descarga */}
          <div className="absolute top-4 right-16 z-20">
            <a
              href="/Nicolas-Paniagua-CV.pdf"
              download="Nicolas-Paniagua-CV.pdf"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar
            </a>
          </div>
          
          {/* Vista previa del PDF usando object */}
          <div className="w-full h-full pt-16">
            <object
              data="/Nicolas-Paniagua-CV.pdf"
              type="application/pdf"
              className="w-full h-full"
              style={{ border: 'none' }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Tu navegador no puede mostrar el PDF directamente
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Usa los botones de arriba para abrir o descargar el CV
                  </p>
                </div>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
