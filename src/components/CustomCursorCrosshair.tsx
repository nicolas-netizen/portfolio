import React, { useEffect, useState } from 'react';

const CustomCursorCrosshair = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Crosshair cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Center dot */}
        <div
          className={`w-2 h-2 theme-primary-bg rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200
            ${isPointer ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-50' : ''}`}
        />
        
        {/* Horizontal line */}
        <div
          className={`h-0.5 theme-primary-bg -translate-x-1/2 -translate-y-1/2 transition-all duration-200
            ${isPointer ? 'w-8' : 'w-6'}
            ${isClicking ? 'w-4' : ''}`}
        />
        
        {/* Vertical line */}
        <div
          className={`w-0.5 theme-primary-bg -translate-x-1/2 -translate-y-1/2 transition-all duration-200
            ${isPointer ? 'h-8' : 'h-6'}
            ${isClicking ? 'h-4' : ''}`}
        />
      </div>

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-12 h-12 border border-emerald-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500
            ${isPointer ? 'scale-150 border-emerald-500/60' : 'scale-100'}
            ${isClicking ? 'scale-75 border-emerald-500' : ''}`}
        />
      </div>

      {/* Glow effect */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-32 h-32 -translate-x-1/2 -translate-y-1/2 transition-all duration-700
            ${isPointer ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-xl" />
        </div>
      </div>
    </>
  );
};

export default CustomCursorCrosshair;
