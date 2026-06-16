"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";

function IconBabyShower() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a4 4 0 0 1 4 4c0 2-1.2 3-1.2 3H9.2S8 9 8 7a4 4 0 0 1 4-4z" />
      <path d="M9 13h6l-1 7a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1l-1-7z" />
      <path d="M7 13h10" />
    </svg>
  );
}

function IconAnniversaire() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7z" />
      <path d="M4 16c1.3 0 1.3 1 2.6 1S8 16 9.3 16s1.3 1 2.7 1 1.3-1 2.6-1 1.4 1 2.7 1 1.3-1 2.7-1" />
      <path d="M8 11V7M12 11V6M16 11V7" />
      <path d="M8 4.5c0 .8-.6 1-.6 1M12 3.5c0 .9-.6 1.1-.6 1.1M16 4.5c0 .8-.6 1-.6 1" />
    </svg>
  );
}

function IconMariage() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M9 9l1.5-3.5h3L15 9" />
    </svg>
  );
}

const events = [
  {
    Icon: IconBabyShower,
    label: "BABY SHOWER",
    title: "Célébrer l'attente, en première classe.",
    desc: "Une parenthèse délicate à 12 000 mètres pour honorer la future maman. Décoration florale pastel, mocktails signature, douceurs pâtissières créées sur mesure et album souvenir : nous orchestrons un moment d'une tendresse rare, suspendu au-dessus des nuages.",
  },
  {
    Icon: IconAnniversaire,
    label: "ANNIVERSAIRE",
    title: "Une année de plus, une altitude de plus.",
    desc: "Du dîner étoilé au champagne grand cru, de la playlist intime au gâteau d'exception signé par un chef pâtissier renommé. Que vous soyez deux ou douze, votre anniversaire devient une destination en soi — célébré là où personne ne l'oubliera.",
  },
  {
    Icon: IconMariage,
    label: "MARIAGE",
    title: "Dire oui, plus près des étoiles.",
    desc: "Cérémonie d'exception, lune de miel inaugurée dès le décollage ou voyage des mariés vers une destination de rêve. Cabine habillée de blanc, pétales, champagne millésimé et service d'une discrétion absolue : nous transformons le plus beau jour en un souvenir inégalable.",
  },
];

export default function EvenementsPage() {
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
            src="/images/cabine.png"
            alt="Cabine événement jet privé"
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
              ÉVÉNEMENTS SPÉCIAUX
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              {"Vos plus beaux moments prennent de la hauteur."}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.8 }}
            >
              Baby shower, anniversaire ou mariage — chaque célébration mérite un écrin
              d&apos;exception. Le ciel devient le vôtre.
            </motion.p>
          </div>
        </section>

        {/* Événements — blocs éditoriaux alternés */}
        <section className="bg-white" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <div className="max-w-5xl mx-auto px-6">
            {events.map(({ Icon, label, title, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                style={{
                  paddingTop: "50px",
                  paddingBottom: "50px",
                  borderBottom: i < events.length - 1 ? "1px solid #ECECEC" : "none",
                }}
              >
                {/* Icon + label */}
                <div className="md:col-span-4">
                  <div
                    className="inline-flex items-center justify-center mb-5"
                    style={{ width: "64px", height: "64px", border: "1px solid rgba(201,169,110,0.3)" }}
                  >
                    <Icon />
                  </div>
                  <p className="font-sans uppercase" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9A96E" }}>
                    {label}
                  </p>
                </div>

                {/* Content */}
                <div className="md:col-span-8">
                  <h2 className="font-serif mb-4" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", color: "#0A1628", lineHeight: 1.15 }}>
                    {title}
                  </h2>
                  <p className="font-sans" style={{ fontSize: "16px", color: "#444444", lineHeight: 1.9 }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sur mesure */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                ORGANISATION CLÉ EN MAIN
              </p>
              <h2 className="font-serif mb-6 text-white" style={{ fontSize: "clamp(26px, 4vw, 44px)", lineHeight: 1.1 }}>
                Une seule équipe, chaque détail.
              </h2>
              <p className="font-sans mb-9 max-w-xl mx-auto" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.85 }}>
                {"De la scénographie de la cabine au choix du traiteur, des fleurs au photographe à bord — notre conciergerie événementielle prend tout en charge. Vous n'avez qu'à savourer l'instant."}
              </p>
              <Link
                href="/contact"
                className="inline-block font-sans uppercase"
                style={{
                  padding: "15px 42px",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  backgroundColor: "#C9A96E",
                  color: "#0A1628",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a8874a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9A96E")}
              >
                Imaginer mon événement
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
