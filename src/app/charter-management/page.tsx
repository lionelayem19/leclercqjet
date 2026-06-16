"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const steps = [
  {
    num: "01",
    title: "Vous nous confiez votre appareil",
    desc: "Nous analysons votre usage et identifions les créneaux disponibles pour la mise en exploitation commerciale.",
  },
  {
    num: "02",
    title: "Nous gérons tout",
    desc: "Notre réseau d'opérateurs certifiés AOC prend en charge l'exploitation, la maintenance et la gestion administrative.",
  },
  {
    num: "03",
    title: "Vous percevez des revenus",
    desc: "Votre jet génère des revenus pendant vos absences. Vous le récupérez quand vous en avez besoin.",
  },
];

const stats = [
  { value: "500 000€", label: "Revenus annuels moyens générés" },
  { value: "50%", label: "Des coûts fixes couverts en moyenne" },
  { value: "72h", label: "Préavis pour récupérer votre appareil" },
  { value: "100%", label: "Opérateurs certifiés AOC" },
];

const whyUs = [
  {
    title: "Réseau d'opérateurs de confiance",
    desc: "Nos partenaires sont certifiés AOC et sélectionnés pour leur sérieux et leur réputation dans l'aviation privée.",
  },
  {
    title: "Transparence totale sur les revenus générés",
    desc: "Reporting mensuel détaillé. Vous savez à tout moment combien votre appareil génère et comment il est exploité.",
  },
  {
    title: "Votre appareil disponible quand vous le souhaitez",
    desc: "Préavis de 72 heures maximum. Votre jet reste le vôtre, disponible à tout moment selon vos besoins.",
  },
];

const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2";
const inputClass =
  "w-full border-b border-gray-200 text-[#0A1628] placeholder:text-gray-300 py-2.5 font-sans text-[14px] focus:border-[#0A1628] transition-colors bg-transparent outline-none";

export default function CharterManagementPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aircraft: "",
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
        body: JSON.stringify({ ...formData, type: "charter-management" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", aircraft: "", message: "" });
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
        {/* Hero — fond #0A1628 sobre */}
        <section
          className="relative flex items-center justify-center"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          <div className="relative z-10 text-center px-6 py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-sans uppercase mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9A96E" }}
            >
              CHARTER MANAGEMENT
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-white"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1 }}
            >
              Rentabilisez votre jet privé.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.8 }}
            >
              {"Vous possédez un jet privé ? Confiez-le à des opérateurs certifiés et générez des revenus lorsque vous ne l'utilisez pas."}
            </motion.p>
          </div>
        </section>

        {/* Comment ça marche — fond #0A1628 */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                COMMENT ÇA MARCHE
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                Trois étapes simples.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`p-8 md:p-10 ${i < steps.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`}
                  style={{ borderColor: "rgba(201,169,110,0.12)" }}
                >
                  <span
                    className="font-serif block mb-5 select-none"
                    style={{ fontSize: "56px", color: "rgba(201,169,110,0.15)", lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-serif text-white mb-3" style={{ fontSize: "22px" }}>
                    {step.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "15px", color: "#C0C8D4", lineHeight: 1.8 }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats — fond blanc */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white text-center p-10"
                >
                  <p
                    className="font-serif"
                    style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#0A1628", lineHeight: 1 }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-sans mt-3" style={{ fontSize: "12px", color: "#888888", letterSpacing: "0.03em" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir — fond #0A1628 */}
        <section className="py-20 px-6" style={{ backgroundColor: "#0A1628" }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: "max(24px, 4%)", paddingRight: "max(24px, 4%)" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                NOS ATOUTS
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                Pourquoi nous choisir.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8"
                  style={{ border: "1px solid rgba(201,169,110,0.15)" }}
                >
                  <div className="w-8 h-px mb-6" style={{ backgroundColor: "#C9A96E" }} />
                  <h3 className="font-serif text-white mb-3" style={{ fontSize: "20px" }}>
                    {item.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "14px", color: "#C0C8D4", lineHeight: 1.8 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vous êtes investisseur ? — fond blanc */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                INVESTISSEMENT
              </p>
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 44px)", color: "#0A1628" }}>
                {"Investir dans un jet privé, c'est possible."}
              </h2>
              <p className="font-sans mb-8 max-w-2xl mx-auto" style={{ fontSize: "16px", color: "#444444", lineHeight: 1.85 }}>
                {"Certains investisseurs acquièrent des jets privés uniquement pour les mettre en exploitation commerciale. Rendement brut estimé entre 6 et 12% selon l'appareil. Notre équipe vous accompagne de l'acquisition à l'exploitation."}
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
                Nous contacter
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Formulaire de contact */}
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
                NOUS CONTACTER
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#0A1628" }}>
                {"Confiez-nous votre appareil."}
              </h2>
              <p className="font-sans mt-2" style={{ fontSize: "14px", color: "#888888" }}>
                Notre équipe vous recontacte sous 48 heures.
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
                  {"Votre demande a bien été transmise. Nous vous recontactons sous 48h."}
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
                    <label className={labelClass}>Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{"Type d'appareil"}</label>
                    <input
                      type="text"
                      value={formData.aircraft}
                      onChange={(e) => setFormData({ ...formData, aircraft: e.target.value })}
                      placeholder="Ex : Falcon 900, Citation XLS..."
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet, usage actuel de l'appareil..."
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
