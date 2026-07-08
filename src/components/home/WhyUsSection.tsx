"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const icons = [
  <svg key="heart" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
  <svg key="cert" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
  <svg key="globe" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
  <svg key="lock" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  <svg key="clock" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export default function WhyUsSection() {
  const { t } = useLanguage();
  const w = t.home.whyUs;

  return (
    <section
      className="section-pad"
      style={{
        backgroundColor: "#f8f5f0",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: "56px" }}>
          <SectionEyebrow tone="beige">POURQUOI NOUS</SectionEyebrow>
          <h2 className="section-title font-serif" style={{ color: "#0A1628", margin: 0 }}>
            {w.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {w.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="why-cell text-center flex flex-col items-center"
              style={{
                padding: "32px 24px",
              }}
            >
              <div className="flex justify-center mb-5">{icons[i]}</div>
              <h3
                className="font-serif"
                style={{ fontSize: "24px", fontWeight: 600, color: "#8B6F3F", marginBottom: "12px", lineHeight: 1.3 }}
              >
                {item.title}
              </h3>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#B8923D", marginBottom: "16px" }} />
              <p
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 400, color: "#3a3a3a", lineHeight: 1.7 }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
