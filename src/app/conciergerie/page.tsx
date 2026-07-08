"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const chauffeurBullets = [
  "Transfert domicile → tarmac aller et retour",
  "Véhicule et chauffeur disponibles pendant tout le séjour",
  "Discrétion et ponctualité garanties",
];

const gastroServices = [
  "Plateaux repas personnalisés selon vos goûts",
  "Restrictions alimentaires et régimes : végétarien, vegan, halal, casher, sans gluten, diététique",
  "Chef cuisinier à bord sur demande, cuisine française, italienne, asiatique, méditerranéenne et du monde entier",
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

const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-white/50 uppercase mb-2";
const inputClass = "w-full border-b border-white/15 text-white placeholder:text-white/30 py-2.5 font-sans text-[14px] focus:border-[#C9A96E] transition-colors bg-transparent outline-none";

function Section({ id, dark, children }: { id?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="py-20 px-6"
      style={{ backgroundColor: "#0A1628", paddingLeft: "max(24px, 8%)", paddingRight: "max(24px, 8%)" }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function GoldDot() {
  return <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#C9A96E", display: "inline-block", marginRight: 12, flexShrink: 0, marginTop: 8 }} />;
}

// ── Carte Blanche — prestation sur demande (multilingue, « Carte Blanche » reste en français) ──
const CARTE_BLANCHE: Record<string, { eyebrow: string; title: string; body: string; signature: string; cta: string }> = {
  fr: {
    eyebrow: "SUR DEMANDE",
    title: "Carte Blanche",
    body: "Ce que vous imaginez ne figure dans aucune de nos pages ? Confiez-le-nous. Chaque demande, même la plus singulière, trouve sa réponse dans notre maison.",
    signature: "Il suffit de demander.",
    cta: "FORMULER VOTRE DEMANDE",
  },
  en: {
    eyebrow: "UPON REQUEST",
    title: "Carte Blanche",
    body: "What you have in mind appears on none of our pages? Entrust it to us. Every request, however singular, finds its answer within our house.",
    signature: "Just ask.",
    cta: "MAKE YOUR REQUEST",
  },
  zh: {
    eyebrow: "应您所求",
    title: "Carte Blanche",
    body: "您所设想的，未见于我们的任何页面？请放心交予我们。每一个请求，无论多么独特，都能在我们的团队中找到答案。",
    signature: "开口即可。",
    cta: "提出您的请求",
  },
  ar: {
    eyebrow: "عند الطلب",
    title: "Carte Blanche",
    body: "ما تتخيّله لا يرد في أيٍّ من صفحاتنا؟ اعهد به إلينا. كل طلب، مهما كان استثنائياً، يجد جوابه في دارنا.",
    signature: "يكفي أن تطلب.",
    cta: "قدّم طلبك",
  },
};

// Renforts d'angle dorés (traits en L), style écrin / faire-part
function CornerBrackets() {
  const base: React.CSSProperties = { position: "absolute", width: 16, height: 16, pointerEvents: "none" };
  const G = "2px solid #C9A96E";
  return (
    <>
      <span aria-hidden="true" style={{ ...base, top: 12, left: 12, borderTop: G, borderLeft: G }} />
      <span aria-hidden="true" style={{ ...base, top: 12, right: 12, borderTop: G, borderRight: G }} />
      <span aria-hidden="true" style={{ ...base, bottom: 12, left: 12, borderBottom: G, borderLeft: G }} />
      <span aria-hidden="true" style={{ ...base, bottom: 12, right: 12, borderBottom: G, borderRight: G }} />
    </>
  );
}

export default function ConciergeriePage() {
  const { lang } = useLanguage();
  const cb = CARTE_BLANCHE[lang] || CARTE_BLANCHE.fr;
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
                { label: "Compagnons", href: "/conciergerie/animaux" },
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
            <h2 className="title-gold font-serif mb-6" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#FFFFFF" }}>
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
              <p className="font-sans" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.9 }}>
                {"Votre chauffeur privé vous prend en charge depuis votre domicile ou lieu de travail jusqu'au tarmac. À l'arrivée, un véhicule vous attend au pied de l'avion. Nous pouvons également assurer votre prise en charge sur toute la durée de votre séjour, transferts, déplacements quotidiens, mise à disposition permanente."}
              </p>
              <ul className="mt-6 space-y-3">
                {chauffeurBullets.map((b) => (
                  <li key={b} className="flex items-start font-sans" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.6 }}>
                    <GoldDot />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/conciergerie/chauffeur"
                className="inline-block font-sans uppercase mt-8"
                style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#FFFFFF", borderBottom: "1px solid #C9A96E", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
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
            <h2 className="title-gold font-serif text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              {"Gastronomie & Personnalisation"}
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.9 }}>
              {"Chaque vol est une expérience unique. Nous prenons en charge vos préférences alimentaires, restrictions et régimes spécifiques, sans exception."}
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
                className="gold-hover p-6"
                style={{ border: "1px solid rgba(201,169,110,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div className="w-5 h-px mb-4" style={{ backgroundColor: "#C9A96E" }} />
                <p className="font-sans" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.75 }}>{service}</p>
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
            <h2 className="title-gold font-serif mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#FFFFFF" }}>
              Vos Animaux Voyagent Aussi.
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.9 }}>
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
                className="gold-hover p-6 flex items-start gap-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
              >
                <GoldDot />
                <p className="font-sans" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.75 }}>{s}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/conciergerie/animaux"
              className="inline-block font-sans uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#FFFFFF", borderBottom: "1px solid #C9A96E", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
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
            <h2 className="title-gold font-serif text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              Les Longs Vols en Famille.
            </h2>
            <p className="font-sans mb-10 max-w-2xl" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.9 }}>
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
                className="gold-hover flex items-start gap-4 p-6"
                style={{ border: "1px solid rgba(201,169,110,0.12)" }}
              >
                <GoldDot />
                <p className="font-sans" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.75 }}>{s}</p>
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
            <h2 className="title-gold font-serif" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#FFFFFF" }}>
              {"Décrivez votre voyage idéal."}
            </h2>
            <p className="font-sans mt-2" style={{ fontSize: "16px", color: "#C0C8D4", lineHeight: 1.6 }}>
              {"Notre équipe vous recontacte dans les plus brefs délais."}
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
              <p className="font-sans text-[15px] text-white/60">{"Votre demande a bien été reçue. Notre équipe vous recontacte dans les plus brefs délais."}</p>
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
                  <select value={formData.animals} onChange={(e) => setFormData({ ...formData, animals: e.target.value })} className={inputClass}>
                    <option value="non" className="text-text-dark">Non</option>
                    <option value="oui" className="text-text-dark">Oui</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{"Enfants"}</label>
                  <select value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} className={inputClass}>
                    <option value="non" className="text-text-dark">Non</option>
                    <option value="oui" className="text-text-dark">Oui</option>
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
                style={{ backgroundColor: "#C9A96E", color: "#0A1628", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700, border: "none", cursor: "pointer", transition: "background-color 0.2s ease" }}
                onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#a8874a"; }}
                onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#C9A96E"; }}
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
            </form>
          )}
        </Section>

        {/* CARTE BLANCHE — prestation sur demande */}
        <section
          id="carte-blanche"
          className="relative"
          style={{ backgroundColor: "#0A1628", overflow: "hidden", padding: "clamp(72px, 11vw, 120px) 6%", scrollMarginTop: "72px" }}
        >
          {/* Halo doré en haut à droite */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-8%",
              width: "520px",
              height: "520px",
              maxWidth: "80%",
              pointerEvents: "none",
              background: "radial-gradient(circle, rgba(201,169,110,0.14), transparent 62%)",
            }}
          />

          {/* Encart faire-part */}
          <div
            className="relative mx-auto text-center"
            style={{
              maxWidth: "600px",
              border: "1px solid rgba(201,169,110,0.55)",
              borderRadius: "16px",
              background: "linear-gradient(150deg, rgba(201,169,110,0.07), transparent 70%)",
              padding: "clamp(36px, 7vw, 64px) clamp(24px, 5vw, 56px)",
            }}
          >
            <CornerBrackets />

            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "20px" }}
            >
              {cb.eyebrow}
            </p>

            <h2
              className="font-serif"
              style={{ fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.1, color: "#f8f5f0", margin: 0 }}
            >
              {cb.title}
            </h2>

            <div aria-hidden="true" style={{ width: "50px", height: "1px", backgroundColor: "#C9A96E", margin: "24px auto" }} />

            <p
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(17px, 1.9vw, 21px)", lineHeight: 1.7, color: "rgba(248,245,240,0.66)", maxWidth: "460px", margin: "0 auto" }}
            >
              {cb.body}
            </p>

            <p
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 26px)", color: "#E8C77E", lineHeight: 1.4, marginTop: "22px" }}
            >
              {cb.signature}
            </p>

            <Link
              href="/contact"
              className="btn-lift inline-block font-sans uppercase"
              style={{
                marginTop: "clamp(30px, 4vw, 40px)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                fontWeight: 700,
                background: "linear-gradient(135deg, #C9A96E, #E8C77E)",
                color: "#0A1628",
                padding: "16px 40px",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              {cb.cta}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
