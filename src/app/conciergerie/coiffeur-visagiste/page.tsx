"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const SERIF = "var(--font-cormorant), Georgia, serif";

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE", en: "CONCIERGE", zh: "礼宾", ar: "الكونسيرج",
};
const TITLE: Record<string, string> = {
  fr: "L'écrin beauté", en: "The Beauty Suite", zh: "专属美学空间", ar: "واحة الجمال",
};
const SUBTITLE: Record<string, string> = {
  fr: "Une mise en beauté au salon privé, juste avant l'embarquement.",
  en: "A beauty session in the private lounge, just before boarding.",
  zh: "登机前，于私人贵宾厅完成您的妆容。",
  ar: "لمسة جمال في الصالة الخاصة، قبل الصعود إلى الطائرة مباشرة.",
};
const LOCATION: Record<string, string> = {
  fr: "Prestations assurées au salon privé FBO, avant l'embarquement.",
  en: "Services provided in the private FBO lounge, before boarding.",
  zh: "所有服务均于FBO私人贵宾厅内、登机前提供。",
  ar: "تُقدَّم الخدمات في صالة FBO الخاصة، قبل الصعود إلى الطائرة.",
};
const CONTACT: Record<string, string> = {
  fr: "NOUS CONTACTER", en: "CONTACT US", zh: "联系我们", ar: "اتصل بنا",
};

type Card = { key: string; title: string; text: string };
const CARDS: Record<string, Card[]> = {
  fr: [
    { key: "coiffeur", title: "Coiffeur", text: "Coiffure sur-mesure, entre les mains d'un expert, au salon FBO." },
    { key: "visagiste", title: "Visagiste", text: "Mise en beauté et conseil image, pour paraître à votre avantage." },
  ],
  en: [
    { key: "coiffeur", title: "Hairstylist", text: "Bespoke hairstyling in the hands of an expert, at the FBO lounge." },
    { key: "visagiste", title: "Makeup Artist", text: "Makeup and image consulting, to look your very best." },
  ],
  zh: [
    { key: "coiffeur", title: "发型师", text: "于FBO贵宾厅，由专家之手为您量身打造发型。" },
    { key: "visagiste", title: "形象设计师", text: "妆容打造与形象建议，让您展现最佳风采。" },
  ],
  ar: [
    { key: "coiffeur", title: "مصفف الشعر", text: "تصفيف شعر مخصّص بين يدي خبير، في صالة FBO." },
    { key: "visagiste", title: "خبير التجميل", text: "مكياج واستشارة إطلالة، لتظهر بأبهى صورة." },
  ],
};

const ICON = {
  width: 30, height: 30, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

function IconScissors() {
  return (
    <svg {...ICON}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}
function IconSparkle() {
  return (
    <svg {...ICON}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
const CARD_ICONS: Record<string, () => React.ReactElement> = {
  coiffeur: IconScissors,
  visagiste: IconSparkle,
};

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "9%", left: "10%", delay: "0s" },
  { top: "16%", left: "84%", delay: "1.2s" },
  { top: "30%", left: "16%", delay: "0.6s" },
  { top: "40%", left: "86%", delay: "1.8s" },
  { top: "56%", left: "12%", delay: "0.9s" },
  { top: "66%", left: "82%", delay: "2.2s" },
  { top: "78%", left: "26%", delay: "1.5s" },
  { top: "88%", left: "60%", delay: "0.3s" },
];

export default function CoiffeurVisagistePage() {
  const { lang } = useLanguage();
  const cards = CARDS[lang] || CARDS.fr;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A1628", minHeight: "100vh" }}>
        <div className="detente-spa" style={{ paddingTop: "72px" }}>
          {/* Halo lumineux central */}
          <div className="detente-spa__halo" aria-hidden="true" />
          {/* Étoiles scintillantes */}
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          <section className="relative" style={{ padding: "clamp(72px, 10vw, 120px) 6%", zIndex: 1 }}>
            <div className="mx-auto" style={{ maxWidth: "920px" }}>
              {/* En-tête */}
              <div className="text-center mx-auto" style={{ maxWidth: "640px", marginBottom: "clamp(44px, 6vw, 64px)" }}>
                <p
                  className="uppercase"
                  style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "18px" }}
                >
                  {BADGE[lang] || BADGE.fr}
                </p>
                <h1
                  style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(38px, 6vw, 60px)", lineHeight: 1.1, color: "#f8f5f0" }}
                >
                  {TITLE[lang] || TITLE.fr}
                </h1>
                <p
                  style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 2.3vw, 24px)", color: "rgba(248,245,240,0.68)", lineHeight: 1.5, marginTop: "16px" }}
                >
                  {SUBTITLE[lang] || SUBTITLE.fr}
                </p>
                <div className="detente-vline" aria-hidden="true" />
              </div>

              {/* Deux cartes */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
                {cards.map((card) => {
                  const Icon = CARD_ICONS[card.key] || IconScissors;
                  return (
                    <article
                      key={card.key}
                      className="el-card flex flex-col items-center text-center"
                      style={{ padding: "clamp(36px, 5vw, 52px) clamp(24px, 3.5vw, 40px)" }}
                    >
                      <span
                        className="el-medallion"
                        style={{ width: "64px", height: "64px", border: "1px solid rgba(201,169,110,0.4)", backgroundColor: "rgba(201,169,110,0.08)", color: "#E8C77E", marginBottom: "8px" }}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                      <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(24px, 2.6vw, 30px)", color: "#f8f5f0", marginTop: "18px" }}>
                        {card.title}
                      </h2>
                      <div className="el-goldline" />
                      <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(16px, 1.6vw, 19px)", color: "rgba(248,245,240,0.7)", lineHeight: 1.65, maxWidth: "320px" }}>
                        {card.text}
                      </p>
                    </article>
                  );
                })}
              </div>

              {/* Mention localisation */}
              <div
                className="flex items-center justify-center text-center"
                style={{ gap: "10px", marginTop: "clamp(36px, 4vw, 48px)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
                <span style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.5vw, 18px)", color: "#C9A96E", lineHeight: 1.5 }}>
                  {LOCATION[lang] || LOCATION.fr}
                </span>
              </div>

              {/* Bouton contact */}
              <div className="text-center" style={{ marginTop: "clamp(44px, 5vw, 60px)" }}>
                <Link
                  href="/contact"
                  className="btn-lift inline-block font-sans uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    backgroundColor: "#C9A96E",
                    color: "#0A1628",
                    padding: "16px 44px",
                    textDecoration: "none",
                    borderRadius: "2px",
                  }}
                >
                  {CONTACT[lang] || CONTACT.fr}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
