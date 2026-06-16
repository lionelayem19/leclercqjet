"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";

const GOLD = "#C9A96E";
const NAVY = "#0A1628";

// ── Timeline ──────────────────────────────────────────────
const TIMELINE: { year: string; title: string; text: string }[] = [
  {
    year: "2009",
    title: "La naissance d'une vision",
    text: "LECLERCQ'JET INTERNATIONAL voit le jour à Paris, fondée sur une conviction simple : le temps est le luxe ultime, et il mérite un service à sa hauteur.",
  },
  {
    year: "2013",
    title: "Un réseau d'exception",
    text: "Constitution d'un réseau exclusif d'opérateurs certifiés AOC, sélectionnés pour leur sécurité, leur ponctualité et la qualité irréprochable de leur flotte.",
  },
  {
    year: "2016",
    title: "La conciergerie sur-mesure",
    text: "Lancement de notre conciergerie aéronautique : gastronomie, chauffeur privé, événements et expériences personnalisées, du décollage à l'arrivée.",
  },
  {
    year: "2019",
    title: "L'envergure internationale",
    text: "Ouverture de relais à Genève et Dubaï. La Maison accompagne désormais une clientèle internationale sur les plus belles routes du monde.",
  },
  {
    year: "2022",
    title: "L'art de l'accessible",
    text: "Création des programmes Empty Legs et de fidélité, rendant l'aviation privée plus fluide, plus responsable et plus généreuse.",
  },
  {
    year: "2026",
    title: "Une nouvelle ère",
    text: "Une plateforme digitale repensée et des expériences à bord inédites : la même exigence, magnifiée par la technologie.",
  },
];

// ── Valeurs ───────────────────────────────────────────────
function IconExcellence() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}
function IconDiscretion() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
function IconSurMesure() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  );
}

const VALUES: { Icon: () => React.JSX.Element; title: string; text: string }[] = [
  {
    Icon: IconExcellence,
    title: "Excellence",
    text: "Chaque détail compte. De la sélection des appareils au service à bord, nous ne transigeons jamais sur la qualité.",
  },
  {
    Icon: IconDiscretion,
    title: "Discrétion",
    text: "La confidentialité absolue est notre signature. Vos déplacements, vos demandes et votre intimité restent strictement protégés.",
  },
  {
    Icon: IconSurMesure,
    title: "Sur-mesure",
    text: "Aucun voyage ne se ressemble. Nous composons chaque expérience autour de vos désirs, sans compromis ni standardisation.",
  },
];

// ── Équipe ────────────────────────────────────────────────
const TEAM: { initials: string; name: string; role: string }[] = [
  { initials: "AV", name: "Aviation & Opérations", role: "Sélection des appareils, planification et suivi de chaque vol." },
  { initials: "CL", name: "Conciergerie & Lifestyle", role: "Gastronomie, événements et expériences sur-mesure à bord." },
  { initials: "RC", name: "Relations Clients", role: "Un interlocuteur dédié, disponible 24h/24, 7j/7." },
  { initials: "SC", name: "Sûreté & Conformité", role: "Garants de la sécurité et des standards certifiés AOC." },
];

// ── Engagements ───────────────────────────────────────────
function IconShield() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.25-4.5 9-9 9s-9-3.75-9-9 4.5-9 9-9 9 3.75 9 9z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}
function IconGem() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  );
}

