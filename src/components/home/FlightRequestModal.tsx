"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#C9A96E";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-inter), Inter, sans-serif";

// Format d'email volontairement simple et robuste (une @, un point après).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  open: boolean;
  onClose: () => void;
  from: string;
  to: string;
  dateLabel: string; // date déjà formatée pour l'affichage
  dateISO: string; // date brute (ISO) pour l'envoi
  passengers: number;
};

export default function FlightRequestModal({
  open,
  onClose,
  from,
  to,
  dateLabel,
  dateISO,
  passengers,
}: Props) {
  const { t, lang } = useLanguage();
  const h = t.home.hero;
  const r = h.request;
  const isRTL = lang === "ar";

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ lastName?: boolean; firstName?: boolean; email?: boolean }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Échap ferme la modale + on verrouille le scroll de la page tant qu'elle est ouverte.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const next = {
      lastName: lastName.trim().length < 2,
      firstName: firstName.trim().length < 2,
      email: !EMAIL_RE.test(email.trim()),
    };
    setErrors(next);
    return !next.lastName && !next.firstName && !next.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vol",
          from,
          to,
          dateTime: dateISO || dateLabel,
          passengers: String(passengers),
          jetType: "—",
          name: `${firstName} ${lastName}`.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: "Demande envoyée depuis le moteur de recherche de la page d'accueil.",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: SANS,
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(232,199,126,0.75)",
    fontWeight: 700,
    marginBottom: "6px",
  };
  const errStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: "11px",
    color: "#e57373",
    marginTop: "5px",
  };
  const passengersLabel = `${passengers} ${passengers > 1 ? h.passengerMany : h.passengerOne}`;

  return (
    <div
      className="frm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={r.title}
    >
      <div
        className="frm-panel"
        dir={isRTL ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Croix de fermeture */}
        <button
          type="button"
          aria-label="×"
          onClick={onClose}
          className="frm-close"
          style={isRTL ? { left: "16px" } : { right: "16px" }}
        >
          ×
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "24px 4px 8px" }}>
            <div className="frm-check" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.25rem", color: "#f8f5f0", lineHeight: 1.5, letterSpacing: "0.01em" }}>
              {r.success}
            </p>
          </div>
        ) : (
          <>
            {/* En-tête */}
            <h2 style={{ fontFamily: SERIF, fontSize: "1.9rem", fontWeight: 600, color: "#f8f5f0", lineHeight: 1.15, letterSpacing: "0.01em", marginBottom: "6px", paddingInlineEnd: "28px" }}>
              {r.title}
            </h2>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.05rem", color: "rgba(201,169,110,0.85)", letterSpacing: "0.02em", marginBottom: "22px" }}>
              {r.subtitle}
            </p>

            {/* Résumé de la recherche — lecture seule */}
            <div className="frm-summary">
              <p className="frm-summary__label" style={{ fontFamily: SANS }}>{r.summary}</p>
              <div className="frm-summary__route">
                <span>{from || "—"}</span>
                <span aria-hidden="true" style={{ color: GOLD, margin: "0 10px" }}>✈</span>
                <span>{to || "—"}</span>
              </div>
              <div className="frm-summary__meta">
                <span>{dateLabel || h.date}</span>
                <span aria-hidden="true" style={{ opacity: 0.4 }}>·</span>
                <span>{passengersLabel}</span>
              </div>
            </div>

            {/* Formulaire de coordonnées */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="frm-grid">
                <div>
                  <label style={labelStyle}>{r.lastName}</label>
                  <input
                    className="frm-input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                  {errors.lastName && <p style={errStyle}>{r.errorRequired}</p>}
                </div>
                <div>
                  <label style={labelStyle}>{r.firstName}</label>
                  <input
                    className="frm-input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                  />
                  {errors.firstName && <p style={errStyle}>{r.errorRequired}</p>}
                </div>
              </div>

              <div style={{ marginTop: "18px" }}>
                <label style={labelStyle}>{r.email}</label>
                <input
                  className="frm-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <p style={errStyle}>{r.errorEmail}</p>}
              </div>

              <div style={{ marginTop: "18px" }}>
                <label style={labelStyle}>
                  {r.phone} <span style={{ textTransform: "none", letterSpacing: "0.04em", opacity: 0.6 }}>({r.optional})</span>
                </label>
                <input
                  className="frm-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>

              {status === "error" && (
                <p style={{ ...errStyle, marginTop: "16px" }}>{t.common.formError}</p>
              )}

              <button type="submit" className="frm-submit" disabled={status === "sending"}>
                {status === "sending" ? r.sending : r.send}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
