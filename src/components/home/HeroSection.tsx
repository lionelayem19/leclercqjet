"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import FlightRequestModal from "@/components/home/FlightRequestModal";

const ICON_PROPS = {
  className: "hero-field__icon shrink-0",
  width: 16,
  height: 16,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  style: { color: "#E8C77E" },
};

function IconPlaneDeparture() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 22h20" />
      <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l1.9-.95a2 2 0 0 1 1.8 0l9.5 5.5a2.71 2.71 0 0 1 1.5 2.45 2.71 2.71 0 0 1-3.74 2.5L4 17" />
    </svg>
  );
}

function IconPlaneArrival() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 22h20" />
      <path d="M3.77 10.77 2 9l2-4.5 1.1.55a2 2 0 0 1 1 1.8V8l4 2 3.5-6 1.95.97a2 2 0 0 1 1.05 1.78V12c0 .5-.34.94-.85 1.06l-7.34 1.84a2 2 0 0 1-1.42-.18L4.4 10.5" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width={17} height={17} className="shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={{ color: "#0A1628" }}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
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

const DISCOVER_STORY: Record<string, string> = {
  fr: "Découvrir notre histoire",
  en: "Discover our story",
  zh: "了解我们的故事",
  ar: "اكتشف قصتنا",
};

// Animated hero quote — alternates FR/EN every 3s, one language at a time.
const HERO_QUOTE: Record<"fr" | "en", string> = {
  fr: "Chaque vol rapproche un enfant de son avenir.",
  en: "Every flight brings a child closer to their future.",
};

