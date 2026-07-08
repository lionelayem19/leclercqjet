"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function parseStatValue(value: string): { num: number | null; suffix: string; prefix: string } {
  const clean = value.replace(/\s/g, "");
  const match = clean.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { num: null, suffix: value, prefix: "" };
  return {
    prefix: match[1] || "",
    num: parseFloat(match[2]),
    suffix: match[3] || "",
  };
}

// Icônes dorées fines (outline), style cohérent — 40px, stroke léger.
function GlobeIcon() {
  return (
    <svg
      className="stat-icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.7 2.4 4 5.6 4 9s-1.3 6.6-4 9c-2.7-2.4-4-5.6-4-9s1.3-6.6 4-9z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="stat-icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.4 2" />
    </svg>
  );
}

const STAT_ICONS = [GlobeIcon, ClockIcon];

function AnimatedStat({
  value,
  label,
  delay,
  Icon,
}: {
  value: string;
  label: string;
  delay: number;
  Icon: () => React.ReactElement;
}) {
  const { num, suffix, prefix } = parseStatValue(value);
  const [displayed, setDisplayed] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered || num === null) return;
    const startTime = performance.now() + delay * 1000;
    const duration = 1800;

    const tick = (now: number) => {
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * num));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, num, delay]);

  const displayNum = num !== null ? (triggered ? displayed : 0) : null;
  const formattedNum =
    displayNum !== null
      ? displayNum >= 1000
        ? displayNum.toLocaleString("fr-FR")
        : String(displayNum)
      : null;

  const numStyle = { fontSize: "76px", color: "#FFFFFF", fontWeight: 600 } as const;
  const goldStyle = { fontSize: "76px", color: "#C9A96E", fontWeight: 600 } as const;

  return (
    <div ref={ref} className="stat-card">
      <Icon />
      <div className="stat-number font-serif mb-1">
        {prefix && (
          <span className="font-serif" style={numStyle}>
            {prefix}
          </span>
        )}
        {formattedNum !== null ? (
          <>
            <span className="font-serif" style={numStyle}>
              {formattedNum}
            </span>
            {suffix && (
              <span className="font-serif" style={goldStyle}>
                {suffix}
              </span>
            )}
          </>
        ) : (
          <span className="font-serif" style={numStyle}>
            {value}
          </span>
        )}
      </div>
      <div className="stat-underline" />
      <p
        className="font-sans uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#C0C8D4" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { t } = useLanguage();
  const stats = t.home.stats;

  return (
    <section
      className="texture-grain section-pad"
      style={{
        backgroundColor: "#0A1628",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <p className="stats-tagline font-serif text-center">{t.home.statsTagline}</p>
        <div className="stats-cards">
          <AnimatedStat
            value={stats[0].value}
            label={stats[0].label}
            delay={0}
            Icon={STAT_ICONS[0]}
          />
          <div className="stats-divider" aria-hidden="true" />
          <AnimatedStat
            value={stats[1].value}
            label={stats[1].label}
            delay={0.1}
            Icon={STAT_ICONS[1]}
          />
        </div>
      </div>
    </section>
  );
}
