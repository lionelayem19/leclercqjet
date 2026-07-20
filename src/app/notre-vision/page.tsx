"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Page « Notre Vision » — expérience immersive « hublot vivant ».
// Texte du fondateur Emmanuel Leclercq, reproduit mot pour mot.
// 100 % CSS pur : nuages, scintillement, rebond, fondus au scroll.
// Aucune framer-motion. Aucune valeur d'opacité/scale/transform hors [0, 1].
// Aucun trait ni filet décoratif nulle part.

type Block =
  | { type: "p"; text: string }
  | { type: "p-center"; text: string }
  | { type: "key"; text: string };

const BLOCKS: Block[] = [
  {
    type: "p",
    text: "Quand je prends l'avion, je m'installe côté hublot, car j'aime voir le monde. Et je le vois d'une autre manière : je le vois d'en haut. Or il existe deux façons de voir le monde d'en haut. La première est physique. C'est celle du vol, celle du hublot, celle du corps qui s'élève et découvre la terre comme il ne l'avait jamais vue. La seconde est intérieure. C'est celle de la pensée, celle de la réflexion, celle de l'esprit qui prend du recul et découvre le réel comme il ne l'avait jamais compris. L'une élève le regard, l'autre élève l'âme. Toutes deux offrent le même don : cette vue d'ensemble sans laquelle on se perd dans les détails, ce silence sans lequel on n'entend plus rien, cette distance sans laquelle on ne voit plus rien.",
  },
  {
    type: "p",
    text: "Car ce que le hublot fait à mes yeux, la pensée le fait à mon esprit. Toutes deux exigent le même consentement. Accepter de quitter le sol, accepter de ne plus être au milieu du bruit, accepter que le monde nous devienne, un instant, étranger. C'est à ce prix seulement qu'il redevient lisible.",
  },
  { type: "key", text: "On ne comprend rien à ce que l'on ne voit que de trop près." },
  {
    type: "p",
    text: "Voilà pourquoi je crois qu'il ne faut pas chercher à aller loin, mais chercher à aller haut. Chercher loin, c'est fuir en ligne droite. Chercher haut, c'est prendre du champ.",
  },
  { type: "key", text: "La distance épuise, la hauteur éclaire." },
  {
    type: "p",
    text: "On ne conquiert pas ses objectifs en courant après l'horizon. On les conquiert en s'élevant assez pour les voir se dessiner. Toute vie qui compte a commencé par un pas de recul.",
  },
  {
    type: "p",
    text: "Cette conviction, je ne l'ai pas trouvée dans les airs. Je l'ai trouvée dans les livres, chez Paul Ricœur, à qui j'ai consacré ma thèse de doctorat, et dans cette idée qui ne m'a jamais quitté : la sagesse pratique. Comprendre ne suffit pas ; encore faut-il agir avec justesse, avec mesure, avec prudence. Non pas la prudence timide de celui qui n'ose rien, mais celle, exigeante, de celui qui prend le temps du recul avant de bien faire. Car une idée qui reste dans les livres ne vaut rien. La vraie philosophie ne plane pas au-dessus du monde : elle y descend, elle s'incarne à travers une vie.",
  },
  {
    type: "p",
    text: "Leclercq'Jet International est cette conviction devenue acte. Voler n'est pas franchir une distance. C'est s'offrir la hauteur d'où l'on redécouvre ce qui compte. Le temps qu'on croyait perdu, la présence de ceux qu'on aime, la beauté d'un horizon qu'on avait cessé de regarder.",
  },
  { type: "key", text: "Le vrai luxe n'est pas dans l'objet. Il est dans ce regard neuf, plus juste, que chaque vol rend possible." },
  {
    type: "p",
    text: "Mais je n'oublie jamais ce qui reste en bas. Abandonné à la naissance près d'un bidonville, je suis un miraculé. Sauvé par Mère Teresa, recueilli dans l'orphelinat de la mission d'Amravati, en Inde, puis adopté par une famille française, je sais ce que l'on doit à ceux qui vous tendent la main. De toute la hauteur où la vie m'a porté, je continue de voir cet enfant que j'étais. C'est pourquoi une part de chaque vol soutient l'éducation d'enfants en Inde : une pensée juste se prouve dans le monde, jamais dans les mots seuls.",
  },
  { type: "key", text: "Chaque vol rapproche un enfant de son avenir." },
  { type: "p-center", text: "Ce n'est pas un slogan. C'est ma façon de voir le monde, et la raison d'être de cette maison." },
];

