"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";

const MED_ICON = {
  width: 24,
  height: 24,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Étiquette / tag — Tarifs exceptionnels
function IconTag() {
  return (
    <svg {...MED_ICON}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.2" />
    </svg>
  );
}

// Feuille / leaf — Démarche responsable & impact vert
function IconLeaf() {
  return (
    <svg {...MED_ICON}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

// Éclair / bolt — Disponibilité instantanée
function IconBolt() {
  return (
    <svg {...MED_ICON}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

// Avion barré / plane-off — Zéro vol à vide
function IconPlaneOff() {
  return (
    <svg {...MED_ICON}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

// Recyclage / recycle — Trajets valorisés
function IconRecycle() {
  return (
    <svg {...MED_ICON}>
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}

export default function EmptyLegsPage() {
  const { t, lang } = useLanguage();
  const el = t.emptyLegs;
  const isRTL = lang === "ar";

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        {/* Hero */}
        <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/empty-legs.png"
            alt="Vols partagés"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.55)" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="[font-family:var(--font-cormorant)] font-medium text-[13px] tracking-[0.28em] text-gold uppercase mb-4">
              {el.hero.badge}
            </p>
            <h1 className="font-serif text-[40px] md:text-[60px] text-white leading-tight mb-6 max-w-3xl mx-auto">
              Chaque siège compte. Chaque vol aussi.
            </h1>
            <p
              className="mx-auto"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "18px", color: "#C9A96E", letterSpacing: "0.04em", maxWidth: "660px", lineHeight: 1.7 }}
            >
              Notre engagement : remplir chaque vol, optimiser chaque trajet, réduire chaque empreinte.
            </p>
          </motion.div>
        </section>

        {/* Positionnement */}
        <section className="py-16 md:py-20 px-6 bg-navy">
          {/* Accroche « Notre objectif » — centrée, sans bordure lourde */}
          <div className="mx-auto text-center" style={{ maxWidth: "640px" }}>
            <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "18px" }}>
              Notre objectif
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.5, color: "#FFFFFF" }}>
              Un avion rempli, un vol toujours utile. Chaque siège que nous remplissons, c&apos;est <em style={{ fontStyle: "italic", color: "#E8C77E" }}>une émission évitée</em> et un voyage rendu plus accessible.
            </p>
            <div className="el-goldline" />
          </div>

          {/* 3 piliers — médaillons dorés + icônes spécifiques, cartes premium */}
          <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: IconTag, title: "Tarifs exceptionnels", desc: "Profitez de trajets premium à des conditions privilégiées, lorsqu'un avion doit rejoindre une nouvelle base." },
              { Icon: IconLeaf, title: "Démarche responsable", desc: "Chaque vol partagé comblé est un vol qui ne se fait pas en plus. Voler ensemble plutôt que voler à vide, c'est notre engagement environnemental." },
              { Icon: IconBolt, title: "Disponibilité instantanée", desc: "Les vols partagés sont disponibles en temps réel sur notre plateforme. Réservez en quelques clics et embarquez vers votre destination." },
            ].map((pilier, i) => {
              const { Icon } = pilier;
              return (
                <div key={i} className="el-card" style={{ padding: "40px 30px", textAlign: "center" }}>
                  <div
                    className="el-medallion"
                    style={{ width: "56px", height: "56px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "22px" }}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "22px", lineHeight: 1.3, color: "#FFFFFF" }}>
                    {pilier.title}
                  </p>
                  <div className="el-goldline" />
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "16px", color: "rgba(232,237,242,0.6)", lineHeight: 1.6 }}>
                    {pilier.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bandeau d'impact environnemental */}
        <section className="py-16 md:py-20 px-6 bg-navy">
          <div className="max-w-6xl mx-auto">
            {/* En-tête */}
            <div className="text-center" style={{ marginBottom: "56px" }}>
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "16px" }}>
                {el.impact.badge}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, color: "#FFFFFF" }}>
                {el.impact.titlePlain}
                <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{el.impact.titleAccent}</span>
              </h2>
              <div className="el-goldline" />
            </div>

            {/* 3 cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {el.impact.stats.map((s, i) => {
                const styles = [
                  { Icon: IconLeaf, color: "#9FE1CB", bg: "rgba(157,225,203,0.08)", border: "rgba(157,225,203,0.4)" },
                  { Icon: IconPlaneOff, color: "#E8C77E", bg: "rgba(232,199,126,0.08)", border: "rgba(232,199,126,0.4)" },
                  { Icon: IconRecycle, color: "#9FE1CB", bg: "rgba(157,225,203,0.08)", border: "rgba(157,225,203,0.4)" },
                ][i];
                const Icon = styles.Icon;
                return (
                  <div key={i} className="el-card" style={{ padding: "44px 30px", textAlign: "center" }}>
                    <div
                      className="el-medallion"
                      style={{ width: "54px", height: "54px", border: `1px solid ${styles.border}`, backgroundColor: styles.bg, color: styles.color, marginBottom: "24px" }}
                      aria-hidden="true"
                    >
                      <Icon />
                    </div>
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "42px", lineHeight: 1, color: "#FFFFFF" }}>
                      {s.num}
                      {s.suffix && <span style={{ color: "#E8C77E" }}>{s.suffix}</span>}
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "16px", color: "rgba(232,237,242,0.6)", lineHeight: 1.6, marginTop: "16px" }}>
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Accroche finale */}
            <p
              className="text-center"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 26px)", color: "#E8C77E", marginTop: "48px" }}
            >
              {el.impact.closing}
            </p>
          </div>
        </section>

        {/* Vols du moment — bloc de contact (remplace la grille de vols fictifs) */}
        <section className="py-16 md:py-20 px-6 bg-navy">
          <div className="mx-auto" style={{ maxWidth: "720px" }}>
            <div className="el-current" dir={isRTL ? "rtl" : "ltr"}>
              <h2
                className="font-serif"
                style={{ fontSize: "clamp(26px, 3.4vw, 38px)", lineHeight: 1.2, color: "#f8f5f0", marginBottom: "18px" }}
              >
                {el.current.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: "#E8C77E",
                  letterSpacing: "0.02em",
                  lineHeight: 1.6,
                  maxWidth: "540px",
                  margin: "0 auto 30px",
                }}
              >
                {el.current.text}
              </p>
              <Link href="/contact" className="el-current__cta">
                {el.current.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* Alert section */}
        <section className="py-14 px-6 bg-navy">
          <div className="max-w-xl mx-auto text-center">
            <p className="[font-family:var(--font-cormorant)] font-medium text-[14px] tracking-[0.2em] text-gold uppercase mb-4">{el.alert.title}</p>
            <p className="[font-family:var(--font-cormorant)] font-medium text-[18px] text-white/60 mb-8" style={{ lineHeight: 1.7 }}>{el.alert.subtitle}</p>
            <form className="flex gap-0 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={el.alert.placeholder}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 [font-family:var(--font-cormorant)] font-medium text-[15px] focus:border-gold transition-colors outline-none"
              />
              <button
                type="submit"
                className="bg-gold text-navy [font-family:var(--font-cormorant)] font-medium text-[13px] tracking-[0.18em] uppercase px-6 py-3 hover:bg-[#b8934a] transition-colors whitespace-nowrap"
              >
                {el.alert.cta}
              </button>
            </form>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