const COMMITMENTS: { Icon: () => React.JSX.Element; title: string; text: string }[] = [
  { Icon: IconShield, title: "Sécurité certifiée", text: "Exclusivement des opérateurs AOC, audités et conformes aux plus hauts standards internationaux." },
  { Icon: IconClock, title: "Disponibilité 24/7", text: "Un conseiller dédié répond à chaque demande, à toute heure, partout dans le monde." },
  { Icon: IconGem, title: "Confidentialité absolue", text: "La discrétion totale sur vos déplacements et vos données, sans exception." },
  { Icon: IconLeaf, title: "Engagement responsable", text: "Compensation carbone et carburants durables (SAF) pour voler avec conscience." },
];

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-navy pt-36 pb-20 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-sans uppercase mb-4" style={{ fontSize: "11px", letterSpacing: "0.3em", color: GOLD }}>
              Notre Histoire
            </p>
            <h1 className="font-serif text-white mb-5" style={{ fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 1.08 }}>
              L&apos;art de voyager autrement
            </h1>
            <p className="font-sans mx-auto" style={{ fontSize: "17px", color: "rgba(232,237,242,0.5)", maxWidth: "560px", lineHeight: 1.8 }}>
              Depuis Paris, LECLERCQ&apos;JET INTERNATIONAL réinvente le courtage aérien privé avec une seule obsession : faire de chaque trajet une expérience d&apos;exception.
            </p>
          </motion.div>
        </section>

        {/* Vision du fondateur */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-sans uppercase mb-8" style={{ fontSize: "10px", letterSpacing: "0.3em", color: GOLD }}>
                La vision du fondateur
              </p>
              <p className="font-serif italic" style={{ fontSize: "clamp(24px, 3.4vw, 38px)", color: NAVY, lineHeight: 1.4 }}>
                « Nous ne vendons pas des heures de vol. Nous offrons du temps retrouvé, une liberté de mouvement et la certitude que chaque détail a été pensé pour vous. »
              </p>
              <div className="flex items-center justify-center gap-4 mt-10">
                <div style={{ width: "40px", height: "1px", backgroundColor: GOLD }} />
                <p className="font-sans uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#9AA0A8" }}>
                  Le Fondateur · LECLERCQ&apos;JET INTERNATIONAL
                </p>
                <div style={{ width: "40px", height: "1px", backgroundColor: GOLD }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ backgroundColor: NAVY }} className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.3em", color: GOLD }}>
                Notre parcours
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.1 }}>
                Une histoire d&apos;exigence
              </h2>
            </motion.div>

            <div className="relative" style={{ paddingLeft: "8px" }}>
              {/* Vertical rail */}
              <div className="absolute top-2 bottom-2" style={{ left: "7px", width: "1px", backgroundColor: "rgba(201,169,110,0.25)" }} />

              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative"
                  style={{ paddingLeft: "40px", paddingBottom: i === TIMELINE.length - 1 ? "0" : "44px" }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute", left: 0, top: "6px", width: "15px", height: "15px",
                      borderRadius: "50%", backgroundColor: NAVY, border: `2px solid ${GOLD}`,
                      boxShadow: "0 0 0 4px rgba(201,169,110,0.08)",
                    }}
                  />
                  <p className="font-serif" style={{ fontSize: "26px", color: GOLD, lineHeight: 1, marginBottom: "8px" }}>
                    {item.year}
                  </p>
                  <h3 className="font-serif text-white" style={{ fontSize: "21px", marginBottom: "8px" }}>
                    {item.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "14px", color: "rgba(232,237,242,0.55)", lineHeight: 1.8 }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 max-w-2xl mx-auto">
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.3em", color: GOLD }}>
                Nos valeurs
              </p>
              <h2 className="font-serif mb-5" style={{ fontSize: "clamp(30px, 4vw, 46px)", color: NAVY, lineHeight: 1.1 }}>
                Trois principes, une signature
              </h2>
              <p className="font-sans" style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.8 }}>
                Des convictions qui guident chacune de nos décisions et façonnent l&apos;expérience LECLERCQ&apos;JET.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map(({ Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center p-10"
                  style={{ border: "1px solid #E8E8E8", borderTop: `3px solid ${GOLD}` }}
                >
                  <div
                    className="flex items-center justify-center mx-auto mb-6"
                    style={{ width: "60px", height: "60px", backgroundColor: NAVY, border: "1px solid rgba(201,169,110,0.3)" }}
                  >
                    <Icon />
                  </div>
                  <h3 className="font-serif mb-4" style={{ fontSize: "24px", color: NAVY }}>{title}</h3>
                  <p className="font-sans" style={{ fontSize: "14px", color: "#5A6472", lineHeight: 1.8 }}>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section style={{ backgroundColor: "#0D1E35" }} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 max-w-2xl mx-auto">
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.3em", color: GOLD }}>
                L&apos;équipe
              </p>
              <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.1 }}>
                Des artisans du voyage
              </h2>
              <p className="font-sans" style={{ fontSize: "15px", color: "rgba(232,237,242,0.55)", lineHeight: 1.8 }}>
                Une équipe restreinte et dévouée, réunie autour d&apos;une même passion : votre sérénité.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="text-center p-8"
                  style={{ backgroundColor: "#0A1628", border: "1px solid rgba(201,169,110,0.18)" }}
                >
                  <div
                    className="flex items-center justify-center mx-auto mb-5 font-serif"
                    style={{ width: "64px", height: "64px", borderRadius: "50%", border: `1px solid ${GOLD}`, color: GOLD, fontSize: "22px", letterSpacing: "0.05em" }}
                  >
                    {m.initials}
                  </div>
                  <h3 className="font-serif text-white mb-3" style={{ fontSize: "18px", lineHeight: 1.25 }}>{m.name}</h3>
                  <p className="font-sans" style={{ fontSize: "13px", color: "rgba(232,237,242,0.5)", lineHeight: 1.7 }}>{m.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagements */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 max-w-2xl mx-auto">
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.3em", color: GOLD }}>
                Nos engagements
              </p>
              <h2 className="font-serif mb-5" style={{ fontSize: "clamp(30px, 4vw, 46px)", color: NAVY, lineHeight: 1.1 }}>
                Des promesses que nous tenons
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COMMITMENTS.map(({ Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex items-start gap-5 p-8"
                  style={{ backgroundColor: "#F7F8FA", border: "1px solid #EDEFF2" }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: NAVY, border: "1px solid rgba(201,169,110,0.3)" }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-serif mb-2" style={{ fontSize: "20px", color: NAVY }}>{title}</h3>
                    <p className="font-sans" style={{ fontSize: "14px", color: "#5A6472", lineHeight: 1.75 }}>{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
