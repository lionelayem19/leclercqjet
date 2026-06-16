"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
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
  const formattedNum = displayNum !== null
    ? displayNum >= 1000
      ? displayNum.toLocaleString("fr-FR")
      : String(displayNum)
    : null;

  return (
    <div ref={ref} className="text-center px-6 py-8">
      <div className="flex items-baseline justify-center leading-none mb-4" style={{ gap: "0" }}>
        {prefix && (
          <span className="font-serif" style={{ fontSize: "76px", color: "#FFFFFF", fontWeight: 600 }}>
            {prefix}
          </span>
        )}
        {formattedNum !== null ? (
          <>
            <span className="font-serif" style={{ fontSize: "76px", color: "#FFFFFF", fontWeight: 600 }}>
              {formattedNum}
            </span>
            {suffix && (
              <span className="font-serif" style={{ fontSize: "76px", color: "#C9A96E", fontWeight: 600 }}>
                {suffix}
              </span>
            )}
          </>
        ) : (
          <span className="font-serif" style={{ fontSize: "76px", color: "#FFFFFF", fontWeight: 600 }}>
            {value}
          </span>
        )}
      </div>
      <div className="mx-auto mb-4" style={{ width: "40px", height: "1px", backgroundColor: "#C9A96E" }} />
      <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#C0C8D4" }}>
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
      style={{
        backgroundColor: "#0A1628",
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ borderLeft: "1px solid rgba(201,169,110,0.15)", borderTop: "1px solid rgba(201,169,110,0.15)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ borderRight: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}
            >
              <AnimatedStat value={stat.value} label={stat.label} delay={i * 0.1} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