const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "transparent",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontSize: "15px",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "2px 0",
  outline: "none",
  textShadow: "0 1px 6px rgba(0,0,0,0.7)",
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
  label, placeholder, value, onChange, icon,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; icon: React.ReactNode;
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
    <div ref={ref} className="hero-field" style={{ position: "relative" }}>
      <span className="hero-field__pastille">{icon}</span>
      <div className="hero-field__textcol">
        <label className="font-sans uppercase hero-field__label" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#E8C77E", fontWeight: 700, textShadow: "0 1px 5px rgba(0,0,0,0.7)" }}>
          {label}
        </label>
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
          className="hero-input whitespace-nowrap"
          style={fieldInputStyle}
        />
      </div>
      <AnimatePresence>
        {open && matches.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0"
            style={{
              top: "100%", marginTop: "6px", zIndex: 9999, backgroundColor: "#FFFFFF",
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
  label, placeholder, value, onChange,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));

  // Flip the calendar above the field when there isn't enough room below it,
  // so it never gets clipped by the bottom of the viewport.
  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const PANEL_H = 360; // approximate calendar height incl. margin
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUp(spaceBelow < PANEL_H && rect.top > spaceBelow);
  }, [open, ref]);

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
    <div ref={ref} className="hero-field" style={{ position: "relative" }}>
      <span className="hero-field__pastille"><IconCalendar /></span>
      <div className="hero-field__textcol">
        <label className="font-sans uppercase hero-field__label" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#E8C77E", fontWeight: 700, textShadow: "0 1px 5px rgba(0,0,0,0.7)" }}>
          {label}
        </label>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left font-sans hero-input whitespace-nowrap"
          style={{ ...fieldInputStyle, cursor: "pointer", color: "#FFFFFF" }}
        >
          {value ? formatDateFR(value) : placeholder}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: openUp ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUp ? 6 : -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute"
            style={{
              ...(openUp ? { bottom: "100%", marginBottom: "6px" } : { top: "100%", marginTop: "6px" }),
              left: 0, zIndex: 9999, width: "300px", maxWidth: "86vw",
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
  label, unitOne, unitMany, value, onChange,
}: {
  label: string; unitOne: string; unitMany: string; value: number; onChange: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const MIN = 1;
  const MAX = 19;
  const clamp = (n: number) => Math.max(MIN, Math.min(MAX, n));

  return (
    <div ref={ref} className="hero-field" style={{ position: "relative" }}>
      <span className="hero-field__pastille"><IconUsers /></span>
      <div className="hero-field__textcol">
        <label className="font-sans uppercase hero-field__label" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#E8C77E", fontWeight: 700, textShadow: "0 1px 5px rgba(0,0,0,0.7)" }}>
          {label}
        </label>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left font-sans hero-input whitespace-nowrap"
          style={{ ...fieldInputStyle, cursor: "pointer" }}
        >
          {value} {value > 1 ? unitMany : unitOne}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute"
            style={{
              top: "100%", left: 0, marginTop: "6px", zIndex: 9999, width: "240px", maxWidth: "86vw",
              backgroundColor: "#FFFFFF", border: "1px solid #ECECEC", borderTop: `2px solid ${GOLD}`,
              boxShadow: "0 16px 44px rgba(10,22,40,0.20)", padding: "16px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans" style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>{label}</span>
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
  const [requestOpen, setRequestOpen] = useState(false);

  const guarantee = GUARANTEES[lang] || GUARANTEES.fr;
  const tagline = TAGLINE[lang] || TAGLINE.fr;
  const discoverStory = DISCOVER_STORY[lang] || DISCOVER_STORY.fr;

  // Hero quote alternates FR ⇄ EN every 3s, looping infinitely.
  const [quoteLang, setQuoteLang] = useState<"fr" | "en">("fr");
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteLang((prev) => (prev === "fr" ? "en" : "fr"));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Parallax: the background image drifts slower than the page scroll for a sense of depth.
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 140]);

  // Sous md (< 768px, même seuil que la media query de .hero-bg-img), la photo
  // n'est plus surdimensionnée : elle n'a plus la marge nécessaire pour dériver.
  // On annule donc l'amplitude de la parallaxe. matchMedia et non media query CSS,
  // car `y` est piloté en JS par framer-motion.
  const [isBelowMd, setIsBelowMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsBelowMd(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim() || !date) {
      setError(true);
      return;
    }
    setError(false);
    setRequestOpen(true);
  };

  return (
    <section className="hero-section relative flex flex-col">
      {/* Background layers wrapper — clips the oversized parallax image + clouds
          to the hero WITHOUT an overflow:hidden on the <section> itself, which
          was cropping the search-bar suggestion dropdowns. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Background photo — slow parallax drift (image is oversized so edges never reveal) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/images/acquisition.png"
          alt="Falcon en vol au-dessus des nuages"
          className="hero-bg-img absolute object-cover"
          style={{
            y: prefersReducedMotion || isBelowMd ? 0 : parallaxY,
            willChange: "transform",
          }}
        />

        {/* Overlay #0A1628 38% */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(10,22,40,0.38)" }}
        />

        {/* Calques de nuages : CSS pur, dérive horizontale lente et subtile (sous le contenu) */}
        <div className="hero-clouds">
          <div className="hero-clouds__layer hero-clouds__layer--1" />
          <div className="hero-clouds__layer hero-clouds__layer--2" />
        </div>

        {/* Fondu bas de la photo → couleur de la section suivante (#0A1628).
            Dégradé statique pur CSS : la photo se fond au lieu de se couper net. */}
        <div
          className="absolute inset-x-0 bottom-0"
          aria-hidden="true"
          style={{ height: "170px", background: "linear-gradient(to bottom, rgba(10,22,40,0), #0A1628)" }}
        />
      </div>

      {/* Content — left-aligned */}
      <div
        className="relative z-10 flex flex-col justify-center flex-1 pt-20"
        style={{ paddingLeft: "8%", paddingRight: "8%", paddingBottom: "0" }}
      >
        {/* Inner column — capped width so the content stays contained and aligned on ultra-wide screens */}
        <div className="w-full max-w-7xl mx-auto">
        {/* Destinations — infinite marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="destinations-marquee"
          style={{ marginBottom: "24px" }}
          role="marquee"
          aria-label="Paris · Londres · Genève · Monaco · Dubaï · New York · Tokyo · Los Angeles · Miami · Saint-Tropez · Ibiza · Mykonos · Marrakech · Courchevel · Saint-Barthélemy · Singapour · Hong Kong · Le Cap · Maldives · Bora Bora · Rome · Milan · Zurich · Vienne"
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
                  backgroundColor: "transparent",
                  textTransform: "uppercase",
                }}
              >
                Paris · Londres · Genève · Monaco · Dubaï · New York · Tokyo · Los Angeles · Miami · Saint-Tropez · Ibiza · Mykonos · Marrakech · Courchevel · Saint-Barthélemy · Singapour · Hong Kong · Le Cap · Maldives · Bora Bora · Rome · Milan · Zurich · Vienne&nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </motion.div>

        {/* Animated quote — alterne FR/EN une langue à la fois (cycle 5s inchangé).
            Texte doré clair (couleur de base), sans contour, ombre portée très légère
            pour la lisibilité — appliqué à l'élément qui affiche la citation
            → les deux versions FR/EN en héritent. */}
        <h1 className="hero-quote-in" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", lineHeight: 1.4, letterSpacing: "0.005em", marginBottom: "14px" }}>
          <AnimatePresence mode="wait">
            {/* key={quoteLang} → remount à chaque phrase (relance l'entrée) */}
            <motion.span
              key={quoteLang}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: "clamp(28px, 5vw, 56px)",
                fontWeight: 400,
                color: "#E8C77E",
                textShadow: "0 2px 14px rgba(10,22,40,0.75), 0 0 30px rgba(10,22,40,0.5)",
              }}
            >
              {HERO_QUOTE[quoteLang]}
            </motion.span>
          </AnimatePresence>
        </h1>

        {/* Lien d'invitation vers Legacy — seul renvoi, visible en permanence,
            placé sous le slogan animé (n'affecte pas l'animation FR/EN). */}
        <div className="hero-engagement-wrap">
          <Link href="/legacy" className="hero-engagement-link">
            <span>{discoverStory}</span>
            <span className="hero-engagement-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Decorative tagline — entrance handled in CSS (.hero-tagline) */}
        <div className="hero-tagline mb-10">
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(15px, 1.5vw, 20px)",
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Search engine — entrance animation handled in CSS (.hero-search / .hero-field / .hero-cta) */}
        <div style={{ maxWidth: "1240px" }}>
          <form onSubmit={handleSearch}>
            <div className="hero-search overflow-visible">
              <div className="hero-search__row overflow-visible">
                {/* Départ */}
                <CityField
                  label={h.from}
                  placeholder={h.fromPlaceholder}
                  value={from}
                  onChange={(v) => { setFrom(v); if (error) setError(false); }}
                  icon={<IconPlaneDeparture />}
                />

                {/* Arrivée */}
                <CityField
                  label={h.to}
                  placeholder={h.toPlaceholder}
                  value={to}
                  onChange={(v) => { setTo(v); if (error) setError(false); }}
                  icon={<IconPlaneArrival />}
                />

                {/* Date */}
                <DateField
                  label={h.date}
                  placeholder={h.datePlaceholder}
                  value={date}
                  onChange={(v) => { setDate(v); if (error) setError(false); }}
                />

                {/* Passagers */}
                <PaxField
                  label={h.passengers}
                  unitOne={h.passengerOne}
                  unitMany={h.passengerMany}
                  value={passengers}
                  onChange={setPassengers}
                />

                {/* CTA */}
                <button
                  type="submit"
                  className="font-sans uppercase flex items-center justify-center gap-2 hero-cta"
                  style={{
                    color: NAVY,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <IconSearch />
                  <span className="whitespace-nowrap">{h.cta}</span>
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
                {h.search.errorRequired}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Guarantees */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(15px, 1.3vw, 16px)",
              letterSpacing: "0.05em",
              color: "#f8f5f0",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            {guarantee.split("·").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span style={{ color: "#C9A96E" }}>·</span>}
              </span>
            ))}
          </motion.p>
        </div>
        </div>
      </div>

      {/* Modale de recueil des coordonnées — ouverte au clic sur « Prendre mon envol » */}
      <FlightRequestModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        from={from}
        to={to}
        dateLabel={formatDateFR(date)}
        dateISO={date}
        passengers={passengers}
      />
    </section>
  );
}
