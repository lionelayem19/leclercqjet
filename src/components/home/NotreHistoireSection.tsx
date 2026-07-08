"use client";

import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useLanguage } from "@/contexts/LanguageContext";

const SERIF = "var(--font-cormorant), Georgia, serif";

// Section « Notre Histoire » — bloc immersif navy inséré entre le Hero et « Pourquoi nous ».
// Textes pilotés par le système multilingue (FR / EN / 中文 / عربية) ; RTL automatique en arabe.
// Animations 100 % CSS (voir .histoire-* dans globals.css), aucune framer-motion.
export default function NotreHistoireSection() {
  const { t, lang } = useLanguage();
  const h = t.home.histoire;
  const isRTL = lang === "ar";

  return (
    <section className="histoire section-pad" aria-labelledby="histoire-title">
      {/* Halo doré décoratif, purement visuel */}
      <div className="histoire__halo" aria-hidden="true" />

      <div className="histoire__inner">
        <div className="histoire__grid">
          {/* Colonne gauche — portrait encadré (au-dessus du texte sur mobile) */}
          <div className="histoire__media">
            <div className="histoire__frame">
              <img
                src="/emmanuel-leclercq.jpg"
                alt="Emmanuel Leclercq"
                loading="lazy"
              />
            </div>
          </div>

          {/* Colonne droite — récit (RTL en arabe) */}
          <div
            className="histoire__text"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            <SectionEyebrow tone="navy">{h.label}</SectionEyebrow>
            <h2
              id="histoire-title"
              className="histoire__title"
              style={{ fontFamily: SERIF }}
            >
              {h.title}
            </h2>

            {h.paragraphs.map((p, i) => (
              <p key={i} className="histoire__para" style={{ fontFamily: SERIF }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Devise sous les deux colonnes */}
        <p
          className="histoire__quote"
          dir={isRTL ? "rtl" : "ltr"}
          style={{ fontFamily: SERIF, textAlign: isRTL ? "right" : "center" }}
        >
          {h.devise}
        </p>
      </div>
    </section>
  );
}
