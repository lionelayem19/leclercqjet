"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

function IconPlane() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "#C9A96E" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "#C9A96E" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "#C9A96E" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

const GUARANTEES: Record<string, string> = {
  fr: "Opérateurs certifiés AOC  ·  Confidentialité absolue  ·  Disponible 24h/24",
  en: "AOC certified operators  ·  Absolute confidentiality  ·  Available 24/7",
  zh: "AOC认证运营商  ·  绝对保密  ·  全天候服务",
  ar: "مشغّلون معتمدون AOC  ·  سرية تامة  ·  خدمة 24/7",
};

const TAGLINE: Record<string, string> = {
  fr: "Courtage aérien privé depuis Paris",
  en: "Private aviation brokerage from Paris",
  zh: "巴黎私人航空经纪",
  ar: "وساطة الطيران الخاص من باريس",
};

const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "transparent",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontSize: "14px",
  color: "#1A1A2E",
  fontWeight: 500,
  padding: "6px 0",
  outline: "none",
};

const NAVY = "#0A1628";
const GOLD = "#C9A96E";

type Airport = { city: string; code: string; country: string; airport: string };

const AIRPORTS: Airport[] = [
  { city: "Paris", code: "LBG", country: "France", airport: "Le Bourget" },
  { city: "Nice", code: "NCE", country: "France", airport: "Côte d'Azur" },
  { city: "Cannes", code: "CEQ", country: "France", airport: "Mandelieu" },
  { city: "Saint-Tropez", code: "LTT", country: "France", airport: "La Môle" },
  { city: "Courchevel", code: "CVF", country: "France", airport: "Altiport" },
  { city: "Genève", code: "GVA", country: "Suisse", airport: "Cointrin" },
  { city: "Londres", code: "FAB", country: "Royaume-Uni", airport: "Farnborough" },
  { city: "Monaco", code: "MCM", country: "Monaco", airport: "Héliport" },
  { city: "Milan", code: "LIN", country: "Italie", airport: "Linate" },
  { city: "Rome", code: "CIA", country: "Italie", airport: "Ciampino" },
  { city: "Madrid", code: "MAD", country: "Espagne", airport: "Barajas" },
  { city: "Ibiza", code: "IBZ", country: "Espagne", airport: "Ibiza" },
  { city: "Lisbonne", code: "LIS", country: "Portugal", airport: "Humberto Delgado" },
  { city: "Mykonos", code: "JMK", country: "Grèce", airport: "Mykonos" },
  { city: "Marrakech", code: "RAK", country: "Maroc", airport: "Ménara" },
  { city: "Dubaï", code: "DWC", country: "Émirats", airport: "Al Maktoum" },
  { city: "New York", code: "TEB", country: "États-Unis", airport: "Teterboro" },
  { city: "Tokyo", code: "HND", country: "Japon", airport: "Haneda" },
];

