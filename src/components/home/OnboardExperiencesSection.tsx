"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

type Card = { label: string; title: string; desc: string; href: string; cta: string };

const HEADER: Record<Lang, { badge: string; title: string }> = {
  fr: { badge: "EXPÉRIENCES À BORD", title: "Bien plus qu'un vol." },
  en: { badge: "ONBOARD EXPERIENCES", title: "Far more than a flight." },
  zh: { badge: "机上体验", title: "远不止一次飞行。" },
  ar: { badge: "تجارب على المتن", title: "أكثر بكثير من مجرد رحلة." },
};

const CARDS: Record<Lang, Card[]> = {
  fr: [
    {
      label: "DÉTENTE & RELAXATION",
      title: "Le calme, en altitude.",
      desc: "Spa privé, massage anti-jet-lag et ambiance zen. Arriver reposé devient votre nouveau standard.",
      href: "/detente",
      cta: "DÉCOUVRIR",
    },
    {
      label: "ÉVÉNEMENTS SPÉCIAUX",
      title: "Célébrer plus près des étoiles.",
      desc: "Baby shower, anniversaire ou mariage — vos plus beaux moments orchestrés dans un écrin d'exception.",
      href: "/evenements",
      cta: "DÉCOUVRIR",
    },
  ],
  en: [
    {
      label: "RELAXATION & WELLNESS",
      title: "Serenity at altitude.",
      desc: "Private spa, anti-jet-lag massage and a zen atmosphere. Arriving rested becomes your new standard.",
      href: "/detente",
      cta: "DISCOVER",
    },
    {
      label: "SPECIAL EVENTS",
      title: "Celebrate closer to the stars.",
      desc: "Baby shower, birthday or wedding — your finest moments orchestrated in an exceptional setting.",
      href: "/evenements",
      cta: "DISCOVER",
    },
  ],
  zh: [
    {
      label: "放松与休闲",
      title: "高空中的宁静。",
      desc: "私人水疗、抗时差按摩与禅意氛围。神清气爽地抵达，成为您的新标准。",
      href: "/detente",
      cta: "了解更多",
    },
    {
      label: "特别活动",
      title: "在更靠近星空的地方庆祝。",
      desc: "宝宝派对、生日或婚礼——您最美好的时刻，在非凡的环境中精心呈现。",
      href: "/evenements",
      cta: "了解更多",
    },
  ],
  ar: [
    {
      label: "الاسترخاء والراحة",
      title: "الهدوء على ارتفاع شاهق.",
      desc: "سبا خاص، تدليك مضاد للإرهاق وأجواء هادئة. الوصول مرتاحاً يصبح معيارك الجديد.",
      href: "/detente",
      cta: "اكتشف",
    },
    {
      label: "مناسبات خاصة",
      title: "احتفل أقرب إلى النجوم.",
      desc: "حفل استقبال مولود، عيد ميلاد أو زفاف — أجمل لحظاتك منسّقة في إطار استثنائي.",
      href: "/evenements",
      cta: "اكتشف",
    },
  ],
};

export default function OnboardExperiencesSection() {
  const { lang } = useLanguage();
  const header = HEADER[lang] || HEADER.fr;
  const cards = CARDS[lang] || CARDS.fr;

  return (
    <section style={{ backgroundColor: "#060E1A", paddingTop: "100px", paddingBottom: "100px", paddingLeft: "8%", paddingRight: "8%" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {header.badge}
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "#FFFFFF" }}>
            {header.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-lift-dark flex flex-col p-9"
              style={{ background: "linear-gradient(135deg, #0D1E35, #0A1628)", border: "1px solid rgba(201,169,110,0.18)" }}
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C9A96E" }}>
                {card.label}
              </p>
              <h3 className="font-serif mb-4" style={{ fontSize: "28px", color: "#FFFFFF", lineHeight: 1.2 }}>
                {card.title}
              </h3>
              <p className="font-sans mb-8 flex-1" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.8 }}>
                {card.desc}
              </p>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
