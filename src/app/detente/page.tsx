"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE · DÉTENTE", en: "CONCIERGE · RELAXATION", zh: "礼宾 · 放松", ar: "الكونسيرج · الاسترخاء",
};
const TITLE: Record<string, string> = {
  fr: "Détente & Relaxation", en: "Relaxation & Wellness", zh: "放松与休闲", ar: "الاسترخاء والراحة",
};
const SUBTITLE: Record<string, string> = {
  fr: "Le calme, à douze mille mètres.", en: "Serenity, at thirty thousand feet.", zh: "三万英尺高空的宁静。", ar: "السكينة على ارتفاع ثلاثين ألف قدم.",
};
const SIGNATURE: Record<string, string> = {
  fr: "Descendez en altitude, montez en sérénité.",
  en: "Descend in altitude, rise in serenity.",
  zh: "下降高度，提升宁静。",
  ar: "انزل في الارتفاع، وارتقِ في الصفاء.",
};

// Icônes spa (stroke doré)
const SPA_ICON = {
  width: 26, height: 26, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

function IconSparkles() {
  return <svg {...SPA_ICON}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>;
}
function IconHandFinger() {
  return <svg {...SPA_ICON}><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M14 12V6a1.5 1.5 0 0 1 3 0v7" /><path d="M17 9a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.2-3l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L8 14" /></svg>;
}
function IconMoonStars() {
  return <svg {...SPA_ICON}><path d="M17 12.5A6 6 0 1 1 11.5 6 4.5 4.5 0 0 0 17 12.5z" /><path d="M17 3l.5 1.5L19 5l-1.5.5L17 7l-.5-1.5L15 5l1.5-.5z" /><path d="M20.5 8.5l.35 1.05L22 9.9l-1.05.35L20.5 11.3l-.35-1.05L19.1 9.9l1.05-.35z" /></svg>;
}

const SERVICE_ICONS = [IconSparkles, IconHandFinger, IconMoonStars];

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "8%", left: "8%", delay: "0s" },
  { top: "15%", left: "86%", delay: "1.2s" },
  { top: "26%", left: "16%", delay: "0.6s" },
  { top: "38%", left: "84%", delay: "1.8s" },
  { top: "46%", left: "12%", delay: "0.9s" },
  { top: "52%", left: "58%", delay: "2.2s" },
  { top: "22%", left: "52%", delay: "1.5s" },
  { top: "44%", left: "38%", delay: "0.3s" },
  { top: "64%", left: "80%", delay: "1.0s" },
  { top: "72%", left: "20%", delay: "2.0s" },
  { top: "84%", left: "64%", delay: "0.5s" },
  { top: "90%", left: "34%", delay: "1.6s" },
];

