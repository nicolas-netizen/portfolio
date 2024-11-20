import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
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
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className={`w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200
            ${isPointer ? 'scale-150 mix-blend-difference' : 'scale-100'}
            ${isClicking ? 'scale-75' : ''}`}
        />
      </div>
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div className="w-64 h-64 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl scale-50 animate-pulse" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
