"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [
  <svg key="cert" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
  <svg key="response" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="globe" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
  <svg key="lock" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  <svg key="clock" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth={1.25}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export default function WhyUsSection() {
  const { t } = useLanguage();
  const w = t.home.whyUs;

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "84px",
        paddingBottom: "84px",
        paddingLeft: "8%",
        paddingRight: "8%",
        borderTop: "3px solid #0A1628",
        borderBottom: "1px solid #F0F0F0",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0" style={{ borderTop: "1px solid rgba(201,169,110,0.12)", borderLeft: "1px solid rgba(201,169,110,0.12)" }}>
          {w.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="why-cell text-center px-6 py-6"
              style={{
                borderRight: "1px solid rgba(201,169,110,0.12)",
                borderBottom: "1px solid rgba(201,169,110,0.12)",
              }}
            >
              <div className="flex justify-center mb-4">{icons[i]}</div>
              <h3
                className="font-sans"
                style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628", marginBottom: "8px", lineHeight: 1.4 }}
              >
                {item.title}
              </h3>
              <p
                className="font-sans"
                style={{ fontSize: "12px", color: "#888888", lineHeight: 1.6 }}
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
