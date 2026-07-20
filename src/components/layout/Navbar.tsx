"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import NavSearch from "./NavSearch";

type NavItem = { label: string; href: string };

const EXPERTISES: Record<Lang, NavItem[]> = {
  fr: [
    { label: "Vols Privés", href: "/vols-prives" },
    { label: "Vols Partagés", href: "/empty-legs" },
    { label: "Charter Management", href: "/charter-management" },
    { label: "Acquisition", href: "/acquisition" },
  ],
  en: [
    { label: "Private Flights", href: "/vols-prives" },
    { label: "Shared Flights", href: "/empty-legs" },
    { label: "Charter Management", href: "/charter-management" },
    { label: "Acquisition", href: "/acquisition" },
  ],
  zh: [
    { label: "私人飞行", href: "/vols-prives" },
    { label: "空机腿", href: "/empty-legs" },
    { label: "包机管理", href: "/charter-management" },
    { label: "购买飞机", href: "/acquisition" },
  ],
  ar: [
    { label: "رحلات خاصة", href: "/vols-prives" },
    { label: "الرحلات الفارغة", href: "/empty-legs" },
    { label: "إدارة الشارتر", href: "/charter-management" },
    { label: "اقتن طائرتك", href: "/acquisition" },
  ],
};

const CONCIERGE: Record<Lang, NavItem[]> = {
  fr: [
    { label: "Chauffeur Privé", href: "/conciergerie/chauffeur" },
    { label: "Gastronomie & Personnalisation", href: "/conciergerie/gastronomie" },
    { label: "Coiffeur & Visagiste", href: "/conciergerie/coiffeur-visagiste" },
    { label: "Détente & Relaxation", href: "/detente" },
    { label: "Événements Spéciaux", href: "/evenements" },
    { label: "Carte Blanche", href: "/conciergerie#carte-blanche" },
    { label: "Vos compagnons à bord", href: "/conciergerie/animaux" },
  ],
  en: [
    { label: "Private Chauffeur", href: "/conciergerie/chauffeur" },
    { label: "Gastronomy & Personalisation", href: "/conciergerie/gastronomie" },
    { label: "Hair & Beauty", href: "/conciergerie/coiffeur-visagiste" },
    { label: "Relaxation & Wellness", href: "/detente" },
    { label: "Special Events", href: "/evenements" },
    { label: "Carte Blanche", href: "/conciergerie#carte-blanche" },
    { label: "Your companions on board", href: "/conciergerie/animaux" },
  ],
  zh: [
    { label: "专属司机", href: "/conciergerie/chauffeur" },
    { label: "美食与个性化", href: "/conciergerie/gastronomie" },
    { label: "发型与形象设计", href: "/conciergerie/coiffeur-visagiste" },
    { label: "放松与休闲", href: "/detente" },
    { label: "特别活动", href: "/evenements" },
    { label: "Carte Blanche", href: "/conciergerie#carte-blanche" },
    { label: "您的旅伴同行", href: "/conciergerie/animaux" },
  ],
  ar: [
    { label: "سائق خاص", href: "/conciergerie/chauffeur" },
    { label: "الغاسترونومي والتخصيص", href: "/conciergerie/gastronomie" },
    { label: "تصفيف الشعر والتجميل", href: "/conciergerie/coiffeur-visagiste" },
    { label: "الاسترخاء والراحة", href: "/detente" },
    { label: "مناسبات خاصة", href: "/evenements" },
    { label: "Carte Blanche", href: "/conciergerie#carte-blanche" },
    { label: "رفاقك على المتن", href: "/conciergerie/animaux" },
  ],
};

const ABOUT: Record<Lang, NavItem[]> = {
  fr: [{ label: "Notre équipe", href: "/organisation" }],
  en: [{ label: "Our Team", href: "/organisation" }],
  zh: [{ label: "我们的团队", href: "/organisation" }],
  ar: [{ label: "فريقنا", href: "/organisation" }],
};

const ENGAGEMENTS_LABELS: Record<Lang, string> = {
  fr: "Nos Engagements",
  en: "Our Commitments",
  zh: "我们的承诺",
  ar: "التزاماتنا",
};

const VISION_LABELS: Record<Lang, string> = {
  fr: "Notre Vision",
  en: "Our Vision",
  zh: "我们的愿景",
  ar: "رؤيتنا",
};

