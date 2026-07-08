"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const GOLD = "#C9A96E";

type Content = {
  badge: string;
  title: string;
  intro: string;
  bullets: string[];
  highlight: string;
  conclusion: string;
  cta: string;
};

const CONTENT: Record<Lang, Content> = {
  fr: {
    badge: "CONCIERGERIE",
    title: "De votre porte au tarmac, et bien au-delà.",
    intro:
      "Notre service chauffeur vous accompagne de A à Z, à l'aller comme au retour. De votre domicile au pied de l'avion, puis du tarmac d'arrivée jusqu'à votre destination finale, sans jamais rompre la chaîne du service.",
    bullets: [
      "Chauffeur privé à votre domicile ou bureau au départ, à l'heure que vous fixez",
      "Accès direct au salon FBO, fini les files, fini l'attente",
      "À l'arrivée, un second chauffeur vous attend au pied de l'avion",
      "Conduite jusqu'à votre destination finale, hôtel, résidence, rendez-vous d'affaires",
    ],
    highlight: "Aller-retour. Point A au point B. Sans rupture, sans attente, sans imprévu.",
    conclusion: "Le luxe, c'est ne plus penser à rien.",
    cta: "DÉCOUVRIR LA CONCIERGERIE",
  },
  en: {
    badge: "CONCIERGE",
    title: "From your door to the tarmac, and far beyond.",
    intro:
      "Our chauffeur service takes you from A to Z, outbound and return alike. From your home to the foot of the aircraft, then from the arrival tarmac to your final destination, never breaking the chain of service.",
    bullets: [
      "Private chauffeur at your home or office on departure, at the time you set",
      "Direct access to the FBO lounge, no more queues, no more waiting",
      "On arrival, a second chauffeur awaits you at the foot of the aircraft",
      "Driven to your final destination, hotel, residence, business meeting",
    ],
    highlight: "Round trip. Point A to point B. No break, no waiting, no surprises.",
    conclusion: "True luxury is no longer having to think about anything.",
    cta: "DISCOVER THE CONCIERGE",
  },
  zh: {
    badge: "礼宾服务",
    title: "从您的家门到停机坪，乃至更远。",
    intro:
      "我们的专属司机服务从头到尾、往返全程陪伴您。从您的住所到舷梯旁，再从抵达的停机坪一路送至您的最终目的地，服务链从不中断。",
    bullets: [
      "出发时专属司机按您指定的时间在您的住所或办公室恭候",
      "直接进入FBO贵宾休息室，告别排队，告别等待",
      "抵达时，第二位司机已在舷梯旁等候",
      "一路送达您的最终目的地：酒店、住所或商务会面",
    ],
    highlight: "往返全程。从A点到B点。无中断，无等待，无意外。",
    conclusion: "真正的奢华，是无需再为任何事操心。",
    cta: "了解礼宾服务",
  },
  ar: {
    badge: "الكونسيرج",
    title: "من بابك إلى المدرج، وما هو أبعد بكثير.",
    intro:
      "تواكبك خدمة السائق لدينا من الألف إلى الياء، ذهاباً وإياباً. من منزلك إلى سلم الطائرة، ثم من مدرج الوصول حتى وجهتك النهائية، دون أي انقطاع في سلسلة الخدمة.",
    bullets: [
      "سائق خاص في منزلك أو مكتبك عند المغادرة، في الموعد الذي تحدده",
      "وصول مباشر إلى صالة FBO، لا مزيد من الطوابير ولا الانتظار",
      "عند الوصول، ينتظرك سائق ثانٍ عند سلم الطائرة",
      "توصيلك إلى وجهتك النهائية: الفندق أو المقر أو موعد العمل",
    ],
    highlight: "ذهاباً وإياباً. من النقطة أ إلى النقطة ب. بلا انقطاع، بلا انتظار، بلا مفاجآت.",
    conclusion: "الفخامة الحقيقية أن لا تفكّر في أي شيء بعد الآن.",
    cta: "اكتشف الكونسيرج",
  },
};

export default function ConciergerieSection() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.fr;

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex items-center justify-center text-center section-pad px-6 md:px-12"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="relative z-10 flex flex-col items-center w-full" style={{ maxWidth: "800px" }}>
        <SectionEyebrow tone="navy">{c.badge}</SectionEyebrow>

        <h2
          className="font-serif section-title"
          style={{ fontStyle: "italic", color: "#f8f5f0", marginBottom: "32px" }}
        >
          {c.title}
        </h2>

        <ul className="flex flex-col items-start" style={{ gap: "16px", marginBottom: "36px" }}>
          {c.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start text-left" style={{ gap: "12px" }}>
              <span
                aria-hidden="true"
                style={{ color: GOLD, fontSize: "22px", lineHeight: 1.7, flexShrink: 0 }}
              >
                &#10003;
              </span>
              <span
                className="font-serif"
                style={{
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  fontWeight: 400,
                  fontStyle: "normal",
                  color: "#f8f5f0",
                  lineHeight: 1.7,
                }}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="font-serif text-center"
          style={{ fontStyle: "italic", fontSize: "18px", color: GOLD, lineHeight: 1.4, marginBottom: "36px" }}
        >
          {c.conclusion}
        </p>

        <Link
          href="/conciergerie"
          className="btn-lift inline-block font-sans uppercase conciergerie-cta"
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            backgroundColor: GOLD,
            color: "#0A1628",
            padding: "14px 32px",
            textDecoration: "none",
          }}
        >
          {c.cta}
        </Link>
      </div>
    </motion.section>
  );
}
