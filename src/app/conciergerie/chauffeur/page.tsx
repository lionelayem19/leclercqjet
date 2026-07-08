"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE · TRANSPORT", en: "CONCIERGE · TRANSPORT", zh: "礼宾 · 交通", ar: "الكونسيرج · النقل",
};
const TITLE: Record<string, string> = {
  fr: "Chauffeur Privé", en: "Private Chauffeur", zh: "专属司机服务", ar: "سائق خاص",
};
const SUBTITLE: Record<string, string> = {
  fr: "Votre trajet commence avant l'embarquement.", en: "Your journey begins before boarding.", zh: "您的旅程在登机前便已开始。", ar: "رحلتك تبدأ قبل الصعود إلى الطائرة.",
};
const ROUTE: Record<string, { home: string; fbo: string; destination: string; legend: string }> = {
  fr: { home: "Domicile", fbo: "Salon FBO", destination: "Destination", legend: "Du point A au point B, sans rupture de service." },
  en: { home: "Home", fbo: "FBO Lounge", destination: "Destination", legend: "From point A to point B, with no break in service." },
  zh: { home: "住所", fbo: "FBO休息室", destination: "目的地", legend: "从A点到B点，服务无缝衔接。" },
  ar: { home: "المنزل", fbo: "صالة FBO", destination: "الوجهة", legend: "من النقطة A إلى النقطة B، دون انقطاع في الخدمة." },
};
const SIGNATURE: Record<string, string> = {
  fr: "De votre porte au tarmac, et bien au-delà.",
  en: "From your door to the tarmac, and far beyond.",
  zh: "从您的家门到停机坪，直至远方。",
  ar: "من بابك إلى المدرج، وأبعد من ذلك بكثير.",
};

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "9%", left: "8%", delay: "0s" },
  { top: "16%", left: "86%", delay: "1.2s" },
  { top: "32%", left: "14%", delay: "0.6s" },
  { top: "44%", left: "88%", delay: "1.8s" },
  { top: "58%", left: "10%", delay: "0.9s" },
  { top: "70%", left: "82%", delay: "2.2s" },
  { top: "82%", left: "26%", delay: "1.5s" },
  { top: "90%", left: "62%", delay: "0.3s" },
];

