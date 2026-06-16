"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuoteSection() {
  const { t } = useLanguage();

  return (
    <section style={{ backgroundColor: "#0A1628", paddingTop: "48px", paddingBottom: "48px", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center px-6"
      >
        <div style={{ width: "50px", height: "1px", backgroundColor: "#C9A96E", margin: "0 auto 32px" }} />
        <p className="font-serif italic" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", color: "#FFFFFF", lineHeight: 1.35 }}>
          {t.home.quote.text}
        </p>
        <div style={{ width: "50px", height: "1px", backgroundColor: "#C9A96E", margin: "32px auto 0" }} />
      </motion.div>
    </section>
  );
}
