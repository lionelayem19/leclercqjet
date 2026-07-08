"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE · COMPAGNONS", en: "CONCIERGE · COMPANIONS", zh: "礼宾 · 旅伴", ar: "الكونسيرج · الرفاق",
};
const TITLE: Record<string, string> = {
  fr: "Vos compagnons à bord", en: "Your companions on board", zh: "您的旅伴同行", ar: "رفاقك على المتن",
};
const SUBTITLE: Record<string, string> = {
  fr: "Parce qu'ils font partie de la famille, un voyage serein pour vous et vos compagnons.",
  en: "Because they're part of the family, a serene journey for you and your companions.",
  zh: "因为它们是家人的一份子——为您和您的旅伴带来安心的旅程。",
  ar: "لأنهم جزء من العائلة، رحلة هادئة لك ولرفاقك.",
};
const SIGNATURE: Record<string, string> = {
  fr: "Chez Leclercq'Jet International, personne n'est laissé au sol.",
  en: "At Leclercq'Jet International, no one is left on the ground.",
  zh: "在 Leclercq'Jet，没有谁会被留在地面。",
  ar: "في Leclercq'Jet، لا أحد يُترك على الأرض.",
};
const CTA: Record<string, string> = {
  fr: "Planifier le voyage de votre animal", en: "Plan your pet's journey", zh: "规划您宠物的旅程", ar: "خطط لرحلة حيوانك الأليف",
};

const FEATURES: Record<string, { title: string; desc: string }[]> = {
  fr: [
    { title: "Transport sécurisé", desc: "Vos animaux en cabine selon les normes internationales, sans soute stressante." },
    { title: "Coordination vétérinaire", desc: "Certificats de santé, vaccinations et documents douaniers coordonnés avec votre vétérinaire." },
    { title: "Espace dédié à bord", desc: "Une zone confortable réservée : litière, eau fraîche et espace de détente." },
    { title: "Discrétion et calme", desc: "Un environnement calme, sans la foule des vols commerciaux, idéal pour les animaux sensibles." },
    { title: "Formalités douanières", desc: "Passeport animal, microchip et démarches d'entrée prises en charge dans chaque pays." },
    { title: "Alimentation spécialisée", desc: "Nourriture sèche, humide ou croquettes spécifiques selon ses besoins." },
    { title: "Plateaux de luxe", desc: "Foie gras, viande premium, poisson frais : le même standard que ses maîtres." },
    { title: "Menus sur mesure", desc: "Chaque repas conçu selon les goûts et contraintes, avec suivi vétérinaire possible." },
  ],
  en: [
    { title: "Safe transport", desc: "Your pets in the cabin under international standards, no stressful hold." },
    { title: "Veterinary coordination", desc: "Health certificates, vaccinations and customs documents coordinated with your vet." },
    { title: "Dedicated onboard space", desc: "A comfortable reserved area: bedding, fresh water and a relaxation space." },
    { title: "Discretion & calm", desc: "A calm environment, away from commercial crowds, ideal for sensitive animals." },
    { title: "Customs formalities", desc: "Pet passport, microchip and entry procedures handled in every country." },
    { title: "Specialist diet", desc: "Dry, wet or specific feed according to their needs." },
    { title: "Luxury platters", desc: "Foie gras, premium meat, fresh fish: the same standard as their owners." },
    { title: "Bespoke menus", desc: "Each meal designed around tastes and constraints, with veterinary follow-up available." },
  ],
  zh: [
    { title: "安全运输", desc: "您的宠物按国际标准在客舱内出行，无需货舱。" },
    { title: "兽医协调", desc: "健康证明、疫苗接种和海关文件与您的兽医协调完成。" },
    { title: "机舱专属空间", desc: "预留舒适区域：床铺、新鲜饮水与休息空间。" },
    { title: "低调与安静", desc: "远离商业航班拥挤的宁静环境，适合敏感的动物。" },
    { title: "海关手续", desc: "宠物护照、芯片及各国入境手续均由我们负责。" },
    { title: "专业饮食", desc: "根据需要提供干粮、湿粮或特定食品。" },
    { title: "豪华拼盘", desc: "鹅肝、优质肉类、新鲜鱼类：与主人同等的标准。" },
    { title: "定制菜单", desc: "每餐依据口味与限制设计，并可提供兽医跟进。" },
  ],
  ar: [
    { title: "نقل آمن", desc: "حيواناتك في الكابينة وفق المعايير الدولية، دون عنبر مجهد." },
    { title: "التنسيق البيطري", desc: "شهادات الصحة والتطعيمات والوثائق الجمركية بالتنسيق مع طبيبك البيطري." },
    { title: "مساحة مخصصة على المتن", desc: "منطقة مريحة محجوزة: فراش، ماء طازج ومساحة استرخاء." },
    { title: "التكتم والهدوء", desc: "بيئة هادئة بعيداً عن ازدحام الرحلات التجارية، مثالية للحيوانات الحساسة." },
    { title: "الإجراءات الجمركية", desc: "جواز سفر الحيوان، الشريحة الإلكترونية وإجراءات الدخول في كل دولة." },
    { title: "تغذية متخصصة", desc: "طعام جاف أو رطب أو علف خاص حسب احتياجاته." },
    { title: "أطباق فاخرة", desc: "كبد الإوز، لحوم فاخرة، أسماك طازجة: المستوى ذاته الذي يحظى به أصحابه." },
    { title: "قوائم مخصصة", desc: "كل وجبة مصممة وفق الأذواق والقيود، مع إمكانية متابعة بيطرية." },
  ],
};

