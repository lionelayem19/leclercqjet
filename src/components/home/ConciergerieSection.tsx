"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const BULLETS: Record<string, string[]> = {
  fr: [
    "Chauffeur privé depuis votre domicile ou lieu de travail",
    "Accès direct au salon FBO — aucune file d'attente",
    "Votre véhicule vous attend au pied de l'avion à l'arrivée",
  ],
  en: [
    "Private chauffeur from your home or workplace",
    "Direct access to the FBO lounge — no queues",
    "Your vehicle awaits you at the foot of the aircraft on arrival",
  ],
  zh: [
    "从您的家或工作地点提供专属司机服务",
    "直接进入FBO贵宾休息室，无需排队",
    "抵达时您的车辆在舷梯旁等候",
  ],
  ar: [
    "سائق خاص من منزلك أو مكان عملك",
    "وصول مباشر إلى صالة FBO — بدون طوابير",
    "سيارتك تنتظرك عند سلم الطائرة عند الوصول",
  ],
};

const BADGE: Record<string, string> = {
  fr: "CONCIERGERIE", en: "CONCIERGE", zh: "礼宾服务", ar: "الكونسيرج",
};
const TITLE: Record<string, string> = {
  fr: "De votre domicile au tarmac.", en: "From your door to the tarmac.", zh: "从您的家门到停机坪。", ar: "من منزلك إلى المدرج.",
};
const CTA: Record<string, string> = {
  fr: "DÉCOUVRIR LA CONCIERGERIE", en: "DISCOVER CONCIERGE", zh: "了解礼宾服务", ar: "اكتشف الكونسيرج",
};

export default function ConciergerieSection() {
  const { lang } = useLanguage();
  const bullets = BULLETS[lang] || BULLETS.fr;

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "600px", backgroundColor: "#0A1628" }}
    >

      {/* Content — left-aligned, vertically centered */}
      <div
        className="relative z-10 flex flex-col justify-center h-full"
        style={{ paddingLeft: "8%", paddingRight: "8%" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: "520px" }}
        >
          <p className="font-sans uppercase mb-5" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {BADGE[lang] || BADGE.fr}
          </p>
          <h2 className="font-serif mb-8" style={{ fontSize: "48px", color: "#FFFFFF", lineHeight: 1.1 }}>
            {TITLE[lang] || TITLE.fr}
          </h2>

          <ul className="mb-8" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-4">
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C9A96E", marginTop: "10px", flexShrink: 0 }} />
                <p className="font-sans" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.8 }}>
                  {bullet}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/conciergerie"
            className="btn-lift inline-block font-sans uppercase hover:bg-white hover:text-navy hover:border-white"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              border: "1px solid rgba(255,255,255,0.5)",
              color: "#FFFFFF",
              padding: "12px 28px",
              textDecoration: "none",
            }}
          >
            {CTA[lang] || CTA.fr}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
