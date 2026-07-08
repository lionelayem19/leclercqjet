"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, phone, subject, message }),
      });
    } catch {}
    setSubmitting(false);
    setSuccess(true);
  };

  const labelClass = "block font-sans text-[11px] tracking-[0.3em] text-white/40 uppercase mb-2";
  const inputClass = "w-full border-b border-white/15 text-white placeholder:text-white/20 py-2.5 font-sans text-[14px] focus:border-gold transition-colors bg-transparent outline-none";

  return (
    <section style={{ backgroundColor: "#0A1628" }} className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[11px] tracking-[0.3em] text-gold uppercase mb-4">Contact</p>
          <h2 className="font-serif text-[32px] md:text-[40px] text-white mb-3">{c.hero.title}</h2>
          <p className="font-sans text-[16px] leading-[1.6] text-white/40">{c.hero.subtitle}</p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-serif text-[24px] text-white">{c.form.success}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="p-8 md:p-12 space-y-7"
            style={{ backgroundColor: "#0D1E35", borderTop: "3px solid #C9A96E" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{c.form.name}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>{c.form.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@company.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{c.form.phone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 XX XX XX XX"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{c.form.subject}</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass + " text-white/70"}
                  required
                >
                  <option value="" disabled style={{ backgroundColor: "#0D1E35" }}>{t.common.select}</option>
                  {c.form.subjects.map((s) => (
                    <option key={s} value={s} style={{ backgroundColor: "#0D1E35" }}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>{c.form.message}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder={c.form.messagePlaceholder}
                className={inputClass + " resize-none"}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold text-navy font-sans text-[12px] tracking-[0.22em] uppercase py-4 hover:bg-[#b8934a] transition-colors disabled:opacity-60 font-medium"
              style={{ borderRadius: "1px" }}
            >
              {submitting ? c.form.sending : c.form.cta}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
