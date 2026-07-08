"use client";

import { Fragment, useState } from "react";
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
const MENU_EYEBROW: Record<string, string> = {
  fr: "LECLERCQ'JET · À BORD", en: "LECLERCQ'JET · ON BOARD", zh: "LECLERCQ'JET · 机上", ar: "LECLERCQ'JET · على المتن",
};
const MENU_TITLE: Record<string, string> = {
  fr: "La Carte", en: "The Menu", zh: "菜单", ar: "القائمة",
};
const MENU_SIGNATURE: Record<string, string> = {
  fr: "Le goût de l'exception, jusque dans les nuages.",
  en: "The taste of exception, all the way to the clouds.",
  zh: "卓越之味，直抵云端。",
  ar: "مذاق الاستثناء، حتى في السحاب.",
};

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "10%", left: "9%", delay: "0s" },
  { top: "18%", left: "85%", delay: "1.2s" },
  { top: "34%", left: "14%", delay: "0.6s" },
  { top: "48%", left: "88%", delay: "1.8s" },
  { top: "62%", left: "10%", delay: "0.9s" },
  { top: "76%", left: "82%", delay: "2.2s" },
  { top: "84%", left: "28%", delay: "1.5s" },
  { top: "90%", left: "66%", delay: "0.3s" },
];

