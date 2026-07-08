import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, Bebas_Neue, Libre_Baskerville, Marcellus } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LECLERCQ'JET INTERNATIONAL — Courtage Jet Privé Paris",
    template: "%s — LECLERCQ'JET INTERNATIONAL",
  },
  description:
    "Broker en aviation privée depuis Paris. Vols privés, vols partagés, conciergerie. Opérateurs certifiés AOC. Service 24h/24.",
  keywords: ["jet privé", "vols partagés", "aviation privée", "charter", "vol privé Paris", "courtier aérien", "broker jet privé", "conciergerie aéronautique"],
  authors: [{ name: "LECLERCQ'JET INTERNATIONAL" }],
  openGraph: {
    title: "LECLERCQ'JET INTERNATIONAL — Courtage Jet Privé Paris",
    description: "Broker en aviation privée depuis Paris. Vols privés, vols partagés, conciergerie. Opérateurs certifiés AOC.",
    type: "website",
    locale: "fr_FR",
    siteName: "LECLERCQ'JET INTERNATIONAL",
    images: [{ url: "/images/voiture-jet.png", width: 1200, height: 630, alt: "LECLERCQ'JET INTERNATIONAL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LECLERCQ'JET INTERNATIONAL",
    description: "Broker en aviation privée depuis Paris. Vols privés, vols partagés, conciergerie.",
    images: ["/images/voiture-jet.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1628",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${playfair.variable} ${bebasNeue.variable} ${libreBaskerville.variable} ${marcellus.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
