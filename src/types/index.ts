export type UserRole = "client" | "operator" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
}

export interface Jet {
  id: string;
  operator_id: string;
  name: string;
  model: string;
  manufacturer: string;
  category: JetCategory;
  capacity: number;
  range_km: number;
  speed_kmh: number;
  images: string[];
  price_per_hour: number;
  description: string | null;
  amenities: string[];
  home_base: string;
  is_available: boolean;
  created_at: string;
}

export type JetCategory =
  | "very_light"
  | "light"
  | "midsize"
  | "super_midsize"
  | "heavy"
  | "ultra_long_range"
  | "vip_airliner";

export interface Booking {
  id: string;
  jet_id: string;
  client_id: string;
  operator_id: string;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  return_date: string | null;
  passengers: number;
  total_price: number;
  status: BookingStatus;
  stripe_payment_intent_id: string | null;
  notes: string | null;
  created_at: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "in_flight"
  | "completed"
  | "cancelled"
  | "refunded";

export interface SearchParams {
  from?: string;
  to?: string;
  date?: string;
  passengers?: number;
  category?: JetCategory;
}
