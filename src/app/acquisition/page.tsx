"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";

const STEP_ICON = {
  width: 22,
  height: 22,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Loupe / search — Recherche & Sélection
function IconSearch() {
  return (
    <svg {...STEP_ICON}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// Certificat / file-certificate — Négociation & Acquisition
function IconCertificate() {
  return (
    <svg {...STEP_ICON}>
      <path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M13 3v5h5" />
      <path d="M13 3l5 5" />
      <circle cx="17" cy="16" r="3" />
      <path d="M15.3 18.3 14.8 22l2.2-1.3 2.2 1.3-.5-3.7" />
    </svg>
  );
}

// Avion incliné / plane-tilt — Conseil & Accompagnement
function IconPlaneTilt() {
  return (
    <svg {...STEP_ICON}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

const STEP_ICONS = [IconSearch, IconCertificate, IconPlaneTilt];

// Faux code-barres — largeurs fixes (déterministes, pas de mismatch d'hydratation)
const BARCODE_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2];

export default function AcquisitionPage() {
  const { t } = useLanguage();
  const a = t.acquisition;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", budget: "", type: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "acquisition" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", budget: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-white/50 uppercase mb-2";
  const inputClass = "w-full border-b border-white/15 text-white placeholder:text-white/30 py-2.5 font-sans text-[14px] focus:border-gold transition-colors bg-transparent";

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        {/* Hero */}
        <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/acquisition.png"
            alt="Acquisition jet privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(10,22,40,0.5), rgba(10,22,40,0.7))" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, fontSize: "17px", letterSpacing: "5px", color: "#E8C77E", textShadow: "0 1px 6px rgba(0,0,0,0.6)", marginBottom: "14px" }}
            >
              {a.hero.badge}
            </p>
            <div aria-hidden="true" style={{ width: "72px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 20px" }} />
            <h1
              className="mb-5 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 52px)", color: "#FFFFFF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              {a.hero.title}
            </h1>
            <p
              className="mx-auto"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "19px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "32rem" }}
            >
              {a.hero.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Le parcours d'acquisition — carte d'embarquement (100% CSS pur) */}
        <section className="acq-section py-20 px-6">
          <div className="relative max-w-5xl mx-auto">
            {/* En-tête */}
            <div className="text-center" style={{ marginBottom: "48px" }}>
              <p
                className="uppercase"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "16px" }}
              >
                {a.parcours.badge}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, color: "#FFFFFF" }}>
                {a.parcours.titlePlain}
                <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{a.parcours.titleAccent}</span>
              </h2>
            </div>

            {/* Le billet */}
            <div className="boarding-pass">
              {/* En-tête du billet */}
              <div className="flex items-center justify-between" style={{ padding: "20px 28px", gap: "16px" }}>
                <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "19px", color: "#C9A96E" }}>
                  {a.parcours.brand}
                </span>
                <span className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.25em", color: "#8B6F3F", whiteSpace: "nowrap" }}>
                  {a.parcours.boardingPass}
                </span>
              </div>

              <hr className="bp-dashed" />

              {/* Les 3 étapes */}
              <div className="bp-steps">
                {a.services.map((service, i) => {
                  const Icon = STEP_ICONS[i] ?? STEP_ICONS[0];
                  return (
                    <div key={service.num} className="bp-step">
                      <p
                        className="uppercase"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.24em", color: "#8B6F3F", marginBottom: "16px" }}
                      >
                        {a.parcours.stepLabel} {service.num}
                      </p>
                      <div className="bp-medallion" aria-hidden="true">
                        <Icon />
                      </div>
                      <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "20px", lineHeight: 1.3, color: "#FFFFFF" }}>
                        {service.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "15px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", marginTop: "10px" }}>
                        {service.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <hr className="bp-dashed" />

              {/* Pied du billet */}
              <div className="flex items-center justify-between" style={{ padding: "22px 28px", gap: "16px" }}>
                <div className="bp-barcode" aria-hidden="true">
                  {BARCODE_WIDTHS.map((w, i) => (
                    <span key={i} style={{ width: `${w}px` }} />
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontStyle: "italic", fontSize: "18px", color: "#E8C77E", whiteSpace: "nowrap" }}>
                  {a.parcours.footerTagline}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <h2 className="title-gold font-serif text-[32px] md:text-[44px] text-white mb-2">
                {a.form.title}
              </h2>
              <p className="font-sans text-[16px] text-white/50">{a.form.subtitle}</p>
            </motion.div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-gold/20"
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-sans text-[15px] text-white/60">{a.form.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{a.form.name}</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{a.form.email}</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{a.form.phone}</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{a.form.budget}</label>
                    <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inputClass + " text-white"}>
                      <option value="">—</option>
                      {a.form.budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{a.form.type}</label>
                  <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder={a.form.typePlaceholder} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{a.form.message}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={a.form.messagePlaceholder}
                    className={inputClass + " resize-none"}
                  />
                </div>

                {status === "error" && (
                  <p className="form-error" role="alert">{t.common.formError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase py-4 hover:bg-[#b8934a] transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? a.form.sending : a.form.cta}
                </button>
              </form>
            )}
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
