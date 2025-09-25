import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[data-cursor="pointer"]') !== null;
      
      setIsPointer(isClickable);
      setIsHovering(isClickable);
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
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className={`w-3 h-3 theme-primary-bg rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300
            ${isPointer ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-50' : ''}
            ${isHovering ? 'bg-emerald-400' : ''}`}
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
          className={`w-12 h-12 border-2 border-emerald-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500
            ${isPointer ? 'scale-200 border-emerald-500/60' : 'scale-100'}
            ${isClicking ? 'scale-75 border-emerald-500' : ''}
            ${isHovering ? 'border-emerald-400/80' : ''}`}
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
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      {/* Trailing effect */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-6 h-6 theme-primary-bg/20 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-1000
            ${isPointer ? 'scale-300' : 'scale-100'}
            ${isClicking ? 'scale-150' : ''}`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
