import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Close PDF viewer"
        >
          <X size={24} />
        </button>
        <iframe
          src={pdfUrl}
          className="w-full h-full rounded-lg"
          title="CV PDF Viewer"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
