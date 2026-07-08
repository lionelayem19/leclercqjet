"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const SERIF = "var(--font-cormorant), Georgia, serif";
const GOLD = "#C9A96E";
const NAVY = "#0A1628";

type Step = { num: string; title: string; desc: string };

type Content = {
  eyebrow: string;
  title: string;
  intro: string;
  globeTitle: string;
  globeSubtitle: string;
  steps: Step[];
};

const CONTENT: Partial<Record<Lang, Content>> = {
  fr: {
    eyebrow: "L'Expérience Leclercq'Jet",
    title: "Un voyage sans couture, du départ à l'arrivée.",
    intro:
      "Service chauffeur premium 100% électrique, à l'aller comme au retour. De votre domicile à votre destination finale, nos équipes vous accompagnent sans rupture, tout au long du parcours.",
    globeTitle: "Voler avec du Sens",
    globeSubtitle: "S'élever ensemble, pour élever les autres.",
    steps: [
      { num: "01", title: "Chauffeur privé", desc: "Pris en charge à domicile" },
      { num: "02", title: "Embarquement", desc: "Accès direct au tarmac" },
      { num: "03", title: "À bord", desc: "Gastronomie & confort" },
      { num: "04", title: "À destination", desc: "Conciergerie sur place" },
      { num: "05", title: "Second chauffeur", desc: "Jusqu'à votre porte" },
    ],
  },
  en: {
    eyebrow: "The Leclercq'Jet Experience",
    title: "A seamless journey, from departure to arrival.",
    intro:
      "Premium all-electric chauffeur service, outbound and return alike. From your home to your final destination, our teams accompany you without a break, all along the way.",
    globeTitle: "Flying with Purpose",
    globeSubtitle: "Rising together, to lift others.",
    steps: [
      { num: "01", title: "Private chauffeur", desc: "Picked up at home" },
      { num: "02", title: "Boarding", desc: "Direct tarmac access" },
      { num: "03", title: "On board", desc: "Gastronomy & comfort" },
      { num: "04", title: "At destination", desc: "Concierge on site" },
      { num: "05", title: "Second chauffeur", desc: "All the way to your door" },
    ],
  },
};

// Evenly spread the steps around the globe, first node at the top (−90°).
const RADIUS = 40; // percent of the orbit box, measured from its centre
function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

/* Fine gold wireframe globe — pure SVG, spun slowly by CSS @keyframes. */
function Globe({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="exp-globe">
      <svg
        className="exp-globe__grid"
        viewBox="0 0 200 200"
        aria-hidden="true"
        fill="none"
        stroke={GOLD}
      >
        {/* limb */}
        <circle cx="100" cy="100" r="96" strokeWidth="0.8" opacity="0.85" />
        {/* meridians — vertical ellipses of decreasing width */}
        <ellipse cx="100" cy="100" rx="64" ry="96" strokeWidth="0.6" opacity="0.5" />
        <ellipse cx="100" cy="100" rx="32" ry="96" strokeWidth="0.6" opacity="0.5" />
        <line x1="100" y1="4" x2="100" y2="196" strokeWidth="0.6" opacity="0.5" />
        {/* parallels — horizontal ellipses of decreasing height */}
        <ellipse cx="100" cy="100" rx="96" ry="64" strokeWidth="0.6" opacity="0.5" />
        <ellipse cx="100" cy="100" rx="96" ry="32" strokeWidth="0.6" opacity="0.5" />
        <line x1="4" y1="100" x2="196" y2="100" strokeWidth="0.6" opacity="0.5" />
      </svg>

      <div className="exp-globe__inner">
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(22px, 2.6vw, 32px)",
            fontWeight: 600,
            color: "#F5F0E8",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>
        <p
          className="font-sans"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.2vw, 15px)",
            color: GOLD,
            lineHeight: 1.5,
            maxWidth: "16em",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] ?? CONTENT.fr!;

  // Reveal the steps sequentially only once the orbit scrolls into view.
  const orbitRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label={c.eyebrow}
      className="texture-grain"
      style={{ backgroundColor: NAVY, padding: "110px 0" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px", paddingLeft: "8%", paddingRight: "8%" }}>
        {/* Header — centred */}
        <div className="text-center" style={{ marginBottom: "72px" }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: "20px" }}>
            <span style={{ width: "28px", height: "1px", backgroundColor: GOLD }} />
            <span className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.35em", color: GOLD }}>
              {c.eyebrow}
            </span>
            <span style={{ width: "28px", height: "1px", backgroundColor: GOLD }} />
          </div>
          <h2
            className="title-gold section-title"
            style={{
              fontFamily: SERIF,
              color: "#F5F0E8",
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              margin: "0 auto",
              maxWidth: "760px",
            }}
          >
            {c.title}
          </h2>
        </div>

        {/* Circular journey around a central globe */}
        <div ref={orbitRef} className={`exp-orbit${inView ? " is-visible" : ""}`}>
          {/* Dotted gold connectors from the globe to each step */}
          <svg className="exp-orbit__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {c.steps.map((step, i) => {
              const p = nodePosition(i, c.steps.length);
              return (
                <line
                  key={step.num}
                  className="exp-orbit__line"
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke={GOLD}
                  strokeWidth="0.3"
                  strokeDasharray="1.2 1.4"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              );
            })}
          </svg>

          <Globe title={c.globeTitle} subtitle={c.globeSubtitle} />

          {c.steps.map((step, i) => {
            const p = nodePosition(i, c.steps.length);
            return (
              <div
                key={step.num}
                className="exp-node"
                style={{ ["--node-x" as string]: `${p.x}%`, ["--node-y" as string]: `${p.y}%` }}
              >
                <div className="exp-node__inner" style={{ animationDelay: `${0.2 + i * 0.14}s` }}>
                  <span className="exp-node__num" style={{ color: GOLD, borderColor: "rgba(201,169,110,0.85)" }}>
                    {step.num}
                  </span>
                  <h4
                    style={{
                      fontFamily: SERIF,
                      fontSize: "23px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      lineHeight: 1.18,
                      letterSpacing: "0.01em",
                      margin: "14px 0 6px",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p className="font-sans" style={{ fontSize: "14px", color: "#e5e7eb", lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
