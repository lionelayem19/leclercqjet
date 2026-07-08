"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import GrillePhoto from "@/components/ui/GrillePhoto";
import AirportInput from "@/components/ui/AirportInput";

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

const ALL_FLIGHTS = [
  {
    from: "Paris Le Bourget", fromCode: "LFPB",
    to: "Nice Côte d'Azur", toCode: "LFMN",
    date: "Demain", time: "09h00",
    aircraft: "Citation XLS", seats: 8, price: "4 500€",
    type: "lastMinute",
    zone: 9,
  },
  {
    from: "Paris Le Bourget", fromCode: "LFPB",
    to: "Londres Farnborough", toCode: "EGLF",
    date: "Dans 2 jours", time: "11h30",
    aircraft: "Phenom 300", seats: 6, price: "6 200€",
    type: "emptyLeg",
    zone: 10,
  },
  {
    from: "Genève", fromCode: "LSGG",
    to: "Ibiza", toCode: "LEIB",
    date: "Dans 3 jours", time: "14h00",
    aircraft: "Falcon 2000", seats: 10, price: "8 900€",
    type: "emptyLeg",
    zone: 11,
  },
  {
    from: "Monaco", fromCode: "LNMC",
    to: "Mykonos", toCode: "LGMK",
    date: "Dans 4 jours", time: "10h15",
    aircraft: "Hawker 800XP", seats: 8, price: "9 800€",
    type: "emptyLeg",
    zone: 12,
  },
  {
    from: "Dubaï", fromCode: "OMDB",
    to: "Paris Le Bourget", toCode: "LFPB",
    date: "Dans 5 jours", time: "08h00",
    aircraft: "Gulfstream G550", seats: 14, price: "38 000€",
    type: "emptyLeg",
    zone: 8,
  },
  {
    from: "Cannes", fromCode: "LFMD",
    to: "Zurich", toCode: "LSZH",
    date: "Dans 6 jours", time: "16h45",
    aircraft: "Learjet 45", seats: 7, price: "5 200€",
    type: "lastMinute",
    zone: 7,
  },
];

// Icônes barre de recherche (contour, héritent de la couleur du texte)
function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11a8 8 0 0 0-14.3-4.5M4 5v3.5h3.5" />
      <path d="M4 13a8 8 0 0 0 14.3 4.5M20 19v-3.5h-3.5" />
    </svg>
  );
}

export default function EmptyLegsPage() {
  const { t, lang } = useLanguage();
  const el = t.emptyLegs;
  const isRTL = lang === "ar";

  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const filtered = ALL_FLIGHTS.filter((f) => {
    if (filterFrom && !f.from.toLowerCase().includes(filterFrom.toLowerCase())) return false;
    if (filterTo && !f.to.toLowerCase().includes(filterTo.toLowerCase())) return false;
    if (filterType && f.type !== filterType) return false;
    return true;
  });

  const scrollToResults = () => {
    if (typeof document !== "undefined") {
      document.getElementById("el-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

        {/* Filters */}
        <section className="sticky top-0 z-30 bg-navy border-b border-white/10 py-5 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="vl-search-frame" dir={isRTL ? "rtl" : "ltr"}>
              <div className="vl-search-grid">
                <div className="vl-field">
                  <label className="vl-label">{el.filters.from}</label>
                  <AirportInput value={filterFrom} onChange={setFilterFrom} placeholder="Paris..." className="vl-input" />
                </div>
                <div className="vl-field">
                  <label className="vl-label">{el.filters.to}</label>
                  <AirportInput value={filterTo} onChange={setFilterTo} placeholder="Nice..." className="vl-input" />
                </div>
                <div className="vl-field">
                  <label className="vl-label">{el.filters.date}</label>
                  <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="vl-input [color-scheme:dark]" />
                </div>
                <div className="vl-field">
                  <label className="vl-label">{el.filters.type}</label>
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="vl-input">
                    <option value="" className="text-text-dark">{el.filters.all}</option>
                    <option value="emptyLeg" className="text-text-dark">{el.badges.emptyLeg}</option>
                    <option value="lastMinute" className="text-text-dark">{el.badges.lastMinute}</option>
                  </select>
                </div>
              </div>

              <div className="vl-actions">
                <button type="button" onClick={scrollToResults} className="vl-search-btn">
                  <IconSearch />
                  <span>{el.filters.search}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setFilterFrom(""); setFilterTo(""); setFilterDate(""); setFilterType(""); }}
                  className="vl-reset"
                >
                  <IconRefresh />
                  <span>{el.filters.reset}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section id="el-results" className="py-14 px-6" style={{ scrollMarginTop: "96px" }}>
          <div className="max-w-6xl mx-auto">
            <p className="[font-family:var(--font-cormorant)] font-medium text-[15px] text-white/50 mb-8">
              {el.count(filtered.length)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((flight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="gold-hover bg-navy-card border border-white/10 hover:border-gold/40 hover:shadow-card-hover transition-all duration-300 group overflow-hidden shadow-card"
                >
                  <div className="relative h-44 overflow-hidden">
                    <GrillePhoto
                      zone={flight.zone}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`[font-family:var(--font-cormorant)] font-medium text-[11px] tracking-[0.12em] uppercase px-2.5 py-1 ${
                        flight.type === "lastMinute"
                          ? "bg-red-600 text-white"
                          : "bg-navy-card/90 text-white/80"
                      }`}>
                        {flight.type === "lastMinute" ? el.badges.lastMinute : el.badges.emptyLeg}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1">
                        <p className="[font-family:var(--font-cormorant)] font-medium text-[20px] text-white leading-tight">{flight.from}</p>
                        <p className="[font-family:var(--font-cormorant)] font-medium text-[12px] text-white/50 tracking-widest">{flight.fromCode}</p>
                      </div>
                      <svg className="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      <div className="flex-1 text-right">
                        <p className="[font-family:var(--font-cormorant)] font-medium text-[20px] text-white leading-tight">{flight.to}</p>
                        <p className="[font-family:var(--font-cormorant)] font-medium text-[12px] text-white/50 tracking-widest">{flight.toCode}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-4">
                      <span className="[font-family:var(--font-cormorant)] font-medium text-[14px] text-white/50">{flight.date} · {flight.time}</span>
                      <span className="[font-family:var(--font-cormorant)] font-medium text-[14px] text-white/60 text-right">{flight.aircraft}</span>
                      <span className="[font-family:var(--font-cormorant)] font-medium text-[14px] text-white/50">{flight.seats} pax</span>
                      <span className="[font-family:var(--font-cormorant)] font-medium text-[22px] text-gold text-right leading-none">{flight.price}</span>
                    </div>

                    {/* FBO badge */}
                    <p className="[font-family:var(--font-cormorant)] font-medium text-[13px] tracking-[0.12em] text-gold/70 mb-4">
                      {el.fbo}
                    </p>

                    <a
                      href="/vols-prives"
                      className="block w-full text-center bg-gold text-navy [font-family:var(--font-cormorant)] font-medium text-[13px] tracking-[0.18em] uppercase py-3 hover:bg-[#a8874a] transition-colors"
                    >
                      {el.cardCta}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="[font-family:var(--font-cormorant)] font-medium text-[18px] text-white/50 leading-[1.7]">{el.noResults}</p>
              </div>
            )}
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