// Libellé navbar « Notre Promesse » — rubrique signature (route /legacy conservée).
const CONTRIBUTION_LABELS: Record<Lang, string> = {
  fr: "Notre Promesse",
  en: "Our Promise",
  zh: "我们的承诺",
  ar: "وعدنا",
};

const DROPDOWN_LABELS: Record<Lang, { expertises: string; conciergerie: string; about: string }> = {
  fr: { expertises: "Nos Expertises", conciergerie: "Conciergerie", about: "À propos" },
  en: { expertises: "Our Expertise", conciergerie: "Concierge", about: "About" },
  zh: { expertises: "我们的专长", conciergerie: "礼宾服务", about: "关于我们" },
  ar: { expertises: "خبراتنا", conciergerie: "الكونسيرج", about: "من نحن" },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#C9A96E" }}
      width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const DROPDOWN_PANEL: React.CSSProperties = {
  backgroundColor: "#0A1628",
  border: "1px solid rgba(201,169,110,0.2)",
  minWidth: "240px",
};

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<null | "expertises" | "conciergerie" | "about">(null);
  const [mobileExpanded, setMobileExpanded] = useState<null | "expertises" | "conciergerie" | "about">(null);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labels = DROPDOWN_LABELS[lang] || DROPDOWN_LABELS.fr;
  const expertiseItems = EXPERTISES[lang] || EXPERTISES.fr;
  const conciergeItems = CONCIERGE[lang] || CONCIERGE.fr;
  // « À propos » : Organisation → Nos Engagements (Nos Engagements n'est plus un lien direct).
  const aboutItems: NavItem[] = [
    ...(ABOUT[lang] || ABOUT.fr),
    { label: ENGAGEMENTS_LABELS[lang] || ENGAGEMENTS_LABELS.fr, href: "/nos-engagements" },
    { label: VISION_LABELS[lang] || VISION_LABELS.fr, href: "/notre-vision" },
  ];

  const topLinks: NavItem[] = [
    { label: CONTRIBUTION_LABELS[lang] || CONTRIBUTION_LABELS.fr, href: "/legacy" },
    { label: t.nav.memberships, href: "/formules" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const langs: { code: Lang; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "zh", label: "中文" },
    { code: "ar", label: "عربية" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const expertisesActive = expertiseItems.some((i) => pathname === i.href);
  const conciergerieActive = conciergeItems.some((i) => pathname === i.href) || pathname === "/conciergerie";
  const aboutActive = aboutItems.some((i) => pathname === i.href);

  const navBtnStyle = (active: boolean): React.CSSProperties => ({
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: active ? "#C9A96E" : "#E8EDF2",
    transition: "color 0.25s ease",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: 0,
    fontFamily: "var(--font-inter), Inter, sans-serif",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  });

  const dropdownItemStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    padding: "12px 20px",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.05em",
    color: active ? "#C9A96E" : "#E8EDF2",
    textDecoration: "none",
    transition: "color 0.2s ease, background 0.2s ease",
    borderBottom: "1px solid rgba(201,169,110,0.06)",
  });

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 glass-dark${scrolled ? " nav-scrolled" : ""}`} style={{ height: "72px" }}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-5 2xl:gap-10 h-full">
          {/* Logo */}
          <Link href="/" className="shrink-0" style={{ textDecoration: "none" }} aria-label="Leclercq'Jet International — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-transparent.png"
              alt="Leclercq'Jet International"
              className="logo-premium block h-[52px] w-auto xl:h-[74px]"
            />
          </Link>

          {/* Desktop cluster — menu + actions groupés à droite (aucun vide isolé) */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-10">

            {/* Desktop nav */}
            <div className="flex items-center flex-nowrap gap-[18px] 2xl:gap-8">

            {/* Dropdown — NOS EXPERTISES */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("expertises")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className="font-sans uppercase"
                style={navBtnStyle(expertisesActive)}
                onMouseEnter={(e) => { if (!expertisesActive) (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
                onMouseLeave={(e) => { if (!expertisesActive) (e.currentTarget as HTMLElement).style.color = "#E8EDF2"; }}
              >
                {labels.expertises}
                <ChevronIcon open={dropdownOpen === "expertises"} />
              </button>
              <AnimatePresence>
                {dropdownOpen === "expertises" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-3 z-50"
                  >
                    <div style={DROPDOWN_PANEL}>
                      {expertiseItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={dropdownItemStyle(pathname === item.href)}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.background = "rgba(201,169,110,0.04)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.href ? "#C9A96E" : "#E8EDF2"; e.currentTarget.style.background = "transparent"; }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown — CONCIERGERIE */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("conciergerie")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className="font-sans uppercase"
                style={navBtnStyle(conciergerieActive)}
                onMouseEnter={(e) => { if (!conciergerieActive) (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
                onMouseLeave={(e) => { if (!conciergerieActive) (e.currentTarget as HTMLElement).style.color = "#E8EDF2"; }}
              >
                {labels.conciergerie}
                <ChevronIcon open={dropdownOpen === "conciergerie"} />
              </button>
              <AnimatePresence>
                {dropdownOpen === "conciergerie" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-3 z-50"
                  >
                    <div style={DROPDOWN_PANEL}>
                      {conciergeItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={dropdownItemStyle(pathname === item.href)}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.background = "rgba(201,169,110,0.04)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.href ? "#C9A96E" : "#E8EDF2"; e.currentTarget.style.background = "transparent"; }}
                        >
                          {item.label}
                          {(item.href === "/conciergerie/coiffeur-visagiste" || item.href === "/conciergerie#carte-blanche") && <span className="nav-new-badge">NOUVEAU</span>}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct links — « Legacy » distinguée en doré (rubrique signature) */}
            {topLinks.map((l) =>
              l.href === "/legacy" ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-sans uppercase whitespace-nowrap nav-legacy"
                  style={{ ...navBtnStyle(isActive(l.href)), color: undefined }}
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-sans uppercase whitespace-nowrap"
                  style={navBtnStyle(isActive(l.href))}
                  onMouseEnter={(e) => { if (!isActive(l.href)) e.currentTarget.style.color = "#C9A96E"; }}
                  onMouseLeave={(e) => { if (!isActive(l.href)) e.currentTarget.style.color = "#E8EDF2"; }}
                >
                  {l.label}
                </Link>
              )
            )}

            {/* Dropdown — À PROPOS */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("about")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className="font-sans uppercase"
                style={navBtnStyle(aboutActive)}
                onMouseEnter={(e) => { if (!aboutActive) (e.currentTarget as HTMLElement).style.color = "#C9A96E"; }}
                onMouseLeave={(e) => { if (!aboutActive) (e.currentTarget as HTMLElement).style.color = "#E8EDF2"; }}
              >
                {labels.about}
                <ChevronIcon open={dropdownOpen === "about"} />
              </button>
              <AnimatePresence>
                {dropdownOpen === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-3 z-50"
                  >
                    <div style={DROPDOWN_PANEL}>
                      {aboutItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={dropdownItemStyle(pathname === item.href)}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.background = "rgba(201,169,110,0.04)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.href ? "#C9A96E" : "#E8EDF2"; e.currentTarget.style.background = "transparent"; }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

            {/* Desktop right */}
            <div className="flex items-center shrink-0 gap-[18px] 2xl:gap-5">
            {/* Search */}
            <NavSearch />

            {/* Language picker */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 font-sans"
                style={{ fontSize: "10px", color: "rgba(232,237,242,0.7)", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,237,242,0.7)")}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span>{lang.toUpperCase()}</span>
                <svg
                  style={{ transition: "transform 0.2s ease", transform: langOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-8 z-50 py-1.5"
                    style={{ backgroundColor: "#0A1628", border: "1px solid rgba(201,169,110,0.15)", minWidth: "80px" }}
                  >
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className="block w-full text-left font-sans"
                        style={{ padding: "7px 14px", fontSize: "10px", letterSpacing: "0.1em", color: lang === l.code ? "#C9A96E" : "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = lang === l.code ? "#C9A96E" : "rgba(255,255,255,0.45)")}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/vols-prives"
              className="btn-devis font-sans uppercase whitespace-nowrap shrink-0"
              style={{ padding: "9px 16px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", background: "linear-gradient(135deg, #C9A96E, #E8C77E)", color: "#0A1628", textDecoration: "none" }}
            >
              {t.nav.cta}
            </Link>
            </div>
          </div>

          {/* Mobile hamburger — pure-CSS morph into an X */}
          <button
            className="xl:hidden flex items-center justify-center text-white"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger" data-open={menuOpen}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 pt-20 px-6 xl:hidden flex flex-col overflow-y-auto"
            style={{ backgroundColor: "#0A1628" }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
              style={{ color: "#C9A96E", background: "none", border: "none", cursor: "pointer", fontSize: "24px", lineHeight: 1 }}
            >
              ×
            </button>

            <div className="flex flex-col mt-8">
              {/* Nos Expertises */}
              <div>
                <button
                  className="w-full text-left font-serif py-3 flex items-center justify-between"
                  style={{ fontSize: "26px", color: expertisesActive ? "#C9A96E" : "rgba(255,255,255,0.9)", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", paddingBottom: "14px", paddingTop: "14px" }}
                  onClick={() => setMobileExpanded(mobileExpanded === "expertises" ? null : "expertises")}
                >
                  <span>{labels.expertises}</span>
                  <ChevronIcon open={mobileExpanded === "expertises"} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "expertises" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                      style={{ backgroundColor: "rgba(201,169,110,0.04)" }}
                    >
                      {expertiseItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block font-sans py-3 px-6"
                          style={{ fontSize: "15px", color: pathname === item.href ? "#C9A96E" : "rgba(255,255,255,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Conciergerie */}
              <div>
                <button
                  className="w-full text-left font-serif py-3 flex items-center justify-between"
                  style={{ fontSize: "26px", color: conciergerieActive ? "#C9A96E" : "rgba(255,255,255,0.9)", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", paddingBottom: "14px", paddingTop: "14px" }}
                  onClick={() => setMobileExpanded(mobileExpanded === "conciergerie" ? null : "conciergerie")}
                >
                  <span>{labels.conciergerie}</span>
                  <ChevronIcon open={mobileExpanded === "conciergerie"} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "conciergerie" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                      style={{ backgroundColor: "rgba(201,169,110,0.04)" }}
                    >
                      {conciergeItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block font-sans py-3 px-6"
                          style={{ fontSize: "15px", color: pathname === item.href ? "#C9A96E" : "rgba(255,255,255,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        >
                          {item.label}
                          {(item.href === "/conciergerie/coiffeur-visagiste" || item.href === "/conciergerie#carte-blanche") && <span className="nav-new-badge">NOUVEAU</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct links — « Legacy » distinguée en doré (rubrique signature) */}
              {topLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif py-3 block${l.href === "/legacy" ? " nav-legacy" : ""}`}
                  style={{ fontSize: "26px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: l.href === "/legacy" ? undefined : (isActive(l.href) ? "#C9A96E" : "rgba(255,255,255,0.9)"), textDecoration: "none", paddingBottom: "14px", paddingTop: "14px" }}
                >
                  {l.label}
                </Link>
              ))}

              {/* À propos */}
              <div>
                <button
                  className="w-full text-left font-serif py-3 flex items-center justify-between"
                  style={{ fontSize: "26px", color: aboutActive ? "#C9A96E" : "rgba(255,255,255,0.9)", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", paddingBottom: "14px", paddingTop: "14px" }}
                  onClick={() => setMobileExpanded(mobileExpanded === "about" ? null : "about")}
                >
                  <span>{labels.about}</span>
                  <ChevronIcon open={mobileExpanded === "about"} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "about" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                      style={{ backgroundColor: "rgba(201,169,110,0.04)" }}
                    >
                      {aboutItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block font-sans py-3 px-6"
                          style={{ fontSize: "15px", color: pathname === item.href ? "#C9A96E" : "rgba(255,255,255,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 space-y-4 pb-8">
              <Link
                href="/vols-prives"
                onClick={() => setMenuOpen(false)}
                className="btn-devis block text-center font-sans uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.15em", backgroundColor: "#E0BC6E", color: "#0A1628", padding: "14px 24px", textDecoration: "none", fontWeight: 700 }}
              >
                {t.nav.cta}
              </Link>
              <div className="flex gap-4 pt-2">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMenuOpen(false); }}
                    className="font-sans"
                    style={{ fontSize: "11px", letterSpacing: "0.1em", color: lang === l.code ? "#C9A96E" : "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
