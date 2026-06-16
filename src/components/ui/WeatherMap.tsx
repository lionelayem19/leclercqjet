"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface CityWeatherWithCoords {
  name: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  windspeed: number;
  code: number;
  emoji: string;
  label: string;
  windLabel: string;
}

interface WeatherMapProps {
  cities: CityWeatherWithCoords[];
  windLabel: string;
}

const POPUP_STYLE = `
  .leaflet-popup-content-wrapper {
    background: #0D1E35 !important;
    border: 1px solid rgba(201,169,110,0.3) !important;
    border-radius: 0 !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    color: #E8EDF2 !important;
  }
  .leaflet-popup-tip {
    background: #0D1E35 !important;
  }
  .leaflet-popup-content {
    margin: 14px 18px !important;
    font-family: 'Inter', sans-serif !important;
  }
`;

export default function WeatherMap({ cities, windLabel }: WeatherMapProps) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = POPUP_STYLE;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <MapContainer
      center={[30, 15]}
      zoom={2}
      style={{ height: "520px", width: "100%", background: "#060e1a" }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      {cities.map((city) => (
        <CircleMarker
          key={city.name}
          center={[city.lat, city.lon]}
          radius={city.code === -1 ? 5 : 7}
          pathOptions={{
            fillColor: "#C9A96E",
            fillOpacity: 0.85,
            color: "rgba(201,169,110,0.4)",
            weight: 1,
          }}
        >
          <Popup>
            <div style={{ minWidth: "140px" }}>
              <p style={{ fontSize: "14px", fontFamily: "Georgia, serif", color: "#FFFFFF", marginBottom: "2px" }}>
                {city.name}
              </p>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(201,169,110,0.6)", marginBottom: "10px" }}>
                {city.country}
              </p>
              {city.code !== -1 ? (
                <>
                  <p style={{ fontSize: "28px", fontFamily: "Georgia, serif", color: "#E8EDF2", lineHeight: 1, marginBottom: "4px" }}>
                    {city.temp}°
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(232,237,242,0.55)", marginBottom: "6px" }}>
                    {city.emoji} {city.label}
                  </p>
                  <p style={{ fontSize: "10px", color: "rgba(201,169,110,0.5)" }}>
                    {windLabel} {city.windspeed} km/h
                  </p>
                </>
              ) : (
                <p style={{ fontSize: "11px", color: "rgba(232,237,242,0.4)" }}>—</p>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