const MONTHS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DOW_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDateFR(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS_FR[m - 1]} ${y}`;
}

/** Outside-click hook for popovers */
function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

/** City / airport field with live suggestions */
function CityField({
  label, placeholder, value, onChange, borderRight,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; borderRight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useOutsideClose(() => setOpen(false));

  const q = value.trim().toLowerCase();
  const matches = (q.length === 0
    ? AIRPORTS.slice(0, 6)
    : AIRPORTS.filter(
        (a) => a.city.toLowerCase().includes(q) || a.code.toLowerCase().includes(q) || a.country.toLowerCase().includes(q),
      ).slice(0, 6));

  const choose = (a: Airport) => {
    onChange(`${a.city} (${a.code})`);
    setOpen(false);
  };

  return (
    <div ref={ref} className="p-5" style={{ borderRight: borderRight ? "1px solid #F0F0F0" : undefined, position: "relative" }}>
      <div className="flex items-center gap-2 mb-2">
        <IconPlane />
        <label className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: GOLD }}>
          {label}
        </label>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "Enter")) { setOpen(true); return; }
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, matches.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === "Enter" && matches[active]) { e.preventDefault(); choose(matches[active]); }
          else if (e.key === "Escape") setOpen(false);
        }}
        placeholder={placeholder}
        autoComplete="off"
        style={fieldInputStyle}
      />
      <AnimatePresence>
        {open && matches.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0"
            style={{
              top: "100%", marginTop: "6px", zIndex: 40, backgroundColor: "#FFFFFF",
              border: "1px solid #ECECEC", borderTop: `2px solid ${GOLD}`,
              boxShadow: "0 16px 44px rgba(10,22,40,0.20)", listStyle: "none", padding: "4px 0",
            }}
          >
            {matches.map((a, i) => (
              <li key={a.code}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); choose(a); }}
                  onMouseEnter={() => setActive(i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    padding: "10px 16px", border: "none", cursor: "pointer",
                    background: active === i ? "#F7F2E8" : "transparent", transition: "background 0.15s ease",
                  }}
                >
                  <span className="flex flex-col">
                    <span className="font-sans" style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>{a.city}</span>
                    <span className="font-sans" style={{ fontSize: "11px", color: "#8A93A0" }}>{a.airport} · {a.country}</span>
                  </span>
                  <span className="font-sans" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: GOLD, border: "1px solid rgba(201,169,110,0.4)", padding: "2px 7px" }}>
                    {a.code}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Elegant calendar date picker */
function DateField({
  label, value, onChange, borderRight,
}: {
  label: string; value: string; onChange: (v: string) => void; borderRight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const [view, setView] = useState(monthStart);

  const year = view.getFullYear();
  const month = view.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div ref={ref} className="p-5" style={{ borderRight: borderRight ? "1px solid #F0F0F0" : undefined, position: "relative" }}>
      <div className="flex items-center gap-2 mb-2">
        <IconCalendar />
        <label className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: GOLD }}>
          {label}
        </label>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left font-sans"
        style={{ ...fieldInputStyle, cursor: "pointer", color: value ? "#1A1A2E" : "#999" }}
      >
        {value ? formatDateFR(value) : "Sélectionner une date"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute"
            style={{
              top: "100%", left: 0, marginTop: "6px", zIndex: 40, width: "300px", maxWidth: "86vw",
              backgroundColor: "#FFFFFF", border: "1px solid #ECECEC", borderTop: `2px solid ${GOLD}`,
              boxShadow: "0 16px 44px rgba(10,22,40,0.20)", padding: "16px",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                aria-label="Mois précédent"
                disabled={atCurrentMonth}
                onClick={() => setView(new Date(year, month - 1, 1))}
                style={{ background: "none", border: "none", cursor: atCurrentMonth ? "not-allowed" : "pointer", color: atCurrentMonth ? "#D5D5D5" : NAVY, padding: "4px 8px", fontSize: "18px", lineHeight: 1 }}
              >
                ‹
              </button>
              <span className="font-serif" style={{ fontSize: "15px", fontWeight: 600, color: NAVY }}>
                {MONTHS_FR[month]} {year}
              </span>
              <button
                type="button"
                aria-label="Mois suivant"
                onClick={() => setView(new Date(year, month + 1, 1))}
                style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, padding: "4px 8px", fontSize: "18px", lineHeight: 1 }}
              >
                ›
              </button>
            </div>
            <div className="grid grid-cols-7 mb-2">
              {DOW_FR.map((d) => (
                <span key={d} className="font-sans text-center" style={{ fontSize: "9px", letterSpacing: "0.08em", color: GOLD, textTransform: "uppercase" }}>
                  {d}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, idx) => {
                if (day === null) return <span key={`e${idx}`} />;
                const cellDate = new Date(year, month, day);
                const iso = toISO(cellDate);
                const isPast = cellDate < today;
                const isSelected = iso === value;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={isPast}
                    onClick={() => { onChange(iso); setOpen(false); }}
                    className="font-sans"
                    style={{
                      height: "34px", border: "none", cursor: isPast ? "not-allowed" : "pointer",
                      fontSize: "13px", borderRadius: "2px",
                      backgroundColor: isSelected ? GOLD : "transparent",
                      color: isSelected ? NAVY : isPast ? "#CFCFCF" : "#1A1A2E",
                      fontWeight: isSelected ? 700 : 500, transition: "background 0.15s ease, color 0.15s ease",
                    }}
                    onMouseEnter={(e) => { if (!isPast && !isSelected) e.currentTarget.style.backgroundColor = "#F7F2E8"; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Passenger stepper */
function PaxField({
  label, value, onChange, borderRight,
}: {
  label: string; value: number; onChange: (v: number) => void; borderRight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const MIN = 1;
  const MAX = 19;
  const clamp = (n: number) => Math.max(MIN, Math.min(MAX, n));

  return (
    <div ref={ref} className="p-5" style={{ borderRight: borderRight ? "1px solid #F0F0F0" : undefined, position: "relative" }}>
      <div className="flex items-center gap-2 mb-2">
        <IconUsers />
        <label className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: GOLD }}>
          {label}
        </label>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left font-sans"
        style={{ ...fieldInputStyle, cursor: "pointer" }}
      >
        {value} {value > 1 ? "passagers" : "passager"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute"
            style={{
              top: "100%", left: 0, marginTop: "6px", zIndex: 40, width: "240px", maxWidth: "86vw",
              backgroundColor: "#FFFFFF", border: "1px solid #ECECEC", borderTop: `2px solid ${GOLD}`,
              boxShadow: "0 16px 44px rgba(10,22,40,0.20)", padding: "16px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans" style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>Passagers</span>
              <div className="flex items-center gap-3">
                {([["−", -1], ["+", 1]] as const).map(([sym, delta]) => {
                  const disabled = delta < 0 ? value <= MIN : value >= MAX;
                  return (
                    <button
                      key={sym}
                      type="button"
                      aria-label={delta < 0 ? "Retirer un passager" : "Ajouter un passager"}
                      disabled={disabled}
                      onClick={() => onChange(clamp(value + delta))}
                      style={{
                        width: "30px", height: "30px", borderRadius: "50%", cursor: disabled ? "not-allowed" : "pointer",
                        border: `1px solid ${disabled ? "#E3E3E3" : "rgba(201,169,110,0.6)"}`,
                        background: "transparent", color: disabled ? "#D5D5D5" : NAVY, fontSize: "16px", lineHeight: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {sym}
                    </button>
                  );
                })}
                <span className="font-serif text-center" style={{ minWidth: "22px", fontSize: "18px", fontWeight: 700, color: NAVY }}>{value}</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { onChange(n); setOpen(false); }}
                  className="font-sans"
                  style={{
                    height: "30px", border: "1px solid #EEE", cursor: "pointer", fontSize: "12px",
                    backgroundColor: value === n ? GOLD : "transparent",
                    color: value === n ? NAVY : "#5A6472", fontWeight: value === n ? 700 : 500, transition: "background 0.15s ease",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const h = t.home.hero;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { from: string; to: string; date: string; passengers: number; ref: string }>(null);

  const guarantee = GUARANTEES[lang] || GUARANTEES.fr;
  const tagline = TAGLINE[lang] || TAGLINE.fr;

  // Parallax: the background image drifts slower than the page scroll for a sense of depth.
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 140]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim() || !date) {
      setError(true);
      return;
    }
    setError(false);
    const ref = `LJ-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
    setConfirmed({ from, to, date, passengers, ref });
  };

  const resetSearch = () => {
    setConfirmed(null);
    setFrom("");
    setTo("");
    setDate("");
    setPassengers(2);
  };

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ height: "100vh", minHeight: "700px" }}>
      {/* Background photo — slow parallax drift (image is oversized so edges never reveal) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/images/acquisition.png"
        alt="Falcon en vol au-dessus des nuages"
        className="absolute object-cover"
        style={{
          top: "-17.5%",
          left: 0,
          width: "100%",
          height: "135%",
          objectPosition: "center 40%",
          y: prefersReducedMotion ? 0 : parallaxY,
          willChange: "transform",
        }}
      />

      {/* Overlay #0A1628 38% */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10,22,40,0.38)" }}
      />

      {/* Content — left-aligned */}
      <div
        className="relative z-10 flex flex-col justify-center flex-1 pt-20"
        style={{ paddingLeft: "8%", paddingRight: "8%", paddingBottom: "0" }}
      >
        {/* Destinations — infinite marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="destinations-marquee"
          style={{ marginBottom: "24px" }}
          role="marquee"
          aria-label="Paris · Londres · Genève · Monaco · Dubaï · New York · Tokyo"
        >
          <div className="destinations-track" aria-hidden="true">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="font-sans font-semibold"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                }}
              >
                Paris · Londres · Genève · Monaco · Dubaï · New York · Tokyo&nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </motion.div>

        {/* Title — 3 lines, Cormorant Garamond italic, slow luxurious fade-in */}
        <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", lineHeight: 1.04, letterSpacing: "0.005em", marginBottom: "28px", color: "#F5F0E8" }}>
          {["Votre temps est", "le seul luxe", "qui compte."].map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, delay: 0.5 + i * 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(48px, 6.5vw, 80px)", fontWeight: 700 }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Decorative tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div style={{ width: "50px", height: "1px", backgroundColor: "#C9A96E" }} />
          <p className="font-sans" style={{ fontSize: "13px", color: "#C0C8D4", letterSpacing: "0.15em" }}>
            {tagline}
          </p>
        </motion.div>

        {/* Search engine */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={{ maxWidth: "860px" }}
        >
          <form onSubmit={handleSearch}>
            <div
              className="bg-white"
              style={{ borderTop: "3px solid #C9A96E", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Départ */}
                <CityField
                  label={h.from}
                  placeholder="Ville ou aéroport de départ"
                  value={from}
                  onChange={(v) => { setFrom(v); if (error) setError(false); }}
                  borderRight
                />

                {/* Arrivée */}
                <CityField
                  label={h.to}
                  placeholder="Ville ou aéroport d'arrivée"
                  value={to}
                  onChange={(v) => { setTo(v); if (error) setError(false); }}
                  borderRight
                />

                {/* Date */}
                <DateField
                  label={h.date}
                  value={date}
                  onChange={(v) => { setDate(v); if (error) setError(false); }}
                  borderRight
                />

                {/* Passagers */}
                <PaxField
                  label={h.passengers}
                  value={passengers}
                  onChange={setPassengers}
                  borderRight
                />

                {/* CTA */}
                <button
                  type="submit"
                  className="font-sans uppercase flex items-center justify-center gap-2 min-h-[72px] md:min-h-0 transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "#0A1628",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    padding: "0 32px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {h.cta}
                  <span aria-hidden="true" style={{ color: GOLD, fontSize: "13px" }}>→</span>
                </button>
              </div>
            </div>
          </form>

          {/* Validation note */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="font-sans mt-3"
                style={{ fontSize: "12px", letterSpacing: "0.04em", color: GOLD }}
              >
                Merci de renseigner le départ, l&apos;arrivée et la date du vol.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Guarantees */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="font-sans mt-4"
            style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#E8EDF2" }}
          >
            {guarantee}
          </motion.p>
        </motion.div>
      </div>

      {/* Premium confirmation modal */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(6,12,24,0.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            onClick={resetSearch}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", width: "100%", maxWidth: "460px",
                background: "linear-gradient(160deg, #0E1B30 0%, #0A1628 100%)",
                borderTop: `3px solid ${GOLD}`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
                padding: "44px 40px 38px",
              }}
            >
              {/* Close */}
              <button
                type="button"
                aria-label="Fermer"
                onClick={resetSearch}
                style={{ position: "absolute", top: "16px", right: "18px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "22px", lineHeight: 1, transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                ×
              </button>

              {/* Gold check */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.12, type: "spring", stiffness: 200, damping: 14 }}
                  style={{ width: "66px", height: "66px", borderRadius: "50%", border: `1px solid rgba(201,169,110,0.45)`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(201,169,110,0.08)" }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>

              <p className="font-sans uppercase text-center" style={{ fontSize: "10px", letterSpacing: "0.32em", color: GOLD, marginBottom: "12px" }}>
                Demande reçue
              </p>
              <h3 className="font-serif text-center" style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "10px" }}>
                Votre recherche est confirmée
              </h3>
              <p className="font-sans text-center" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "26px" }}>
                Un conseiller LeclercqJet vous recontacte sous <span style={{ color: GOLD }}>2 heures</span> avec une sélection d&apos;appareils.
              </p>

              {/* Itinerary summary */}
              <div style={{ border: "1px solid rgba(201,169,110,0.18)", padding: "20px 22px", marginBottom: "24px" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
                  <div style={{ maxWidth: "42%" }}>
                    <p className="font-sans uppercase" style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(201,169,110,0.7)", marginBottom: "4px" }}>Départ</p>
                    <p className="font-sans" style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 600 }}>{confirmed.from}</p>
                  </div>
                  <span aria-hidden="true" style={{ color: GOLD, fontSize: "16px" }}>✈</span>
                  <div style={{ maxWidth: "42%", textAlign: "right" }}>
                    <p className="font-sans uppercase" style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(201,169,110,0.7)", marginBottom: "4px" }}>Arrivée</p>
                    <p className="font-sans" style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 600 }}>{confirmed.to}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
                  <span className="font-sans" style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>{formatDateFR(confirmed.date)}</span>
                  <span className="font-sans" style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>{confirmed.passengers} {confirmed.passengers > 1 ? "passagers" : "passager"}</span>
                </div>
              </div>

              <p className="font-sans text-center" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "22px" }}>
                Référence&nbsp;: <span style={{ color: GOLD, fontWeight: 600 }}>{confirmed.ref}</span>
              </p>

              <button
                type="button"
                onClick={resetSearch}
                className="font-sans uppercase w-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: NAVY, fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700, padding: "15px 0", border: "none", cursor: "pointer" }}
              >
                Parfait, merci
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
