"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

type Page = { href: string; label: string; section: string; keywords: string };

// Searchable index of the main public pages, with keywords to widen matches.
const INDEX: Partial<Record<Lang, Page[]>> = {
  fr: [
    { href: "/", label: "Accueil", section: "Leclercq'Jet", keywords: "accueil home jet privé aviation" },
    { href: "/vols-prives", label: "Vols Privés", section: "Expertises", keywords: "vol privé jet location avion devis réserver charter sur-mesure" },
    { href: "/empty-legs", label: "Vols Partagés", section: "Expertises", keywords: "empty legs vol partagé promotion dernière minute retour à vide" },
    { href: "/charter-management", label: "Charter Management", section: "Expertises", keywords: "gestion exploitation rentabiliser avion propriétaire opérateur" },
    { href: "/acquisition", label: "Acquisition", section: "Expertises", keywords: "achat achetez votre jet acquisition courtage vente avion appareil" },
    { href: "/conciergerie", label: "Conciergerie", section: "Conciergerie", keywords: "conciergerie services sur-mesure assistance" },
    { href: "/conciergerie/chauffeur", label: "Chauffeur Privé", section: "Conciergerie", keywords: "chauffeur voiture transfert électrique limousine" },
    { href: "/conciergerie/gastronomie", label: "Gastronomie & Personnalisation", section: "Conciergerie", keywords: "gastronomie repas menu traiteur personnalisation cabine" },
    { href: "/conciergerie/animaux", label: "Vos compagnons à bord", section: "Conciergerie", keywords: "animaux chien chat compagnie compagnons cabine pet" },
    { href: "/detente", label: "Détente & Relaxation", section: "Conciergerie", keywords: "détente relaxation bien-être spa repos" },
    { href: "/evenements", label: "Événements Spéciaux", section: "Conciergerie", keywords: "événement mariage lune de miel célébration fête anniversaire" },
    { href: "/gastronomie", label: "Gastronomie", section: "Expérience", keywords: "gastronomie chef cuisine repas à bord vin champagne" },
    { href: "/formules", label: "Formules & Adhésions", section: "Leclercq'Jet", keywords: "formules abonnement membership adhésion programme carte" },
    { href: "/meteo", label: "Météo", section: "Outils", keywords: "météo conditions prévisions vol temps" },
    { href: "/actualites", label: "Actualités", section: "Magazine", keywords: "actualités blog articles magazine news journal" },
    { href: "/nos-engagements", label: "Nos Engagements", section: "Leclercq'Jet", keywords: "engagements rse enfants inde solidarité valeurs sens" },
    { href: "/contact", label: "Contact", section: "Leclercq'Jet", keywords: "contact téléphone email conseiller adresse devis" },
  ],
  en: [
    { href: "/", label: "Home", section: "Leclercq'Jet", keywords: "home jet private aviation" },
    { href: "/vols-prives", label: "Private Flights", section: "Expertise", keywords: "private flight jet charter quote book bespoke aircraft" },
    { href: "/empty-legs", label: "Shared Flights", section: "Expertise", keywords: "empty legs shared flight deal last minute repositioning" },
    { href: "/charter-management", label: "Charter Management", section: "Expertise", keywords: "management operate revenue owner aircraft operator" },
    { href: "/acquisition", label: "Acquisition", section: "Expertise", keywords: "buy your jet acquisition brokerage sale aircraft purchase" },
    { href: "/conciergerie", label: "Concierge", section: "Concierge", keywords: "concierge services bespoke assistance" },
    { href: "/conciergerie/chauffeur", label: "Private Chauffeur", section: "Concierge", keywords: "chauffeur car transfer electric limousine" },
    { href: "/conciergerie/gastronomie", label: "Gastronomy & Personalisation", section: "Concierge", keywords: "gastronomy meal menu catering personalisation cabin" },
    { href: "/conciergerie/animaux", label: "Your companions on board", section: "Concierge", keywords: "pets dog cat cabin animal companions" },
    { href: "/detente", label: "Relaxation & Wellness", section: "Concierge", keywords: "relaxation wellness spa rest" },
    { href: "/evenements", label: "Special Events", section: "Concierge", keywords: "event wedding honeymoon celebration party anniversary" },
    { href: "/gastronomie", label: "Gastronomy", section: "Experience", keywords: "gastronomy chef cuisine meal on board wine champagne" },
    { href: "/formules", label: "Memberships", section: "Leclercq'Jet", keywords: "memberships subscription programme card plan" },
    { href: "/meteo", label: "Weather", section: "Tools", keywords: "weather conditions forecast flight" },
    { href: "/actualites", label: "News", section: "Magazine", keywords: "news blog articles magazine journal" },
    { href: "/nos-engagements", label: "Our Commitments", section: "Leclercq'Jet", keywords: "commitments csr children india solidarity values purpose" },
    { href: "/contact", label: "Contact", section: "Leclercq'Jet", keywords: "contact phone email advisor address quote" },
  ],
};

const UI: Record<Lang, { placeholder: string; open: string; close: string; empty: string }> = {
  fr: { placeholder: "Rechercher une page…", open: "Rechercher", close: "Fermer la recherche", empty: "Aucun résultat" },
  en: { placeholder: "Search a page…", open: "Search", close: "Close search", empty: "No results" },
  zh: { placeholder: "搜索页面…", open: "搜索", close: "关闭搜索", empty: "无结果" },
  ar: { placeholder: "ابحث عن صفحة…", open: "بحث", close: "إغلاق البحث", empty: "لا نتائج" },
};

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function NavSearch() {
  const { lang } = useLanguage();
  const router = useRouter();
  const pages = INDEX[lang] ?? INDEX.fr!;
  const ui = UI[lang] ?? UI.fr;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return [];
    return pages
      .filter((p) => normalize(`${p.label} ${p.section} ${p.keywords}`).includes(term))
      .slice(0, 6);
  }, [query, pages]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      // Focus once the expand transition has begun.
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <div ref={wrapRef} className="nav-search">
      <div className={`nav-search__bar${open ? " is-open" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          className="nav-search__input"
          placeholder={ui.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKeyDown}
          aria-label={ui.placeholder}
          tabIndex={open ? 0 : -1}
        />
      </div>

      <button
        type="button"
        className="nav-search__toggle"
        aria-label={open ? ui.close : ui.open}
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        )}
      </button>

      {open && query.trim() && (
        <div className="nav-search__results" role="listbox">
          {results.length > 0 ? (
            results.map((p, i) => (
              <button
                key={p.href}
                type="button"
                role="option"
                aria-selected={i === active}
                className={`nav-search__item${i === active ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(p.href)}
              >
                <span className="nav-search__item-label">{p.label}</span>
                <span className="nav-search__item-sub">{p.section}</span>
              </button>
            ))
          ) : (
            <p className="nav-search__empty">{ui.empty}</p>
          )}
        </div>
      )}
    </div>
  );
}
