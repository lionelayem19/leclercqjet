"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/lib/blog-data";

const ARTICLE_IMAGES = [
  "/images/acquisition.png",
  "/images/empty-legs.png",
  "/images/cabine.png",
];

const READ_MORE: Record<string, string> = {
  fr: "Lire la suite",
  en: "Read more",
  zh: "阅读更多",
  ar: "اقرأ المزيد",
};

export default function ActualitesSection() {
  const { t, lang } = useLanguage();
  const a = t.home.actualites;
  const articles = blogArticles.slice(0, 3);
  const readMore = READ_MORE[lang] || READ_MORE.fr;

  return (
    <section className="bg-white px-6" style={{ paddingTop: "60px", paddingBottom: "60px", borderTop: "1px solid rgba(201,169,110,0.2)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="font-sans uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
              {a.badge}
            </p>
            <h2 className="font-serif" style={{ fontSize: "40px", color: "#0A1628" }}>{a.title}</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="article-card"
              style={{ border: "1px solid #E8EDF2", overflow: "hidden" }}
            >
              <Link href={`/actualites/${article.slug}`} className="group block">
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ARTICLE_IMAGES[i]}
                    alt={lang === "en" ? article.titleEn : article.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-sans uppercase px-3 py-1" style={{ backgroundColor: "#0A1628", fontSize: "9px", letterSpacing: "0.18em", color: "#C9A96E" }}>
                      {lang === "en" ? article.categoryEn : article.category}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div style={{ padding: "20px 24px 24px" }}>
                  <p className="font-sans mb-3" style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#C9A96E" }}>
                    {article.date}
                  </p>
                  <h3 className="font-sans font-semibold mb-3 leading-snug" style={{ fontSize: "16px", color: "#0A1628", lineHeight: "1.45" }}>
                    {lang === "en" ? article.titleEn : article.title}
                  </h3>
                  <p className="font-sans line-clamp-2 mb-4" style={{ fontSize: "13px", color: "#777777", lineHeight: "1.75" }}>
                    {lang === "en" ? article.excerptEn : article.excerpt}
                  </p>
                  <span className="font-sans transition-colors duration-200 group-hover:text-gold" style={{ fontSize: "11px", color: "#C9A96E", letterSpacing: "0.08em" }}>
                    {readMore} →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/actualites"
            className="inline-block font-sans uppercase transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy"
            style={{ fontSize: "11px", letterSpacing: "0.22em", border: "1px solid #0A1628", color: "#0A1628", padding: "13px 36px" }}
          >
            {a.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
