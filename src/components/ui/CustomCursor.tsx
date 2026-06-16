"use client";

import { useEffect, useRef } from "react";

const SMOKE_COUNT = 24; // pool of reusable puffs
const SPAWN_DIST = 6; // px of travel between puffs → density independent of speed

type Puff = {
  x: number;
  y: number;
  age: number;
  ttl: number;
  scaleFrom: number;
  scaleTo: number;
  opacity: number;
  driftX: number;
  driftY: number;
  active: boolean;
};

export default function CustomCursor() {
  const planeRef = useRef<HTMLDivElement>(null);
  const smokeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only on devices with a precise pointer, and when motion is welcome.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const plane = planeRef.current;
    if (!plane) return;

    document.documentElement.classList.add("cursor-hidden");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let angle = 0; // SVG plane points east by default
    let visible = false;
    let raf = 0;

    // Smoke / condensation trail — a fixed pool, written to directly each frame.
    const puffs: Puff[] = Array.from({ length: SMOKE_COUNT }, () => ({
      x: 0, y: 0, age: 0, ttl: 0, scaleFrom: 0, scaleTo: 0, opacity: 0, driftX: 0, driftY: 0, active: false,
    }));
    let spawnIndex = 0;
    let distAcc = 0;
    let lastTime = performance.now();

    const spawnPuff = (x: number, y: number) => {
      const p = puffs[spawnIndex];
      spawnIndex = (spawnIndex + 1) % SMOKE_COUNT;
      p.x = x + (Math.random() - 0.5) * 4;
      p.y = y + (Math.random() - 0.5) * 4;
      p.age = 0;
      p.ttl = 650 + Math.random() * 400;
      p.scaleFrom = 0.5 + Math.random() * 0.25;
      p.scaleTo = 1.6 + Math.random() * 0.7;
      p.opacity = 0.6 + Math.random() * 0.35;
      p.driftX = (Math.random() - 0.5) * 0.25;
      p.driftY = -0.1 - Math.random() * 0.2; // gentle rise, like dissipating vapour
      p.active = true;
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        plane.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      plane.style.opacity = "0";
      // Existing puffs keep fading out naturally.
    };

    const render = (now: number) => {
      const dt = Math.min(now - lastTime, 50); // clamp after tab refocus
      lastTime = now;

      const prevX = pos.x;
      const prevY = pos.y;
      // Smooth glide toward the pointer.
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;

      const dx = pos.x - prevX;
      const dy = pos.y - prevY;
      const speed = Math.hypot(dx, dy);
      if (speed > 0.5) {
        // Orient the nose along the travel direction (shortest-path rotation).
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        let diff = targetAngle - angle;
        diff = ((diff + 180) % 360) - 180;
        angle += diff * 0.25;
      }

      plane.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${angle}deg)`;

      // Emit puffs from just behind the plane, spaced by distance travelled.
      if (visible) {
        let ux = 0;
        let uy = 0;
        if (speed > 0.5) {
          ux = dx / speed;
          uy = dy / speed;
        }
        distAcc += speed;
        let guard = 0;
        while (distAcc >= SPAWN_DIST && guard < SMOKE_COUNT) {
          distAcc -= SPAWN_DIST;
          spawnPuff(pos.x - ux * 12, pos.y - uy * 12);
          guard++;
        }
      }

      // Age, drift and fade every active puff.
      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        const node = smokeRefs.current[i];
        if (!node) continue;
        if (!p.active) {
          if (node.style.opacity !== "0") node.style.opacity = "0";
          continue;
        }
        p.age += dt;
        if (p.age >= p.ttl) {
          p.active = false;
          node.style.opacity = "0";
          continue;
        }
        const t = p.age / p.ttl;
        p.x += p.driftX;
        p.y += p.driftY;
        const scale = p.scaleFrom + (p.scaleTo - p.scaleFrom) * t;
        node.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${scale})`;
        // Hold visible, then fade out near the end of life (gentle ease-out).
        node.style.opacity = String(p.opacity * Math.pow(1 - t, 0.7));
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <div className="hidden lg:block" aria-hidden="true">
      {/* Condensation trail — soft dark-gold puffs that appear and fade in the wake */}
      {Array.from({ length: SMOKE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            smokeRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 pointer-events-none"
          style={{
            zIndex: 9997,
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,220,220,0.6) 0%, rgba(220,220,220,0.42) 40%, rgba(220,220,220,0) 75%)",
            opacity: 0,
            filter: "blur(0.5px)",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Golden airplane */}
      <div
        ref={planeRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          opacity: 0,
          filter: "drop-shadow(0 0 6px rgba(232,240,255,0.65))",
          willChange: "transform, opacity",
          transition: "opacity 0.25s ease",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#E8F0FF">
          <path d="M22 12 L3 4 L9 12 L3 20 Z" />
        </svg>
      </div>
    </div>
  );
}
