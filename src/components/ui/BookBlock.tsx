"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Bloc « Le livre d'Emmanuel Leclercq » — réutilisable (accueil + Le Cœur de la Maison + Nos Engagements).
// Multilingue (FR / EN / 中文 / عربية), RTL automatique en arabe.
// 100 % CSS pur (voir .book-block* dans globals.css), aucune framer-motion.
// Le titre de l'ouvrage reste toujours en français (titre original).

const BUY_URL =
  "https://www.fnac.com/a16126524/Emmanuel-Leclercq-La-vie-est-un-combat-Accepte-le";

// Petite icône livre (dorée) pour le lien « Découvrir le livre »
function IconBook() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
      <path d="M4 4.5A2.5 2.5 0 0 0 6.5 7H20" />
    </svg>
  );
}

export default function BookBlock() {
  const { t, lang } = useLanguage();
  const b = t.book;
  const isRTL = lang === "ar";
  // L'image /livre-emmanuel.jpg n'existe peut-être pas encore : fallback doré élégant via onError.
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="book-block" aria-labelledby="book-block-title">
      <div className="book-block__halo" aria-hidden="true" />

      <div className="book-block__frame">
        <div className="book-block__grid" dir={isRTL ? "rtl" : "ltr"}>
          {/* Colonne gauche — couverture cliquable (portrait livre) */}
          <a
            className="book-block__cover-link"
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={b.cta}
          >
            <span className="book-block__cover">
              {imgFailed ? (
                // Fallback : cadre doré avec le titre de l'ouvrage centré
                <span className="book-block__cover-fallback" aria-hidden="true">
                  <span className="book-block__cover-fallback-eyebrow">
                    {b.label}
                  </span>
                  <span className="book-block__cover-fallback-title">
                    {b.bookTitle}
                  </span>
                  <span className="book-block__cover-fallback-author">
                    Emmanuel Leclercq
                  </span>
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/livre-emmanuel.jpg"
                  alt={b.coverAlt}
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                />
              )}
            </span>
          </a>

          {/* Colonne droite — texte (RTL en arabe) */}
          <div
            className="book-block__text"
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            <p className="book-block__eyebrow">{b.label}</p>
            <h2 id="book-block-title" className="book-block__title">
              {b.title}
            </h2>
            <p className="book-block__book-title">{b.bookTitle}</p>
            <p className="book-block__subtitle">{b.subtitle}</p>

            <p className="book-block__note">{b.note}</p>

            <div className="book-block__actions">
              <a
                className="book-block__link"
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBook />
                <span>{b.discover}</span>
              </a>
              <a
                className="book-block__cta"
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {b.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
