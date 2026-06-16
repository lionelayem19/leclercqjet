"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE — GASTRONOMIE", en: "CONCIERGE — GASTRONOMY", zh: "礼宾 — 美食", ar: "الكونسيرج — الطعام",
};
const TITLE: Record<string, string> = {
  fr: "Gastronomie & Personnalisation", en: "Gastronomy & Personalisation", zh: "美食与个性化服务", ar: "الطعام الفاخر والتخصيص",
};
const SUBTITLE: Record<string, string> = {
  fr: "L'excellence culinaire à trente mille pieds.", en: "Culinary excellence at thirty thousand feet.", zh: "三万英尺高空的烹饪艺术。", ar: "التميز الطهوي على ارتفاع ثلاثين ألف قدم.",
};

const SERVICES: Record<string, { title: string; desc: string }[]> = {
  fr: [
    { title: "Menus sur mesure", desc: "Chaque repas est conçu selon vos goûts, vos contraintes alimentaires et la durée de votre vol." },
    { title: "Chefs étoilés", desc: "Nous collaborons avec des chefs reconnus pour créer des expériences gastronomiques uniques à bord." },
    { title: "Cave à bord", desc: "Sélection de grands crus, champagnes et spiritueux choisis pour accompagner chaque occasion." },
    { title: "Décoration de table", desc: "Nappe en lin, porcelaine fine, cristal — la table dressée selon vos souhaits avant le décollage." },
    { title: "Plateaux de luxe", desc: "Foie gras, caviar, homard, truffes — disponibles à la demande pour sublimer vos vols d'affaires ou de loisirs." },
    { title: "Thèmes & occasions", desc: "Anniversaires, propositions, dîners romantiques — chaque célébration mérite un cadre exceptionnel." },
  ],
  en: [
    { title: "Bespoke menus", desc: "Every meal is designed around your tastes, dietary requirements and flight duration." },
    { title: "Starred chefs", desc: "We collaborate with acclaimed chefs to create unique gastronomic experiences onboard." },
    { title: "Onboard cellar", desc: "Selection of grand crus, champagnes and spirits chosen to complement every occasion." },
    { title: "Table decoration", desc: "Linen tablecloth, fine porcelain, crystal — the table set to your wishes before takeoff." },
    { title: "Luxury platters", desc: "Foie gras, caviar, lobster, truffles — available on request to elevate your flights." },
    { title: "Themes & occasions", desc: "Birthdays, proposals, romantic dinners — every celebration deserves an exceptional setting." },
  ],
  zh: [
    { title: "定制菜单", desc: "每一道菜都根据您的口味、饮食要求和飞行时长精心设计。" },
    { title: "米其林大厨", desc: "我们与知名大厨合作，在机舱内打造独一无二的美食体验。" },
    { title: "机载酒窖", desc: "精选名庄葡萄酒、香槟及烈酒，为每个场合锦上添花。" },
    { title: "餐桌布置", desc: "亚麻桌布、精美瓷器、水晶器皿——按您的心意在起飞前布置完毕。" },
    { title: "豪华拼盘", desc: "鹅肝、鱼子酱、龙虾、松露——应您要求，让每次飞行都成为美食之旅。" },
    { title: "主题与特殊场合", desc: "生日、求婚、浪漫晚餐——每一个庆典都值得一个非凡的舞台。" },
  ],
  ar: [
    { title: "قوائم طعام مخصصة", desc: "كل وجبة مصممة وفق أذواقك ومتطلباتك الغذائية ومدة رحلتك." },
    { title: "طهاة نجوم ميشلان", desc: "نتعاون مع طهاة مشهورين لخلق تجارب طهو فريدة على متن الطائرة." },
    { title: "خزانة نبيذ على المتن", desc: "تشكيلة من أجود النبيذ والشمبانيا والمشروبات الروحية لكل مناسبة." },
    { title: "تزيين الطاولة", desc: "مفرش كتاني، خزف فاخر، كريستال — الطاولة مُرتَّبة وفق رغباتك قبل الإقلاع." },
    { title: "أطباق فاخرة", desc: "كبد الإوز، الكافيار، الكركند، الكمأ — متاحة عند الطلب لرفع مستوى رحلاتك." },
    { title: "مناسبات وتصاميم خاصة", desc: "أعياد الميلاد، خطوبة، عشاء رومانسي — كل احتفال يستحق إطاراً استثنائياً." },
  ],
};

const FORM_LABELS: Record<string, Record<string, string>> = {
  fr: {
    title: "Personnaliser votre expérience",
    name: "Nom complet", email: "Email", phone: "Téléphone",
    date: "Date du vol", passengers: "Nombre de passagers", occasion: "Occasion (anniversaire, affaires…)",
    dietary: "Préférences ou restrictions alimentaires", message: "Détails supplémentaires",
    submit: "ENVOYER LA DEMANDE", success: "Votre demande a bien été envoyée.",
  },
  en: {
    title: "Personalise your experience",
    name: "Full name", email: "Email", phone: "Phone",
    date: "Flight date", passengers: "Number of passengers", occasion: "Occasion (birthday, business…)",
    dietary: "Dietary preferences or restrictions", message: "Additional details",
    submit: "SEND REQUEST", success: "Your request has been sent.",
  },
  zh: {
    title: "定制您的体验",
    name: "全名", email: "电子邮件", phone: "电话",
    date: "飞行日期", passengers: "乘客人数", occasion: "场合（生日、商务……）",
    dietary: "饮食偏好或限制", message: "更多详情",
    submit: "发送请求", success: "您的请求已成功发送。",
  },
  ar: {
    title: "خصّص تجربتك",
    name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
    date: "تاريخ الرحلة", passengers: "عدد الركاب", occasion: "المناسبة (عيد ميلاد، أعمال…)",
    dietary: "التفضيلات أو القيود الغذائية", message: "تفاصيل إضافية",
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

export default function ConciergerieGastronomie() {
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
        body: JSON.stringify({ type: "gastronomie", ...form }),
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
            src="/images/cabine.png"
            alt="Gastronomie à bord"
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
              <p className="font-sans" style={{ fontSize: "17px", color: "rgba(232,237,242,0.7)", maxWidth: "560px", lineHeight: 1.7 }}>
                {SUBTITLE[lang] || SUBTITLE.fr}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section style={{ padding: "80px 8%" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  style={{
                    backgroundColor: "#0D1E35",
                    border: "1px solid rgba(201,169,110,0.15)",
                    padding: "28px 24px",
                  }}
                >
                  <p className="font-sans text-white mb-3" style={{ fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600 }}>
                    {svc.title}
                  </p>
                  <p className="font-sans" style={{ fontSize: "13px", color: "rgba(232,237,242,0.5)", lineHeight: 1.8 }}>
                    {svc.desc}
                  </p>
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
      </main>
      <Footer />
    </>
  );
}
