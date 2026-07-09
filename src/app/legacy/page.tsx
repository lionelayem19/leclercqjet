"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookBlock from "@/components/ui/BookBlock";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

// Page « Contribution » — engagement enfance de Leclercq'Jet.
// Multilingue (FR / EN / 中文 / عربية), RTL automatique en arabe (dir posé globalement).
// 100 % CSS pur : aucune framer-motion, animations via .contribution-* dans globals.css.

type Card = { title: string; desc: string };

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string;
  figureHeadline: string;
  figureCaption: string;
  storyTitle: string;
  storyParagraphs: string[];
  cards: Card[];
  concreteCaption: string;
};

const CONTENT: Record<Lang, Content> = {
  fr: {
    eyebrow: "Notre Promesse",
    title: "Chaque vol rapproche un enfant de son avenir.",
    subtitle: "L'engagement n'est pas une promesse. C'est un pourcentage.",
    // NOTE : à remplacer par « [chiffre] % » lorsque le pourcentage officiel sera validé.
    figureHeadline: "Une part de chaque vol",
    figureCaption:
      "est consacrée au financement de projets en faveur des enfants orphelins en Inde.",
    storyTitle: "Aux origines de cet engagement",
    storyParagraphs: [
      "Cet engagement porte le nom d'une histoire vraie. Abandonné à la naissance près d'un bidonville, Emmanuel Leclercq est un miraculé : sauvé par Mère Teresa, recueilli dans l'orphelinat de la mission d'Amravati, en Inde, puis adopté par une famille française.",
      "Aujourd'hui, chaque vol Leclercq'Jet rend à d'autres enfants ce qui lui a été offert : une chance. Les fonds soutiennent des orphelinats et des projets d'éducation pour enfants vulnérables en Inde.",
    ],
    cards: [
      { title: "Éducation", desc: "Scolarité et fournitures pour les enfants" },
      { title: "Quotidien", desc: "Repas, soins et cadre de vie dignes" },
      { title: "Avenir", desc: "Accompagnement vers l'autonomie" },
    ],
    concreteCaption: "Voler avec Leclercq'Jet, c'est offrir un avenir.",
  },
  en: {
    eyebrow: "Our Promise",
    title: "Every flight brings a child closer to their future.",
    subtitle: "Commitment is not a promise. It is a percentage.",
    figureHeadline: "A share of every flight",
    figureCaption:
      "is dedicated to funding projects for orphaned children in India.",
    storyTitle: "The origins of this commitment",
    storyParagraphs: [
      "This commitment is rooted in a true story. Abandoned at birth near a slum, Emmanuel Leclercq is a miracle: saved by Mother Teresa, taken in at the orphanage of the Amravati mission, in India, then adopted by a French family.",
      "Today, every Leclercq'Jet flight gives other children what he was once given: a chance. The funds support orphanages and education projects for vulnerable children in India.",
    ],
    cards: [
      { title: "Education", desc: "Schooling and supplies for children" },
      { title: "Daily life", desc: "Meals, care and dignified living" },
      { title: "Future", desc: "Support toward independence" },
    ],
    concreteCaption: "To fly with Leclercq'Jet is to offer a future.",
  },
  zh: {
    eyebrow: "我们的承诺",
    title: "每一次飞行，都让一个孩子离未来更近一步。",
    subtitle: "承诺不是一句诺言，而是一个百分比。",
    figureHeadline: "每一次飞行的一部分",
    figureCaption: "都将用于资助印度孤儿相关的公益项目。",
    storyTitle: "这一承诺的起源",
    storyParagraphs: [
      "这一承诺源自一个真实的故事。艾曼纽·勒克莱尔出生时被遗弃在贫民窟附近，却奇迹般地获救：他被特蕾莎修女救起，收养于印度阿姆拉瓦蒂（Amravati）传教团的孤儿院，随后被一个法国家庭领养。",
      "如今，勒克莱尔公务机的每一次飞行，都将他曾获得的礼物回馈给其他孩子：一次机会。善款用于支持印度弱势儿童的孤儿院与教育项目。",
    ],
    cards: [
      { title: "教育", desc: "为孩子提供学业与学习用品" },
      { title: "日常", desc: "有尊严的餐食、照护与生活环境" },
      { title: "未来", desc: "陪伴他们走向自立" },
    ],
    concreteCaption: "选择勒克莱尔公务机，就是赠予一个未来。",
  },
  ar: {
    eyebrow: "وعدنا",
    title: "كل رحلة تقرّب طفلاً من مستقبله.",
    subtitle: "الالتزام ليس وعداً. إنه نسبة مئوية.",
    figureHeadline: "جزء من كل رحلة",
    figureCaption: "مُخصَّص لتمويل مشاريع لصالح الأطفال الأيتام في الهند.",
    storyTitle: "أصل هذا الالتزام",
    storyParagraphs: [
      "يستمد هذا الالتزام جذوره من قصة حقيقية. فقد تُرك إيمانويل لوكلير عند ولادته قرب حيّ فقير، لكنه ناجٍ بأعجوبة: أنقذته الأم تيريزا، واحتضنته في دار الأيتام التابعة لإرسالية أمْراوَتي (Amravati) في الهند، ثم تبنّته عائلة فرنسية.",
      "واليوم، تُعيد كل رحلة من رحلات Leclercq'Jet إلى أطفال آخرين ما مُنح له يوماً: فرصة. تدعم الأموال دور الأيتام ومشاريع التعليم للأطفال الضعفاء في الهند.",
    ],
    cards: [
      { title: "التعليم", desc: "الدراسة واللوازم المدرسية للأطفال" },
      { title: "الحياة اليومية", desc: "وجبات ورعاية وإطار حياة كريم" },
      { title: "المستقبل", desc: "المرافقة نحو الاستقلال" },
    ],
    concreteCaption: "أن تسافر مع Leclercq'Jet يعني أن تمنح مستقبلاً.",
  },
};

