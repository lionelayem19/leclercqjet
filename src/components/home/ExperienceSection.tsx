"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const SERIF = "var(--font-cormorant), Georgia, serif";
const GOLD = "#C9A96E";
const NAVY = "#0A1628";

type Scene = { num: string; title: string; desc: string; img: string };

const SCENES: Scene[] = [
  { num: "01", title: "Le Chauffeur Privé", desc: "Votre véhicule de prestige vous attend à domicile.", img: "/images/chauffeur.webp" },
  { num: "02", title: "L'Embarquement Exclusif", desc: "Accès direct au tarmac, sans file d'attente.", img: "/images/voiture-jet.png" },
  { num: "03", title: "À Bord", desc: "Champagne, gastronomie et confort absolu à 12 000 mètres.", img: "/images/cabine.png" },
  { num: "04", title: "Au-Dessus des Nuages", desc: "Le monde vu depuis votre salon privé.", img: "/images/acquisition.png" },
  { num: "05", title: "À Destination", desc: "Notre conciergerie vous attend pour la suite du voyage.", img: "/images/salon-vip.webp" },
];

const TOTAL = SCENES.length;

function SceneSlide({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  // Each scene is "centered" at this progress value.
  const center = index / (TOTAL - 1);
  const half = 1 / (TOTAL - 1);

  // Framer accelerates scroll-linked opacity/transform values onto a WAAPI
  // ScrollTimeline, where the input range becomes the keyframe `offset` array.
  // WAAPI rejects offsets outside [0, 1] ("Offsets must be monotonically
  // non-decreasing"), so clamp the edges. The clamped-away regions sit at
  // progress < 0 / > 1 — unreachable by scroll — so visuals are unchanged.
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

  // Caption fades in as the scene reaches centre, parallax-drifts as it leaves.
  const opacity = useTransform(progress, [clamp01(center - half * 0.7), center, clamp01(center + half * 0.7)], [0, 1, 0]);
  const textX = useTransform(progress, [clamp01(center - half), center, clamp01(center + half)], [80, 0, -80]);
  // Slow Ken-Burns + counter-parallax on the background image for depth.
  const imgX = useTransform(progress, [clamp01(center - half), center, clamp01(center + half)], ["6%", "0%", "-6%"]);
  const imgScale = useTransform(progress, [clamp01(center - half), center, clamp01(center + half)], [1.18, 1.08, 1.18]);

  return (
    <div className="relative shrink-0 h-full overflow-hidden" style={{ width: "100vw" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={scene.img}
        alt={scene.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        style={{ x: imgX, scale: imgScale, willChange: "transform" }}
      />
      {/* Cinematic navy wash — heavier on the left for caption legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,16,30,0.9) 0%, rgba(8,16,30,0.55) 42%, rgba(8,16,30,0.25) 75%, rgba(8,16,30,0.4) 100%)",
        }}
      />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 220px rgba(3,8,16,0.7)" }} />

      {/* Caption */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center"
        style={{ opacity, x: textX, paddingLeft: "8%", paddingRight: "8%", maxWidth: "820px" }}
      >
        <span
          className="font-serif"
          style={{ fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", color: GOLD, lineHeight: 1, marginBottom: "18px" }}
        >
          {scene.num}
        </span>
        <div style={{ width: "60px", height: "1px", backgroundColor: GOLD, opacity: 0.6, marginBottom: "24px" }} />
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(38px, 6vw, 82px)",
            fontWeight: 600,
            color: "#F5F0E8",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            marginBottom: "20px",
          }}
        >
          {scene.title}
        </h3>
        <p
          className="font-sans"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: "440px" }}
        >
          {scene.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Drive the horizontal track from the vertical scroll within the pinned section.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(TOTAL - 1) * 100}vw`]);
  const barScaleX = useTransform(scrollYProgress, [0, 1], [1 / TOTAL, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1))));
    setActive(idx);
  });

  // ── Accessible fallback: a simple stacked layout, no scroll-hijacking ──
  if (prefersReducedMotion) {
    return (
      <section style={{ backgroundColor: NAVY }} aria-label="L'Expérience Leclercq'Jet">
        {SCENES.map((scene) => (
          <div key={scene.num} className="relative overflow-hidden" style={{ height: "70vh", minHeight: "440px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={scene.img} alt={scene.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,16,30,0.9) 0%, rgba(8,16,30,0.4) 100%)" }} />
            <div className="relative z-10 h-full flex flex-col justify-center" style={{ paddingLeft: "8%", paddingRight: "8%", maxWidth: "820px" }}>
              <span className="font-serif" style={{ fontStyle: "italic", fontSize: "48px", color: GOLD, marginBottom: "16px" }}>{scene.num}</span>
              <h3 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 64px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.05, marginBottom: "16px" }}>{scene.title}</h3>
              <p className="font-sans" style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: "440px" }}>{scene.desc}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={targetRef}
      aria-label="L'Expérience Leclercq'Jet"
      style={{ height: `${TOTAL * 100}vh`, backgroundColor: NAVY }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontal film strip */}
        <motion.div className="flex h-full" style={{ x, width: `${TOTAL * 100}vw` }}>
          {SCENES.map((scene, i) => (
            <SceneSlide key={scene.num} scene={scene} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Persistent section label */}
        <div
          className="absolute left-0 right-0 z-20 pointer-events-none flex items-center gap-3"
          style={{ top: "104px", paddingLeft: "8%", paddingRight: "8%" }}
        >
          <span style={{ width: "28px", height: "1px", backgroundColor: GOLD }} />
          <span className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.35em", color: GOLD }}>
            L&apos;Expérience Leclercq&apos;Jet
          </span>
        </div>

        {/* Bottom progress + counter */}
        <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ bottom: "40px", paddingLeft: "8%", paddingRight: "8%" }}>
          <div className="flex items-end justify-between" style={{ marginBottom: "16px" }}>
            <span className="font-serif" style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em" }}>
              <span style={{ color: GOLD }}>0{active + 1}</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}> / 0{TOTAL}</span>
            </span>
            <span className="font-sans uppercase hidden md:block" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
              Défilez pour découvrir
            </span>
          </div>
          <div style={{ position: "relative", height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }}>
            <motion.div
              style={{ position: "absolute", inset: 0, backgroundColor: GOLD, scaleX: barScaleX, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
