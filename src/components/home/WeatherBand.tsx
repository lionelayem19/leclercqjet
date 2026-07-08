"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CITIES = [
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "Londres", country: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "Nice", country: "France", lat: 43.7102, lon: 7.262 },
  { name: "Genève", country: "Suisse", lat: 46.2044, lon: 6.1432 },
  { name: "Monaco", country: "Monaco", lat: 43.7384, lon: 7.4246 },
  { name: "Dubaï", country: "EAU", lat: 25.2048, lon: 55.2708 },
  { name: "Marrakech", country: "Maroc", lat: 31.6295, lon: -7.9811 },
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  { name: "Tokyo", country: "Japon", lat: 35.6762, lon: 139.6503 },
  { name: "Mumbai", country: "Inde", lat: 19.076, lon: 72.8777 },
];

const GOLD = "#C9A96E";

/* ─── Gold outline weather icons (replace emojis) ─── */
/* ─── Single source of truth: Open-Meteo weather code → condition key ─── */
type Condition = "sun" | "partly" | "cloud" | "fog" | "rain" | "snow" | "storm";

function conditionFor(code: number): Condition {
  if (code === 0) return "sun";              // Clear sky
  if (code === 1 || code === 2) return "partly"; // Mainly clear / partly cloudy
  if (code === 3) return "cloud";            // Overcast
  if (code >= 45 && code <= 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";   // Drizzle + rain
  if (code >= 71 && code <= 77) return "snow";   // Snowfall + grains
  if (code >= 80 && code <= 82) return "rain";   // Rain showers
  if (code >= 85 && code <= 86) return "snow";   // Snow showers
  return "storm";                            // 95–99 thunderstorm
}

function WeatherIcon({ code, size = 30 }: { code: number; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (conditionFor(code)) {
    // ☀ Sun alone — core + 8 rays, no cloud
    case "sun":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.5 4.5l1.9 1.9M17.6 17.6l1.9 1.9M4.5 19.5l1.9-1.9M17.6 6.4l1.9-1.9" />
        </svg>
      );

    // ⛅ Partly cloudy — sun peeking top-left behind a cloud bottom-right
    case "partly":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="8" cy="7.5" r="3" />
          <path d="M8 1.8v1.6M2.3 7.5h1.6M3.9 3.4l1.1 1.1M12.1 3.4l-1.1 1.1M3.9 11.6l1.1-1.1" />
          <path d="M18 21a3.6 3.6 0 0 0 0-7.2 5 5 0 0 0-9.5 1.3A3 3 0 0 0 9 21z" />
        </svg>
      );

    // ☁ Cloud alone — no sun
    case "cloud":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17.5 18.5a4 4 0 0 0 0-8 5.3 5.3 0 0 0-10.2 1.4A3.4 3.4 0 0 0 7.8 18.5z" />
        </svg>
      );

    // 🌫 Fog — cloud + horizontal mist lines
    case "fog":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17.5 14a3.6 3.6 0 0 0 0-7.2A4.9 4.9 0 0 0 8 8.2 3.1 3.1 0 0 0 8.4 14z" />
          <path d="M4 17.5h16M6.5 20.5h11" />
        </svg>
      );

    // 🌧 Rain — cloud + falling drops
    case "rain":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17.5 15a3.6 3.6 0 0 0 0-7.2A4.9 4.9 0 0 0 8 9.2 3.1 3.1 0 0 0 8.4 15z" />
          <path d="M8.5 18l-1.2 2.8M12.5 18l-1.2 2.8M16.5 18l-1.2 2.8" />
        </svg>
      );

    // ❄ Snow — cloud + snowflakes
    case "snow":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17.5 14a3.6 3.6 0 0 0 0-7.2A4.9 4.9 0 0 0 8 8.2 3.1 3.1 0 0 0 8.4 14z" />
          <path d="M9 18.2v2.4M7.9 18.8l2.2 1.2M7.9 20l2.2-1.2M14.4 18.2v2.4M13.3 18.8l2.2 1.2M13.3 20l2.2-1.2" />
        </svg>
      );

    // ⛈ Storm — cloud + lightning bolt
    case "storm":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17.5 13a3.6 3.6 0 0 0 0-7.2A4.9 4.9 0 0 0 8 7.2 3.1 3.1 0 0 0 8.4 13z" />
          <path d="M13 13l-3.2 4.6h2.7L11 22l4-5h-2.6z" fill={GOLD} stroke="none" />
        </svg>
      );
  }
}

/* Small footer metric icons (gold outline) */
function WindIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 12h15.5a2.5 2.5 0 1 1-2.5 2.5M3 16h9a2.5 2.5 0 1 1-2.5 2.5" />
    </svg>
  );
}
function DropIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5C12 2.5 5.5 9.5 5.5 14a6.5 6.5 0 0 0 13 0c0-4.5-6.5-11.5-6.5-11.5z" />
    </svg>
  );
}

function weatherLabel(code: number, lang: string): string {
  const labels: Record<string, Record<Condition, string>> = {
    fr: { sun: "Ensoleillé", partly: "Éclaircies", cloud: "Nuageux", fog: "Brumeux", rain: "Pluvieux", snow: "Neige", storm: "Orageux" },
    en: { sun: "Sunny", partly: "Partly cloudy", cloud: "Cloudy", fog: "Foggy", rain: "Rainy", snow: "Snow", storm: "Stormy" },
    zh: { sun: "晴天", partly: "局部多云", cloud: "多云", fog: "雾", rain: "雨", snow: "雪", storm: "雷暴" },
    ar: { sun: "مشمس", partly: "غائم جزئياً", cloud: "غائم", fog: "ضبابي", rain: "ممطر", snow: "ثلج", storm: "عاصفة" },
  };
  const l = labels[lang] || labels.fr;
  return l[conditionFor(code)];
}

