"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/lib/blog-data";
import GrillePhoto from "@/components/ui/GrillePhoto";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-serif text-[26px] text-text-dark mt-10 mb-4 leading-tight">
          {line.slice(3)}
        </h2>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsed = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} className="font-semibold text-text-dark">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={i} className="font-sans text-[15px] text-gray-600 leading-[1.85] mb-4">
          {parsed}
        </p>
      );
    }

    i++;
  }

  return elements;
}

export default function ActualiteArticlePage({ params }: { params: { slug: string } }) {
  const { t, lang } = useLanguage();
  const a = t.actualites;
  const article = blogArticles.find((art) => art.slug === params.slug);

  if (!article) notFound();

  const title = lang === "en" ? article.titleEn : article.title;
  const category = lang === "en" ? article.categoryEn : article.category;
  const content = lang === "en" ? article.contentEn : article.content;
  const otherArticles = blogArticles.filter((art) => art.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-navy pt-36 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold border border-gold/30 px-3 py-1">
                  {category}
                </span>
                <span className="font-sans text-[12px] text-white/30">{article.date}</span>
                <span className="font-sans text-[12px] text-white/30">
                  {article.readTime} {a.readTime}
                </span>
              </div>
              <h1 className="font-serif text-[36px] md:text-[56px] text-white leading-tight">
                {title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Cover image */}
        <GrillePhoto zone={article.imgZone} className="w-full h-72 md:h-96" />

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {renderContent(content)}
            </motion.div>

            <div className="mt-14 pt-8 border-t border-gray-100">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.15em] text-gray-400 hover:text-gold transition-colors uppercase"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {a.back}
              </Link>
            </div>
          </div>
        </section>

        {/* Related articles */}
        <section className="py-14 px-6 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-[11px] tracking-[0.25em] text-gold uppercase mb-8">
              {a.alsoRead}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((other, i) => (
                <motion.div
                  key={other.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={`/actualites/${other.slug}`}
                    className="group flex flex-col bg-white border border-gray-100 shadow-card hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                  >
                    <GrillePhoto
                      zone={other.imgZone}
                      className="h-40 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <p className="font-sans text-[10px] tracking-[0.15em] text-gold uppercase mb-2">
                        {lang === "en" ? other.categoryEn : other.category}
                      </p>
                      <h3 className="font-serif text-[17px] text-text-dark leading-tight group-hover:text-navy transition-colors">
                        {lang === "en" ? other.titleEn : other.title}
                      </h3>
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
