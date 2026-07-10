"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const LABELS: Record<string, { call: string; write: string; whatsapp: string; subtitle: string }> = {
  fr: { call: "APPELER", write: "ÉCRIRE", whatsapp: "WHATSAPP", subtitle: "Notre équipe répond personnellement à chaque demande." },
  en: { call: "CALL", write: "WRITE", whatsapp: "WHATSAPP", subtitle: "Our team personally responds to every request." },
  zh: { call: "致电", write: "写信", whatsapp: "WHATSAPP", subtitle: "我们的团队亲自回复每一个请求。" },
  ar: { call: "اتصل", write: "اكتب", whatsapp: "واتساب", subtitle: "فريقنا يردّ شخصياً على كل طلب." },
};

export default function ContactCTASection({ dark = false }: { dark?: boolean }) {
  const { t, lang } = useLanguage();
  const c = t.home.contactCta;
  const labels = LABELS[lang] || LABELS.fr;

  return (
    <section
      className="section-pad"
      style={{
        backgroundColor: dark ? "#0A1628" : "#f8f5f0",
        paddingLeft: "8%",
        paddingRight: "8%",
        textAlign: "center",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionEyebrow tone={dark ? "navy" : "beige"}>{c.badge}</SectionEyebrow>
          <h2 className="font-serif section-title mb-4" style={{ color: dark ? "#f8f5f0" : "#8B6F3F", WebkitTextFillColor: dark ? "#f8f5f0" : "#8B6F3F" }}>
            {c.title}
          </h2>
          <p className="font-sans section-body mb-10" style={{ color: dark ? "#9fb0c2" : "#4b5563" }}>
            {labels.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* APPELER */}
            <a
              href={`tel:${t.nav.phone.replace(/\s/g, "")}`}
              className="btn-lift font-sans uppercase whitespace-nowrap"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                backgroundColor: dark ? "#C9A96E" : "#0A1628",
                color: dark ? "#0A1628" : "#FFFFFF",
                padding: "16px 40px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {labels.call}
            </a>

            {/* ÉCRIRE */}
            <Link
              href="/contact"
              className={`btn-lift font-sans uppercase whitespace-nowrap ${dark ? "hover:bg-gold hover:text-navy" : "hover:bg-navy hover:text-white"}`}
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                border: dark ? "1px solid #C9A96E" : "1px solid #0A1628",
                color: dark ? "#FFFFFF" : "#0A1628",
                padding: "16px 40px",
                textDecoration: "none",
              }}
            >
              {labels.write}
            </Link>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/33698855737"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift font-sans uppercase whitespace-nowrap flex items-center gap-2"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                padding: "16px 40px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {labels.whatsapp}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
