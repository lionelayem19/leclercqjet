"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GOLD = "#C9A96E";

type City = { name: string; tz: string; flag: string };

// Paris en premier : sert de référence pour le décalage horaire
const CITIES: City[] = [
  { name: "Paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { name: "Londres", tz: "Europe/London", flag: "🇬🇧" },
  { name: "Genève", tz: "Europe/Zurich", flag: "🇨🇭" },
  { name: "Casablanca", tz: "Africa/Casablanca", flag: "🇲🇦" },
  { name: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { name: "Toronto", tz: "America/Toronto", flag: "🇨🇦" },
  { name: "Los Angeles", tz: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "Dubaï", tz: "Asia/Dubai", flag: "🇦🇪" },
  { name: "Mumbai", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
];

const PARIS_TZ = "Europe/Paris";

/** Décalage en minutes entre un fuseau et l'UTC, pour un instant donné (gère l'heure d'été). */
function offsetMinutes(date: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = dtf.formatToParts(date).reduce<Record<string, number>>((acc, p) => {
    if (p.type !== "literal") acc[p.type] = Number(p.value);
    return acc;
  }, {});
  const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour === 24 ? 0 : parts.hour, parts.minute, parts.second);
  return Math.round((asUTC - date.getTime()) / 60000);
}

function formatOffset(date: Date, tz: string): string {
  const diff = offsetMinutes(date, tz) - offsetMinutes(date, PARIS_TZ);
  if (diff === 0) return "Heure de référence";
  const sign = diff > 0 ? "+" : "−";
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `Paris ${sign}${h}h${m ? String(m).padStart(2, "0") : ""}`;
}

function cityTime(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: tz, hour12: false,
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(date).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== "literal") acc[p.type] = p.value;
    return acc;
  }, {});
  const dateLabel = new Intl.DateTimeFormat("fr-FR", {
    timeZone: tz, weekday: "short", day: "2-digit", month: "short",
  }).format(date);
  return { hm: `${parts.hour}:${parts.minute}`, ss: parts.second, dateLabel };
}

export default function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-6 pt-4 pb-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(201,169,110,0.4)" }} />
          <p className="font-sans uppercase" style={{ fontSize: "11px", letterSpacing: "0.3em", color: GOLD }}>
            Fuseaux horaires
          </p>
          <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(201,169,110,0.4)" }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES.map((city, i) => {
            const isParis = city.tz === PARIS_TZ;
            const time = now ? cityTime(now, city.tz) : null;
            const offset = now ? formatOffset(now, city.tz) : "";
            return (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="relative overflow-hidden"
                style={{
                  backgroundColor: isParis ? "#0F2138" : "#0D1E35",
                  border: `1px solid ${isParis ? "rgba(201,169,110,0.45)" : "rgba(201,169,110,0.18)"}`,
                  padding: "22px 20px",
                }}
              >
                {isParis && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #a8874a, #C9A96E)" }} />
                )}

                {/* City + flag */}
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>{city.flag}</span>
                  <span className="font-serif text-white" style={{ fontSize: "16px", lineHeight: 1.1 }}>{city.name}</span>
                </div>

                {/* Live time */}
                <div className="flex items-baseline gap-1.5" style={{ minHeight: "40px" }}>
                  <span className="font-serif" style={{ fontSize: "38px", color: "#F5F0E8", lineHeight: 1, letterSpacing: "0.01em", fontVariantNumeric: "tabular-nums" }}>
                    {time ? time.hm : "—:—"}
                  </span>
                  <span className="font-sans" style={{ fontSize: "13px", color: GOLD, fontVariantNumeric: "tabular-nums", minWidth: "18px" }}>
                    {time ? time.ss : "··"}
                  </span>
                </div>

                {/* Date */}
                <p className="font-sans capitalize mt-2" style={{ fontSize: "11px", color: "rgba(232,237,242,0.4)", letterSpacing: "0.04em" }}>
                  {time ? time.dateLabel : " "}
                </p>

                {/* Offset vs Paris */}
                <div className="mt-3" style={{ borderTop: "1px solid rgba(201,169,110,0.12)", paddingTop: "10px" }}>
                  <span className="font-sans uppercase" style={{ fontSize: "9px", letterSpacing: "0.12em", color: isParis ? GOLD : "rgba(201,169,110,0.65)" }}>
                    {offset || " "}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
