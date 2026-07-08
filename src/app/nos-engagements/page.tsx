"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

// Page « Nos Engagements » — engagements OPÉRATIONNELS et de service, avec un
// contenu exclusif (chiffres-clés, méthode de sélection, CTA sur-mesure).
// L'histoire d'Emmanuel et le bloc livre vivent sur /legacy — pas ici.
// Multilingue (FR / EN / 中文 / عربية), RTL automatique en arabe. 100 % CSS pur.

const GOLD = "#C9A96E";

// ── Icônes (dorées) ───────────────────────────────────────
const ICON_PROPS = {
  width: 28,
  height: 28,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: GOLD,
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function IconCertificate() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 12.75 11.25 15 15 9.75" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 5 6v5.5c0 4.3 3 8.3 7 9.5 4-1.2 7-5.2 7-9.5V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}
function IconTransparency() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

const PILLAR_ICONS: (() => React.JSX.Element)[] = [
  IconCertificate,
  IconLock,
  IconClock,
  IconShield,
  IconGlobe,
  IconTransparency,
];

// ── Contenu multilingue ───────────────────────────────────
type PillarText = { title: string; text: string };
type Stat = { value: string; label: string };
type Content = {
  badge: string;
  heroTitlePlain: string;
  heroTitleAccent: string;
  stats: Stat[];
  pillars: PillarText[];
  selection: { badge: string; title: string; steps: PillarText[] };
  cta: { title: string; text: string; button: string };
};

const CONTENT: Record<Lang, Content> = {
  fr: {
    badge: "NOS ENGAGEMENTS",
    heroTitlePlain: "Six engagements, ",
    heroTitleAccent: "une exigence",
    stats: [
      { value: "850+", label: "Opérateurs certifiés partenaires" },
      { value: "5", label: "Continents couverts" },
      { value: "24/7", label: "Disponibilité permanente" },
      { value: "100%", label: "Vols sur opérateurs AOC" },
    ],
    pillars: [
      {
        title: "Opérateurs certifiés AOC",
        text: "Nous n'affrétons qu'auprès d'opérateurs détenteurs d'un certificat de transporteur aérien (AOC), garantissant les standards les plus stricts de maintenance et d'exploitation.",
      },
      {
        title: "Confidentialité absolue",
        text: "Discrétion totale sur les déplacements, identités et informations de nos clients. Aucune donnée partagée, aucune communication externe.",
      },
      {
        title: "Disponibilité 24h/24",
        text: "Une équipe joignable à toute heure, 7 jours sur 7, pour chaque devis, modification ou demande spéciale. Une réponse personnalisée et immédiate.",
      },
      {
        title: "Sécurité sans compromis",
        text: "La sécurité prime sur tout. Appareils audités, équipages expérimentés et procédures rigoureuses à chaque étape du vol.",
      },
      {
        title: "Réseau mondial d'opérateurs",
        text: "Un réseau de partenaires certifiés sur les cinq continents, pour sélectionner l'appareil idéal au plus près de votre destination.",
      },
      {
        title: "Transparence",
        text: "Des devis clairs et détaillés, sans frais cachés. Vous savez exactement ce que vous payez, et pourquoi.",
      },
    ],
    selection: {
      badge: "NOTRE MÉTHODE",
      title: "Notre exigence dans la sélection",
      steps: [
        { title: "Audit rigoureux", text: "Chaque opérateur est vérifié : certifications, maintenance, historique de sécurité." },
        { title: "Sélection sur mesure", text: "Pour chaque vol, nous choisissons l'appareil et l'équipage les plus adaptés." },
        { title: "Contrôle permanent", text: "Un suivi continu de nos partenaires pour garantir des standards constants." },
      ],
    },
    cta: {
      title: "Voler en toute sérénité",
      text: "Nos équipes composent chaque vol avec la même exigence. Parlons de votre prochain voyage.",
      button: "Demande de devis",
    },
  },
  en: {
    badge: "OUR COMMITMENTS",
    heroTitlePlain: "Six commitments, ",
    heroTitleAccent: "one standard",
    stats: [
      { value: "850+", label: "Certified partner operators" },
      { value: "5", label: "Continents covered" },
      { value: "24/7", label: "Always available" },
      { value: "100%", label: "Flights on AOC operators" },
    ],
    pillars: [
      {
        title: "AOC-certified operators",
        text: "We only charter through operators holding an Air Operator Certificate (AOC), guaranteeing the strictest standards of maintenance and operation.",
      },
      {
        title: "Absolute confidentiality",
        text: "Total discretion over our clients' travels, identities and information. No data shared, no external communication.",
      },
      {
        title: "24/7 availability",
        text: "A team reachable at any hour, 7 days a week, for every quote, change or special request. A personalised, immediate reply.",
      },
      {
        title: "Uncompromising safety",
        text: "Safety comes before everything. Audited aircraft, experienced crews and rigorous procedures at every stage of the flight.",
      },
      {
        title: "Global operator network",
        text: "A network of certified partners across all five continents, to select the ideal aircraft closest to your destination.",
      },
      {
        title: "Transparency",
        text: "Clear, detailed quotes with no hidden fees. You know exactly what you pay for, and why.",
      },
    ],
    selection: {
      badge: "OUR METHOD",
      title: "Our rigour in selection",
      steps: [
        { title: "Rigorous audit", text: "Every operator is vetted: certifications, maintenance, safety record." },
        { title: "Bespoke selection", text: "For every flight, we choose the most suitable aircraft and crew." },
        { title: "Continuous oversight", text: "Ongoing monitoring of our partners to guarantee consistent standards." },
      ],
    },
    cta: {
      title: "Fly with complete peace of mind",
      text: "Our teams compose every flight with the same rigour. Let's talk about your next journey.",
      button: "Request a quote",
    },
  },
  zh: {
    badge: "我们的承诺",
    heroTitlePlain: "六项承诺，",
    heroTitleAccent: "一种标准",
    stats: [
      { value: "850+", label: "认证合作运营商" },
      { value: "5", label: "覆盖大洲" },
      { value: "24/7", label: "全天候服务" },
      { value: "100%", label: "AOC 运营商航班" },
    ],
    pillars: [
      {
        title: "持有 AOC 认证的运营商",
        text: "我们仅与持有航空承运人证书（AOC）的运营商合作包机，确保最严格的维护与运营标准。",
      },
      {
        title: "绝对保密",
        text: "对客户的行程、身份与信息完全保密。绝不共享任何数据，绝不对外沟通。",
      },
      {
        title: "全天候 24 小时服务",
        text: "团队全年无休、随时待命，处理每一份报价、变更或特殊需求，提供个性化的即时回复。",
      },
      {
        title: "安全毫不妥协",
        text: "安全高于一切。经过审核的飞机、经验丰富的机组，以及贯穿飞行每一环节的严谨流程。",
      },
      {
        title: "全球运营商网络",
        text: "遍布五大洲的认证合作伙伴网络，为您甄选最贴近目的地的理想机型。",
      },
      {
        title: "透明",
        text: "报价清晰详尽，绝无隐藏费用。您清楚知道所付费用及其缘由。",
      },
    ],
    selection: {
      badge: "我们的方法",
      title: "我们在甄选上的严谨",
      steps: [
        { title: "严格审核", text: "每一家运营商都经过核查：资质认证、维护记录、安全历史。" },
        { title: "量身甄选", text: "为每一次飞行，我们甄选最合适的飞机与机组。" },
        { title: "持续监督", text: "对合作伙伴的持续跟踪，确保标准始终如一。" },
      ],
    },
    cta: {
      title: "安心翱翔",
      text: "我们的团队以同样的严谨打造每一次飞行。让我们聊聊您的下一段旅程。",
      button: "索取报价",
    },
  },
  ar: {
    badge: "التزاماتنا",
    heroTitlePlain: "ستة التزامات، ",
    heroTitleAccent: "معيار واحد",
    stats: [
      { value: "850+", label: "مشغّلون شركاء معتمدون" },
      { value: "5", label: "قارات مُغطّاة" },
      { value: "24/7", label: "توفّر دائم" },
      { value: "100%", label: "رحلات على مشغّلي AOC" },
    ],
    pillars: [
      {
        title: "مشغّلون حاصلون على شهادة AOC",
        text: "لا نستأجر إلا من مشغّلين يحملون شهادة الناقل الجوي (AOC)، بما يضمن أعلى معايير الصيانة والتشغيل صرامةً.",
      },
      {
        title: "سرّية مطلقة",
        text: "كتمان تام لتنقّلات عملائنا وهوياتهم ومعلوماتهم. لا مشاركة لأي بيانات، ولا أي تواصل خارجي.",
      },
      {
        title: "توفّر على مدار الساعة",
        text: "فريق متاح في أي وقت، طوال أيام الأسبوع، لكل عرض سعر أو تعديل أو طلب خاص. ردّ شخصي وفوري.",
      },
      {
        title: "سلامة بلا تنازل",
        text: "السلامة تتقدّم على كل شيء. طائرات مُدقّقة، وأطقم ذات خبرة، وإجراءات صارمة في كل مرحلة من الرحلة.",
      },
      {
        title: "شبكة عالمية من المشغّلين",
        text: "شبكة شركاء معتمدين في القارات الخمس، لاختيار الطائرة المثالية الأقرب إلى وجهتك.",
      },
      {
        title: "الشفافية",
        text: "عروض أسعار واضحة ومفصّلة، دون رسوم خفية. تعرف بالضبط ما تدفعه ولماذا.",
      },
    ],
    selection: {
      badge: "منهجنا",
      title: "دقّتنا في الاختيار",
      steps: [
        { title: "تدقيق صارم", text: "كل مشغّل يخضع للتحقق: الشهادات، الصيانة، سجل السلامة." },
        { title: "اختيار مُفصّل", text: "لكل رحلة، نختار الطائرة والطاقم الأنسب." },
        { title: "رقابة دائمة", text: "متابعة مستمرة لشركائنا لضمان معايير ثابتة." },
      ],
    },
    cta: {
      title: "حلّق بكل طمأنينة",
      text: "تُنسّق فرقنا كل رحلة بالدقّة نفسها. لنتحدّث عن رحلتك القادمة.",
      button: "طلب عرض سعر",
    },
  },
};

export default function NosEngagementsPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.fr;
  const isRTL = lang === "ar";

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        <div className="detente-spa" dir={isRTL ? "rtl" : "ltr"}>
          <div className="detente-spa__halo" aria-hidden="true" />

          {/* En-tête */}
          <section className="relative text-center px-6" style={{ paddingTop: "150px", paddingBottom: "48px", zIndex: 1 }}>
            <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "13px", letterSpacing: "6px", color: GOLD, marginBottom: "18px" }}>
              {c.badge}
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(34px, 5.5vw, 50px)", lineHeight: 1.1, color: "#FFFFFF" }}>
              {c.heroTitlePlain}
              <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{c.heroTitleAccent}</span>
            </h1>
          </section>

          {/* Citation phare — reste en français (citation), en LTR même en arabe */}
          <section className="relative px-6" style={{ paddingTop: "8px", paddingBottom: "clamp(64px, 8vw, 96px)", zIndex: 1 }}>
            <figure className="eng-quote" dir="ltr">
              <div className="eng-quote__rule" aria-hidden="true" />
              <blockquote className="eng-quote__text">
                «&nbsp;La différence entre le possible et l&apos;impossible se trouve dans la détermination.&nbsp;»
              </blockquote>
              <figcaption className="eng-quote__author">— Gandhi</figcaption>
            </figure>
          </section>

          {/* Bande de chiffres-clés */}
          <section className="relative px-6" style={{ paddingBottom: "80px", zIndex: 1 }}>
            <div className="eng-stats">
              {c.stats.map((s, i) => (
                <div key={i} className="eng-stat">
                  <span className="eng-stat__value">{s.value}</span>
                  <span className="eng-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Les 6 engagements opérationnels */}
          <section className="relative px-6" style={{ paddingBottom: "clamp(80px, 10vw, 120px)", zIndex: 1 }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? PILLAR_ICONS[0];
                return (
                  <div key={i} className="eng-promise">
                    <div className="el-medallion eng-medallion" aria-hidden="true">
                      <Icon />
                    </div>
                    <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "23px", lineHeight: 1.25, color: "#FFFFFF", marginBottom: "12px" }}>
                      {pillar.title}
                    </h2>
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Notre exigence dans la sélection — 3 étapes */}
          <section className="relative px-6" style={{ paddingBottom: "clamp(80px, 10vw, 120px)", zIndex: 1 }}>
            <div className="max-w-5xl mx-auto text-center">
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.32em", color: GOLD, marginBottom: "14px" }}>
                {c.selection.badge}
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.15, color: "#FFFFFF", marginBottom: "clamp(36px, 5vw, 52px)" }}>
                {c.selection.title}
              </h2>
              <div className="eng-steps">
                {c.selection.steps.map((step, i) => (
                  <div key={i} className="eng-step">
                    <span className="eng-step__num" aria-hidden="true">{`0${i + 1}`}</span>
                    <h3 className="eng-step__title">{step.title}</h3>
                    <p className="eng-step__text">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bandeau CTA final */}
          <section className="relative px-6" style={{ paddingBottom: "clamp(88px, 11vw, 130px)", zIndex: 1 }}>
            <div className="eng-cta">
              <h2 className="eng-cta__title">{c.cta.title}</h2>
              <p className="eng-cta__text">{c.cta.text}</p>
              <Link href="/contact" className="eng-cta__btn">{c.cta.button}</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
