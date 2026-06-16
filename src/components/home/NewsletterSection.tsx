"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterSection() {
  const { t } = useLanguage();
  const n = t.home.newsletter;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSent(true);
  };

  return (
    <section className="bg-navy section-pad-sm px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-[34px] md:text-[44px] text-white mb-3 leading-tight">
            {n.title}
          </h2>
          <p className="font-sans text-[14px] text-white/45 mb-10">{n.subtitle}</p>

          {sent ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="font-sans text-[14px] text-white/70">{n.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={n.placeholder}
                className="flex-1 bg-white/8 border border-white/12 text-white placeholder:text-white/30 px-4 py-3.5 font-sans text-[13px] focus:border-gold/50 transition-colors focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gold text-navy font-sans text-[11px] tracking-[0.18em] uppercase px-7 py-3.5 hover:bg-[#b8934a] transition-colors whitespace-nowrap"
              >
                {n.cta}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
