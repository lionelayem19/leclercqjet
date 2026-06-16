"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-6">
            Erreur 404
          </p>
          <h1 className="font-serif text-[72px] md:text-[96px] text-text-dark leading-none mb-6">
            Page introuvable.
          </h1>
          <p className="font-sans text-[15px] text-gray-400 mb-10 leading-relaxed">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase bg-navy text-white px-8 py-4 hover:bg-navy-card transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
