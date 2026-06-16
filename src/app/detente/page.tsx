"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";

function IconSpa() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c0-6 3-9 8-10-1 6-4 9-8 10z" />
      <path d="M12 22c0-6-3-9-8-10 1 6 4 9 8 10z" />
      <path d="M12 12c0-4 1.5-7 0-10-1.5 3 0 6 0 10z" />
    </svg>
  );
}

function IconMassage() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="2.5" />
      <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      <path d="M7 13c1.5-1.5 3.2-2.2 5-2.2s3.5.7 5 2.2" />
    </svg>
  );
}

function IconZen() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2" />
      <path d="M3 21c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2" />
      <circle cx="12" cy="6" r="3" />
      <path d="M12 3v1M12 8v1M9 6h-1M16 6h-1" />
    </svg>
  );
}

const services = [
  {
    Icon: IconSpa,
    title: "Spa Privé en Altitude",
    desc: "Soins du visage, rituels d'hydratation et cosmétiques d'exception sélectionnés parmi les plus grandes maisons. Un institut suspendu entre ciel et terre, pour vous seul.",
  },
  {
    Icon: IconMassage,
    title: "Massage & Bien-être",
    desc: "Un praticien diplômé vous accompagne à bord pour un massage relaxant, drainant ou anti-jet-lag. Arriver reposé n'est plus un luxe, c'est votre standard.",
  },
  {
    Icon: IconZen,
    title: "Ambiance Zen",
    desc: "Lumière tamisée, parfums d'ambiance sur mesure, playlist méditative et aromathérapie. Chaque détail sensoriel est orchestré pour transformer le vol en parenthèse de sérénité.",
  },
];

export default function DetentePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/salon-vip.webp"
            alt="Cabine détente jet privé"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.55)" }} />
          <div className="relative z-10 text-center px-6 py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-sans uppercase mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9A96E" }}
            >
              DÉTENTE & RELAXATION
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              {"Le calme, à 12 000 mètres."}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.8 }}
            >
              Voyager ne devrait jamais fatiguer. À bord, nous transformons chaque heure de vol en
              une véritable parenthèse de bien-être.
            </motion.p>
          </div>
        </section>

        {/* 3 services */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0D1E35" }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="p-8"
                  style={{ border: "1px solid rgba(201,169,110,0.2)", backgroundColor: "#0D1E35" }}
                >
                  <div className="mb-6">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-white mb-3" style={{ fontSize: "22px" }}>
                    {title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "14px", color: "#C0C8D4", lineHeight: 1.8 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sur mesure */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                EXPÉRIENCE SUR MESURE
              </p>
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 44px)", color: "#0A1628" }}>
                Votre rituel, votre tempo.
              </h2>
              <p className="font-sans mb-8 max-w-xl mx-auto" style={{ fontSize: "16px", color: "#444444", lineHeight: 1.85 }}>
                {"Vol de nuit, décalage horaire, retour de voyage d'affaires ou simple envie de lâcher prise — nous composons une atmosphère de détente entièrement pensée pour vous, avant même votre embarquement."}
              </p>
              <Link
                href="/contact"
                className="inline-block font-sans uppercase"
                style={{
                  padding: "14px 36px",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  backgroundColor: "#0A1628",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0A1628")}
              >
                Composer mon expérience
              </Link>
            </motion.div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
