"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AcquisitionPage() {
  const { t } = useLanguage();
  const a = t.acquisition;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", budget: "", type: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "acquisition" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", budget: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2";
  const inputClass = "w-full border-b border-gray-200 text-text-dark placeholder:text-gray-300 py-2.5 font-sans text-[14px] focus:border-navy transition-colors bg-transparent";

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/acquisition.png"
            alt="Acquisition jet privé"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.35)" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-4">
              ACQUISITION
            </p>
            <h1
              className="font-serif text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(48px, 6vw, 72px)" }}
            >
              {a.hero.title}
            </h1>
            <p className="font-sans text-[18px] text-white/50 max-w-lg mx-auto leading-relaxed">
              {a.hero.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {a.services.map((service, i) => (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`p-8 md:p-10 ${i < a.services.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-100" : ""}`}
                >
                  <span className="font-serif text-[56px] text-gold/15 leading-none block mb-4 select-none">
                    {service.num}
                  </span>
                  <h3 className="font-serif text-[22px] text-text-dark mb-3">{service.title}</h3>
                  <p className="font-sans text-[15px] text-[#4A4A6A] leading-[1.8]">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <h2 className="font-serif text-[32px] md:text-[44px] text-text-dark mb-2">
                {a.form.title}
              </h2>
              <p className="font-sans text-[15px] text-gray-400">{a.form.subtitle}</p>
            </motion.div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-gold/20"
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-sans text-[15px] text-gray-600">{a.form.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{a.form.name}</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{a.form.email}</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{a.form.phone}</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{a.form.budget}</label>
                    <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inputClass + " text-text-dark"}>
                      <option value="">—</option>
                      {a.form.budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{a.form.type}</label>
                  <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder={a.form.typePlaceholder} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{a.form.message}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={a.form.messagePlaceholder}
                    className={inputClass + " resize-none"}
                  />
                </div>

                {status === "error" && (
                  <p className="font-sans text-[13px] text-red-500">Une erreur est survenue. Veuillez réessayer.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-navy text-white font-sans text-[12px] tracking-[0.2em] uppercase py-4 hover:bg-navy-card transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? a.form.sending : a.form.cta}
                </button>
              </form>
            )}
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
