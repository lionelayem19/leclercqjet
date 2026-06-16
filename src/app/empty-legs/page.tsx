"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import GrillePhoto from "@/components/ui/GrillePhoto";
import AirportInput from "@/components/ui/AirportInput";

const ALL_FLIGHTS = [
  {
    from: "Paris Le Bourget", fromCode: "LFPB",
    to: "Nice Côte d'Azur", toCode: "LFMN",
    date: "Demain", time: "09h00",
    aircraft: "Citation XLS", seats: 8, price: "4 500€",
    type: "lastMinute",
    zone: 9,
  },
  {
    from: "Paris Le Bourget", fromCode: "LFPB",
    to: "Londres Farnborough", toCode: "EGLF",
    date: "Dans 2 jours", time: "11h30",
    aircraft: "Phenom 300", seats: 6, price: "6 200€",
    type: "emptyLeg",
    zone: 10,
  },
  {
    from: "Genève", fromCode: "LSGG",
    to: "Ibiza", toCode: "LEIB",
    date: "Dans 3 jours", time: "14h00",
    aircraft: "Falcon 2000", seats: 10, price: "8 900€",
    type: "emptyLeg",
    zone: 11,
  },
  {
    from: "Monaco", fromCode: "LNMC",
    to: "Mykonos", toCode: "LGMK",
    date: "Dans 4 jours", time: "10h15",
    aircraft: "Hawker 800XP", seats: 8, price: "9 800€",
    type: "emptyLeg",
    zone: 12,
  },
  {
    from: "Dubaï", fromCode: "OMDB",
    to: "Paris Le Bourget", toCode: "LFPB",
    date: "Dans 5 jours", time: "08h00",
    aircraft: "Gulfstream G550", seats: 14, price: "38 000€",
    type: "emptyLeg",
    zone: 8,
  },
  {
    from: "Cannes", fromCode: "LFMD",
    to: "Zurich", toCode: "LSZH",
    date: "Dans 6 jours", time: "16h45",
    aircraft: "Learjet 45", seats: 7, price: "5 200€",
    type: "lastMinute",
    zone: 7,
  },
];

export default function EmptyLegsPage() {
  const { t } = useLanguage();
  const el = t.emptyLegs;

  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const filtered = ALL_FLIGHTS.filter((f) => {
    if (filterFrom && !f.from.toLowerCase().includes(filterFrom.toLowerCase())) return false;
    if (filterTo && !f.to.toLowerCase().includes(filterTo.toLowerCase())) return false;
    if (filterType && f.type !== filterType) return false;
    return true;
  });

  const labelClass = "block font-sans text-[10px] tracking-[0.15em] text-gray-400 uppercase mb-1.5";
  const inputClass = "w-full border-b border-gray-200 text-text-dark placeholder:text-gray-300 py-2 font-sans text-[13px] focus:border-navy transition-colors bg-transparent";

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/empty-legs.png"
            alt="Empty legs"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.45)" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-4">
              {el.hero.badge}
            </p>
            <h1 className="font-serif text-[36px] md:text-[56px] text-white leading-tight mb-5">
              {el.hero.title}
            </h1>
            <p className="font-sans text-[18px] text-white/50 max-w-lg mx-auto leading-relaxed">
              {el.hero.subtitle}
            </p>
            <p
              className="font-sans mx-auto mt-3"
              style={{ fontSize: "14px", color: "#C0C8D4", fontStyle: "italic", maxWidth: "480px" }}
            >
              Vols à vide — des opportunités d&apos;exception à tarif préférentiel
            </p>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="sticky top-0 z-30 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className={labelClass}>{el.filters.from}</label>
              <AirportInput value={filterFrom} onChange={setFilterFrom} placeholder="Paris..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{el.filters.to}</label>
              <AirportInput value={filterTo} onChange={setFilterTo} placeholder="Nice..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{el.filters.date}</label>
              <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className={inputClass + " text-gray-500"} />
            </div>
            <div>
              <label className={labelClass}>{el.filters.type}</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={inputClass + " text-gray-600"}>
                <option value="">Tous</option>
                <option value="emptyLeg">Empty Leg</option>
                <option value="lastMinute">{el.badges.lastMinute}</option>
              </select>
            </div>
            <button
              onClick={() => { setFilterFrom(""); setFilterTo(""); setFilterDate(""); setFilterType(""); }}
              className="font-sans text-[11px] tracking-[0.12em] text-gray-400 hover:text-gold transition-colors py-2"
            >
              {el.filters.reset}
            </button>
          </div>
        </section>

        {/* Grid */}
        <section className="py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="font-sans text-[12px] text-gray-400 mb-8">
              {el.count(filtered.length)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((flight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white border border-gray-100 hover:border-gold/40 hover:shadow-card-hover transition-all duration-300 group overflow-hidden shadow-card"
                >
                  <div className="relative h-44 overflow-hidden">
                    <GrillePhoto
                      zone={flight.zone}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`font-sans text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 ${
                        flight.type === "lastMinute"
                          ? "bg-red-600 text-white"
                          : "bg-white/90 text-gray-600"
                      }`}>
                        {flight.type === "lastMinute" ? el.badges.lastMinute : el.badges.emptyLeg}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1">
                        <p className="font-serif text-[18px] text-text-dark leading-tight">{flight.from}</p>
                        <p className="font-sans text-[10px] text-gray-400 tracking-widest">{flight.fromCode}</p>
                      </div>
                      <svg className="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      <div className="flex-1 text-right">
                        <p className="font-serif text-[18px] text-text-dark leading-tight">{flight.to}</p>
                        <p className="font-sans text-[10px] text-gray-400 tracking-widest">{flight.toCode}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-4">
                      <span className="font-sans text-[12px] text-gray-400">{flight.date} · {flight.time}</span>
                      <span className="font-sans text-[12px] text-gray-500 text-right">{flight.aircraft}</span>
                      <span className="font-sans text-[12px] text-gray-400">{flight.seats} pax</span>
                      <span className="font-serif text-[20px] text-gold text-right leading-none">{flight.price}</span>
                    </div>

                    {/* FBO badge */}
                    <p className="font-sans text-[11px] tracking-[0.12em] text-gold/70 mb-4">
                      {el.fbo}
                    </p>

                    <a
                      href="/vols-prives"
                      className="block w-full text-center bg-navy text-white font-sans text-[11px] tracking-[0.18em] uppercase py-3 hover:bg-navy-card transition-colors"
                    >
                      {el.cardCta}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-sans text-[14px] text-gray-400">Aucun vol ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </section>

        {/* Alert section */}
        <section className="py-14 px-6 bg-navy">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-sans text-[13px] tracking-[0.2em] text-gold uppercase mb-4">{el.alert.title}</p>
            <p className="font-sans text-[16px] text-white/60 mb-8">{el.alert.subtitle}</p>
            <form className="flex gap-0 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={el.alert.placeholder}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 font-sans text-[13px] focus:border-gold transition-colors outline-none"
              />
              <button
                type="submit"
                className="bg-gold text-navy font-sans text-[11px] tracking-[0.18em] uppercase px-6 py-3 hover:bg-[#b8934a] transition-colors whitespace-nowrap"
              >
                {el.alert.cta}
              </button>
            </form>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
