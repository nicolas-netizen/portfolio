import React, { useEffect, useState } from 'react';

const CustomCursorCreative = () => {
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
        target.closest('a') !== null;
      
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
          className={`w-4 h-4 theme-primary-bg rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300
            ${isPointer ? 'scale-125' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}
            ${isHovering ? 'bg-emerald-400' : ''}`}
        />
      </div>

      {/* Animated ring */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-16 h-16 border-2 border-emerald-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500
            ${isPointer ? 'scale-150 border-emerald-500/60' : 'scale-100'}
            ${isClicking ? 'scale-75 border-emerald-500' : ''}
            ${isHovering ? 'border-emerald-400/80' : ''}`}
        />
      </div>

      {/* Pulsing effect */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-24 h-24 -translate-x-1/2 -translate-y-1/2 transition-all duration-600
            ${isPointer ? 'scale-125' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}`}
        >
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping" />
        </div>
      </div>

      {/* Glow trail */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`w-40 h-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-800
            ${isPointer ? 'scale-150' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-2xl" />
        </div>
      </div>
    </>
  );
};

export default CustomCursorCreative;