const SERVICES: Record<string, { title: string; desc: string }[]> = {
  fr: [
    { title: "Spa Privé en Altitude", desc: "Soins du visage, rituels d'hydratation et cosmétiques d'exception sélectionnés parmi les plus grandes maisons. Un institut suspendu entre ciel et terre, pour vous seul." },
    { title: "Massage & Bien-être", desc: "Un praticien diplômé vous accompagne à bord pour un massage relaxant, drainant ou anti-jet-lag. Arriver reposé n'est plus un luxe, c'est votre standard." },
    { title: "Ambiance Zen", desc: "Lumière tamisée, parfums d'ambiance sur mesure, playlist méditative et aromathérapie. Chaque détail sensoriel est orchestré pour transformer le vol en parenthèse de sérénité." },
  ],
  en: [
    { title: "Private Spa at Altitude", desc: "Facials, hydration rituals and exceptional cosmetics selected from the finest houses. A spa suspended between sky and earth, for you alone." },
    { title: "Massage & Wellness", desc: "A qualified practitioner accompanies you onboard for a relaxing, draining or anti-jet-lag massage. Arriving rested is no longer a luxury, it's your standard." },
    { title: "Zen Atmosphere", desc: "Dimmed lighting, bespoke ambient fragrances, a meditative playlist and aromatherapy. Every sensory detail is orchestrated to turn the flight into a parenthesis of serenity." },
  ],
  zh: [
    { title: "高空私人水疗", desc: "面部护理、补水仪式及甄选自顶级品牌的护肤品。一座悬于天地之间、专属于您的水疗空间。" },
    { title: "按摩与养生", desc: "专业理疗师在机舱内为您提供放松、排淋巴或抗时差按摩。神清气爽地抵达，不再是奢侈，而是您的标准。" },
    { title: "禅意氛围", desc: "柔和灯光、定制香氛、冥想歌单与芳香疗法。每一处感官细节都经过精心编排，将飞行化为宁静的片刻。" },
  ],
  ar: [
    { title: "سبا خاص على الارتفاع", desc: "عناية بالوجه، طقوس ترطيب ومستحضرات استثنائية مختارة من أرقى الدور. واحة سبا معلّقة بين السماء والأرض، لك وحدك." },
    { title: "تدليك واستجمام", desc: "أخصائي مؤهل يرافقك على المتن لتدليك مريح أو مصرّف أو مضاد لاضطراب الرحلات. الوصول مرتاحاً لم يعد رفاهية، بل معيارك." },
    { title: "أجواء زِن", desc: "إضاءة خافتة، عطور أجواء مخصصة، قائمة تشغيل تأملية والعلاج بالروائح. كل تفصيلة حسية منسّقة لتحويل الرحلة إلى لحظة صفاء." },
  ],
};

const FORM_LABELS: Record<string, Record<string, string>> = {
  fr: {
    title: "Personnaliser votre expérience détente",
    name: "Nom complet", email: "Email", phone: "Téléphone",
    date: "Date du vol", passengers: "Nombre de passagers", occasion: "Type de détente souhaitée (spa, massage…)",
    dietary: "Préférences ou besoins particuliers", message: "Détails supplémentaires",
    submit: "ENVOYER LA DEMANDE", success: "Votre demande a bien été envoyée.",
  },
  en: {
    title: "Personalise your relaxation experience",
    name: "Full name", email: "Email", phone: "Phone",
    date: "Flight date", passengers: "Number of passengers", occasion: "Type of relaxation (spa, massage…)",
    dietary: "Preferences or special needs", message: "Additional details",
    submit: "SEND REQUEST", success: "Your request has been sent.",
  },
  zh: {
    title: "定制您的放松体验",
    name: "全名", email: "电子邮件", phone: "电话",
    date: "飞行日期", passengers: "乘客人数", occasion: "放松类型（水疗、按摩……）",
    dietary: "偏好或特殊需求", message: "更多详情",
    submit: "发送请求", success: "您的请求已成功发送。",
  },
  ar: {
    title: "خصّص تجربة استرخائك",
    name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
    date: "تاريخ الرحلة", passengers: "عدد الركاب", occasion: "نوع الاسترخاء (سبا، تدليك…)",
    dietary: "التفضيلات أو الاحتياجات الخاصة", message: "تفاصيل إضافية",
    submit: "إرسال الطلب", success: "تم إرسال طلبك بنجاح.",
  },
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(201,169,110,0.2)",
  color: "#E8EDF2",
  padding: "12px 16px",
  fontSize: "13px",
  fontFamily: "inherit",
  outline: "none",
};

