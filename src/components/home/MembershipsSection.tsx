"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

function CheckIcon({ color = "#C9A96E" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const POPULAR: Record<string, string> = {
  fr: "LE PLUS POPULAIRE", en: "MOST POPULAR", zh: "最受欢迎", ar: "الأكثر شعبية",
};

// Couleurs d'identité par formule : Aube (champagne), Azur (bleu), Astre (or intense)
const PLAN_ACCENTS = [
  { accent: "#E8C4A0", soft: "rgba(232,196,160,0.5)", glow: "" },
  { accent: "#4FA3D9", soft: "rgba(79,163,217,0.55)", glow: "" },
  { accent: "#D4A845", soft: "rgba(212,168,69,0.5)", glow: "0 0 30px rgba(212,168,69,0.16)" },
];

export default function MembershipsSection() {
  const { t, lang } = useLanguage();
  const { openWaitlist } = useModal();
  const mb = t.home.memberships;

  const getCardStyle = (index: number, isPopular?: boolean): React.CSSProperties => {
    const acc = PLAN_ACCENTS[index] ?? PLAN_ACCENTS[0];
    const base: React.CSSProperties = index === 2
      ? { background: "linear-gradient(135deg, #0D1E35, #060E1A)" }
      : { backgroundColor: "#0D1E35" };
    return {
      ...base,
      border: isPopular ? `2px solid ${acc.accent}` : `1px solid ${acc.soft}`,
      boxShadow: acc.glow || undefined,
      ["--accent" as string]: acc.accent,
    } as React.CSSProperties;
  };

  const getCtaStyle = (index: number, isPopular?: boolean): React.CSSProperties => {
    if (isPopular) {
      return { backgroundColor: "#C9A96E", color: "#0A1628", border: "none" };
    }
    if (index === 2) {
      return { backgroundColor: "transparent", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.4)" };
    }
    return { backgroundColor: "transparent", color: "rgba(201,169,110,0.6)", border: "1px solid rgba(201,169,110,0.3)" };
  };

  return (
    <section
      style={{
        backgroundColor: "#0A1628",
        paddingTop: "clamp(52px, 9vw, 100px)",
        paddingBottom: "clamp(52px, 9vw, 100px)",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {mb.badge}
          </p>
          <h2 className="section-title font-serif" style={{ color: "#f8f5f0" }}>
            {mb.title} <span className="italic" style={{ color: "#E8C77E" }}>{mb.titleItalic}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mb.plans.map((plan, i) => {
            const isPopular = plan.popular;
            const cardStyle = getCardStyle(i, isPopular);
            const ctaStyle = getCtaStyle(i, isPopular);
            const acc = PLAN_ACCENTS[i] ?? PLAN_ACCENTS[0];

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="gold-hover card-lift-dark glass-panel relative flex flex-col overflow-hidden"
                style={cardStyle}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="text-center py-2" style={{ background: "linear-gradient(135deg, #4FA3D9, #7FC4EC)" }}>
                    <span className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#0A1628", fontWeight: 700 }}>
                      {POPULAR[lang] || POPULAR.fr}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-7">
                  {/* Tier label */}
                  <p className="font-sans uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#888888" }}>
                    {i === 0 ? "SILVER" : i === 1 ? "GOLD" : "PLATINUM"}
                  </p>

                  {/* Plan name */}
                  <p className="font-serif mb-1" style={{ fontSize: "26px", color: acc.accent }}>
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-serif" style={{ fontSize: "52px", color: "#FFFFFF", lineHeight: 1 }}>
                      {plan.price}
                    </span>
                    <span className="font-sans" style={{ fontSize: "13px", color: "#666666" }}>
                      {plan.period}
                    </span>
                  </div>

                  {/* Accent separator */}
                  <div style={{ width: "40px", height: "1px", backgroundColor: acc.accent, margin: "12px 0" }} />

                  {/* Tagline */}
                  <p className="font-sans italic mb-6" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.65 }}>
                    {plan.tagline}
                  </p>

                  {/* Features */}
                  <ul className="flex-1 mb-8" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {plan.benefits.slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckIcon color={acc.accent} />
                        <span className="font-sans" style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => openWaitlist(plan.name)}
                    className="w-full font-sans uppercase py-3.5 transition-opacity hover:opacity-80"
                    style={{
                      ...ctaStyle,
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      cursor: "pointer",
                      fontWeight: isPopular ? 700 : 500,
                    }}
                  >
                    {mb.waitlistCta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
