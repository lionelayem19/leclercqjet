"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import LogoMark from "@/components/ui/LogoMark";

const NEWSLETTER: Record<Lang, { title: string; subtitle: string; placeholder: string; cta: string; success: string }> = {
  fr: {
    title: "Rejoignez l'excellence",
    subtitle: "Disponibilités exclusives, vols partagés et privilèges, en avant-première, dans votre boîte mail.",
    placeholder: "Votre adresse email",
    cta: "S'abonner",
    success: "Merci. Votre inscription est confirmée.",
  },
  en: {
    title: "Join excellence",
    subtitle: "Exclusive availability, shared flights and privileges. Previewed first, straight to your inbox.",
    placeholder: "Your email address",
    cta: "Subscribe",
    success: "Thank you. Your subscription is confirmed.",
  },
  zh: {
    title: "加入卓越之列",
    subtitle: "专属航班、空机航段与尊享礼遇，抢先送达您的邮箱。",
    placeholder: "您的电子邮箱",
    cta: "订阅",
    success: "感谢您，订阅已确认。",
  },
  ar: {
    title: "انضمّ إلى التميّز",
    subtitle: "توافر حصري، رحلات فارغة وامتيازات. في معاينة أولى، إلى بريدك مباشرة.",
    placeholder: "بريدك الإلكتروني",
    cta: "اشترك",
    success: "شكراً لك. تم تأكيد اشتراكك.",
  },
};

// Réseaux sociaux — pour en ajouter un, ajoutez simplement une entrée ici.
// ariaLabel est optionnel : à défaut, le label sert de libellé accessible.
const SOCIALS: { label: string; ariaLabel?: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/leclercqjet/",
    icon: (
      <svg width="23" height="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: "Facebook",
    ariaLabel: "Facebook Leclercq'Jet",
    href: "https://www.facebook.com/profile.php?id=61591892307784",
    icon: (
      <svg width="23" height="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 011-1h3V3h-3a5 5 0 00-5 5v2H7z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    ariaLabel: "TikTok Leclercq'Jet",
    href: "https://www.tiktok.com/@leclercqjet.inter",
    icon: (
      <svg width="23" height="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.92v4.03a9.95 9.95 0 01-5-1.95v4.5a6.5 6.5 0 11-8-6.33v4.33a2.5 2.5 0 104 2V3h4.08A6 6 0 0021 7.92z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;
  const nl = NEWSLETTER[lang] || NEWSLETTER.fr;

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
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

  const linkStyle: React.CSSProperties = { fontSize: "15px", color: "rgba(255,255,255,0.4)", textDecoration: "none", lineHeight: 1.8 };
  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#C9A96E"),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)"),
  };

  return (
    <footer style={{ backgroundColor: "#030810", borderTop: "1px solid rgba(201,169,110,0.2)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
        {/* Logo centered */}
        <div className="text-center mb-4">
          <Link href="/" className="inline-block" style={{ textDecoration: "none" }}>
            <LogoMark />
          </Link>
        </div>
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div style={{ flex: 1, maxWidth: "80px", height: "1px", backgroundColor: "rgba(201,169,110,0.2)" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C9A96E", opacity: 0.4 }} />
          <div style={{ flex: 1, maxWidth: "80px", height: "1px", backgroundColor: "rgba(201,169,110,0.2)" }} />
        </div>

        {/* Signature quote */}
        <p
          className="font-serif italic text-center mb-12"
          style={{ fontSize: "23px", letterSpacing: "0.04em", color: "rgba(201,169,110,0.55)", lineHeight: 1.6 }}
        >
          {f.motto}
        </p>

        {/* Premium newsletter */}
        <div
          className="max-w-xl mx-auto text-center mb-14 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-sans uppercase mb-4"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E" }}
          >
            Newsletter
          </p>
          <h3
            className="font-serif mb-3"
            style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "#FFFFFF", lineHeight: 1.15 }}
          >
            {nl.title}
          </h3>
          <p
            className="mx-auto mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(17px, 1.6vw, 20px)",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            {nl.subtitle}
          </p>

          {sent ? (
            <div className="flex items-center justify-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="font-sans" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                {nl.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex max-w-md mx-auto" style={{ gap: 0 }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={nl.placeholder}
                className="flex-1 font-sans placeholder:text-white/30 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  borderRight: "none",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  padding: "13px 16px",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              <button
                type="submit"
                className="font-sans uppercase whitespace-nowrap"
                style={{
                  backgroundColor: "#C9A96E",
                  color: "#0A1628",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  padding: "13px 28px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b8934a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9A96E")}
              >
                {nl.cta}
              </button>
            </form>
          )}
        </div>

        {/* 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Services */}
          <div>
            <p className="font-sans uppercase mb-5" style={{ fontSize: "16px", letterSpacing: "0.18em", color: "#C9A96E" }}>
              {f.cols.services.title}
            </p>
            <ul>
              {f.cols.services.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={linkStyle} {...hoverHandlers}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <p className="font-sans uppercase mb-5" style={{ fontSize: "16px", letterSpacing: "0.18em", color: "#C9A96E" }}>
              {f.cols.destinations.title}
            </p>
            <ul>
              {f.cols.destinations.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={linkStyle} {...hoverHandlers}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="font-sans uppercase mb-5" style={{ fontSize: "16px", letterSpacing: "0.18em", color: "#C9A96E" }}>
              {f.cols.about.title}
            </p>
            <ul>
              {f.cols.about.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={linkStyle} {...hoverHandlers}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans uppercase mb-5" style={{ fontSize: "16px", letterSpacing: "0.18em", color: "#C9A96E" }}>
              {f.cols.contact.title}
            </p>
            <ul>
              <li>
                <a href={`mailto:${f.cols.contact.email}`} style={linkStyle} {...hoverHandlers}>{f.cols.contact.email}</a>
              </li>
              <li>
                <a href={`tel:${f.cols.contact.phone.replace(/\s/g, "")}`} style={linkStyle} {...hoverHandlers}>{f.cols.contact.phone}</a>
              </li>
              <li style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>{f.cols.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Social icons — rangée extensible (voir SOCIALS) */}
        <div className="flex justify-center items-center gap-6 mb-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              className="footer-social"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.ariaLabel ?? s.label}
              style={{
                display: "inline-flex",
                color: "#C9A96E",
                textDecoration: "none",
                transition: "transform 0.25s ease, color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E8C77E";
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(232,199,126,0.55))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#C9A96E";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "none";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "3px 10px" }}>
            <span className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(201,169,110,0.4)" }}>EBAA Member</span>
          </div>
          <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "3px 10px" }}>
            <span className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(201,169,110,0.4)" }}>AOC Certified</span>
          </div>
        </div>

        {/* Mots-clés secteur — discret (SEO) */}
        <p
          className="font-sans text-center mb-6"
          style={{ fontSize: "10px", letterSpacing: "0.05em", color: "rgba(248,245,240,0.28)", lineHeight: 1.8 }}
        >
          Jet privé Paris · Jet Card · Charter VIP · Affrètement d&apos;avion privé · Aviation d&apos;affaires
        </p>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}
        >
          <p className="font-sans" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
            {f.copyright}
          </p>
          <p className="font-sans text-center" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
            {f.cols.contact.address} · <a href={`mailto:${f.cols.contact.email}`} style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
              {f.cols.contact.email}
            </a>
          </p>
          <div className="flex items-center gap-5">
            {f.legal.map((l) => (
              <span
                key={l}
                className="font-sans cursor-pointer"
                style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
