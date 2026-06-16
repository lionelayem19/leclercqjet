"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE — TRANSPORT", en: "CONCIERGE — TRANSPORT", zh: "礼宾 — 交通", ar: "الكونسيرج — النقل",
};
const TITLE: Record<string, string> = {
  fr: "Chauffeur Privé", en: "Private Chauffeur", zh: "专属司机服务", ar: "سائق خاص",
};
const SUBTITLE: Record<string, string> = {
  fr: "Votre trajet commence avant l'embarquement.", en: "Your journey begins before boarding.", zh: "您的旅程在登机前便已开始。", ar: "رحلتك تبدأ قبل الصعود إلى الطائرة.",
};

const FEATURES: Record<string, { icon: string; title: string; desc: string }[]> = {
  fr: [
    { icon: "◆", title: "Ponctualité absolue", desc: "Vos chauffeurs suivent vos horaires de vol en temps réel. Aucun imprévu ne vous retardera." },
    { icon: "◆", title: "Flotte haut de gamme", desc: "Mercedes Classe S, BMW Série 7, Range Rover — des véhicules adaptés à votre image." },
    { icon: "◆", title: "Discrétion et confidentialité", desc: "Nos chauffeurs sont formés à la discrétion. Vos déplacements restent strictement privés." },
    { icon: "◆", title: "Prise en charge à domicile", desc: "Du départ de votre résidence jusqu'au salon FBO, sans rupture de service." },
    { icon: "◆", title: "Accueil à l'arrivée", desc: "À votre descente d'avion, votre véhicule vous attend au pied de la passerelle." },
    { icon: "◆", title: "Disponibilité 24h/24", desc: "Nuit, week-end, jours fériés — notre service de chauffeur ne connaît pas d'horaires." },
  ],
  en: [
    { icon: "◆", title: "Absolute punctuality", desc: "Your chauffeurs track your flight schedule in real time. No unexpected delays." },
    { icon: "◆", title: "Premium fleet", desc: "Mercedes S-Class, BMW 7 Series, Range Rover — vehicles that match your image." },
    { icon: "◆", title: "Discretion & confidentiality", desc: "Our chauffeurs are trained in discretion. Your movements remain strictly private." },
    { icon: "◆", title: "Home pickup", desc: "From your residence to the FBO lounge, with no service interruption." },
    { icon: "◆", title: "Arrival greeting", desc: "As you disembark, your vehicle is waiting at the foot of the steps." },
    { icon: "◆", title: "24/7 availability", desc: "Night, weekend, public holidays — our chauffeur service has no schedule." },
  ],
  zh: [
    { icon: "◆", title: "绝对准时", desc: "您的司机实时跟踪您的飞行时刻表，确保无任何意外延误。" },
    { icon: "◆", title: "豪华车队", desc: "梅赛德斯S级、宝马7系、路虎揽胜——与您形象相匹配的座驾。" },
    { icon: "◆", title: "低调与保密", desc: "我们的司机经过严格的保密培训，您的行程绝对私密。" },
    { icon: "◆", title: "上门接送", desc: "从您的住所直达FBO贵宾休息室，服务无缝衔接。" },
    { icon: "◆", title: "抵达迎接", desc: "下飞机时，您的座驾已在舷梯旁等候。" },
    { icon: "◆", title: "全天候服务", desc: "夜间、周末、节假日——我们的司机服务随时待命。" },
  ],
  ar: [
    { icon: "◆", title: "الالتزام بالمواعيد", desc: "يتتبع سائقوك جدول رحلاتك في الوقت الحقيقي، دون أي تأخير." },
    { icon: "◆", title: "أسطول فاخر", desc: "مرسيدس الفئة S، BMW الفئة 7، رنج روفر — مركبات تليق بمكانتك." },
    { icon: "◆", title: "التكتم والسرية", desc: "سائقونا مدربون على التكتم التام. تنقلاتك تبقى خاصة تماماً." },
    { icon: "◆", title: "الاستقبال من المنزل", desc: "من منزلك حتى صالة FBO، دون أي انقطاع في الخدمة." },
    { icon: "◆", title: "الاستقبال عند الوصول", desc: "فور نزولك من الطائرة، سيارتك تنتظرك عند سلم الطائرة." },
    { icon: "◆", title: "متاح على مدار الساعة", desc: "ليلاً، نهاية الأسبوع، أيام العطل — خدمة السائق لا تعرف أوقات العمل." },
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

        {/* Features */}
        <section style={{ padding: "80px 8%" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex gap-5"
                >
                  <span style={{ color: "#C9A96E", fontSize: "8px", marginTop: "6px", flexShrink: 0 }}>{feat.icon}</span>
                  <div>
                    <p className="font-sans text-white mb-2" style={{ fontSize: "13px", letterSpacing: "0.1em", fontWeight: 600 }}>
                      {feat.title}
                    </p>
                    <p className="font-sans" style={{ fontSize: "14px", color: "rgba(232,237,242,0.55)", lineHeight: 1.8 }}>
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section style={{ padding: "0 8% 100px" }}>
          <div className="max-w-2xl mx-auto">
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "60px" }}>
              <h2 className="font-serif text-white mb-8" style={{ fontSize: "32px" }}>
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
      </main>
      <Footer />
    </>
  );
}
