"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LABELS: Record<string, { badge: string; title: string; desc: string }> = {
  fr: {
    badge: "CONCIERGERIE",
    title: "De votre domicile au tarmac.",
    desc: "Transfert privé, accueil FBO personnalisé, embarquement immédiat. Chaque détail est orchestré pour que votre seul effort soit de monter à bord.",
  },
  en: {
    badge: "CONCIERGE",
    title: "From your door to the tarmac.",
    desc: "Private transfer, personalised FBO welcome, immediate boarding. Every detail is orchestrated so your only effort is stepping on board.",
  },
  zh: {
    badge: "礼宾服务",
    title: "从您的家门到停机坪。",
    desc: "私人接送、个性化FBO迎宾、即刻登机。每一个细节都精心安排，让您唯一要做的就是登上飞机。",
  },
  ar: {
    badge: "الكونسيرج",
    title: "من منزلك إلى المدرج.",
    desc: "نقل خاص، استقبال شخصي في مبنى FBO، صعود فوري. كل التفاصيل منسّقة لك حتى لا يكون عليك سوى الصعود على متن الطائرة.",
  },
};

export default function AnimationJourney() {
  const { lang } = useLanguage();
  const label = LABELS[lang] || LABELS.fr;
  const [scope, animateEl] = useAnimate();
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    async function loop() {
      if (cancelled.current) return;

      // Reset positions
      await Promise.all([
        animateEl("#car", { x: 0, opacity: 0 }, { duration: 0 }),
        animateEl("#jet", { x: 0, y: 0, opacity: 0, rotate: 0 }, { duration: 0 }),
        animateEl("#trail", { scaleX: 0, opacity: 0 }, { duration: 0 }),
        animateEl("#fbo-glow", { opacity: 0 }, { duration: 0 }),
        animateEl("#house-light", { opacity: 0 }, { duration: 0 }),
      ]);

      if (cancelled.current) return;

      // House lights on
      await animateEl("#house-light", { opacity: 1 }, { duration: 0.6, ease: "easeIn" });
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled.current) return;

      // Car drives in
      await animateEl("#car", { opacity: 1 }, { duration: 0.3 });
      await animateEl("#car", { x: 160 }, { duration: 2.2, ease: [0.4, 0, 0.2, 1] });
      if (cancelled.current) return;

      // FBO glow
      await animateEl("#fbo-glow", { opacity: 1 }, { duration: 0.5 });
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled.current) return;

      // Car fades out at FBO
      await animateEl("#car", { opacity: 0 }, { duration: 0.4 });
      if (cancelled.current) return;

      // Jet appears on runway
      await animateEl("#jet", { opacity: 1 }, { duration: 0.4 });
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled.current) return;

      // Jet accelerates then takes off
      await animateEl(
        "#jet",
        { x: 220, y: -70, rotate: -12 },
        { duration: 2.0, ease: [0.2, 0, 0.8, 1] }
      );
      if (cancelled.current) return;

      // Trail appears during takeoff
      animateEl("#trail", { scaleX: 1, opacity: 0.7 }, { duration: 1.2, ease: "easeOut" });
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled.current) return;

      // Fade out
      await Promise.all([
        animateEl("#jet", { opacity: 0 }, { duration: 0.5 }),
        animateEl("#trail", { opacity: 0 }, { duration: 0.5 }),
        animateEl("#fbo-glow", { opacity: 0 }, { duration: 0.5 }),
        animateEl("#house-light", { opacity: 0 }, { duration: 0.5 }),
      ]);

      await new Promise((r) => setTimeout(r, 600));
      if (!cancelled.current) loop();
    }

    loop();
    return () => {
      cancelled.current = true;
    };
  }, [animateEl]);

  return (
    <section style={{ backgroundColor: "#0A1628", padding: "80px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="font-sans uppercase mb-4"
            style={{ fontSize: "11px", letterSpacing: "0.28em", color: "#C9A96E" }}
          >
            {label.badge}
          </p>
          <h2
            className="font-serif text-white mb-5"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.15 }}
          >
            {label.title}
          </h2>
          <p
            className="font-sans text-center mx-auto"
            style={{ fontSize: "15px", color: "rgba(232,237,242,0.6)", maxWidth: "540px", lineHeight: 1.85 }}
          >
            {label.desc}
          </p>
        </motion.div>

        {/* SVG Animation */}
        <div
          ref={scope}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "660px",
            margin: "0 auto",
            height: "200px",
          }}
        >
          <svg
            viewBox="0 0 660 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Ground line */}
            <line x1="0" y1="148" x2="660" y2="148" stroke="rgba(201,169,110,0.15)" strokeWidth="1" />

            {/* Road dashes */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x={60 + i * 70} y={154} width={36} height={2} rx={1} fill="rgba(201,169,110,0.1)" />
            ))}

            {/* House */}
            <g transform="translate(20, 98)">
              {/* Roof */}
              <polygon points="0,30 20,0 40,30" fill="#1A2A42" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
              {/* Body */}
              <rect x="4" y="30" width="32" height="20" fill="#1A2A42" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
              {/* Door */}
              <rect x="14" y="39" width="12" height="11" fill="#0A1628" />
              {/* Window */}
              <rect x="6" y="33" width="10" height="8" fill="#0A1628" />
              <rect id="house-light" x="6" y="33" width="10" height="8" fill="rgba(201,169,110,0.6)" style={{ opacity: 0 }} />
            </g>

            {/* FBO Terminal */}
            <g transform="translate(440, 88)">
              {/* Building */}
              <rect x="0" y="20" width="80" height="40" fill="#1A2A42" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
              {/* Roof line */}
              <rect x="0" y="18" width="80" height="4" fill="rgba(201,169,110,0.4)" />
              {/* Windows */}
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={8 + i * 18} y={28} width={10} height={8} rx={1} fill="#0A1628" />
              ))}
              {/* FBO label */}
              <text x="40" y="52" textAnchor="middle" fill="rgba(201,169,110,0.7)" fontSize="7" fontFamily="sans-serif" letterSpacing="2">FBO</text>
              {/* Glow */}
              <rect id="fbo-glow" x="0" y="18" width="80" height="44" fill="rgba(201,169,110,0.08)" style={{ opacity: 0 }} />
            </g>

            {/* Car */}
            <g id="car" transform="translate(55, 128)" style={{ opacity: 0 }}>
              {/* Body */}
              <rect x="0" y="6" width="44" height="12" rx="3" fill="#C9A96E" />
              {/* Cabin */}
              <rect x="8" y="0" width="28" height="8" rx="2" fill="#b8934a" />
              {/* Windows */}
              <rect x="10" y="1" width="10" height="6" rx="1" fill="rgba(10,22,40,0.6)" />
              <rect x="23" y="1" width="10" height="6" rx="1" fill="rgba(10,22,40,0.6)" />
              {/* Wheels */}
              <circle cx="10" cy="19" r="5" fill="#0A1628" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" />
              <circle cx="34" cy="19" r="5" fill="#0A1628" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" />
            </g>

            {/* Jet */}
            <g id="jet" transform="translate(440, 118)" style={{ opacity: 0 }}>
              {/* Fuselage */}
              <ellipse cx="28" cy="8" rx="28" ry="5" fill="#E8EDF2" />
              {/* Nose */}
              <ellipse cx="55" cy="8" rx="6" ry="3" fill="#E8EDF2" />
              {/* Tail fin */}
              <polygon points="0,8 0,0 12,8" fill="#C9A96E" />
              {/* Wings */}
              <polygon points="16,8 28,8 22,24" fill="rgba(232,237,242,0.85)" />
              <polygon points="18,8 30,8 24,-4" fill="rgba(232,237,242,0.85)" />
              {/* Engine */}
              <ellipse cx="20" cy="20" rx="7" ry="3" fill="#1A2A42" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
            </g>

            {/* Gold trail */}
            <line
              id="trail"
              x1="440" y1="126"
              x2="600" y2="70"
              stroke="url(#goldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transformOrigin: "440px 126px", transform: "scaleX(0)", opacity: 0 }}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Step labels */}
            <text x="40" y="178" textAnchor="middle" fill="rgba(201,169,110,0.4)" fontSize="8" fontFamily="sans-serif" letterSpacing="1">DOMICILE</text>
            <text x="480" y="178" textAnchor="middle" fill="rgba(201,169,110,0.4)" fontSize="8" fontFamily="sans-serif" letterSpacing="1">AÉROPORT</text>

            {/* Arrow connector */}
            <path d="M90 148 Q270 148 400 148" stroke="rgba(201,169,110,0.12)" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="400,145 408,148 400,151" fill="rgba(201,169,110,0.25)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
