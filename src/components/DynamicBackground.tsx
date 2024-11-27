import React, { useEffect, useRef } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hue = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (hue: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${hue}, 60%, 50%, 0.2)`);
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 60%, 50%, 0.2)`);
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 60%, 50%, 0.2)`);
      return gradient;
    };

    const animate = () => {
      hue = (hue + 0.1) % 360;
      ctx.fillStyle = createGradient(hue);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30 dark:opacity-10"
    />
  );
};

export default DynamicBackground;
