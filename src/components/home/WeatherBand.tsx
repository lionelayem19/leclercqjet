"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  { name: "Singapour", country: "Singapour", lat: 1.3521, lon: 103.8198 },
];

function weatherEmoji(code: number): string {
  if (code === 0) return "☀";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄";
  if (code <= 82) return "🌦";
  return "⛈";
}

function weatherLabel(code: number, lang: string): string {
  const labels: Record<string, string[]> = {
    fr: ["Ensoleillé", "Nuageux", "Brumeux", "Pluvieux", "Neige", "Averses", "Orageux"],
    en: ["Sunny", "Cloudy", "Foggy", "Rainy", "Snow", "Showers", "Stormy"],
    zh: ["晴天", "多云", "雾", "雨", "雪", "阵雨", "雷暴"],
    ar: ["مشمس", "غائم", "ضبابي", "ممطر", "ثلج", "زخات", "عاصفة"],
  };
  const l = labels[lang] || labels.fr;
  if (code === 0) return l[0];
  if (code <= 3) return l[1];
  if (code <= 48) return l[2];
  if (code <= 67) return l[3];
  if (code <= 77) return l[4];
  if (code <= 82) return l[5];
  return l[6];
}

interface CityWeather { name: string; country: string; temp: number; windspeed: number; code: number; emoji: string; }

const HEADINGS: Record<string, { badge: string; title: string; subtitle: string; wind: string; updated: string; source: string }> = {
  fr: { badge: "MÉTÉO", title: "Conditions de vol", subtitle: "Météo en temps réel sur nos principales destinations", wind: "Vent", updated: "Actualisé à", source: "Données en temps réel · Open-Meteo" },
  en: { badge: "WEATHER", title: "Flight conditions", subtitle: "Real-time weather on our main destinations", wind: "Wind", updated: "Updated at", source: "Real-time data · Open-Meteo" },
  zh: { badge: "天气", title: "飞行条件", subtitle: "我们主要目的地的实时天气", wind: "风速", updated: "更新于", source: "实时数据 · Open-Meteo" },
  ar: { badge: "الطقس", title: "أحوال الطيران", subtitle: "الطقس الآني لوجهاتنا الرئيسية", wind: "رياح", updated: "محدَّث في", source: "بيانات آنية · Open-Meteo" },
};

export default function WeatherBand() {
  const { lang } = useLanguage();
  const h = HEADINGS[lang] || HEADINGS.fr;
  const [data, setData] = useState<CityWeather[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchAll = async () => {
    const results = await Promise.allSettled(
      CITIES.map((c) =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weathercode,windspeed_10m`)
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
          code: w.weathercode ?? 0,
          emoji: weatherEmoji(w.weathercode ?? 0),
        });
      } else {
        parsed.push({ name: CITIES[i].name, country: CITIES[i].country, temp: 0, windspeed: 0, code: -1, emoji: "—" });
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
        backgroundColor: "#0A1628",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "8%",
        paddingRight: "8%",
        borderTop: "1px solid rgba(201,169,110,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-sans uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#C9A96E" }}>
                {h.badge}
              </p>
              <h2 className="font-serif" style={{ fontSize: "38px", color: "#FFFFFF" }}>
                {h.title}
              </h2>
              <p className="font-sans mt-2" style={{ fontSize: "14px", color: "rgba(232,237,242,0.5)" }}>
                {h.subtitle}
              </p>
            </div>
            {lastUpdate && (
              <p className="font-sans" style={{ fontSize: "11px", color: "rgba(201,169,110,0.5)", letterSpacing: "0.08em" }}>
                {h.updated} {lastUpdate}
              </p>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        {data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {data.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="card-lift-dark"
                style={{
                  backgroundColor: "#0D1E35",
                  border: "1px solid rgba(201,169,110,0.15)",
                  padding: "20px",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-sans uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#C9A96E" }}>
                      {city.name}
                    </p>
                    <p className="font-sans mt-0.5" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "rgba(201,169,110,0.4)" }}>
                      {city.country}
                    </p>
                  </div>
                  <span style={{ fontSize: "22px", lineHeight: 1 }}>{city.emoji}</span>
                </div>

                <p className="font-serif" style={{ fontSize: "36px", color: "#FFFFFF", lineHeight: 1, marginBottom: "4px" }}>
                  {city.code === -1 ? "—" : `${city.temp}°`}
                </p>

                <p className="font-sans" style={{ fontSize: "11px", color: "rgba(232,237,242,0.4)" }}>
                  {city.code === -1 ? "—" : weatherLabel(city.code, lang)}
                </p>

                {city.code !== -1 && (
                  <p className="font-sans mt-2" style={{ fontSize: "10px", color: "#888888" }}>
                    {h.wind} {city.windspeed} km/h
                  </p>
                )}
              </motion.div>
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
