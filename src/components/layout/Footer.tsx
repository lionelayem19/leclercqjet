"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import LogoMark from "@/components/ui/LogoMark";

const NEWSLETTER: Record<Lang, { title: string; subtitle: string; placeholder: string; cta: string; success: string }> = {
  fr: {
    title: "Rejoignez l'excellence",
    subtitle: "Disponibilités exclusives, empty legs et privilèges — en avant-première, dans votre boîte mail.",
    placeholder: "Votre adresse email",
    cta: "S'abonner",
    success: "Merci. Votre inscription est confirmée.",
  },
  en: {
    title: "Join excellence",
    subtitle: "Exclusive availability, empty legs and privileges — previewed first, straight to your inbox.",
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
    subtitle: "توافر حصري، رحلات فارغة وامتيازات — في معاينة أولى، إلى بريدك مباشرة.",
    placeholder: "بريدك الإلكتروني",
    cta: "اشترك",
    success: "شكراً لك. تم تأكيد اشتراكك.",
  },
};

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

  const linkStyle: React.CSSProperties = { fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none", lineHeight: 2 };
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
          style={{ fontSize: "14px", letterSpacing: "0.04em", color: "rgba(201,169,110,0.55)", lineHeight: 1.6 }}
        >
          Courage, Confidence, Love &amp; Hope
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
            className="font-sans mx-auto mb-8"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "420px" }}
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
            <p className="font-sans uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E" }}>
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
            <p className="font-sans uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E" }}>
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
            <p className="font-sans uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E" }}>
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
            <p className="font-sans uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E" }}>
              {f.cols.contact.title}
            </p>
            <ul>
              <li>
                <a href={`mailto:${f.cols.contact.email}`} style={linkStyle} {...hoverHandlers}>{f.cols.contact.email}</a>
              </li>
              <li>
                <a href={`tel:${f.cols.contact.phone.replace(/\s/g, "")}`} style={linkStyle} {...hoverHandlers}>{f.cols.contact.phone}</a>
              </li>
              <li style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 2 }}>{f.cols.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-8">
          <a
            href="#"
            aria-label="LinkedIn"
            style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s ease", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s ease", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth={2} />
            </svg>
          </a>
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
