import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
}

interface FireworksCanvasProps {
  isActive: boolean;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Trigger canvas-confetti bursts
    const fireConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f472b6', '#fde68a', '#e879f9', '#ffffff', '#fb7185'],
      });
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#f59e0b'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#f59e0b'],
      });
    };

    fireConfetti();
    const confettiTimer1 = setTimeout(fireConfetti, 800);
    const confettiTimer2 = setTimeout(fireConfetti, 1800);
    const confettiTimer3 = setTimeout(fireConfetti, 3200);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let animationFrameId: number;

    const colors = [
      '#f43f5e', // bright rose
      '#fb7185', // coral pink
      '#f472b6', // soft blossom
      '#fde047', // warm gold
      '#e879f9', // soft lavender
      '#38bdf8', // crystal blue
      '#ffffff', // diamond white
    ];

    const launchRocket = (startX?: number, targetH?: number) => {
      const x = startX ?? width * 0.2 + Math.random() * width * 0.6;
      const targetY = targetH ?? height * 0.15 + Math.random() * height * 0.35;
      const vy = -11 - Math.random() * 4;
      const vx = (Math.random() - 0.5) * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      rockets.push({
        x,
        y: height,
        targetY,
        vx,
        vy,
        color,
        exploded: false,
      });
    };

    const explode = (x: number, y: number, color: string) => {
      romanticAudio.playFireworksExplosion();
      const count = 70 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 6.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.3 ? color : '#fef08a',
          size: 2 + Math.random() * 2.5,
          decay: 0.012 + Math.random() * 0.012,
          trail: [],
        });
      }
    };

    // Initial rockets salvo
    launchRocket(width * 0.3, height * 0.25);
    setTimeout(() => launchRocket(width * 0.7, height * 0.2), 300);
    setTimeout(() => launchRocket(width * 0.5, height * 0.18), 600);

    // Continuous salvo while active
    const rocketInterval = setInterval(() => {
      launchRocket();
      if (Math.random() > 0.5) {
        setTimeout(launchRocket, 250);
      }
    }, 1200);

    const render = () => {
      // Semi-transparent clear to leave gentle luminous trails
      ctx.fillStyle = 'rgba(18, 10, 19, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (r.y <= r.targetY || r.vy >= -1) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 4) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.98; // air resistance
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.6;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        // Draw particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(rocketInterval);
      clearTimeout(confettiTimer1);
      clearTimeout(confettiTimer2);
      clearTimeout(confettiTimer3);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-full h-full"
    />
  );
};
