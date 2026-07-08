import type { CSSProperties } from "react";

const GOLD = "#C9A96E";
const GOLD_LIGHT = "#E8C77E";
const IVORY = "#f8f5f0";
const SERIF = "var(--font-cormorant), Georgia, serif";

const cards = [
  {
    key: "coiffeur",
    title: "Coiffeur",
    text: "Coiffure sur-mesure, entre les mains d'un expert, au salon FBO.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "visagiste",
    title: "Visagiste",
    text: "Mise en beauté et conseil image, pour paraître à votre avantage.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const rule: CSSProperties = { flex: 1, height: 1, backgroundColor: "rgba(201,169,110,0.28)" };

export default function SignatureWellnessSection() {
  return (
    <section
      className="section-pad px-6"
      style={{ backgroundColor: "#0A1628", paddingLeft: "8%", paddingRight: "8%" }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        {/* Séparateur discret « NOUVEAU » */}
        <div className="flex items-center" style={{ gap: "18px", marginBottom: "36px" }}>
          <span style={rule} />
          <span
            style={{
              fontFamily: SERIF,
              fontSize: "12px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: GOLD,
              whiteSpace: "nowrap",
            }}
          >
            Nouveau
          </span>
          <span style={rule} />
        </div>

        {/* Bloc signature mis en valeur */}
        <div
          className="relative"
          style={{
            border: `2px solid ${GOLD}`,
            borderRadius: "18px",
            backgroundColor: "#0F1F38",
            padding: "clamp(40px, 6vw, 64px) clamp(24px, 5vw, 56px) clamp(36px, 5vw, 52px)",
          }}
        >
          {/* Badge doré centré en haut du bloc */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: GOLD,
              color: "#0A1628",
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              padding: "8px 22px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            }}
          >
            Pack Signature Bien-être
          </span>

          {/* Titre */}
          <h2
            className="text-center"
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.15,
              color: GOLD_LIGHT,
              margin: 0,
            }}
          >
            L&apos;écrin beauté
          </h2>

          {/* Sous-titre */}
          <p
            className="text-center"
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.7vw, 21px)",
              lineHeight: 1.6,
              color: "rgba(248,245,240,0.68)",
              maxWidth: "560px",
              margin: "18px auto 0",
            }}
          >
            Une mise en beauté au salon privé, juste avant l&apos;embarquement.
          </p>

          {/* Deux cartes */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "24px", marginTop: "clamp(36px, 4vw, 48px)" }}
          >
            {cards.map((card) => (
              <article
                key={card.key}
                className="flex flex-col items-center text-center"
                style={{
                  backgroundColor: "#0A1628",
                  border: `1px solid ${GOLD}`,
                  borderRadius: "14px",
                  padding: "clamp(28px, 3.5vw, 40px) clamp(20px, 3vw, 32px)",
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    border: "1px solid rgba(201,169,110,0.45)",
                    marginBottom: "22px",
                  }}
                >
                  {card.icon}
                </span>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 600,
                    fontSize: "clamp(22px, 2.2vw, 27px)",
                    color: GOLD_LIGHT,
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(16px, 1.5vw, 19px)",
                    lineHeight: 1.65,
                    color: "rgba(248,245,240,0.74)",
                    maxWidth: "300px",
                    margin: "14px auto 0",
                  }}
                >
                  {card.text}
                </p>
              </article>
            ))}
          </div>

          {/* Mention localisation */}
          <div
            className="flex items-center justify-center text-center"
            style={{ gap: "10px", marginTop: "clamp(30px, 3.5vw, 42px)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(14px, 1.4vw, 17px)",
                letterSpacing: "0.02em",
                color: GOLD,
                lineHeight: 1.5,
              }}
            >
              Prestations assurées au salon privé FBO, avant l&apos;embarquement.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
