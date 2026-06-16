"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/lib/blog-data";

export default function BlogSection() {
  const { t, lang } = useLanguage();
  const b = t.home.actualites;
  const articles = blogArticles.slice(0, 3);

  return (
    <section className="bg-white section-pad px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="font-sans text-[13px] tracking-[0.2em] text-gold uppercase mb-4">
              {b.badge}
            </p>
            <h2 className="font-serif text-[32px] md:text-[44px] text-text-dark">{b.title}</h2>
          </div>
          <Link
            href="/actualites"
            className="font-sans text-[13px] tracking-[0.15em] uppercase border border-gray-200 text-gray-500 px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300 whitespace-nowrap self-start md:self-auto"
          >
            {b.viewAll} &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/actualites/${article.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[16/10] mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.img}
                    alt={lang === "en" ? article.titleEn : article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 font-sans text-[11px] tracking-[0.12em] uppercase px-3 py-1 text-text-dark/70">
                      {lang === "en" ? article.categoryEn : article.category}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-[14px] text-gold mb-2">{article.date}</p>
                  <h3 className="font-serif text-[20px] text-text-dark mb-3 leading-snug group-hover:text-navy transition-colors">
                    {lang === "en" ? article.titleEn : article.title}
                  </h3>
                  <p className="font-sans text-[16px] text-[#4A4A6A] leading-[1.7] line-clamp-2">
                    {lang === "en" ? article.excerptEn : article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