const DEVISE = "COURAGE, CONFIANCE, AMOUR, ESPÉRANCE";

const ICON_PROPS = {
  width: 26,
  height: 26,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function IconEducation() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 9l9-5 9 5-9 5-9-5z" />
      <path d="M7 11v4.5c0 1.1 2.24 2.5 5 2.5s5-1.4 5-2.5V11" />
      <path d="M21 9v5" />
    </svg>
  );
}
function IconDaily() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 20s-6.5-4.1-6.5-9A3.5 3.5 0 0 1 12 7.5 3.5 3.5 0 0 1 18.5 11c0 4.9-6.5 9-6.5 9z" />
    </svg>
  );
}
function IconFuture() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 18h18" />
      <path d="M12 3v3.5" />
      <path d="M5.6 8.1L3.9 6.4" />
      <path d="M18.4 8.1l1.7-1.7" />
      <path d="M8 18a4 4 0 0 1 8 0" />
    </svg>
  );
}

const CARD_ICONS = [IconEducation, IconDaily, IconFuture];

export default function ContributionPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.fr;
  const isRTL = lang === "ar";

  return (
    <>
      <Navbar />
      <main className="contribution">
        <div className="contribution__halo" aria-hidden="true" />

        <div className="contribution__inner">
          {/* 1 — En-tête */}
          <header className="contribution__header">
            <p className="contribution__eyebrow">{c.eyebrow}</p>
            <h1 className="contribution__title">{c.title}</h1>
            <p className="contribution__subtitle">{c.subtitle}</p>
          </header>

          {/* 2 — Chiffre phare (headline provisoire → deviendra « [chiffre] % ») */}
          <section className="contribution__figure" aria-label={c.eyebrow}>
            <span className="contribution__figure-headline">{c.figureHeadline}</span>
            <p className="contribution__figure-caption">{c.figureCaption}</p>
          </section>

          {/* 3 — Histoire */}
          <section className="contribution__story">
            <h2 className="contribution__story-title">{c.storyTitle}</h2>
            <div className="contribution__story-grid">
              <div className="contribution__media">
                <div className="contribution__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/emmanuel-leclercq.jpg" alt="Emmanuel Leclercq" loading="lazy" />
                </div>
              </div>
              <div
                className="contribution__story-text"
                dir={isRTL ? "rtl" : "ltr"}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {c.storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* 3 bis — Le livre d'Emmanuel Leclercq (après la section histoire) */}
          <BookBlock />

          {/* 4 — Ce que finance la contribution */}
          <section className="contribution__concrete">
            <div className="contribution__cards">
              {c.cards.map((card, i) => {
                const Icon = CARD_ICONS[i] ?? CARD_ICONS[0];
                return (
                  <div key={i} className="contribution__card">
                    <span className="contribution__card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className="contribution__card-title">{card.title}</h3>
                    <p className="contribution__card-desc">{card.desc}</p>
                  </div>
                );
              })}
            </div>
            <p className="contribution__concrete-caption">{c.concreteCaption}</p>
          </section>

          {/* 5 — Devise */}
          <p className="contribution__devise">{DEVISE}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
