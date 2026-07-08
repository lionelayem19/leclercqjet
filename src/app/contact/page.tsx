"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Types de demande (liste déroulante) — localisés
const REQUEST_TYPES: Record<string, string[]> = {
  fr: ["Demande de devis", "Conciergerie", "Événement spécial", "Autre"],
  en: ["Quote request", "Concierge", "Special event", "Other"],
  zh: ["报价请求", "礼宾服务", "特别活动", "其他"],
  ar: ["طلب عرض سعر", "الكونسيرج", "مناسبة خاصة", "أخرى"],
};

const SUBJECT_LABEL: Record<string, string> = {
  fr: "Type de demande", en: "Request type", zh: "请求类型", ar: "نوع الطلب",
};

// Icônes (stroke doré via currentColor)
const CH_ICON = {
  width: 22, height: 22, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

function IconPhone() {
  return <svg {...CH_ICON}><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.24 1z" /></svg>;
}
function IconWhatsApp() {
  return (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function IconMail() {
  return <svg {...CH_ICON}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
}
function IconMapPin() {
  return <svg {...CH_ICON}><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2.5" /></svg>;
}

const MED_GOLD = { color: "#E8C77E", border: "rgba(201,169,110,0.4)", bg: "rgba(201,169,110,0.08)" };
const MED_GREEN = { color: "#5DCAA5", border: "rgba(93,202,165,0.45)", bg: "rgba(93,202,165,0.1)" };

// Chiffres nets & modernes pour le numéro de téléphone
const NUMBER_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontFeatureSettings: '"lnum" "tnum"',
  fontVariantNumeric: "lining-nums tabular-nums",
  letterSpacing: "0.02em",
};

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "8%", left: "9%", delay: "0s" },
  { top: "16%", left: "85%", delay: "1.2s" },
  { top: "32%", left: "14%", delay: "0.6s" },
  { top: "46%", left: "88%", delay: "1.8s" },
  { top: "60%", left: "8%", delay: "0.9s" },
  { top: "72%", left: "82%", delay: "2.2s" },
  { top: "84%", left: "26%", delay: "1.5s" },
  { top: "90%", left: "64%", delay: "0.3s" },
];

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const dl = c.directLine;
  const requestTypes = REQUEST_TYPES[lang] || REQUEST_TYPES.fr;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "contact" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "block font-sans uppercase mb-2";
  const labelStyle: React.CSSProperties = { fontSize: "11px", letterSpacing: "0.18em", color: "#C9A96E", fontWeight: 600 };

  const mapSrc = "https://www.google.com/maps?q=121%20rue%20de%20Rennes%2C%2075006%20Paris&z=15&output=embed";
  const waHref = `https://wa.me/${c.info.phone.replace(/\D/g, "")}`;

  const channels = [
    { label: dl.phoneLabel, value: c.info.phone, href: "tel:+33698855737", Icon: IconPhone, med: MED_GOLD, isNumber: true, external: false },
    { label: dl.whatsappLabel, value: dl.whatsappValue, href: waHref, Icon: IconWhatsApp, med: MED_GREEN, isNumber: false, external: true },
    { label: dl.emailLabel, value: c.info.email, href: `mailto:${c.info.email}`, Icon: IconMail, med: MED_GOLD, isNumber: false, external: false },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        <div className="detente-spa">
          <div className="detente-spa__halo" aria-hidden="true" />
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          {/* En-tête */}
          <section className="relative text-center px-6" style={{ paddingTop: "150px", paddingBottom: "48px", zIndex: 1 }}>
            <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "16px" }}>
              {c.hero.badge}
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(32px, 5vw, 46px)", lineHeight: 1.1, color: "#FFFFFF" }}>
              {dl.titlePlain}
              <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{dl.titleAccent}</span>
            </h1>
            <p className="mx-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "19px", color: "rgba(232,237,242,0.6)", lineHeight: 1.7, marginTop: "16px", maxWidth: "520px" }}>
              {c.hero.subtitle}
            </p>
          </section>

          {/* 2 colonnes */}
          <section className="relative px-6" style={{ paddingBottom: "72px", zIndex: 1 }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Colonne gauche — canaux */}
              <div className="flex flex-col" style={{ gap: "14px" }}>
                {channels.map((ch) => {
                  const Icon = ch.Icon;
                  return (
                    <a
                      key={ch.label}
                      href={ch.href}
                      className="contact-channel"
                      {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="contact-channel__med" style={{ color: ch.med.color, borderColor: ch.med.border, backgroundColor: ch.med.bg }} aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="flex flex-col" style={{ minWidth: 0 }}>
                        <span className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#C9A96E", marginBottom: "4px" }}>
                          {ch.label}
                        </span>
                        <span className="font-sans" style={{ fontSize: "17px", color: "#FFFFFF", ...(ch.isNumber ? NUMBER_STYLE : {}) }}>
                          {ch.value}
                        </span>
                      </span>
                    </a>
                  );
                })}

                {/* Nos bureaux + carte */}
                <div className="contact-channel" style={{ cursor: "default", flexDirection: "column", alignItems: "stretch", padding: 0, overflow: "hidden" }}>
                  <div className="flex items-center" style={{ gap: "16px", padding: "18px 20px" }}>
                    <span className="contact-channel__med" style={{ color: MED_GOLD.color, borderColor: MED_GOLD.border, backgroundColor: MED_GOLD.bg }} aria-hidden="true">
                      <IconMapPin />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#C9A96E", marginBottom: "4px" }}>
                        {dl.officesLabel}
                      </span>
                      <span className="font-sans" style={{ fontSize: "17px", color: "#FFFFFF" }}>{c.info.address}</span>
                    </span>
                  </div>
                  <iframe
                    title="Carte — LECLERCQ'JET Paris"
                    src={mapSrc}
                    width="100%"
                    height="240"
                    style={{ border: 0, display: "block", filter: "grayscale(0.3) contrast(1.05)", borderTop: "1px solid rgba(201,169,110,0.2)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Colonne droite — formulaire */}
              <div className="contact-form-card">
                <div style={{ position: "relative", zIndex: 1 }}>
                  {status === "success" ? (
                    <div className="text-center py-16">
                      <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(201,169,110,0.06)", borderRadius: "50%" }}>
                        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-serif text-[24px] text-white mb-3">{c.form.successTitle}</h3>
                      <p className="font-sans text-[15px] text-white/60 max-w-xs mx-auto leading-relaxed">{c.form.success}</p>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(26px, 3vw, 32px)", color: "#FFFFFF", lineHeight: 1.15 }}>
                        {dl.formTitle}
                      </h2>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "18px", color: "#E8C77E", marginTop: "6px", marginBottom: "30px" }}>
                        {dl.formLead}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass} style={labelStyle}>{c.form.name}</label>
                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="contact-field font-sans" />
                          </div>
                          <div>
                            <label className={labelClass} style={labelStyle}>{c.form.email}</label>
                            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="contact-field font-sans" />
                          </div>
                        </div>

                        <div>
                          <label className={labelClass} style={labelStyle}>{c.form.phone}</label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="contact-field font-sans" style={NUMBER_STYLE} />
                        </div>

                        <div>
                          <label className={labelClass} style={labelStyle}>{SUBJECT_LABEL[lang] || SUBJECT_LABEL.fr}</label>
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className={`contact-field font-sans ${formData.subject ? "text-white" : "text-white/40"}`}
                            style={{ cursor: "pointer" }}
                          >
                            <option value="" disabled>—</option>
                            {requestTypes.map((s) => (
                              <option key={s} value={s} className="text-text-dark">{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={labelClass} style={labelStyle}>{c.form.message}</label>
                          <textarea
                            rows={5}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder={c.form.messagePlaceholder}
                            className="contact-field font-sans"
                            style={{ resize: "none" }}
                          />
                        </div>

                        {status === "error" && (
                          <p className="font-sans text-[13px] text-red-500">{t.common.formError}</p>
                        )}

                        <button type="submit" disabled={status === "sending"} className="pet-cta" style={{ width: "100%", border: "none", cursor: status === "sending" ? "default" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
                          {status === "sending" ? c.form.sending : dl.formCta}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Signature finale */}
            <p className="text-center" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(28px, 5vw, 48px)", color: "#E8C77E", lineHeight: 1.3, marginTop: "72px" }}>
              Courage, Confidence, Love, Hope
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
