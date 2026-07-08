"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function HowItWorksSection() {
  const { t } = useLanguage();
  const hiw = t.home.howItWorks;

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionEyebrow tone="beige">{hiw.badge}</SectionEyebrow>
          <h2 className="font-serif section-title" style={{ color: "#8B6F3F", fontStyle: "italic" }}>
            {hiw.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute"
            style={{ top: "60px", left: "12.5%", right: "12.5%", height: "1px", backgroundColor: "#C9A96E", opacity: 0.3 }}
          />

          {hiw.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative px-0 md:px-8 pb-10 md:pb-0"
            >
              {/* Ghost number — filigrane */}
              <div className="relative mb-4" style={{ height: "100px", overflow: "hidden" }}>
                <span
                  className="font-serif select-none absolute left-0 top-0 leading-none"
                  style={{ fontSize: "140px", fontWeight: 700, color: "#8B6F3F", opacity: 0.3, lineHeight: 1 }}
                >
                  {step.num}
                </span>
                {/* Dot */}
                <div
                  className="hidden md:block absolute"
                  style={{ top: "50px", left: "8px", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#C9A96E" }}
                />
              </div>

              <h3 className="font-sans mb-3" style={{ fontSize: "16px", fontWeight: 700, color: "#0A1628" }}>
                {step.title}
              </h3>
              <p className="font-sans" style={{ fontSize: "16px", color: "#0A1628", lineHeight: 1.6 }}>
                {step.desc}
              </p>

              {i < hiw.steps.length - 1 && (
                <div className="md:hidden mt-8" style={{ borderBottom: "1px solid #F0F0F0" }} />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            href="/vols-prives"
            className="btn-lift inline-block font-sans uppercase"
            style={{
              backgroundColor: "#0A1628",
              color: "#FFFFFF",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              padding: "14px 40px",
              textDecoration: "none",
            }}
          >
            {hiw.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