interface CityWeather { name: string; country: string; temp: number; windspeed: number; humidity: number; code: number; }

const HEADINGS: Record<string, { badge: string; title: string; subtitle: string; wind: string; updated: string; source: string }> = {
  fr: { badge: "MÉTÉO", title: "Conditions de vol", subtitle: "Météo en temps réel sur nos principales destinations", wind: "Vent", updated: "Actualisé à", source: "Données en temps réel · Open-Meteo" },
  en: { badge: "WEATHER", title: "Flight conditions", subtitle: "Real-time weather on our main destinations", wind: "Wind", updated: "Updated at", source: "Real-time data · Open-Meteo" },
  zh: { badge: "天气", title: "飞行条件", subtitle: "我们主要目的地的实时天气", wind: "风速", updated: "更新于", source: "实时数据 · Open-Meteo" },
  ar: { badge: "الطقس", title: "أحوال الطيران", subtitle: "الطقس الآني لوجهاتنا الرئيسية", wind: "رياح", updated: "محدَّث في", source: "بيانات آنية · Open-Meteo" },
};

/* Deterministic star field (no Math.random → SSR-safe). Opacity handled by CSS twinkle (0.3–0.9). */
const STARS = Array.from({ length: 44 }, (_, i) => ({
  top: (i * 37 + 7) % 100,
  left: (i * 53 + 11) % 100,
  size: 1 + (i % 3),
  dur: 2.6 + (i % 5) * 0.7,
  delay: (i % 7) * 0.45,
}));

export default function WeatherBand() {
  const { lang } = useLanguage();
  const h = HEADINGS[lang] || HEADINGS.fr;
  const [data, setData] = useState<CityWeather[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchAll = async () => {
    const results = await Promise.allSettled(
      CITIES.map((c) =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m`)
          .then((r) => r.json())
      )
    );
    const parsed: CityWeather[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled" && r.value?.current) {
        const w = r.value.current;
        parsed.push({
          name: CITIES[i].name,
          country: CITIES[i].country,
          temp: Math.round(w.temperature_2m ?? w.temperature ?? 0),
          windspeed: Math.round(w.windspeed_10m ?? w.windspeed ?? 0),
          humidity: Math.round(w.relative_humidity_2m ?? 0),
          code: w.weathercode ?? 0,
        });
      } else {
        parsed.push({ name: CITIES[i].name, country: CITIES[i].country, temp: 0, windspeed: 0, humidity: 0, code: -1 });
      }
    });
    if (parsed.some((p) => p.code !== -1)) setData(parsed);
    const now = new Date();
    setLastUpdate(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0A1628",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "8%",
        paddingRight: "8%",
        borderTop: "1px solid rgba(201,169,110,0.12)",
      }}
    >
      {/* Twinkling star field */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wx-star"
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {h.badge}
              </p>
              <h2 className="section-title font-serif" style={{ color: "#f8f5f0" }}>
                {h.title}
              </h2>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(17px, 1.6vw, 20px)",
                  lineHeight: 1.7,
                  color: "rgba(232,237,242,0.5)",
                }}
              >
                {h.subtitle}
              </p>
            </div>
            {lastUpdate && (
              <p
                className="font-sans"
                style={{ fontSize: "11px", color: "rgba(201,169,110,0.5)", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "7px" }}
              >
                <span
                  className="wx-live-dot"
                  style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#5DCAA5" }}
                  aria-hidden="true"
                />
                {h.updated} {lastUpdate}
              </p>
            )}
          </div>
        </div>

        {/* Grid */}
        {data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {data.map((city, i) => (
              <div key={city.name} className="wx-card-in" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <div
                  className="wx-card px-4 py-5 md:px-[22px] md:py-6"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="flex items-start justify-between" style={{ marginBottom: "18px" }}>
                    <div>
                      <p className="font-sans uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#C9A96E" }}>
                        {city.name}
                      </p>
                      {/* Gold underline */}
                      <div style={{ width: "24px", height: "1px", backgroundColor: "#C9A96E", marginTop: "6px", marginBottom: "6px" }} />
                      <p className="font-sans" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "rgba(201,169,110,0.4)" }}>
                        {city.country}
                      </p>
                    </div>
                    <span style={{ lineHeight: 1 }}>
                      {city.code === -1 ? (
                        <span style={{ fontSize: "22px", color: "rgba(201,169,110,0.4)" }}>—</span>
                      ) : (
                        <WeatherIcon code={city.code} size={32} />
                      )}
                    </span>
                  </div>

                  {/* Focal temperature */}
                  <p className="font-serif" style={{ fontSize: "clamp(32px, 8vw, 46px)", fontWeight: 500, color: "#FFFFFF", lineHeight: 1, marginBottom: "6px" }}>
                    {city.code === -1 ? "—" : (
                      <>
                        {city.temp}
                        <span style={{ color: "#C9A96E" }}>°</span>
                      </>
                    )}
                  </p>

                  <p className="font-sans" style={{ fontSize: "11px", letterSpacing: "0.04em", color: "rgba(232,237,242,0.55)" }}>
                    {city.code === -1 ? "—" : weatherLabel(city.code, lang)}
                  </p>

                  {/* Enriched footer — wind + humidity, divided by a thin rule */}
                  {city.code !== -1 && (
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span className="font-sans" style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "rgba(232,237,242,0.65)" }}>
                        <WindIcon /> {city.windspeed} km/h
                      </span>
                      <span className="font-sans" style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "rgba(232,237,242,0.65)" }}>
                        <DropIcon /> {city.humidity}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="font-sans text-center mt-6" style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
          {h.source}
        </p>
      </div>
    </section>
  );
}
