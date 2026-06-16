"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const POPULAR: Record<string, string> = {
  fr: "LE PLUS POPULAIRE", en: "MOST POPULAR", zh: "最受欢迎", ar: "الأكثر شعبية",
};

export default function MembershipsSection() {
  const { t, lang } = useLanguage();
  const { openWaitlist } = useModal();
  const mb = t.home.memberships;

  const getCardStyle = (index: number, isPopular?: boolean) => {
    if (index === 2) {
      return {
        background: "linear-gradient(135deg, #0D1E35, #060E1A)",
        border: "1px solid rgba(201,169,110,0.2)",
      };
    }
    if (isPopular) {
      return {
        backgroundColor: "#0D1E35",
        border: "2px solid #C9A96E",
      };
    }
    return {
      backgroundColor: "#0D1E35",
      border: "1px solid rgba(201,169,110,0.15)",
    };
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
        paddingTop: "100px",
        paddingBottom: "100px",
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
          <h2 className="font-serif" style={{ fontSize: "42px", color: "#FFFFFF" }}>
            {mb.title} <span className="italic">{mb.titleItalic}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mb.plans.map((plan, i) => {
            const isPopular = plan.popular;
            const cardStyle = getCardStyle(i, isPopular);
            const ctaStyle = getCtaStyle(i, isPopular);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-lift-dark relative flex flex-col overflow-hidden"
                style={cardStyle}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="text-center py-2" style={{ backgroundColor: "#C9A96E" }}>
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
                  <p className="font-serif mb-1" style={{ fontSize: "26px", color: "#FFFFFF" }}>
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

                  {/* Gold separator */}
                  <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A96E", margin: "12px 0" }} />

                  {/* Tagline */}
                  <p className="font-sans italic mb-6" style={{ fontSize: "13px", color: "#C0C8D4", lineHeight: 1.65 }}>
                    {plan.tagline}
                  </p>

                  {/* Features */}
                  <ul className="flex-1 mb-8" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {plan.benefits.slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="font-sans" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
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
