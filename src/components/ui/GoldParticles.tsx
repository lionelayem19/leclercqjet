"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseA: number;
  tw: number;
  phase: number;
};

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // One soft golden sprite, reused for every particle (cheap to draw).
    const sprite = document.createElement("canvas");
    const SS = 32;
    sprite.width = SS;
    sprite.height = SS;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(SS / 2, SS / 2, 0, SS / 2, SS / 2, SS / 2);
      g.addColorStop(0, "rgba(201,169,110,1)");
      g.addColorStop(1, "rgba(201,169,110,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SS, SS);
    }

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(8, Math.round(width / 26));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.6,
        vx: (Math.random() - 0.5) * 0.06,
        vy: -(Math.random() * 0.12 + 0.03), // slow upward drift
        baseA: Math.random() * 0.3 + 0.12,
        tw: Math.random() * 0.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01 * p.tw;
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        else if (p.x > width + 5) p.x = -5;

        const alpha = p.baseA * (0.55 + 0.45 * Math.sin(p.phase));
        const size = p.r * 6;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    init();
    raf = requestAnimationFrame(draw);

    const onResize = () => init();
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: "screen" }}
    />
  );
}
