"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const TESTIMONIALS = [
  {
    quote: {
      fr: "Un service d'une discrétion absolue. L'équipe a anticipé chaque détail de notre vol Paris–Dubaï.",
      en: "A service of absolute discretion. The team anticipated every detail of our Paris–Dubai flight.",
      zh: "绝对低调的服务。团队预见到了我们巴黎至迪拜航班的每一个细节。",
      ar: "خدمة بالغة الخصوصية. توقّع الفريق كل تفصيل من تفاصيل رحلتنا من باريس إلى دبي.",
    },
    author: "Alexandre D.",
    role: { fr: "PDG, Groupe Lumière", en: "CEO, Groupe Lumière", zh: "集团总裁", ar: "الرئيس التنفيذي" },
  },
  {
    quote: {
      fr: "Monter à bord d'un jet Leclercq, c'est une autre idée du voyage. Chaque détail est pensé pour vous.",
      en: "Boarding a Leclercq jet is a different idea of travel. Every detail is tailored for you.",
      zh: "登上Leclercq的专机，是旅行的另一种诠释。每一个细节都为您量身定制。",
      ar: "الصعود على طائرة ليكليرك هو تصوّر مختلف للسفر. كل تفصيل مصمّم خصيصاً لك.",
    },
    author: "Isabelle M.",
    role: { fr: "Directrice Artistique", en: "Creative Director", zh: "艺术总监", ar: "المدير الإبداعي" },
  },
  {
    quote: {
      fr: "Réactivité exemplaire, cabine parfaite, départ dans des délais record. Je ne voyage plus autrement.",
      en: "Exemplary responsiveness, perfect cabin, departure at remarkably short notice. I no longer travel any other way.",
      zh: "响应迅速，机舱完美，极短时间内出发。我再也不会以其他方式旅行了。",
      ar: "استجابة مثالية، مقصورة رائعة، مغادرة في وقت قياسي. لم أعد أسافر بأي طريقة أخرى.",
    },
    author: "Thomas R.",
    role: { fr: "Fondateur, Renard Capital", en: "Founder, Renard Capital", zh: "创始人", ar: "المؤسس" },
  },
];

const BADGE: Record<string, string> = {
  fr: "Témoignages",
  en: "Testimonials",
  zh: "客户评价",
  ar: "شهادات العملاء",
};

const TITLE: Record<string, string> = {
  fr: "Ce que disent nos clients",
  en: "What our clients say",
  zh: "我们的客户怎么说",
  ar: "ما يقوله عملاؤنا",
};

export default function TestimonialsSection() {
  const { lang } = useLanguage();

  return (
    <section style={{ backgroundColor: "#0A1628", paddingTop: "60px", paddingBottom: "60px", borderTop: "1px solid rgba(201,169,110,0.2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
            {BADGE[lang] || BADGE.fr}
          </p>
          <h2 className="font-serif text-white" style={{ fontSize: "40px" }}>
            {TITLE[lang] || TITLE.fr}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="gold-hover relative"
              style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "36px 32px" }}
            >
              {/* Decorative guillemet */}
              <p
                className="font-serif absolute"
                style={{ fontSize: "80px", color: "#C9A96E", opacity: 0.12, top: "-10px", left: "24px", lineHeight: 1, userSelect: "none" }}
                aria-hidden
              >
                &ldquo;
              </p>

              <p className="font-sans relative z-10 mb-8 leading-[1.85]" style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", fontStyle: "italic" }}>
                {t.quote[lang as keyof typeof t.quote] || t.quote.fr}
              </p>

              <div style={{ width: "32px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "16px" }} />

              <p className="font-serif" style={{ fontSize: "17px", color: "#FFFFFF" }}>
                {t.author}
              </p>
              <p className="font-sans" style={{ fontSize: "11px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.08em", marginTop: "3px" }}>
                {t.role[lang as keyof typeof t.role] || t.role.fr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