// Icônes du menu (stroke doré)
const MENU_ICON = {
  width: 22, height: 22, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

function IconToolsKitchen() {
  return <svg {...MENU_ICON}><path d="M7 3v7a2 2 0 0 0 4 0V3" /><path d="M9 10v11" /><path d="M16 3c-1.6 1.6-2 4-2 7 0 2 1 3 2 3v8" /></svg>;
}
function IconChefHat() {
  return <svg {...MENU_ICON}><path d="M6 12a3 3 0 0 1-1-5.8A3.5 3.5 0 0 1 12 5a3.5 3.5 0 0 1 7 .2A3 3 0 0 1 18 12z" /><path d="M6 12v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7" /><path d="M9 16h6" /></svg>;
}
function IconGlassFull() {
  return <svg {...MENU_ICON}><path d="M8 3h8l-1 7a3 3 0 0 1-6 0z" /><path d="M8.4 7h7.2" /><path d="M12 13v6" /><path d="M9 21h6" /></svg>;
}
function IconGlassChampagne() {
  return <svg {...MENU_ICON}><path d="M10 3h4l-.6 8a1.4 1.4 0 0 1-2.8 0z" /><path d="M12 13v6" /><path d="M9.5 21h5" /></svg>;
}
function IconAward() {
  return <svg {...MENU_ICON}><circle cx="12" cy="9" r="6" /><path d="M9 14.5 7.5 21l4.5-2.6 4.5 2.6L15 14.5" /></svg>;
}
function IconHeart() {
  return <svg {...MENU_ICON}><path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" /></svg>;
}

const MENU_ICONS = [IconToolsKitchen, IconChefHat, IconGlassFull, IconGlassChampagne, IconAward, IconHeart];

const SERVICES: Record<string, { title: string; desc: string }[]> = {
  fr: [
    { title: "Menus sur mesure", desc: "Chaque repas est conçu selon vos goûts, vos contraintes alimentaires et la durée de votre vol." },
    { title: "Chefs étoilés", desc: "Nous collaborons avec des chefs reconnus pour créer des expériences gastronomiques uniques à bord." },
    { title: "Cave à bord", desc: "Sélection de grands crus, champagnes et spiritueux choisis pour accompagner chaque occasion." },
    { title: "Décoration de table", desc: "Nappe en lin, porcelaine fine, cristal. La table dressée selon vos souhaits avant le décollage." },
    { title: "Plateaux de luxe", desc: "Foie gras, caviar, homard, truffes, disponibles à la demande pour sublimer vos vols d'affaires ou de loisirs." },
    { title: "Thèmes & occasions", desc: "Anniversaires, propositions, dîners romantiques. Chaque célébration mérite un cadre exceptionnel." },
  ],
  en: [
    { title: "Bespoke menus", desc: "Every meal is designed around your tastes, dietary requirements and flight duration." },
    { title: "Starred chefs", desc: "We collaborate with acclaimed chefs to create unique gastronomic experiences onboard." },
    { title: "Onboard cellar", desc: "Selection of grand crus, champagnes and spirits chosen to complement every occasion." },
    { title: "Table decoration", desc: "Linen tablecloth, fine porcelain, crystal. The table set to your wishes before takeoff." },
    { title: "Luxury platters", desc: "Foie gras, caviar, lobster, truffles. Available on request to elevate your flights." },
    { title: "Themes & occasions", desc: "Birthdays, proposals, romantic dinners. Every celebration deserves an exceptional setting." },
  ],
  zh: [
    { title: "定制菜单", desc: "每一道菜都根据您的口味、饮食要求和飞行时长精心设计。" },
    { title: "米其林大厨", desc: "我们与知名大厨合作，在机舱内打造独一无二的美食体验。" },
    { title: "机载酒窖", desc: "精选名庄葡萄酒、香槟及烈酒，为每个场合锦上添花。" },
    { title: "餐桌布置", desc: "亚麻桌布、精美瓷器、水晶器皿，按您的心意在起飞前布置完毕。" },
    { title: "豪华拼盘", desc: "鹅肝、鱼子酱、龙虾、松露，应您要求，让每次飞行都成为美食之旅。" },
    { title: "主题与特殊场合", desc: "生日、求婚、浪漫晚餐，每一个庆典都值得一个非凡的舞台。" },
  ],
  ar: [
    { title: "قوائم طعام مخصصة", desc: "كل وجبة مصممة وفق أذواقك ومتطلباتك الغذائية ومدة رحلتك." },
    { title: "طهاة نجوم ميشلان", desc: "نتعاون مع طهاة مشهورين لخلق تجارب طهو فريدة على متن الطائرة." },
    { title: "خزانة نبيذ على المتن", desc: "تشكيلة من أجود النبيذ والشمبانيا والمشروبات الروحية لكل مناسبة." },
    { title: "تزيين الطاولة", desc: "مفرش كتاني، خزف فاخر، كريستال. الطاولة مُرتَّبة وفق رغباتك قبل الإقلاع." },
    { title: "أطباق فاخرة", desc: "كبد الإوز، الكافيار، الكركند، الكمأ. متاحة عند الطلب لرفع مستوى رحلاتك." },
    { title: "مناسبات وتصاميم خاصة", desc: "أعياد الميلاد، خطوبة، عشاء رومانسي. كل احتفال يستحق إطاراً استثنائياً." },
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

        {/* Ambiance gastronomique continue — carte de menu + formulaire (100% CSS pur) */}
        <div className="detente-spa">
          {/* Halo lumineux central */}
          <div className="detente-spa__halo" aria-hidden="true" />
          {/* Étoiles scintillantes */}
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          {/* La Carte — menu de restaurant gastronomique */}
          <section className="relative" style={{ padding: "88px 6%", zIndex: 1 }}>
            <div className="menu-card">
              {/* Coins ornementaux */}
              <span className="menu-corner menu-corner--tl" aria-hidden="true" />
              <span className="menu-corner menu-corner--tr" aria-hidden="true" />
              <span className="menu-corner menu-corner--bl" aria-hidden="true" />
              <span className="menu-corner menu-corner--br" aria-hidden="true" />

              {/* En-tête */}
              <div className="text-center" style={{ marginBottom: "34px" }}>
                <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "18px" }}>
                  {MENU_EYEBROW[lang] || MENU_EYEBROW.fr}
                </p>
                <div className="flex items-center justify-center" style={{ gap: "14px", marginBottom: "14px" }}>
                  <span aria-hidden="true" style={{ width: "44px", height: "1px", background: "linear-gradient(to right, transparent, #C9A96E)" }} />
                  <span aria-hidden="true" style={{ color: "#E8C77E", display: "flex" }}><IconChefHat /></span>
                  <span aria-hidden="true" style={{ width: "44px", height: "1px", background: "linear-gradient(to left, transparent, #C9A96E)" }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(30px, 4vw, 38px)", lineHeight: 1.1, color: "#FFFFFF" }}>
                  {MENU_TITLE[lang] || MENU_TITLE.fr}
                </h2>
                <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "18px", color: "#E8C77E", marginTop: "10px" }}>
                  {SUBTITLE[lang] || SUBTITLE.fr}
                </p>
              </div>

              {/* Les 6 plats */}
              <div>
                {services.map((svc, i) => {
                  const Icon = MENU_ICONS[i] ?? MENU_ICONS[0];
                  return (
                    <Fragment key={i}>
                      {i === 3 && (
                        <div className="menu-divider" aria-hidden="true">
                          <span>◆</span>
                        </div>
                      )}
                      <div className="menu-dish-row">
                        <div className="menu-dish">
                          <span className="menu-dish__name" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "22px", color: "#FFFFFF" }}>
                            {svc.title}
                          </span>
                          <span className="menu-dish__leader" aria-hidden="true" />
                          <span className="menu-dish__icon" aria-hidden="true"><Icon /></span>
                        </div>
                        <p className="menu-dish__desc" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "15px", color: "rgba(232,237,242,0.55)", lineHeight: 1.5 }}>
                          {svc.desc}
                        </p>
                      </div>
                    </Fragment>
                  );
                })}
              </div>

              {/* Pied du menu */}
              <div style={{ borderTop: "1px solid rgba(201,169,110,0.3)", marginTop: "34px", paddingTop: "24px" }}>
                <p className="text-center" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(17px, 2vw, 20px)", color: "#E8C77E", lineHeight: 1.4 }}>
                  {MENU_SIGNATURE[lang] || MENU_SIGNATURE.fr}
                </p>
              </div>
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
