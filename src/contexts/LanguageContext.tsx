"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "@/lib/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.fr;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("lj-lang") as Lang | null;
    if (saved === "fr" || saved === "en" || saved === "zh" || saved === "ar") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lj-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations.fr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
