import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 0.5;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
}

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotionQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        fill: isDark ? 'rgba(52, 211, 153, 0.35)' : 'rgba(5, 150, 105, 0.35)',
        stroke: isDark ? 'rgba(52, 211, 153, 0.12)' : 'rgba(5, 150, 105, 0.12)'
      };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const densityDivisor = window.innerWidth >= 1024 ? 14000 : 20000;
      const particleCount = Math.min(
        120,
        Math.floor((canvas.width * canvas.height) / densityDivisor)
      );

      particlesRef.current = Array.from({ length: particleCount }, () =>
        new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const { fill, stroke } = getThemeColors();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update(canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.globalAlpha = 1 - distance / 120;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        const dxMouse = particle.x - mousePos.current.x;
        const dyMouse = particle.y - mousePos.current.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < 150) {
          ctx.globalAlpha = 1 - distanceMouse / 150;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.stroke();

          particle.vx += dxMouse * 0.0001;
          particle.vy += dyMouse * 0.0001;
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleNetwork;
