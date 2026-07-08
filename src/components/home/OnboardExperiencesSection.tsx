"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const GOLD = "#C9A96E";

type Card = { label: string; title: string; desc: string; signature: string; href: string; cta: string };

const HEADER: Record<Lang, { badge: string; title: string }> = {
  fr: { badge: "EXPÉRIENCES À BORD", title: "Bien plus qu'un vol. Un moment." },
  en: { badge: "ONBOARD EXPERIENCES", title: "Far more than a flight. A moment." },
  zh: { badge: "机上体验", title: "远不止一次飞行，而是一段时光。" },
  ar: { badge: "تجارب على المتن", title: "أكثر بكثير من مجرد رحلة. إنها لحظة." },
};

const CARDS: Record<Lang, Card[]> = {
  fr: [
    {
      label: "DÉTENTE & RELAXATION",
      title: "Le luxe, c'est arriver reposé.",
      desc: "Spa privé, massage anti-jet-lag, ambiance feutrée.",
      signature: "Quand le voyage devient une parenthèse.",
      href: "/detente",
      cta: "DÉCOUVRIR",
    },
    {
      label: "ÉVÉNEMENTS SPÉCIAUX",
      title: "Et si vos plus beaux souvenirs prenaient leur envol ?",
      desc: "Mariages, anniversaires, baby showers, demandes en mariage.",
      signature: "Quand le ciel devient le décor de vos plus belles histoires.",
      href: "/evenements",
      cta: "DÉCOUVRIR",
    },
  ],
  en: [
    {
      label: "RELAXATION & WELLNESS",
      title: "Luxury is arriving rested.",
      desc: "Private spa, anti-jet-lag massage, a hushed atmosphere.",
      signature: "When the journey becomes a pause.",
      href: "/detente",
      cta: "DISCOVER",
    },
    {
      label: "SPECIAL EVENTS",
      title: "What if your finest memories took flight?",
      desc: "Weddings, birthdays, baby showers, proposals.",
      signature: "When the sky becomes the backdrop to your most beautiful stories.",
      href: "/evenements",
      cta: "DISCOVER",
    },
  ],
  zh: [
    {
      label: "放松与休闲",
      title: "真正的奢华，是神清气爽地抵达。",
      desc: "私人水疗、抗时差按摩、静谧氛围。",
      signature: "当旅程化作一段从容的留白。",
      href: "/detente",
      cta: "了解更多",
    },
    {
      label: "特别活动",
      title: "若您最美的回忆，也能展翅高飞？",
      desc: "婚礼、生日、宝宝派对、求婚。",
      signature: "当天空成为您最美故事的背景。",
      href: "/evenements",
      cta: "了解更多",
    },
  ],
  ar: [
    {
      label: "الاسترخاء والراحة",
      title: "الفخامة الحقيقية أن تصل مرتاحاً.",
      desc: "سبا خاص، تدليك مضاد للإرهاق، وأجواء هادئة.",
      signature: "حين تتحوّل الرحلة إلى لحظة استراحة.",
      href: "/detente",
      cta: "اكتشف",
    },
    {
      label: "مناسبات خاصة",
      title: "ماذا لو حلّقت أجمل ذكرياتك؟",
      desc: "أعراس، أعياد ميلاد، حفلات استقبال المواليد، وعروض الزواج.",
      signature: "حين تصبح السماء خلفية أجمل قصصك.",
      href: "/evenements",
      cta: "اكتشف",
    },
  ],
};

const IMAGES: Record<string, string> = {
  "/detente": "/images/cabine.png",
  "/evenements": "/images/salon-vip.webp",
};

export default function OnboardExperiencesSection() {
  const { lang } = useLanguage();
  const header = HEADER[lang] || HEADER.fr;
  const cards = CARDS[lang] || CARDS.fr;

  return (
    <section className="section-pad" style={{ backgroundColor: "#060E1A", paddingLeft: "8%", paddingRight: "8%" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <SectionEyebrow tone="navy">{header.badge}</SectionEyebrow>
          <h2
            className="font-serif section-title"
            style={{ fontStyle: "italic", color: "#f8f5f0", margin: 0 }}
          >
            {header.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "32px" }}>
          {cards.map((card) => (
            <article
              key={card.href}
              className="onboard-card gold-hover card-lift-dark flex flex-col overflow-hidden"
              style={{ backgroundColor: "#0A1628", border: "1px solid rgba(201,169,110,0.18)" }}
            >
              <div className="onboard-card__media" style={{ aspectRatio: "16 / 10" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES[card.href]}
                  alt={card.title}
                  loading="lazy"
                  className="onboard-card__img w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1" style={{ padding: "40px 36px" }}>
                <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: GOLD, marginBottom: "18px" }}>
                  {card.label}
                </p>
                <h3
                  className="font-serif"
                  style={{ fontStyle: "italic", fontSize: "clamp(24px, 2.4vw, 30px)", color: GOLD, lineHeight: 1.25, marginBottom: "20px" }}
                >
                  {card.title}
                </h3>
                <div className="flex-1" style={{ marginBottom: "36px" }}>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "clamp(16px, 1.5vw, 20px)",
                      fontWeight: 400,
                      color: "#f8f5f0",
                      lineHeight: 1.7,
                      marginBottom: "12px",
                    }}
                  >
                    {card.desc}
                  </p>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "clamp(16px, 1.5vw, 20px)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: GOLD,
                      lineHeight: 1.7,
                    }}
                  >
                    {card.signature}
                  </p>
                </div>
                <Link
                  href={card.href}
                  className="inline-block font-sans uppercase self-start transition-all duration-300 hover:bg-white hover:text-navy hover:border-white"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    border: "1px solid rgba(255,255,255,0.5)",
                    color: "#FFFFFF",
                    padding: "12px 28px",
                    textDecoration: "none",
                  }}
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
