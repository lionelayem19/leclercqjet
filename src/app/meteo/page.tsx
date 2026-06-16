import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Météo",
  description: "Conditions météo en temps réel pour les destinations LECLERCQ'JET — bientôt disponible.",
};

export default function MeteoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A1628",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 600,
          color: "#C9A96E",
          margin: 0,
        }}
      >
        Météo — Bientôt disponible
      </h1>
    </main>
  );
}