export default function ConciergerieDetente() {
  const { lang } = useLanguage();
  const services = SERVICES[lang] || SERVICES.fr;
  const f = FORM_LABELS[lang] || FORM_LABELS.fr;

  const [form, setForm] = useState({ name: "", email: "", phone: "", flightDate: "", passengers: "", occasion: "", dietary: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "detente", ...form }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A1628", minHeight: "100vh" }}>

        {/* Hero */}
        <section className="relative" style={{ height: "520px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1600&q=80"
            alt="Intérieur de cabine de jet privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.65)" }} />
          <div className="relative z-10 flex flex-col justify-end h-full" style={{ padding: "0 8% 64px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {BADGE[lang] || BADGE.fr}
              </p>
              <h1 className="font-serif text-white" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1, marginBottom: "16px" }}>
                {TITLE[lang] || TITLE.fr}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.4vw, 26px)",
                  color: "#C9A96E",
                  lineHeight: 1.4,
                  letterSpacing: "0.02em",
                  maxWidth: "560px",
                }}
              >
                {SUBTITLE[lang] || SUBTITLE.fr}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ambiance spa continue — prestations + formulaire partagent le même fond (100% CSS pur) */}
        <div className="detente-spa">
          {/* Halo lumineux central */}
          <div className="detente-spa__halo" aria-hidden="true" />
          {/* Étoiles scintillantes */}
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          {/* Prestations */}
          <section className="relative" style={{ padding: "88px 6%", zIndex: 1 }}>
          <div className="relative" style={{ zIndex: 1 }}>
            {/* En-tête */}
            <div className="text-center mx-auto" style={{ maxWidth: "720px", marginBottom: "56px" }}>
              <p
                className="uppercase"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "16px" }}
              >
                {BADGE[lang] || BADGE.fr}
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 50px)", lineHeight: 1.1, color: "#FFFFFF" }}>
                {TITLE[lang] || TITLE.fr}
              </h2>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 2.2vw, 24px)", color: "#E8C77E", lineHeight: 1.4, marginTop: "14px" }}>
                {SUBTITLE[lang] || SUBTITLE.fr}
              </p>
              <div className="detente-vline" aria-hidden="true" />
            </div>

            {/* 3 grandes cartes empilées */}
            <div className="mx-auto flex flex-col" style={{ maxWidth: "720px", gap: "14px" }}>
              {services.map((svc, i) => {
                const Icon = SERVICE_ICONS[i] ?? SERVICE_ICONS[0];
                return (
                  <div key={i} className="spa-card">
                    <span className="spa-card__num" aria-hidden="true">{`0${i + 1}`}</span>
                    <div className="spa-card__body">
                      <div className="flex items-center" style={{ gap: "14px", marginBottom: "12px" }}>
                        <span className="spa-card__icon" aria-hidden="true"><Icon /></span>
                        <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, color: "#FFFFFF" }}>
                          {svc.title}
                        </h3>
                      </div>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "17px", color: "rgba(232,237,242,0.65)", lineHeight: 1.7 }}>
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Signature finale */}
            <p
              className="text-center mx-auto"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 28px)", color: "#E8C77E", lineHeight: 1.4, maxWidth: "640px", marginTop: "56px" }}
            >
              {SIGNATURE[lang] || SIGNATURE.fr}
            </p>
          </div>
        </section>

        {/* Formulaire — même ambiance continue */}
          <section className="relative" style={{ padding: "0 8% 100px", zIndex: 1 }}>
          <div className="max-w-2xl mx-auto">
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "60px" }}>
              <h2 className="title-gold font-serif text-white mb-8" style={{ fontSize: "32px" }}>
                {f.title}
              </h2>

              {sent ? (
                <p className="font-sans" style={{ color: "#C9A96E", fontSize: "15px" }}>{f.success}</p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required style={INPUT_STYLE} placeholder={f.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input required type="email" style={INPUT_STYLE} placeholder={f.email} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input style={INPUT_STYLE} placeholder={f.phone} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    <input type="date" style={INPUT_STYLE} value={form.flightDate} onChange={e => setForm({ ...form, flightDate: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input style={INPUT_STYLE} placeholder={f.passengers} value={form.passengers} onChange={e => setForm({ ...form, passengers: e.target.value })} />
                    <input style={INPUT_STYLE} placeholder={f.occasion} value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} />
                  </div>
                  <input style={INPUT_STYLE} placeholder={f.dietary} value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })} />
                  <textarea
                    rows={4}
                    style={{ ...INPUT_STYLE, resize: "none" }}
                    placeholder={f.message}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="font-sans uppercase"
                    style={{
                      backgroundColor: "#C9A96E",
                      color: "#0A1628",
                      border: "none",
                      padding: "14px 32px",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      fontWeight: 700,
                      cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.7 : 1,
                      alignSelf: "flex-start",
                    }}
                  >
                    {sending ? "…" : f.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
