export const APP_NAME = "LECLERCQ'JET INTERNATIONAL";
export const APP_TAGLINE = "L'excellence du voyage privé";

export const JET_CATEGORIES = {
  very_light: { label: "Very Light Jet", capacity: "4-5 passagers", range: "< 2 000 km" },
  light: { label: "Light Jet", capacity: "6-8 passagers", range: "2 000–3 500 km" },
  midsize: { label: "Midsize Jet", capacity: "7-9 passagers", range: "3 500–5 000 km" },
  super_midsize: { label: "Super Midsize", capacity: "8-10 passagers", range: "5 000–6 500 km" },
  heavy: { label: "Heavy Jet", capacity: "10-16 passagers", range: "6 500–9 000 km" },
  ultra_long_range: { label: "Ultra Long Range", capacity: "12-19 passagers", range: "> 9 000 km" },
  vip_airliner: { label: "VIP Airliner", capacity: "19+ passagers", range: "> 12 000 km" },
} as const;

export const BOOKING_STATUS_LABELS = {
  pending: "En attente",
  confirmed: "Confirmé",
  paid: "Payé",
  in_flight: "En vol",
  completed: "Terminé",
  cancelled: "Annulé",
  refunded: "Remboursé",
} as const;

export const PLATFORM_FEE_PERCENT = 0.15;

export const POPULAR_AIRPORTS = [
  { code: "LFPB", name: "Paris Le Bourget", city: "Paris" },
  { code: "LFPG", name: "Charles de Gaulle", city: "Paris" },
  { code: "EGLF", name: "Farnborough", city: "Londres" },
  { code: "EGKB", name: "Biggin Hill", city: "Londres" },
  { code: "LSZH", name: "Zurich", city: "Zurich" },
  { code: "LSGG", name: "Genève", city: "Genève" },
  { code: "LIML", name: "Linate", city: "Milan" },
  { code: "LEMD", name: "Barajas", city: "Madrid" },
  { code: "EDDB", name: "Berlin Brandenburg", city: "Berlin" },
  { code: "KJFK", name: "John F. Kennedy", city: "New York" },
  { code: "KLAX", name: "Los Angeles", city: "Los Angeles" },
  { code: "KDUB", name: "Dubai", city: "Dubaï" },
];
