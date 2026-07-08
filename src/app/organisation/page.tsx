"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const SERIF = "var(--font-cormorant), Georgia, serif";

const BADGE: Record<string, string> = {
  fr: "À PROPOS", en: "ABOUT", zh: "关于我们", ar: "من نحن",
};
const TITLE: Record<string, string> = {
  fr: "Organisation", en: "Organisation", zh: "组织架构", ar: "المنظمة",
};
const SUBTITLE: Record<string, string> = {
  fr: "Une maison structurée autour d'une seule exigence : l'excellence à chaque étape de votre voyage.",
  en: "A house built around a single standard: excellence at every stage of your journey.",
  zh: "以唯一的准则构建的机构：让您旅程的每一步都追求卓越。",
  ar: "مؤسسة مبنية على معيار واحد: التميّز في كل مرحلة من رحلتك.",
};
type Member = { name: string; photo: string; initials: string; role: Record<string, string> };

const MEMBERS: Member[] = [
  {
    name: "Emmanuel Leclercq",
    photo: "/emmanuel-leclercq.jpg",
    initials: "EL",
    role: { fr: "Président Directeur Général", en: "Chairman & CEO", zh: "董事长兼首席执行官", ar: "الرئيس والمدير التنفيذي" },
  },
  {
    name: "Youness Hasnaoui",
    photo: "/youness-hasnaoui.jpg",
    initials: "YH",
    role: { fr: "Directeur Général", en: "Managing Director", zh: "总经理", ar: "المدير العام" },
  },
  {
    name: "Lionel Ayemperoumal",
    photo: "/lionel-ayemperoumal.jpg",
    initials: "LA",
    role: { fr: "Business Developer", en: "Business Developer", zh: "商务拓展", ar: "مطوّر أعمال" },
  },
];

// Cadre portrait partagé — identique pour la photo et le placeholder initiales.
// Bordure + ombre + hover portés par la classe .member-frame (globals.css).
// position: relative + photo en absolute → la taille du cadre est fixée
// UNIQUEMENT par l'aspect-ratio 3/4, jamais par les dimensions de l'image.
const FRAME: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 4",
  borderRadius: "12px",
  overflow: "hidden",
};

function MemberCard({ member, lang }: { member: Member; lang: Lang }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="member-card flex flex-col items-center text-center" style={{ width: "300px", maxWidth: "100%" }}>
      {imgFailed ? (
        // Placeholder élégant : même cadre, fond navy plus clair, initiales dorées.
        <div
          className="member-frame flex items-center justify-center"
          style={{ ...FRAME, backgroundColor: "#12233D" }}
          aria-label={member.name}
        >
          <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(56px, 9vw, 88px)", letterSpacing: "0.04em", color: "#C9A96E" }}>
            {member.initials}
          </span>
        </div>
      ) : (
        <div className="member-frame" style={FRAME}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
            onError={() => setImgFailed(true)}
          />
        </div>
      )}
      <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px, 2.6vw, 30px)", color: "#f8f5f0", marginTop: "26px" }}>
        {member.name}
      </h2>
      <p
        className="uppercase"
        style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "13px", letterSpacing: "0.24em", color: "#C9A96E", marginTop: "10px" }}
      >
        {member.role[lang] || member.role.fr}
      </p>
    </article>
  );
}

export default function OrganisationPage() {
  const { lang } = useLanguage();

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A1628", minHeight: "100vh" }}>
        <div className="detente-spa" style={{ paddingTop: "72px" }}>
          <div className="detente-spa__halo" aria-hidden="true" />
          <section className="relative" style={{ padding: "clamp(96px, 14vw, 160px) 6%", zIndex: 1 }}>
            {/* En-tête */}
            <div className="text-center mx-auto" style={{ maxWidth: "680px", marginBottom: "clamp(48px, 7vw, 80px)" }}>
              <p
                className="uppercase"
                style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "13px", letterSpacing: "5px", color: "#C9A96E", marginBottom: "18px" }}
              >
                {BADGE[lang] || BADGE.fr}
              </p>
              <h1
                style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.1, color: "#f8f5f0" }}
              >
                {TITLE[lang] || TITLE.fr}
              </h1>
              <p
                style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 2.3vw, 24px)", color: "rgba(248,245,240,0.68)", lineHeight: 1.6, marginTop: "18px" }}
              >
                {SUBTITLE[lang] || SUBTITLE.fr}
              </p>
              <div className="detente-vline" aria-hidden="true" />
            </div>

            {/* Grille des membres — 3 colonnes desktop, empilées mobile.
                flex-wrap + justify-center : une carte seule reste centrée,
                l'ajout de nouvelles cartes remplit la rangée automatiquement. */}
            <div className="mx-auto flex flex-wrap justify-center" style={{ maxWidth: "1060px", gap: "clamp(32px, 4vw, 48px)" }}>
              {MEMBERS.map((member) => (
                <MemberCard key={member.name} member={member} lang={lang} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
