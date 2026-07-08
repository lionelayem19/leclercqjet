"use client";

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import WaitlistModal from "@/components/ui/WaitlistModal";
import JetBot from "@/components/ui/JetBot";
import CustomCursor from "@/components/ui/CustomCursor";
import RouteProgress from "@/components/ui/RouteProgress";

function LangDirectionSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ModalProvider>
        <LangDirectionSync />
        <RouteProgress />
        {children}
        <WaitlistModal />
        <JetBot />
        <CustomCursor />
      </ModalProvider>
    </LanguageProvider>
  );
}
