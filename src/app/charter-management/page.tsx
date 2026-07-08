"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const CM_ICON = {
  width: 22,
  height: 22,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Avion — en-tête du tableau de bord
function IconPlane() {
  return (
    <svg {...CM_ICON}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

// Clé — Étape 01 : vous nous confiez votre appareil
function IconKey() {
  return (
    <svg {...CM_ICON}>
      <circle cx="7.5" cy="15.5" r="4" />
      <path d="M10.3 12.7 21 2" />
      <path d="M16.5 6.5l3 3" />
      <path d="M13.5 9.5l2.5 2.5" />
    </svg>
  );
}

// Engrenage — Étape 02 : nous gérons tout
function IconSettings() {
  return (
    <svg {...CM_ICON}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

// Pièces — Étape 03 : vous percevez des revenus
function IconCoins() {
  return (
    <svg {...CM_ICON}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

// Réseau — atout 1
function IconNetwork() {
  return (
    <svg {...CM_ICON}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
    </svg>
  );
}

// Œil — atout 2 : transparence
function IconEye() {
  return (
    <svg {...CM_ICON}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Calendrier validé — atout 3 : disponibilité
function IconCalendarCheck() {
  return (
    <svg {...CM_ICON}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

const STEP_ICONS = [IconKey, IconSettings, IconCoins];
const WHY_ICONS = [IconNetwork, IconEye, IconCalendarCheck];

// Mini-graphique décoratif — hauteurs fixes (déterministes), une barre mise en avant
const CHART_BARS = [32, 44, 38, 54, 48, 62, 58, 74, 100, 86, 70];
const CHART_HI = 8;

const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-white/50 uppercase mb-2";
const inputClass =
  "w-full border-b border-white/15 text-white placeholder:text-white/30 py-2.5 font-sans text-[14px] focus:border-gold transition-colors bg-transparent outline-none";

export default function CharterManagementPage() {
  const { t } = useLanguage();
  const cm = t.charterManagement;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aircraft: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "charter-management" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", aircraft: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — fond #0A1628 sobre */}
        <section
          className="relative flex items-center justify-center"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          <div className="relative z-10 text-center px-6 py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="uppercase mb-5"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E" }}
            >
              {cm.hero.badge}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              {cm.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "19px", color: "#C0C8D4", lineHeight: 1.7 }}
            >
              {cm.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Tableau de bord de rentabilité (100% CSS pur) */}
        <section className="cm-section py-20 px-6">
          <div className="relative max-w-5xl mx-auto">
            {/* En-tête */}
            <div className="text-center" style={{ marginBottom: "48px" }}>
              <p
                className="uppercase"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "16px" }}
              >
                {cm.dashboard.badge}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, color: "#FFFFFF" }}>
                {cm.dashboard.titlePlain}
                <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{cm.dashboard.titleAccent}</span>
              </h2>
            </div>

            {/* Le dashboard */}
            <div className="cm-dashboard">
              {/* En-tête du dashboard */}
              <div className="flex items-center justify-between" style={{ padding: "20px 26px", gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "14px" }}>
                  <span
                    aria-hidden="true"
                    style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(201,169,110,0.5)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >
                    <IconPlane />
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "18px", color: "#C9A96E" }}>
                    {cm.dashboard.device}
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: "9px", flexShrink: 0 }}>
                  <span className="cm-status-dot" aria-hidden="true" />
                  <span className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em", color: "#5DCAA5", whiteSpace: "nowrap" }}>
                    {cm.dashboard.status}
                  </span>
                </div>
              </div>

              <hr className="cm-dashed" />

              {/* 4 métriques */}
              <div className="cm-metrics">
                {cm.dashboard.metrics.map((m, i) => (
                  <div key={i} className="cm-metric">
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1, color: "#FFFFFF" }}>
                      {m.num}
                      <span style={{ color: "#E8C77E" }}>{m.unit}</span>
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginTop: "12px" }}>
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="cm-dashed" />

              {/* Mini-graphique + légende */}
              <div style={{ padding: "28px 26px 26px" }}>
                <div className="cm-chart" aria-hidden="true">
                  {CHART_BARS.map((h, i) => (
                    <span key={i} className={i === CHART_HI ? "cm-bar-hi" : ""} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="text-center" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontStyle: "italic", fontSize: "14px", color: "rgba(232,199,126,0.85)", marginTop: "16px" }}>
                  {cm.dashboard.chartLegend}
                </p>
              </div>
            </div>

            {/* Accroche finale */}
            <p
              className="text-center"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 26px)", color: "#E8C77E", marginTop: "44px" }}
            >
              {cm.dashboard.closing}
            </p>
          </div>
        </section>

        {/* Comment ça marche — cartes premium (100% CSS pur) */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <div className="text-center mb-14">
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "14px" }}>
                {cm.howItWorks.badge}
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                {cm.howItWorks.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cm.howItWorks.steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? STEP_ICONS[0];
                return (
                  <div key={step.num} className="el-card" style={{ position: "relative", padding: "40px 30px", textAlign: "center" }}>
                    <span
                      aria-hidden="true"
                      className="font-serif"
                      style={{ position: "absolute", top: "16px", right: "22px", fontSize: "52px", lineHeight: 1, color: "rgba(201,169,110,0.12)", userSelect: "none" }}
                    >
                      {step.num}
                    </span>
                    <div className="el-medallion" style={{ width: "56px", height: "56px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "22px" }} aria-hidden="true">
                      <Icon />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "20px", lineHeight: 1.3, color: "#FFFFFF" }}>
                      {step.title}
                    </h3>
                    <div className="el-goldline" />
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir — cartes premium (100% CSS pur) */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <div className="text-center mb-14">
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "14px" }}>
                {cm.whyUs.badge}
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                {cm.whyUs.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cm.whyUs.items.map((item, i) => {
                const Icon = WHY_ICONS[i] ?? WHY_ICONS[0];
                return (
                  <div key={item.title} className="el-card" style={{ padding: "40px 30px", textAlign: "center" }}>
                    <div className="el-medallion" style={{ width: "56px", height: "56px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "22px" }} aria-hidden="true">
                      <Icon />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "20px", lineHeight: 1.3, color: "#FFFFFF" }}>
                      {item.title}
                    </h3>
                    <div className="el-goldline" />
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vous êtes investisseur ? — fond navy */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
              {cm.investment.badge}
            </p>
            <h2 className="title-gold font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 44px)", color: "#FFFFFF" }}>
              {cm.investment.title}
            </h2>
            <p className="mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              {cm.investment.text}
            </p>
            <Link
              href="/contact"
              className="inline-block font-sans uppercase"
              style={{
                padding: "14px 36px",
                fontSize: "11px",
                letterSpacing: "0.2em",
                fontWeight: 700,
                backgroundColor: "#C9A96E",
                color: "#0A1628",
                textDecoration: "none",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a8874a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9A96E")}
            >
              {cm.investment.cta}
            </Link>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {cm.form.badge}
              </p>
              <h2 className="title-gold font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF" }}>
                {cm.form.title}
              </h2>
              <p className="mt-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {cm.form.subtitle}
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-16" style={{ border: "1px solid rgba(201,169,110,0.2)" }}>
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                  style={{ border: "1px solid rgba(201,169,110,0.4)" }}
                >
                  <svg className="w-5 h-5" style={{ color: "#C9A96E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-sans text-[16px] text-white/60 leading-[1.6]">
                  {cm.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{cm.form.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{cm.form.email}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{cm.form.phone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{cm.form.aircraft}</label>
                    <input
                      type="text"
                      value={formData.aircraft}
                      onChange={(e) => setFormData({ ...formData, aircraft: e.target.value })}
                      placeholder={cm.form.aircraftPlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{cm.form.message}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={cm.form.messagePlaceholder}
                    className={inputClass + " resize-none"}
                  />
                </div>
                {status === "error" && (
                  <p className="font-sans text-[13px] text-red-500">{cm.form.error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full font-sans uppercase py-4 disabled:opacity-60"
                  style={{
                    backgroundColor: "#C9A96E",
                    color: "#0A1628",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#a8874a"; }}
                  onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#C9A96E"; }}
                >
                  {status === "sending" ? cm.form.sending : cm.form.submit}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