export default function NotreVisionPage() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".nv-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Arrière-plan fixe : halo + ciel étoilé scintillant */}
      <div className="nv-bg" aria-hidden="true" />
      <div className="nv-stars" aria-hidden="true" />

      <main className="nv-main">
        {/* ═══ EN-TÊTE : LE HUBLOT ANIMÉ ═══ */}
        <section className="nv-hero">
          <p className="nv-eyebrow">Notre Vision</p>

          <div className="nv-porthole">
            <div className="nv-porthole-glass">
              <div className="nv-sun" />
              <div className="nv-cloud nv-cloud-1" />
              <div className="nv-cloud nv-cloud-2" />
              <div className="nv-cloud nv-cloud-3" />
              <div className="nv-cloud nv-cloud-4" />
            </div>
          </div>

          <div className="nv-hero-text">
            <h1 className="nv-title">
              S'éloigner pour voir<br />de plus près
            </h1>
            <p className="nv-author">Emmanuel Leclercq</p>
            <p className="nv-role">Fondateur de la société Leclercq'Jet International</p>
            <div className="nv-arrow" aria-hidden="true">⌄</div>
          </div>
        </section>

        {/* ═══ CORPS DU TEXTE ═══ */}
        <article className="nv-body">
          {BLOCKS.map((b, i) => {
            if (b.type === "key") {
              return (
                <p key={i} className="nv-reveal nv-key">
                  {b.text}
                </p>
              );
            }
            return (
              <p key={i} className={`nv-reveal nv-p${b.type === "p-center" ? " nv-p-center" : ""}`}>
                {b.text}
              </p>
            );
          })}

          {/* ═══ CITATION FINALE ═══ */}
          <figure className="nv-reveal nv-quote">
            <blockquote>« On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux. »</blockquote>
            <figcaption>Antoine de Saint-Exupéry — Le Petit Prince</figcaption>
          </figure>
        </article>
      </main>

      <Footer />

      <style jsx>{`
        /* ── Arrière-plan ── */
        .nv-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 90% 60% at 50% -5%, #16304d 0%, #0d1b30 42%, #070f1c 100%),
            #0a1628;
          pointer-events: none;
        }
        .nv-stars {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
          background-image:
            radial-gradient(1px 1px at 12% 18%, #e8c77e, transparent),
            radial-gradient(1.2px 1.2px at 78% 12%, #f8f5f0, transparent),
            radial-gradient(1px 1px at 34% 28%, #c9a96e, transparent),
            radial-gradient(1.4px 1.4px at 58% 8%, #e8c77e, transparent),
            radial-gradient(1px 1px at 88% 34%, #f8f5f0, transparent),
            radial-gradient(1.2px 1.2px at 20% 44%, #c9a96e, transparent),
            radial-gradient(1px 1px at 46% 52%, #e8c77e, transparent),
            radial-gradient(1px 1px at 66% 40%, #f8f5f0, transparent),
            radial-gradient(1.2px 1.2px at 6% 62%, #c9a96e, transparent),
            radial-gradient(1px 1px at 92% 58%, #e8c77e, transparent),
            radial-gradient(1.4px 1.4px at 28% 74%, #f8f5f0, transparent),
            radial-gradient(1px 1px at 72% 68%, #c9a96e, transparent),
            radial-gradient(1px 1px at 50% 84%, #e8c77e, transparent),
            radial-gradient(1.2px 1.2px at 16% 90%, #f8f5f0, transparent);
          animation: nv-twinkle 6s ease-in-out infinite alternate;
        }
        @keyframes nv-twinkle {
          from { opacity: 0.4; }
          to { opacity: 0.7; }
        }

        .nv-main {
          position: relative;
          z-index: 1;
        }

        /* ── Hero / hublot ── */
        .nv-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 96px 6% 64px;
        }
        .nv-eyebrow {
          font-family: var(--font-cormorant), Georgia, serif;
          text-transform: uppercase;
          letter-spacing: 6px;
          color: #8fa3bd;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 40px;
        }

        .nv-porthole {
          position: relative;
          width: 300px;
          height: 360px;
          border-radius: 150px / 180px;
          padding: 10px;
          background: linear-gradient(135deg, #e9d5a8 0%, #c9a96e 35%, #8a7343 100%);
          box-shadow: 0 0 60px rgba(201, 169, 110, 0.15), inset 0 2px 6px rgba(255, 255, 255, 0.4);
        }
        .nv-porthole::after {
          content: "";
          position: absolute;
          top: 34px;
          left: 44px;
          width: 80px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 70%);
          filter: blur(4px);
          pointer-events: none;
          z-index: 3;
        }
        .nv-porthole-glass {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 140px / 170px;
          overflow: hidden;
          background: linear-gradient(180deg, #4a72a0 0%, #7a95b5 26%, #e8c77e 60%, #d8a860 78%, #2a3f5a 100%);
        }
        .nv-sun {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          margin: -60px 0 0 -60px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 200, 0.7) 30%, rgba(232, 199, 126, 0) 72%);
          filter: blur(2px);
        }
        .nv-cloud {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 246, 224, 0.4) 55%, rgba(255, 255, 255, 0) 78%);
          filter: blur(3px);
          will-change: transform;
        }
        .nv-cloud-1 {
          top: 30%;
          width: 160px;
          height: 60px;
          animation: nv-drift 34s linear infinite;
          animation-delay: -6s;
        }
        .nv-cloud-2 {
          top: 54%;
          width: 120px;
          height: 44px;
          animation: nv-drift 48s linear infinite;
          animation-delay: -22s;
        }
        .nv-cloud-3 {
          top: 68%;
          width: 200px;
          height: 70px;
          animation: nv-drift 40s linear infinite;
          animation-delay: -14s;
        }
        .nv-cloud-4 {
          top: 42%;
          width: 90px;
          height: 34px;
          animation: nv-drift 56s linear infinite;
          animation-delay: -33s;
        }
        @keyframes nv-drift {
          from { transform: translateX(-120px); }
          to { transform: translateX(360px); }
        }

        .nv-hero-text {
          margin-top: 48px;
        }
        .nv-title {
          font-family: var(--font-cormorant), Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(38px, 6vw, 62px);
          line-height: 1.12;
          color: #f8f5f0;
        }
        .nv-author {
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 600;
          font-size: 22px;
          color: #c9a96e;
          margin-top: 26px;
        }
        .nv-role {
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 500;
          font-size: 15px;
          color: #8fa3bd;
          margin-top: 6px;
        }
        .nv-arrow {
          font-size: 34px;
          line-height: 1;
          color: #c9a96e;
          margin-top: 34px;
          animation: nv-bounce 1.8s ease-in-out infinite;
        }
        @keyframes nv-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* ── Corps ── */
        .nv-body {
          max-width: 680px;
          margin: 0 auto;
          padding: clamp(48px, 8vw, 96px) 6% clamp(72px, 10vw, 128px);
        }
        .nv-p {
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 2;
          color: #e4e9f0;
          margin-bottom: 44px;
        }
        .nv-p-center {
          text-align: center;
        }
        .nv-key {
          font-family: var(--font-cormorant), Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(26px, 3.4vw, 34px);
          line-height: 1.4;
          color: #e8c77e;
          text-align: center;
          max-width: 560px;
          margin: 64px auto;
        }

        /* ── Citation finale ── */
        .nv-quote {
          text-align: center;
          max-width: 620px;
          margin: clamp(56px, 8vw, 88px) auto 0;
        }
        .nv-quote blockquote {
          font-family: var(--font-cormorant), Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(24px, 3.2vw, 30px);
          line-height: 1.5;
          color: #e8c77e;
          margin: 0;
        }
        .nv-quote figcaption {
          font-family: var(--font-cormorant), Georgia, serif;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #8fa3bd;
          margin-top: 22px;
        }

        /* ── Fondu au scroll (IntersectionObserver ajoute .in) ── */
        .nv-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1s ease, transform 1s ease;
          will-change: opacity, transform;
        }
        .nv-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .nv-stars,
          .nv-cloud,
          .nv-arrow {
            animation: none;
          }
          .nv-reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
