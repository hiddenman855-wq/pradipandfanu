import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  delta: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  isHeart?: boolean;
}

interface TouchRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const ripplesRef = useRef<TouchRipple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Petals
    const petalColors = [
      'rgba(251, 207, 232, 0.75)', // Rose quartz
      'rgba(244, 114, 182, 0.65)', // Soft rose
      'rgba(253, 164, 175, 0.70)', // Light coral blush
      'rgba(249, 168, 212, 0.60)', // Pastel magenta
      'rgba(254, 243, 199, 0.55)', // Warm champagne gold
    ];

    const petals: Petal[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 9 + Math.random() * 12,
      speedY: 0.6 + Math.random() * 0.9,
      speedX: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.4 + Math.random() * 0.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Initialize Stars
    const stars: Star[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.5,
      alpha: Math.random(),
      delta: 0.008 + Math.random() * 0.015,
    }));

    // Tap & Click Interactive Effect (Hearts & Fairy Sparks from user finger)
    const handleTapClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('changedTouches' in e && (e as TouchEvent).changedTouches.length > 0) {
        clientX = (e as TouchEvent).changedTouches[0].clientX;
        clientY = (e as TouchEvent).changedTouches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (clientX === 0 && clientY === 0) return;

      // Subtle mobile haptic feedback on screen tap
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(18);
      }

      // Add ripple on touch/click
      ripplesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 4,
        maxRadius: 48,
        alpha: 0.9,
        color: 'rgba(251, 113, 133, 0.75)',
      });

      // Spawn burst of 8 floating hearts and golden stars on click/touch
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.4;
        const speed = 2.0 + Math.random() * 3.5;
        sparklesRef.current.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          alpha: 1,
          size: 6 + Math.random() * 5,
          color: i % 2 === 0 ? '#f43f5e' : '#fde047',
          isHeart: i % 2 === 0,
        });
      }
      if (sparklesRef.current.length > 70) {
        sparklesRef.current.splice(0, 15);
      }
    };

    // Touch / Pointer hover fairy sparkle interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Add 1 subtle sparkle particle on move
      sparklesRef.current.push({
        x: clientX + (Math.random() - 0.5) * 12,
        y: clientY + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.0,
        vy: -0.5 - Math.random() * 1.0,
        alpha: 1,
        size: 2.5 + Math.random() * 2,
        color: Math.random() > 0.4 ? '#fbcfe8' : '#fde68a',
        isHeart: false,
      });

      if (sparklesRef.current.length > 60) {
        sparklesRef.current.shift();
      }
    };

    window.addEventListener('click', handleTapClick);
    window.addEventListener('pointerdown', handleTapClick, { passive: true });
    window.addEventListener('touchstart', handleTapClick, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Draw single petal curve
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    // Draw mini floating heart on canvas
    const drawMiniHeart = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.1);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      stars.forEach((s) => {
        s.alpha += s.delta;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.delta = -s.delta;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 245, ${s.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(251, 207, 232, 0.8)';
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Render floating petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      });

      // Render user interactive touch ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i];
        rp.radius += 1.6;
        rp.alpha -= 0.035;

        if (rp.alpha <= 0 || rp.radius >= rp.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color;
        ctx.globalAlpha = Math.max(0, rp.alpha);
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Render user interactive tap & hover sparkles
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const sp = sparklesRef.current[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.025;

        if (sp.alpha <= 0) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        if (sp.isHeart) {
          drawMiniHeart(sp.x, sp.y, sp.size, sp.color, sp.alpha);
        } else {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.alpha);
          ctx.shadowBlur = 6;
          ctx.shadowColor = sp.color;
          ctx.fill();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleTapClick);
      window.removeEventListener('pointerdown', handleTapClick);
      window.removeEventListener('touchstart', handleTapClick);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <>
      {/* Deep Romantic Ambient Background Layers */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #2a1127 0%, #170919 45%, #0e0510 100%)',
        }}
      >
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f472b6, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c084fc, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        />
      </div>

      {/* Interactive Petals, Stars & Tap Hearts Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-1 w-full h-full"
      />
    </>
  );
};
