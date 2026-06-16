"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const chauffeurBullets = [
  "Transfert domicile → tarmac aller et retour",
  "Véhicule et chauffeur disponibles pendant tout le séjour",
  "Discrétion et ponctualité garanties",
];

const gastroServices = [
  "Plateaux repas personnalisés selon vos goûts",
  "Restrictions alimentaires et régimes : végétarien, vegan, halal, casher, sans gluten, diététique",
  "Chef cuisinier à bord sur demande — cuisine française, italienne, asiatique, méditerranéenne et du monde entier",
  "Panier repas premium pour vols courts",
  "Sélection de vins, champagnes et spiritueux d'exception",
];

const animauxServices = [
  "Accueil des animaux à bord dans les meilleures conditions",
  "Repas adaptés et personnalisés pour vos animaux",
  "Service de garde professionnelle pendant votre voyage",
  "Suivi quotidien et rapport de bien-être si besoin",
];

const familleServices = [
  "Animateur professionnel disponible à bord sur demande",
  "Activités et jeux adaptés à chaque âge",
  "Menus enfants personnalisés",
  "Confort et sécurité des plus petits assurés",
];

const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2";
const inputClass = "w-full border-b border-gray-200 text-[#0A1628] placeholder:text-gray-300 py-2.5 font-sans text-[14px] focus:border-[#0A1628] transition-colors bg-transparent outline-none";

