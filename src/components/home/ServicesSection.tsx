"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const DISCOVER: Record<string, string> = {
  fr: "Découvrir →", en: "Discover →", zh: "了解 →", ar: "اكتشف →",
};

// Image keyed by the service's href (stable identity) so the picture always
// follows its service, whatever the display order of the cards.
const SERVICE_IMAGES: Record<string, string> = {
  "/vols-prives": "/images/cabine.png", // intérieur de jet luxueux
  "/empty-legs": "/images/voiture-jet.png", // jet + voiture de nuit (tarmac)
  "/charter-management": "/images/empty-legs.png", // jet
  "/acquisition": "/images/acquisition.png", // jet en vol
  "/conciergerie": "/images/chauffeur.webp", // chauffeur / majordome
  "/gastronomie": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80", // cuisine / chef
};

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const s = t.home.services;

  return (
    <section
      className="bg-white section-pad"
      style={{
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
          <SectionEyebrow tone="beige">{s.badge}</SectionEyebrow>
          <h2 className="title-gold font-serif section-title" style={{ fontStyle: "italic" }}>
            {s.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                className="home-service-card"
                style={{
                  height: "320px",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SERVICE_IMAGES[item.href]}
                  alt={item.title}
                  className="home-service-card__img absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Gradient overlay: top transparent vers navy foncé en bas pour la lisibilité des titres */}
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(10,22,40,0.9) 100%)",
                  }}
                />
                {/* Overlay doré — apparaît en fondu au survol */}
                <div
                  className="home-service-card__wash absolute inset-0"
                  aria-hidden="true"
                  style={{ background: "rgba(201,169,110,0.15)" }}
                />
                {/* Titre + accents, bas-gauche, identiques pour les 6 cartes */}
                <div className="absolute z-10" style={{ left: "24px", right: "24px", bottom: "24px" }}>
                  <h3
                    className="home-service-card__title font-sans uppercase"
                    style={{
                      fontSize: "18px",
                      letterSpacing: "0.15em",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1.2,
                      textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    }}
                  >
                    {item.title}
                  </h3>
                  {/* Liseré doré : 40px qui se déploie à 70px au survol */}
                  <div
                    className="home-service-card__rule"
                    aria-hidden="true"
                    style={{
                      height: "2px",
                      backgroundColor: "#C9A96E",
                      marginTop: "12px",
                    }}
                  />
                  {/* "Découvrir →" en doré, fade-in au survol */}
                  <span
                    className="home-service-card__discover font-sans block"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      color: "#C9A96E",
                      marginTop: "12px",
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
