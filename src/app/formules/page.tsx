"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

function CheckIcon({ className = "w-4 h-4 shrink-0 mt-0.5", color = "#C9A96E" }: { className?: string; color?: string }) {
  return (
    <svg className={className} style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// Couleurs d'identité par formule : Aube (champagne), Azur (bleu), Astre (or intense)
const PLAN_ACCENTS = [
  { accent: "#E8C4A0", soft: "rgba(232,196,160,0.45)", glow: "" },
  { accent: "#4FA3D9", soft: "rgba(79,163,217,0.5)", glow: "0 0 40px rgba(79,163,217,0.18)" },
  { accent: "#D4A845", soft: "rgba(212,168,69,0.5)", glow: "0 0 30px rgba(212,168,69,0.16)" },
];

const ICON_PROPS = {
  width: 34,
  height: 34,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
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

// Icônes des 4 services signature (textes via i18n f.signature.items)
const SIGNATURE_ICONS = [IconSpa, IconGift, IconFamily, IconPaw];

// Médaillons de l'échelle d'ascension (Aube · Azur · Astre)
const BAND_ICON = {
  width: 30, height: 30, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round",
} as const;
function IconPlaneBand() {
  return <svg {...BAND_ICON}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>;
}
function IconCrown() {
  return <svg {...BAND_ICON}><path d="M3 7l4 4 5-7 5 7 4-4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M3 20h18" /></svg>;
}
function IconDiamond() {
  return <svg {...BAND_ICON}><path d="M6 3h12l3 5-9 13L3 8z" /><path d="M3 8h18" /><path d="M9 3 7.5 8 12 21M15 3l1.5 5L12 21" /></svg>;
}
const BAND_MEDALLIONS = [
  { Icon: IconPlaneBand, color: "#C0C0C0", border: "rgba(192,192,192,0.5)", bg: "rgba(192,192,192,0.08)" },
  { Icon: IconCrown, color: "#E8C77E", border: "rgba(232,199,126,0.55)", bg: "rgba(232,199,126,0.1)" },
  { Icon: IconDiamond, color: "#E8C77E", border: "rgba(232,199,126,0.5)", bg: "rgba(232,199,126,0.08)" },
];

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "8%", left: "10%", delay: "0s" },
  { top: "18%", left: "85%", delay: "1.2s" },
  { top: "34%", left: "14%", delay: "0.6s" },
  { top: "50%", left: "88%", delay: "1.8s" },
  { top: "66%", left: "9%", delay: "0.9s" },
  { top: "80%", left: "82%", delay: "2.2s" },
  { top: "88%", left: "30%", delay: "1.5s" },
  { top: "40%", left: "50%", delay: "0.3s" },
];

export default function FormulesPage() {
  const { t } = useLanguage();
  const { openWaitlist } = useModal();
  const f = t.formules;
  const e = f.echelle;
  const sig = f.signature;
  const plans = t.home.memberships.plans;

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        {/* Échelle d'ascension — une seule présentation (100% CSS pur) */}
        <section className="detente-spa" style={{ padding: "150px 6% 88px" }}>
          <div className="detente-spa__halo" aria-hidden="true" />
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          <div className="relative" style={{ zIndex: 1 }}>
            {/* En-tête */}
            <div className="text-center mx-auto" style={{ maxWidth: "640px", marginBottom: "56px" }}>
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "16px" }}>
                {e.badge}
              </p>
              <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, color: "#FFFFFF" }}>
                {e.titlePlain}
                <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{e.titleAccent}</span>
              </h1>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 2.2vw, 22px)", color: "#E8C77E", marginTop: "14px" }}>
                {e.lead}
              </p>
            </div>

            {/* 3 bandes empilées */}
            <div className="max-w-5xl mx-auto flex flex-col" style={{ gap: "18px" }}>
              {plans.map((plan, i) => {
                const med = BAND_MEDALLIONS[i] ?? BAND_MEDALLIONS[0];
                const band = e.bands[i] ?? e.bands[0];
                const acc = PLAN_ACCENTS[i] ?? PLAN_ACCENTS[0];
                const MedIcon = med.Icon;
                return (
                  <div
                    key={plan.name}
                    className={`echelle-band${plan.popular ? " echelle-band--featured" : ""}`}
                    style={{ "--accent": acc.accent, "--accent-soft": acc.soft, boxShadow: acc.glow || undefined } as React.CSSProperties}
                  >
                    {plan.popular && <span className="echelle-badge">{f.popular}</span>}

                    {/* Panneau gauche */}
                    <div className="echelle-band__panel">
                      <div
                        className="el-medallion"
                        style={{ width: "58px", height: "58px", border: `1px solid ${med.border}`, backgroundColor: med.bg, color: med.color, marginBottom: "16px" }}
                        aria-hidden="true"
                      >
                        <MedIcon />
                      </div>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "24px", color: acc.accent }}>
                        {plan.name}
                      </p>
                      <div className="flex items-baseline justify-center" style={{ gap: "3px", marginTop: "4px" }}>
                        <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "32px", color: "#C9A96E" }}>{plan.price}</span>
                        <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{plan.period}</span>
                      </div>
                      <button
                        onClick={() => openWaitlist(plan.name)}
                        className="echelle-cta"
                        type="button"
                      >
                        {f.waitlistCta}
                      </button>
                    </div>

                    {/* Contenu droit */}
                    <div className="echelle-band__content">
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "20px", color: "#FFFFFF", lineHeight: 1.3 }}>
                        {band.hook}
                      </p>
                      <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.22em", color: "#C9A96E", marginTop: "8px", marginBottom: "20px" }}>
                        {band.condition}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ columnGap: "28px", rowGap: "10px" }}>
                        {plan.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5">
                            <CheckIcon className="w-4 h-4 shrink-0 mt-1" color={acc.accent} />
                            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-[16px] text-white/50 leading-relaxed">{f.note}</p>
          </div>
        </section>

        {/* Services signature — grille 2×2 premium (100% CSS pur) */}
        <section className="detente-spa" style={{ paddingTop: "88px", paddingBottom: "88px", paddingLeft: "8%", paddingRight: "8%" }}>
          <div className="detente-spa__halo" aria-hidden="true" />
          {STARS.map((s, i) => (
            <span key={`svc-${i}`} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          <div className="relative max-w-5xl mx-auto" style={{ zIndex: 1 }}>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "16px" }}>
                {sig.eyebrow}
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(30px, 4vw, 44px)", color: "#FFFFFF", lineHeight: 1.1 }}>
                {sig.titlePlain}
                <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{sig.titleAccent}</span>
              </h2>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "17px", color: "#C0C8D4", lineHeight: 1.8, marginTop: "14px" }}>
                {sig.lead}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sig.items.map((item, i) => {
                const Icon = SIGNATURE_ICONS[i] ?? SIGNATURE_ICONS[0];
                const featured = i === 2;
                return (
                  <div key={item.title} className={`svc-card${featured ? " svc-card--featured" : ""}`}>
                    {featured && <span className="svc-badge">SIGNATURE</span>}
                    <div className="svc-card__visual" aria-hidden="true">
                      <span style={{ color: "#E8C77E", display: "flex" }}><Icon /></span>
                    </div>
                    <div style={{ padding: "26px 30px 32px" }}>
                      <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.24em", color: "#C9A96E", marginBottom: "10px" }}>
                        {item.eyebrow}
                      </p>
                      <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "23px", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button onClick={() => openWaitlist("Services signature")} className="pet-cta" type="button">
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
