"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const GOLD = "#C9A96E";

export default function CharterManagementSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // play once
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`flex items-center justify-center section-pad px-6 md:px-12${inView ? " cm-in" : ""}`}
      style={{ backgroundColor: "#0A1628" }}
    >
      <div
        className="flex flex-col items-center text-center w-full"
        style={{ gap: "20px", maxWidth: "800px" }}
      >
        <h2
          className="font-serif cm-reveal cm-reveal-1"
          style={{ fontSize: "32px", fontWeight: 500, letterSpacing: "2px", lineHeight: 1.2, color: "#f8f5f0" }}
        >
          CHARTER MANAGEMENT
        </h2>

        <div aria-hidden="true" className="cm-reveal cm-reveal-2" style={{ width: "50px", height: "1px", backgroundColor: GOLD }} />

        <p
          className="font-serif cm-reveal cm-reveal-2 section-lead"
          style={{ fontStyle: "italic" }}
        >
          Votre jet travaille pour vous.
        </p>

        <p
          className="cm-reveal cm-reveal-3 section-body"
          style={{
            maxWidth: "600px",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.7,
          }}
        >
          Propriétaire ou investisseur, mettez votre appareil en exploitation commerciale et générez des revenus pendant vos absences. Notre équipe gère tout.
        </p>

        {/* Wrapper handles the cascade reveal; inner link handles the glow/sweep (kept on
            separate elements so the two CSS `animation`s never override each other). */}
        <span className="cm-reveal cm-reveal-4" style={{ display: "inline-block" }}>
          <Link
            href="/charter-management"
            className="cm-cta inline-block font-sans uppercase"
            style={{
              padding: "14px 32px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              backgroundColor: "#E0BC6E",
              color: "#0A1628",
              textDecoration: "none",
            }}
          >
            En savoir plus
          </Link>
        </span>
      </div>
    </section>
  );
}
