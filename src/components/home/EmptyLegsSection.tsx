"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const SUBTITLE: Record<string, string> = {
  fr: "Des vols d'exception disponibles maintenant.",
  en: "Exceptional flights available right now.",
  zh: "现在即可预订的顶级航班。",
  ar: "رحلات استثنائية متاحة الآن.",
};

const DISCLAIMER: Record<string, string> = {
  fr: "Vols présentés à titre indicatif. Contactez-nous pour les disponibilités en temps réel.",
  en: "Flights shown are indicative. Contact us for real-time availability.",
  zh: "所示航班仅供参考。请联系我们了解实时供应。",
  ar: "الرحلات المعروضة استرشادية. اتصل بنا للتوافر الفوري.",
};

const VIEW_ALL: Record<string, string> = {
  fr: "VOIR TOUS LES VOLS DISPONIBLES",
  en: "VIEW ALL AVAILABLE FLIGHTS",
  zh: "查看所有可用航班",
  ar: "عرض جميع الرحلات المتاحة",
};

const ASK: Record<string, string> = {
  fr: "DEMANDER CE VOL",
  en: "REQUEST THIS FLIGHT",
  zh: "申请此航班",
  ar: "طلب هذه الرحلة",
};

const FBO_LABEL: Record<string, string> = {
  fr: "ACCÈS TARMAC DIRECT  ·  SALON FBO PRIVÉ",
  en: "DIRECT TARMAC ACCESS  ·  PRIVATE FBO LOUNGE",
  zh: "直通停机坪  ·  私人FBO贵宾厅",
  ar: "وصول مباشر للمدرج  ·  صالة FBO الخاصة",
};

export default function EmptyLegsSection() {
  const { t, lang } = useLanguage();
  const el = t.home.emptyLegs;
  const flights = el.flights;

  return (
    <section
      style={{
        backgroundColor: "#0A1628",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {el.badge}
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: "42px", color: "#FFFFFF" }}>
            {el.title}
          </h2>
          <p className="font-sans italic" style={{ fontSize: "16px", color: "#C0C8D4" }}>
            {SUBTITLE[lang] || SUBTITLE.fr}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {flights.map((flight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="gold-hover"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
            >
              {/* Card header */}
              <div style={{ backgroundColor: "#060E1A", padding: "16px 20px" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 text-center">
                    <p className="font-sans font-bold uppercase" style={{ fontSize: "12px", color: "#E8EDF2", letterSpacing: "0.2em" }}>
                      {flight.from}
                    </p>
                    <p className="font-sans" style={{ fontSize: "10px", color: "#C9A96E", letterSpacing: "0.1em", marginTop: "2px" }}>
                      {flight.fromCode}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201,169,110,0.3)" }} />
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201,169,110,0.3)" }} />
                  </div>
                  <div className="shrink-0 text-center">
                    <p className="font-sans font-bold uppercase" style={{ fontSize: "12px", color: "#E8EDF2", letterSpacing: "0.2em" }}>
                      {flight.to}
                    </p>
                    <p className="font-sans" style={{ fontSize: "10px", color: "#C9A96E", letterSpacing: "0.1em", marginTop: "2px" }}>
                      {flight.toCode}
                    </p>
                  </div>
                </div>
                {flight.urgent ? (
                  <span
                    className="font-sans uppercase"
                    style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#E05252", backgroundColor: "rgba(224,82,82,0.12)", padding: "3px 8px" }}
                  >
                    DERNIÈRES MINUTES
                  </span>
                ) : (
                  <span
                    className="font-sans uppercase"
                    style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(201,169,110,0.6)", border: "1px solid rgba(201,169,110,0.2)", padding: "3px 8px" }}
                  >
                    Vol Partagé
                  </span>
                )}
              </div>

              {/* Card body */}
              <div style={{ backgroundColor: "#0D1E35", padding: "20px" }}>
                <p className="font-serif mb-1" style={{ fontSize: "36px", color: "#C9A96E", fontWeight: 600, lineHeight: 1 }}>
                  {flight.price}
                </p>
                <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#888888", lineHeight: 1.6, marginTop: "6px" }}>
                  {flight.aircraft} · {flight.seats} places · {flight.time}
                </p>
                <span
                  className="font-sans uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(201,169,110,0.7)" }}
                >
                  {FBO_LABEL[lang] || FBO_LABEL.fr}
                </span>
              </div>

              {/* Card footer */}
              <div style={{ backgroundColor: "#0D1E35", borderTop: "1px solid rgba(201,169,110,0.1)", padding: "14px 20px" }}>
                <Link
                  href="/vols-prives"
                  className="inline-block font-sans uppercase transition-all duration-200 hover:bg-gold hover:border-gold hover:text-navy"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.5)",
                    padding: "8px 20px",
                    textDecoration: "none",
                  }}
                >
                  {ASK[lang] || ASK.fr}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-center italic mb-8" style={{ fontSize: "16px", color: "#666666", lineHeight: 1.6 }}>
          {DISCLAIMER[lang] || DISCLAIMER.fr}
        </p>

        {/* View all CTA */}
        <div className="text-center">
          <Link
            href="/empty-legs"
            className="inline-block font-sans uppercase transition-opacity hover:opacity-80"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              border: "1px solid rgba(232,237,242,0.3)",
              color: "#E8EDF2",
              padding: "14px 48px",
              textDecoration: "none",
            }}
          >
            {VIEW_ALL[lang] || VIEW_ALL.fr}
          </Link>
        </div>
      </div>
    </section>
  );
}
