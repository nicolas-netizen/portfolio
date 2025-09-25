import React, { useEffect, useState } from 'react';

const CustomCursorMinimal = () => {
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
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className={`w-2 h-2 theme-primary-bg rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200
            ${isPointer ? 'scale-200' : 'scale-100'}
            ${isClicking ? 'scale-50' : ''}`}
        />
      </div>

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.2s ease-out'
        }}
      >
        <div
          className={`w-8 h-8 border border-emerald-500/40 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300
            ${isPointer ? 'scale-150 border-emerald-500/80' : 'scale-100'}
            ${isClicking ? 'scale-75 border-emerald-500' : ''}`}
        />
      </div>
    </>
  );
};

export default CustomCursorMinimal;