const ICON = {
  width: 24, height: 24, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

function IconShieldCheck() {
  return <svg {...ICON}><path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
}
function IconStethoscope() {
  return <svg {...ICON}><path d="M5 3v5a4 4 0 0 0 8 0V3" /><path d="M9 12v3a5 5 0 0 0 10 0v-2" /><circle cx="19" cy="11" r="2" /></svg>;
}
function IconHome() {
  return <svg {...ICON}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>;
}
function IconMoon() {
  return <svg {...ICON}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;
}
function IconPassport() {
  return <svg {...ICON}><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="2.5" /><path d="M8.5 16c.7-1.6 2-2.5 3.5-2.5s2.8.9 3.5 2.5" /><path d="M9 3v1M15 3v1" /></svg>;
}
function IconBowl() {
  return <svg {...ICON}><ellipse cx="12" cy="11" rx="9" ry="2" /><path d="M3 11a9 9 0 0 0 18 0" /><path d="M12 9V7a2.5 2.5 0 0 1 2.5-2.5" /></svg>;
}
function IconChefHat() {
  return <svg {...ICON}><path d="M6 12a3 3 0 0 1-1-5.8A3.5 3.5 0 0 1 12 5a3.5 3.5 0 0 1 7 .2A3 3 0 0 1 18 12z" /><path d="M6 12v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7" /><path d="M9 16h6" /></svg>;
}
function IconMenu() {
  return <svg {...ICON}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
}

const FEATURE_ICONS = [
  IconShieldCheck, IconStethoscope, IconHome, IconMoon,
  IconPassport, IconBowl, IconChefHat, IconMenu,
];

export default function AnimauxPage() {
  const { lang } = useLanguage();
  const features = FEATURES[lang] || FEATURES.fr;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A1628", minHeight: "100vh" }}>
        {/* Hero */}
        <section className="relative flex items-center justify-center text-center" style={{ minHeight: "clamp(440px, 60vh, 560px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80"
            alt="Compagnon à bord d'un jet privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(10,22,40,0.5), rgba(10,22,40,0.72))" }} />
          <div className="relative z-10 px-6" style={{ paddingTop: "72px", maxWidth: "760px" }}>
            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, fontSize: "14px", letterSpacing: "4px", color: "#E8C77E", textShadow: "0 1px 6px rgba(0,0,0,0.6)", marginBottom: "14px" }}
            >
              {BADGE[lang] || BADGE.fr}
            </p>
            <div aria-hidden="true" style={{ width: "72px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 22px" }} />
            <h1
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 44px)", lineHeight: 1.15, color: "#FFFFFF", textShadow: "0 2px 16px rgba(0,0,0,0.5)", marginBottom: "18px" }}
            >
              {TITLE[lang] || TITLE.fr}
            </h1>
            <p
              className="mx-auto"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "19px", color: "#f8f5f0", lineHeight: 1.7, maxWidth: "560px", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            >
              {SUBTITLE[lang] || SUBTITLE.fr}
            </p>
          </div>
        </section>

        {/* Grille de 8 prestations */}
        <section className="acq-section" style={{ padding: "88px 8%" }}>
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, i) => {
                const Icon = FEATURE_ICONS[i] ?? FEATURE_ICONS[0];
                return (
                  <div key={i} className="el-card" style={{ borderRadius: "14px", padding: "34px 26px", textAlign: "center" }}>
                    <div
                      className="el-medallion"
                      style={{ width: "52px", height: "52px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "20px" }}
                      aria-hidden="true"
                    >
                      <Icon />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "19px", lineHeight: 1.3, color: "#FFFFFF" }}>
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
          </div>
        </section>

        {/* Signature + CTA */}
        <section className="text-center" style={{ padding: "0 8% 100px" }}>
          <p
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(22px, 2.6vw, 30px)", color: "#E8C77E", lineHeight: 1.4, maxWidth: "640px", margin: "0 auto 40px" }}
          >
            {SIGNATURE[lang] || SIGNATURE.fr}
          </p>
          <Link href="/contact" className="pet-cta">
            {CTA[lang] || CTA.fr}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
