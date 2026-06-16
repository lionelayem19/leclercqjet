"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const ICON_PROPS = {
  width: 26,
  height: 26,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "#C9A96E",
  strokeWidth: 1.4,
} as const;

// Détente — sparkles (ambiance zen)
function IconSpa() {
  return (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

// Événements — coffret cadeau
function IconGift() {
  return (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

// Familles & bébés — familles
function IconFamily() {
  return (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

// Animaux — empreinte de patte
function IconPaw() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="6.5" cy="12" r="1.7" />
      <circle cx="10" cy="8" r="1.7" />
      <circle cx="14" cy="8" r="1.7" />
      <circle cx="17.5" cy="12" r="1.7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.5c-2.6 0-4.7 2.05-4.7 4.1 0 1.65 1.35 2.6 2.9 2.6.95 0 1.25-.32 1.8-.32s.85.32 1.8.32c1.55 0 2.9-.95 2.9-2.6 0-2.05-2.1-4.1-4.7-4.1z" />
    </svg>
  );
}

const PREMIUM_SERVICES: { Icon: () => React.JSX.Element; eyebrow: string; title: string; description: string }[] = [
  {
    Icon: IconSpa,
    eyebrow: "Bien-être",
    title: "Détente & Relaxation à bord",
    description:
      "Un spa privé en altitude pour voyager autrement : massage anti-jet-lag, aromathérapie sur mesure et lumière tamisée composent une ambiance zen, du décollage à l'atterrissage.",
  },
  {
    Icon: IconGift,
    eyebrow: "Célébrations",
    title: "Événements spéciaux",
    description:
      "Mariage, anniversaire, baby shower ou lune de miel : une organisation clé en main avec décoration raffinée, champagne grand cru et service entièrement personnalisé à 12 000 mètres.",
  },
  {
    Icon: IconFamily,
    eyebrow: "Family Ready",
    title: "Accompagnement bébés & familles",
    description:
      "Notre service Family Ready équipe la cabine pour les plus petits : siège adapté, berceau, repas sur mesure et personnel formé à l'accueil des jeunes enfants, pour des vols sereins en famille.",
  },
  {
    Icon: IconPaw,
    eyebrow: "Voyage à quatre pattes",
    title: "Animaux de compagnie",
    description:
      "Vos compagnons voyagent en cabine, à vos côtés, dans un espace confort dédié. Repas, accessoires et soins attentionnés sont disponibles tout au long du trajet.",
  },
];

// Accents métalliques par niveau de fidélité (Silver · Gold · Platinum)
const TIER_ACCENTS: { bar: string; text: string }[] = [
  { bar: "linear-gradient(90deg, #8A95A5, #E8EDF2)", text: "#E8EDF2" },
  { bar: "linear-gradient(90deg, #a8874a, #C9A96E)", text: "#C9A96E" },
  { bar: "linear-gradient(90deg, #C0C8D4, #C9A96E)", text: "#FFFFFF" },
];

export default function FormulesPage() {
  const { t } = useLanguage();
  const { openWaitlist } = useModal();
  const f = t.formules;
  const plans = t.home.memberships.plans;

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-navy pt-36 pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-4">
              {f.hero.badge}
            </p>
            <h1 className="font-serif text-[36px] md:text-[56px] text-white mb-4 leading-tight">
              {f.hero.title}
            </h1>
            <p className="font-sans text-[18px] text-white/50 max-w-lg mx-auto leading-relaxed">
              {f.hero.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Plans */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const isDark = (plan as { dark?: boolean }).dark;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative flex flex-col ${
                    isDark
                      ? "bg-navy border border-gold/30"
                      : plan.popular
                      ? "bg-white border-2 border-gold shadow-card"
                      : "bg-white border border-gray-150 shadow-card"
                  }`}
                  style={!plan.popular && !isDark ? { borderColor: "#E8E8E8" } : undefined}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-white font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-1.5">
                        {f.popular}
                      </span>
                    </div>
                  )}

                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <div className="mb-7 pb-7 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "#F0F0F0" }}>
                      <p className={`font-serif text-[32px] mb-2 ${isDark ? "text-white" : "text-text-dark"}`}>
                        {plan.name}
                      </p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className={`font-serif text-[42px] ${isDark ? "text-gold" : "text-navy"}`}>
                          {plan.price}
                        </span>
                        <span className={`font-sans text-[13px] ${isDark ? "text-white/40" : "text-gray-400"}`}>
                          {plan.period}
                        </span>
                      </div>
                      <p className={`font-sans text-[13px] leading-relaxed ${isDark ? "text-white/45" : "text-gray-500"}`}>
                        {plan.tagline}
                      </p>
                    </div>

                    <ul className="space-y-3.5 mb-10 flex-1">
                      {plan.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className={`font-sans text-[13px] leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => openWaitlist(plan.name)}
                      className={`w-full font-sans text-[11px] tracking-[0.2em] uppercase py-4 transition-all duration-300 ${
                        isDark
                          ? "bg-gold text-navy hover:bg-[#b8934a]"
                          : plan.popular
                          ? "bg-navy text-white hover:bg-navy-card"
                          : "border border-gray-200 text-gray-600 hover:border-gold hover:text-gold"
                      }`}
                    >
                      {f.waitlistCta}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Note */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-[13px] text-gray-400 leading-relaxed">{f.note}</p>
          </div>
        </section>

        {/* Services premium à bord */}
        <section style={{ backgroundColor: "#F7F8FA", paddingTop: "88px", paddingBottom: "88px", paddingLeft: "8%", paddingRight: "8%" }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                Expériences signature
              </p>
              <h2 className="font-serif mb-5" style={{ fontSize: "clamp(32px, 4vw, 46px)", color: "#0A1628", lineHeight: 1.1 }}>
                Des services pensés pour chaque voyage
              </h2>
              <p className="font-sans" style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.8 }}>
                Au-delà du vol, une attention de chaque instant. Composez votre expérience à bord parmi nos prestations sur mesure.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {PREMIUM_SERVICES.map(({ Icon, eyebrow, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative flex flex-col overflow-hidden bg-white transition-all duration-300"
                  style={{ border: "1px solid #E8E8E8" }}
                  whileHover={{ y: -6 }}
                >
                  {/* Accent bar (revealed on hover) */}
                  <div
                    className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "linear-gradient(90deg, #a8874a, #C9A96E)" }}
                  />

                  <div className="flex flex-col flex-1 p-8">
                    {/* Icon medallion */}
                    <div
                      className="flex items-center justify-center mb-6"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "#0A1628",
                        border: "1px solid rgba(201,169,110,0.3)",
                      }}
                    >
                      <Icon />
                    </div>

                    <p className="font-sans uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#C9A96E" }}>
                      {eyebrow}
                    </p>
                    <h3 className="font-serif mb-4" style={{ fontSize: "22px", color: "#0A1628", lineHeight: 1.25 }}>
                      {title}
                    </h3>

                    <div style={{ width: "36px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "18px" }} />

                    <p className="font-sans flex-1" style={{ fontSize: "13.5px", color: "#5A6472", lineHeight: 1.75 }}>
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => openWaitlist("Services premium à bord")}
                className="font-sans uppercase transition-all duration-300"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  backgroundColor: "#0A1628",
                  color: "#FFFFFF",
                  padding: "15px 42px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#152744")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0A1628")}
              >
                {f.waitlistCta}
              </button>
            </div>
          </div>
        </section>

        {/* Programme de fidélité */}
        <section style={{ backgroundColor: "#0A1628", paddingTop: "88px", paddingBottom: "88px", paddingLeft: "8%", paddingRight: "8%" }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {f.fidelite.badge}
              </p>
              <h2 className="font-serif mb-5" style={{ fontSize: "clamp(32px, 4vw, 46px)", color: "#FFFFFF", lineHeight: 1.1 }}>
                {f.fidelite.title}
              </h2>
              <p className="font-sans" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.8 }}>
                {f.fidelite.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {f.fidelite.tiers.map((tier, i) => {
                const accent = TIER_ACCENTS[i] ?? TIER_ACCENTS[0];
                const isPlatinum = i === 2;
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative flex flex-col overflow-hidden"
                    style={{
                      background: isPlatinum ? "linear-gradient(135deg, #0D1E35, #060E1A)" : "#0D1E35",
                      border: `1px solid ${isPlatinum ? "rgba(201,169,110,0.35)" : "rgba(201,169,110,0.15)"}`,
                    }}
                  >
                    {/* Accent bar */}
                    <div style={{ height: "3px", background: accent.bar }} />

                    <div className="flex flex-col flex-1 p-8">
                      {/* Tier name */}
                      <p className="font-serif mb-3" style={{ fontSize: "30px", color: accent.text }}>
                        {tier.name}
                      </p>

                      {/* Threshold */}
                      <p className="font-sans uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>
                        {f.fidelite.reachLabel} · {tier.threshold}
                      </p>

                      {/* Tagline */}
                      <p className="font-sans italic mb-5" style={{ fontSize: "14px", color: "#C0C8D4", lineHeight: 1.6 }}>
                        {tier.tagline}
                      </p>

                      <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "22px" }} />

                      {/* Perks */}
                      <ul className="flex-1" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-3">
                            <CheckIcon />
                            <span className="font-sans" style={{ fontSize: "13px", color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => openWaitlist("Programme de fidélité")}
                className="font-sans uppercase transition-all duration-300"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  backgroundColor: "#C9A96E",
                  color: "#0A1628",
                  padding: "15px 42px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a8874a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9A96E")}
              >
                {f.waitlistCta}
              </button>
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
