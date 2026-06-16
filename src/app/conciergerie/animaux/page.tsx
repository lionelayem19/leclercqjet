"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE — ANIMAUX", en: "CONCIERGE — PETS", zh: "礼宾 — 宠物", ar: "الكونسيرج — الحيوانات الأليفة",
};
const TITLE: Record<string, string> = {
  fr: "Vos Animaux, Notre Priorité.", en: "Your Pets, Our Priority.", zh: "您的宠物，我们的首要考虑。", ar: "حيواناتكم أولويتنا.",
};
const SUBTITLE: Record<string, string> = {
  fr: "Un voyage serein pour vous et vos compagnons.", en: "A peaceful journey for you and your companions.", zh: "为您和您的宠物提供宁静舒适的旅程。", ar: "رحلة هادئة لك ولرفاقك من الحيوانات.",
};

const FEATURES: Record<string, { title: string; desc: string }[]> = {
  fr: [
    { title: "Transport sécurisé et certifié", desc: "Nos aéronefs acceptent vos animaux en cabine dans les conditions réglementaires internationales, sans soute stressante." },
    { title: "Coordination vétérinaire", desc: "Nous coordonnons avec votre vétérinaire pour les certificats de santé, vaccinations et documents douaniers requis." },
    { title: "Espace dédié à bord", desc: "Une zone confortable est réservée à votre animal — litière, eau fraîche et espace de détente selon ses besoins." },
    { title: "Alimentation spécialisée", desc: "Vos préférences alimentaires pour votre animal sont prises en compte : nourriture sèche, humide, croquettes spécifiques." },
    { title: "Discrétion et calme", desc: "Le vol privé offre un environnement calme, sans la foule des vols commerciaux — idéal pour les animaux sensibles au stress." },
    { title: "Formalités douanières", desc: "Notre équipe prend en charge les démarches d'entrée dans chaque pays : passeport animal, microchip, puces de traçabilité." },
  ],
  en: [
    { title: "Safe & certified transport", desc: "Our aircraft welcome your pets in the cabin under international regulations — no stressful cargo holds." },
    { title: "Veterinary coordination", desc: "We coordinate with your vet for health certificates, vaccinations and customs documents." },
    { title: "Dedicated onboard space", desc: "A comfortable area is reserved for your pet — bedding, fresh water and relaxation space tailored to their needs." },
    { title: "Specialist diet", desc: "Your pet's dietary preferences are accommodated: dry, wet or specialist feed to order." },
    { title: "Discretion & calm", desc: "Private aviation provides a calm environment, far from commercial crowds — ideal for stress-sensitive animals." },
    { title: "Customs formalities", desc: "Our team handles entry requirements for each country: pet passport, microchip, traceability." },
  ],
  zh: [
    { title: "安全认证运输", desc: "我们的飞机按照国际法规在客舱内接受您的宠物，无需经历令人紧张的货舱。" },
    { title: "兽医协调", desc: "我们与您的兽医协调健康证明、疫苗接种和海关文件等事宜。" },
    { title: "机舱专属空间", desc: "为您的宠物预留舒适区域——床铺、新鲜饮水及休息空间，一切按需安排。" },
    { title: "专业饮食", desc: "我们考虑您宠物的饮食偏好：干粮、湿粮或特定食品均可按需提供。" },
    { title: "低调与安静", desc: "私人飞行提供远离商业航班拥挤的宁静环境，非常适合容易紧张的动物。" },
    { title: "海关手续", desc: "我们的团队负责各国入境手续：宠物护照、芯片植入及追踪标识。" },
  ],
  ar: [
    { title: "نقل آمن ومعتمد", desc: "طائراتنا ترحب بحيواناتكم الأليفة في الكابينة وفق اللوائح الدولية، بعيداً عن العنابر المجهدة." },
    { title: "التنسيق البيطري", desc: "ننسق مع طبيبك البيطري لشهادات الصحة والتطعيمات والوثائق الجمركية المطلوبة." },
    { title: "مساحة مخصصة على المتن", desc: "مساحة مريحة محجوزة لحيوانك الأليف — فراش، ماء طازج ومنطقة استرخاء حسب احتياجاته." },
    { title: "تغذية متخصصة", desc: "نراعي تفضيلات تغذية حيوانك الأليف: طعام جاف، رطب أو علف متخصص حسب الطلب." },
    { title: "التكتم والهدوء", desc: "الطيران الخاص يوفر بيئة هادئة بعيداً عن ازدحام الرحلات التجارية — مثالي للحيوانات الحساسة." },
    { title: "الإجراءات الجمركية", desc: "يتولى فريقنا متطلبات الدخول لكل دولة: جواز سفر الحيوان، الشريحة الإلكترونية، التتبع." },
  ],
};

const FORM_LABELS: Record<string, Record<string, string>> = {
  fr: {
    title: "Planifier le voyage de votre animal",
    name: "Nom complet", email: "Email", phone: "Téléphone",
    date: "Date du vol", pets: "Nombre d'animaux", species: "Race / Espèce",
    special: "Besoins spéciaux ou informations médicales", message: "Informations complémentaires",
    submit: "ENVOYER LA DEMANDE", success: "Votre demande a bien été envoyée.",
  },
  en: {
    title: "Plan your pet's journey",
    name: "Full name", email: "Email", phone: "Phone",
    date: "Flight date", pets: "Number of pets", species: "Breed / Species",
    special: "Special needs or medical information", message: "Additional information",
    submit: "SEND REQUEST", success: "Your request has been sent.",
  },
  zh: {
    title: "规划您宠物的旅程",
    name: "全名", email: "电子邮件", phone: "电话",
    date: "飞行日期", pets: "宠物数量", species: "品种 / 物种",
    special: "特殊需求或医疗信息", message: "补充信息",
    submit: "发送请求", success: "您的请求已成功发送。",
  },
  ar: {
    title: "خطط لرحلة حيوانك الأليف",
    name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
    date: "تاريخ الرحلة", pets: "عدد الحيوانات الأليفة", species: "السلالة / النوع",
    special: "الاحتياجات الخاصة أو المعلومات الطبية", message: "معلومات إضافية",
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

export default function AnimauxPage() {
  const { lang } = useLanguage();
  const features = FEATURES[lang] || FEATURES.fr;
  const f = FORM_LABELS[lang] || FORM_LABELS.fr;

  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", pets: "", species: "", special: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "animaux", ...form }),
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
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80"
            alt="Animaux de compagnie en jet privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.70)" }} />
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

        {/* Features grid */}
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
                  style={{
                    borderLeft: "2px solid rgba(201,169,110,0.3)",
                    paddingLeft: "20px",
                  }}
                >
                  <p className="font-sans text-white mb-2" style={{ fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600 }}>
                    {feat.title}
                  </p>
                  <p className="font-sans" style={{ fontSize: "14px", color: "rgba(232,237,242,0.5)", lineHeight: 1.8 }}>
                    {feat.desc}
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
                    <input type="date" style={INPUT_STYLE} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input style={INPUT_STYLE} placeholder={f.pets} value={form.pets} onChange={e => setForm({ ...form, pets: e.target.value })} />
                    <input style={INPUT_STYLE} placeholder={f.species} value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} />
                  </div>
                  <input style={INPUT_STYLE} placeholder={f.special} value={form.special} onChange={e => setForm({ ...form, special: e.target.value })} />
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
