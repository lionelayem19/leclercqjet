"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const DISCOVER: Record<string, string> = {
  fr: "Découvrir →", en: "Discover →", zh: "了解 →", ar: "اكتشف →",
};

const SERVICE_IMAGES = [
  "/images/cabine.png",
  "/images/voiture-jet.png",
  "/images/chauffeur.webp",
  "/images/acquisition.png",
  "/images/empty-legs.png",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
];

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const s = t.home.services;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
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
          className="mb-12"
        >
          <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {s.badge}
          </p>
          <h2 className="font-serif" style={{ fontSize: "42px", color: "#0A1628" }}>
            {s.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {s.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={item.href}
                className="block relative overflow-hidden"
                style={{
                  height: "320px",
                  textDecoration: "none",
                  display: "block",
                  transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SERVICE_IMAGES[i]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  style={{
                    transform: hovered === i ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                />
                {/* Gradient overlay from bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: hovered === i
                      ? "linear-gradient(to top, rgba(6,14,26,0.8) 0%, rgba(6,14,26,0.1) 60%, transparent 100%)"
                      : "linear-gradient(to top, rgba(6,14,26,0.95) 0%, rgba(6,14,26,0.2) 60%, transparent 100%)",
                    transition: "background 0.4s ease",
                  }}
                />
                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h3
                    className="font-sans uppercase"
                    style={{ fontSize: "13px", letterSpacing: "0.2em", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "13px",
                      color: "#C0C8D4",
                      lineHeight: 1.65,
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? "translateY(0)" : "translateY(6px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      marginBottom: "8px",
                    }}
                  >
                    {item.desc}
                  </p>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "12px",
                      color: "#C9A96E",
                      opacity: hovered === i ? 1 : 0,
                      transition: "opacity 0.3s ease 0.05s",
                    }}
                  >
                    {DISCOVER[lang] || DISCOVER.fr}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
