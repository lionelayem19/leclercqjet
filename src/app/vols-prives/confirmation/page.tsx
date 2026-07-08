"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ConfirmationPage() {
  const { t } = useLanguage();
  const conf = t.volsPrives.confirmation;

  return (
    <>
      <Navbar />
      <main className="bg-navy min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-md"
        >
          {/* Animated check */}
          <div className="w-20 h-20 border border-gold/40 flex items-center justify-center mx-auto mb-10">
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-8 h-8 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </div>

          <h1 className="font-serif text-[42px] md:text-[52px] text-white leading-tight mb-4">
            {conf.title}
          </h1>
          <p className="font-sans text-[16px] text-white/50 mb-10 leading-relaxed">
            {conf.subtitle}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Link
              href="/"
              className="font-sans text-[12px] tracking-[0.2em] uppercase bg-gold text-navy px-8 py-3.5 hover:bg-[#a8874a] transition-colors font-semibold"
            >
              {conf.back}
            </Link>
            <a
              href="mailto:contact@leclercqjetinternational.com"
              className="font-sans text-[12px] text-gray-400 hover:text-gold transition-colors"
            >
              contact@leclercqjetinternational.com
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