function Section({ id, dark, children }: { id?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="py-20 px-6"
      style={{ backgroundColor: dark ? "#0A1628" : "#FFFFFF", paddingLeft: "max(24px, 8%)", paddingRight: "max(24px, 8%)" }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function GoldDot() {
  return <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#C9A96E", display: "inline-block", marginRight: 12, flexShrink: 0, marginTop: 8 }} />;
}

export default function ConciergeriePage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", flightDate: "",
    passengers: "", animals: "non", children: "non", needs: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "conciergerie" }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setFormData({ name: "", email: "", phone: "", flightDate: "", passengers: "", animals: "non", children: "non", needs: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="flex items-center justify-center text-center px-6"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          <div className="py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-sans uppercase mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9A96E" }}
            >
              CONCIERGERIE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, maxWidth: "800px", margin: "0 auto" }}
            >
              {"Une expérience sur mesure, du sol aux nuages."}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-6 mt-10"
            >
              {[
                { label: "Chauffeur Privé", href: "/conciergerie/chauffeur" },
                { label: "Gastronomie", href: "/conciergerie/gastronomie" },
                { label: "Animaux", href: "/conciergerie/animaux" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-sans uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(201,169,110,0.7)", textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.7)")}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CHAUFFEUR PRIVÉ */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>01</p>
            <h2 className="font-serif mb-6" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#0A1628" }}>
              Chauffeur Privé
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-sans" style={{ fontSize: "15px", color: "#444444", lineHeight: 1.9 }}>
                {"Votre chauffeur privé vous prend en charge depuis votre domicile ou lieu de travail jusqu'au tarmac. À l'arrivée, un véhicule vous attend au pied de l'avion. Nous pouvons également assurer votre prise en charge sur toute la durée de votre séjour — transferts, déplacements quotidiens, mise à disposition permanente."}
              </p>
              <ul className="mt-6 space-y-3">
                {chauffeurBullets.map((b) => (
                  <li key={b} className="flex items-start font-sans" style={{ fontSize: "14px", color: "#555555" }}>
                    <GoldDot />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/conciergerie/chauffeur"
                className="inline-block font-sans uppercase mt-8"
                style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#0A1628", borderBottom: "1px solid #C9A96E", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0A1628")}
              >
                En savoir plus →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-hidden"
              style={{ height: "320px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/chauffeur.webp" alt="Chauffeur privé" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </Section>

        {/* GASTRONOMIE & PERSONNALISATION */}
        <Section dark>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>02</p>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              {"Gastronomie & Personnalisation"}
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.9 }}>
              {"Chaque vol est une expérience unique. Nous prenons en charge vos préférences alimentaires, restrictions et régimes spécifiques — sans exception."}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gastroServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6"
                style={{ border: "1px solid rgba(201,169,110,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div className="w-5 h-px mb-4" style={{ backgroundColor: "#C9A96E" }} />
                <p className="font-sans" style={{ fontSize: "14px", color: "#C0C8D4", lineHeight: 1.75 }}>{service}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/conciergerie/gastronomie"
              className="inline-block font-sans uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(201,169,110,0.8)", borderBottom: "1px solid rgba(201,169,110,0.4)", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.8)")}
            >
              {"Composer mon menu →"}
            </Link>
          </div>
        </Section>

        {/* ANIMAUX DE COMPAGNIE */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>03</p>
            <h2 className="font-serif mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#0A1628" }}>
              Vos Animaux Voyagent Aussi.
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "15px", color: "#444444", lineHeight: 1.9 }}>
              {"Vos compagnons font partie du voyage. Nous organisons leur prise en charge à bord avec le confort qu'ils méritent, ou leur garde professionnelle pendant toute la durée de votre séjour."}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {animauxServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 flex items-start gap-4"
                style={{ borderBottom: "1px solid #F0F0F0", borderRight: i % 2 === 0 ? "1px solid #F0F0F0" : "none" }}
              >
                <GoldDot />
                <p className="font-sans" style={{ fontSize: "14px", color: "#444444", lineHeight: 1.75 }}>{s}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/conciergerie/animaux"
              className="inline-block font-sans uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#0A1628", borderBottom: "1px solid #C9A96E", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0A1628")}
            >
              {"En savoir plus →"}
            </Link>
          </div>
        </Section>

        {/* ENFANTS & LONGS VOLS */}
        <Section dark>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>04</p>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              Les Longs Vols en Famille.
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.9 }}>
              {"Pour les vols longue distance avec enfants, nous proposons des solutions d'animation à bord pour que chaque membre de la famille profite du voyage."}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {familleServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6"
                style={{ border: "1px solid rgba(201,169,110,0.12)" }}
              >
                <GoldDot />
                <p className="font-sans" style={{ fontSize: "14px", color: "#C0C8D4", lineHeight: 1.75 }}>{s}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* FORMULAIRE */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
              DEMANDE DE CONCIERGERIE
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#0A1628" }}>
              {"Décrivez votre voyage idéal."}
            </h2>
            <p className="font-sans mt-2" style={{ fontSize: "14px", color: "#888888" }}>
              {"Notre équipe vous recontacte sous 2 heures."}
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
              style={{ border: "1px solid rgba(201,169,110,0.2)", maxWidth: "640px" }}
            >
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-5" style={{ border: "1px solid rgba(201,169,110,0.4)" }}>
                <svg className="w-5 h-5" style={{ color: "#C9A96E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-sans text-[15px] text-gray-600">{"Votre demande a bien été reçue. Notre équipe vous recontacte sous 2 heures."}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" style={{ maxWidth: "640px" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nom</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{"Téléphone"}</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{"Date du vol"}</label>
                  <input type="date" value={formData.flightDate} onChange={(e) => setFormData({ ...formData, flightDate: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>{"Passagers"}</label>
                  <input type="number" min="1" value={formData.passengers} onChange={(e) => setFormData({ ...formData, passengers: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{"Animaux"}</label>
                  <select value={formData.animals} onChange={(e) => setFormData({ ...formData, animals: e.target.value })} className={inputClass + " text-[#0A1628]"}>
                    <option value="non">Non</option>
                    <option value="oui">Oui</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{"Enfants"}</label>
                  <select value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} className={inputClass + " text-[#0A1628]"}>
                    <option value="non">Non</option>
                    <option value="oui">Oui</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>{"Besoins spécifiques"}</label>
                <input type="text" value={formData.needs} onChange={(e) => setFormData({ ...formData, needs: e.target.value })} placeholder="Alimentaires, mobilité, préférences..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Décrivez votre demande..." className={inputClass + " resize-none"} />
              </div>
              {status === "error" && <p className="font-sans text-[13px] text-red-500">{"Une erreur est survenue. Veuillez réessayer."}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full font-sans uppercase py-4 disabled:opacity-60"
                style={{ backgroundColor: "#0A1628", color: "#FFFFFF", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700, border: "none", cursor: "pointer", transition: "background-color 0.2s ease" }}
                onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#C9A96E"; }}
                onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#0A1628"; }}
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
            </form>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