const ICON = {
  width: 24, height: 24, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

// Icônes itinéraire
function IconHome() {
  return <svg {...ICON}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>;
}
function IconPlane() {
  return <svg {...ICON}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>;
}
function IconMapPin() {
  return <svg {...ICON}><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2.5" /></svg>;
}
function IconCar() {
  return <svg {...ICON} width={18} height={18}><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" /><path d="M4 11h16v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="14" r="0.6" /><circle cx="16.5" cy="14" r="0.6" /></svg>;
}

// Icônes des 6 prestations
function IconClock() {
  return <svg {...ICON}><circle cx="12" cy="12" r="9" /><path d="M12 7v5h4" /></svg>;
}
function IconBatteryCharging() {
  return <svg {...ICON}><path d="M7 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4" /><path d="M15 7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4" /><path d="M21 11v2" /><path d="M11 8l-2 4h3l-2 4" /></svg>;
}
function IconEyeOff() {
  return <svg {...ICON}><path d="M3 3l18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.4 5.2A9 9 0 0 1 12 5c6 0 9 7 9 7a15 15 0 0 1-2.2 3.2" /><path d="M6.1 6.6A15 15 0 0 0 3 12s3 7 9 7a9 9 0 0 0 3.6-.8" /></svg>;
}
function IconDoor() {
  return <svg {...ICON}><path d="M4 21h16" /><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" /><path d="M14 12h.01" /></svg>;
}
function IconStairs() {
  return <svg {...ICON}><path d="M4 20h4v-4h4v-4h4v-4h4V4" /></svg>;
}
function IconMoon() {
  return <svg {...ICON}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;
}

const FEATURE_ICONS = [IconClock, IconBatteryCharging, IconEyeOff, IconDoor, IconStairs, IconMoon];

const FEATURES: Record<string, { icon: string; title: string; desc: string }[]> = {
  fr: [
    { icon: "◆", title: "Ponctualité absolue", desc: "Vos chauffeurs suivent vos horaires de vol en temps réel. Aucun imprévu ne vous retardera." },
    { icon: "◆", title: "Flotte électrique haut de gamme", desc: "Une flotte 100% électrique haut de gamme, sélectionnée pour son confort, son raffinement et son silence. Un déplacement à la hauteur de votre exigence, sans compromettre notre engagement environnemental." },
    { icon: "◆", title: "Discrétion et confidentialité", desc: "Nos chauffeurs sont formés à la discrétion. Vos déplacements restent strictement privés." },
    { icon: "◆", title: "Prise en charge à domicile", desc: "Du départ de votre résidence jusqu'au salon FBO, sans rupture de service." },
    { icon: "◆", title: "Accueil à l'arrivée", desc: "À votre descente d'avion, votre véhicule vous attend au pied de la passerelle." },
    { icon: "◆", title: "Disponibilité 24h/24", desc: "Nuit, week-end, jours fériés, notre service de chauffeur ne connaît pas d'horaires." },
  ],
  en: [
    { icon: "◆", title: "Absolute punctuality", desc: "Your chauffeurs track your flight schedule in real time. No unexpected delays." },
    { icon: "◆", title: "Premium electric fleet", desc: "A premium, all-electric fleet, selected for its comfort, refinement and silence. Travel worthy of your standards, without compromising our environmental commitment." },
    { icon: "◆", title: "Discretion & confidentiality", desc: "Our chauffeurs are trained in discretion. Your movements remain strictly private." },
    { icon: "◆", title: "Home pickup", desc: "From your residence to the FBO lounge, with no service interruption." },
    { icon: "◆", title: "Arrival greeting", desc: "As you disembark, your vehicle is waiting at the foot of the steps." },
    { icon: "◆", title: "24/7 availability", desc: "Night, weekend, public holidays. Our chauffeur service has no schedule." },
  ],
  zh: [
    { icon: "◆", title: "绝对准时", desc: "您的司机实时跟踪您的飞行时刻表，确保无任何意外延误。" },
    { icon: "◆", title: "高端电动车队", desc: "百分百高端电动车队，因其舒适、精致与静谧而甄选。让每一段旅程都不负您的要求，同时坚守我们的环保承诺。" },
    { icon: "◆", title: "低调与保密", desc: "我们的司机经过严格的保密培训，您的行程绝对私密。" },
    { icon: "◆", title: "上门接送", desc: "从您的住所直达FBO贵宾休息室，服务无缝衔接。" },
    { icon: "◆", title: "抵达迎接", desc: "下飞机时，您的座驾已在舷梯旁等候。" },
    { icon: "◆", title: "全天候服务", desc: "夜间、周末、节假日，我们的司机服务随时待命。" },
  ],
  ar: [
    { icon: "◆", title: "الالتزام بالمواعيد", desc: "يتتبع سائقوك جدول رحلاتك في الوقت الحقيقي، دون أي تأخير." },
    { icon: "◆", title: "أسطول كهربائي فاخر", desc: "أسطول كهربائي بالكامل وفاخر، مختار لراحته ورقيّه وهدوئه. تنقّل يليق بمتطلباتك دون المساس بالتزامنا البيئي." },
    { icon: "◆", title: "التكتم والسرية", desc: "سائقونا مدربون على التكتم التام. تنقلاتك تبقى خاصة تماماً." },
    { icon: "◆", title: "الاستقبال من المنزل", desc: "من منزلك حتى صالة FBO، دون أي انقطاع في الخدمة." },
    { icon: "◆", title: "الاستقبال عند الوصول", desc: "فور نزولك من الطائرة، سيارتك تنتظرك عند سلم الطائرة." },
    { icon: "◆", title: "متاح على مدار الساعة", desc: "ليلاً، نهاية الأسبوع، أيام العطل. خدمة السائق لا تعرف أوقات العمل." },
  ],
};

const FORM_LABELS: Record<string, Record<string, string>> = {
  fr: {
    title: "Réserver un chauffeur",
    name: "Nom complet", email: "Email", phone: "Téléphone",
    date: "Date du vol", pickup: "Lieu de prise en charge", destination: "Destination",
    message: "Informations complémentaires", submit: "ENVOYER LA DEMANDE",
    success: "Votre demande a bien été envoyée.",
  },
  en: {
    title: "Book a chauffeur",
    name: "Full name", email: "Email", phone: "Phone",
    date: "Flight date", pickup: "Pickup location", destination: "Destination",
    message: "Additional information", submit: "SEND REQUEST",
    success: "Your request has been sent.",
  },
  zh: {
    title: "预订司机服务",
    name: "全名", email: "电子邮件", phone: "电话",
    date: "飞行日期", pickup: "接送地点", destination: "目的地",
    message: "附加信息", submit: "发送请求",
    success: "您的请求已成功发送。",
  },
  ar: {
    title: "احجز سائقاً",
    name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
    date: "تاريخ الرحلة", pickup: "موقع الاستلام", destination: "الوجهة",
    message: "معلومات إضافية", submit: "إرسال الطلب",
    success: "تم إرسال طلبك بنجاح.",
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

export default function ChauffeurPage() {
  const { lang } = useLanguage();
  const features = FEATURES[lang] || FEATURES.fr;
  const route = ROUTE[lang] || ROUTE.fr;
  const f = FORM_LABELS[lang] || FORM_LABELS.fr;

  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", pickup: "", destination: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "chauffeur", ...form }),
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
            src="/images/chauffeur.webp"
            alt="Chauffeur Privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.72)" }} />
          <div className="relative z-10 flex flex-col justify-end h-full" style={{ padding: "0 8% 64px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {BADGE[lang] || BADGE.fr}
              </p>
              <h1 className="font-serif text-white" style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1, marginBottom: "16px" }}>
                {TITLE[lang] || TITLE.fr}
              </h1>
              <p className="font-sans" style={{ fontSize: "17px", color: "rgba(232,237,242,0.7)", maxWidth: "560px", lineHeight: 1.7 }}>
                {SUBTITLE[lang] || SUBTITLE.fr}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ambiance transport continue — itinéraire + prestations + formulaire (100% CSS pur) */}
        <div className="detente-spa">
          {/* Halo lumineux central */}
          <div className="detente-spa__halo" aria-hidden="true" />
          {/* Étoiles scintillantes */}
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          {/* Itinéraire + prestations */}
          <section className="relative" style={{ padding: "88px 6%", zIndex: 1 }}>
            <div className="max-w-6xl mx-auto">
              {/* En-tête */}
              <div className="text-center mx-auto" style={{ maxWidth: "720px", marginBottom: "48px" }}>
                <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "16px" }}>
                  {BADGE[lang] || BADGE.fr}
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, color: "#FFFFFF" }}>
                  {TITLE[lang] || TITLE.fr}
                </h2>
                <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 2.2vw, 22px)", color: "#E8C77E", marginTop: "12px" }}>
                  {SUBTITLE[lang] || SUBTITLE.fr}
                </p>
              </div>

              {/* Carte d'itinéraire porte-à-porte */}
              <div className="route-card" style={{ marginBottom: "56px" }}>
                <div className="route">
                  {[
                    { Icon: IconHome, label: route.home },
                    { Icon: IconPlane, label: route.fbo },
                    { Icon: IconMapPin, label: route.destination },
                  ].map((step, i, arr) => {
                    const StepIcon = step.Icon;
                    return (
                      <Fragment key={i}>
                        <div className="route-step">
                          <span className="el-medallion" style={{ width: "54px", height: "54px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", margin: 0 }}>
                            <StepIcon />
                          </span>
                          <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "16px", color: "#FFFFFF" }}>
                            {step.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="route-link" aria-hidden="true">
                            <span className="route-link__car"><IconCar /></span>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
                <p className="text-center" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "15px", color: "rgba(232,199,126,0.85)", marginTop: "28px" }}>
                  {route.legend}
                </p>
              </div>

              {/* Les 6 prestations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feat, i) => {
                  const Icon = FEATURE_ICONS[i] ?? FEATURE_ICONS[0];
                  return (
                    <div key={i} className="el-card" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", padding: "36px 28px", textAlign: "center" }}>
                      <div className="el-medallion" style={{ width: "54px", height: "54px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "20px" }} aria-hidden="true">
                        <Icon />
                      </div>
                      <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "20px", lineHeight: 1.3, color: "#FFFFFF" }}>
                        {feat.title}
                      </h3>
                      <div className="el-goldline" />
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Signature finale */}
              <p className="text-center mx-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 28px)", color: "#E8C77E", lineHeight: 1.4, maxWidth: "640px", marginTop: "56px" }}>
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
                <p className="font-sans" style={{ color: "#C9A96E", fontSize: "15px", letterSpacing: "0.05em" }}>
                  {f.success}
                </p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required style={INPUT_STYLE} placeholder={f.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input required type="email" style={INPUT_STYLE} placeholder={f.email} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input style={INPUT_STYLE} placeholder={f.phone} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    <input type="date" style={INPUT_STYLE} placeholder={f.date} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <input style={INPUT_STYLE} placeholder={f.pickup} value={form.pickup} onChange={e => setForm({ ...form, pickup: e.target.value })} />
                  <input style={INPUT_STYLE} placeholder={f.destination} value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} />
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
