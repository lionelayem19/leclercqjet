"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/lib/blog-data";
import GrillePhoto from "@/components/ui/GrillePhoto";

export default function ActualitesPage() {
  const { t, lang } = useLanguage();
  const a = t.actualites;

  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = activeCategory === "Tous"
    ? blogArticles
    : blogArticles.filter((article) =>
        (lang === "en" ? article.categoryEn : article.category) === activeCategory
      );

  const [featured, ...rest] = filtered;

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-navy pt-36 pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-4">
              {a.hero.badge}
            </p>
            <h1 className="font-serif text-[36px] md:text-[56px] text-white mb-4 leading-tight">
              {a.hero.title}
            </h1>
            <p className="font-sans text-[18px] text-white/50 max-w-lg mx-auto leading-relaxed">
              {a.hero.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Categories */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 py-4 px-6">
          <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto scrollbar-none">
            {a.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap font-sans text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-navy text-white"
                    : "text-gray-500 hover:text-navy border border-gray-200 hover:border-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured article */}
        {featured && (
          <section className="py-14 px-6 border-b border-gray-100">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Link
                  href={`/actualites/${featured.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-gray-100 shadow-card hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                >
                  <GrillePhoto
                    zone={featured.imgZone}
                    className="relative h-64 md:h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold border border-gold/30 px-3 py-1">
                        {lang === "en" ? featured.categoryEn : featured.category}
                      </span>
                      <span className="font-sans text-[11px] text-gray-400">{featured.date}</span>
                      <span className="font-sans text-[11px] text-gray-400">
                        {featured.readTime} {a.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-[26px] md:text-[32px] text-text-dark leading-tight mb-4 group-hover:text-navy transition-colors">
                      {lang === "en" ? featured.titleEn : featured.title}
                    </h2>
                    <p className="font-sans text-[14px] text-gray-500 leading-relaxed mb-6">
                      {lang === "en" ? featured.excerptEn : featured.excerpt}
                    </p>
                    <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
                      {a.readMore} &rarr;
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Article grid */}
        <section className="py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="group flex flex-col bg-white border border-gray-100 shadow-card hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full"
                  >
                    <GrillePhoto
                      zone={article.imgZone}
                      className="h-48 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold">
                          {lang === "en" ? article.categoryEn : article.category}
                        </span>
                        <span className="font-sans text-[11px] text-gray-300">·</span>
                        <span className="font-sans text-[11px] text-gray-400">{article.date}</span>
                      </div>
                      <h3 className="font-serif text-[20px] text-text-dark leading-tight mb-3 group-hover:text-navy transition-colors flex-1">
                        {lang === "en" ? article.titleEn : article.title}
                      </h3>
                      <p className="font-sans text-[13px] text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {lang === "en" ? article.excerptEn : article.excerpt}
                      </p>
                      <p className="font-sans text-[11px] tracking-[0.15em] text-gold uppercase mt-auto">
                        {article.readTime} {a.readTime}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
