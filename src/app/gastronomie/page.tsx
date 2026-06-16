"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function IconCloche() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18" />
      <path d="M12 3v1.5" />
      <path d="M5.5 16A7 7 0 0 1 12 9a7 7 0 0 1 6.5 7" />
      <rect x="2" y="18" width="20" height="2" rx="1" />
    </svg>
  );
}

function IconToque() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M7 17h10" />
      <path d="M7 17v-3" />
      <path d="M17 17v-3" />
      <path d="M12 17v-3" />
      <path d="M6.5 9A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 5.5 5 4 4 0 0 1 0 5H6.5a4 4 0 0 1 0-5z" />
    </svg>
  );
}

function IconChampagne() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" />
      <path d="M12 15v6" />
      <path d="M8 3l1.5 9a2.5 2.5 0 0 0 5 0L16 3" />
      <path d="M7 6h10" />
    </svg>
  );
}

const services = [
  {
    Icon: IconCloche,
    title: "Plateaux Prestige",
    desc: "Sélection de mets raffinés préparés par nos traiteurs partenaires. Commande personnalisée 48h avant le vol.",
  },
  {
    Icon: IconToque,
    title: "Chef Privé à Bord",
    desc: "Sur demande, un chef étoilé ou talentueux vous accompagne à bord pour une expérience gastronomique unique en altitude.",
  },
  {
    Icon: IconChampagne,
    title: "Cave & Champagnes",
    desc: "Sélection de grands crus, champagnes et spiritueux d'exception. Accord mets-vins sur mesure disponible sur demande.",
  },
];

const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2";
const inputClass =
  "w-full border-b border-gray-200 text-[#0A1628] placeholder:text-gray-300 py-2.5 font-sans text-[14px] focus:border-[#0A1628] transition-colors bg-transparent outline-none";

export default function GastronomiePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flightDate: "",
    passengers: "",
    occasion: "",
    dietary: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "gastronomie" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", flightDate: "", passengers: "", occasion: "", dietary: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — fond #0A1628 avec photo cabine */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cabine.png"
            alt="Cabine jet privé"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.45)" }} />
          <div className="relative z-10 text-center px-6 py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-sans uppercase mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9A96E" }}
            >
              GASTRONOMIE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              {"L'excellence à bord."}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.8 }}
            >
              Parce que voler en jet privé ne signifie pas renoncer aux plaisirs de la table.
            </motion.p>
          </div>
        </section>

        {/* 3 services — fond #0D1E35 */}
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

        {/* Sur mesure — fond blanc */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                SUR MESURE
              </p>
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 44px)", color: "#0A1628" }}>
                Chaque vol est unique.
              </h2>
              <p className="font-sans mb-8 max-w-xl mx-auto" style={{ fontSize: "16px", color: "#444444", lineHeight: 1.85 }}>
                {"Anniversaire, dîner d'affaires, voyage de noces — nous créons des expériences gastronomiques personnalisées pour chaque occasion."}
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
                Nous soumettre votre demande
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Formulaire demande gastronomie */}
        <section className="py-20 px-6" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                DEMANDE GASTRONOMIE
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#0A1628" }}>
                Composez votre menu.
              </h2>
              <p className="font-sans mt-2" style={{ fontSize: "14px", color: "#888888" }}>
                Notre équipe vous recontacte sous 24 heures.
              </p>
            </motion.div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
                style={{ border: "1px solid rgba(201,169,110,0.2)" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                  style={{ border: "1px solid rgba(201,169,110,0.4)" }}
                >
                  <svg className="w-5 h-5" style={{ color: "#C9A96E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-sans text-[15px] text-gray-600">
                  Votre demande a bien été transmise. Nous vous recontactons sous 24h.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Nom</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Date du vol</label>
                    <input
                      type="date"
                      value={formData.flightDate}
                      onChange={(e) => setFormData({ ...formData, flightDate: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nombre de passagers</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Occasion</label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="Anniversaire, dîner d'affaires, voyage de noces..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Préférences alimentaires</label>
                  <input
                    type="text"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    placeholder="Végétarien, sans gluten, allergies..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez vos souhaits gastronomiques..."
                    className={inputClass + " resize-none"}
                  />
                </div>
                {status === "error" && (
                  <p className="font-sans text-[13px] text-red-500">Une erreur est survenue. Veuillez réessayer.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full font-sans uppercase py-4 disabled:opacity-60"
                  style={{
                    backgroundColor: "#0A1628",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#C9A96E"; }}
                  onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#0A1628"; }}
                >
                  {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
