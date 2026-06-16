"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "@/components/ui/LogoMark";
import { useLanguage } from "@/contexts/LanguageContext";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  aircraft: string;
  seats: number;
  price: number;
  type: "Empty Leg" | "Charter";
  status: "active" | "filled" | "cancelled";
}

interface Request {
  id: string;
  client: string;
  email: string;
  phone: string;
  route: string;
  date: string;
  status: "new" | "inProgress" | "confirmed" | "cancelled";
  createdAt: string;
}

const MOCK_REQUESTS: Request[] = [
  { id: "r1", client: "Alexandre Martin", email: "a.martin@company.com", phone: "+33 6 12 34 56 78", route: "Paris → Genève", date: "2026-05-10", status: "new", createdAt: "2026-04-27" },
  { id: "r2", client: "Sophie Leclerc", email: "s.leclerc@group.fr", phone: "+33 6 98 76 54 32", route: "Nice → Ibiza", date: "2026-05-15", status: "inProgress", createdAt: "2026-04-26" },
  { id: "r3", client: "Pierre Dubois", email: "p.dubois@finance.com", phone: "+33 7 11 22 33 44", route: "Paris → Monaco", date: "2026-05-08", status: "confirmed", createdAt: "2026-04-25" },
];

const INITIAL_FLIGHTS: Flight[] = [
  { id: "f1", from: "Paris Le Bourget", to: "Nice Côte d'Azur", date: "2026-04-28", time: "09:00", aircraft: "Citation XLS", seats: 8, price: 4500, type: "Empty Leg", status: "active" },
  { id: "f2", from: "Paris Le Bourget", to: "Londres Farnborough", date: "2026-04-29", time: "11:30", aircraft: "Phenom 300", seats: 6, price: 6200, type: "Empty Leg", status: "active" },
  { id: "f3", from: "Genève", to: "Ibiza", date: "2026-04-30", time: "14:00", aircraft: "Falcon 2000", seats: 10, price: 8900, type: "Charter", status: "active" },
];

type Tab = "overview" | "flights" | "add" | "csv" | "requests";
type StatusColor = "new" | "inProgress" | "confirmed" | "cancelled";

const statusLabel: Record<StatusColor, string> = {
  new: "Nouveau",
  inProgress: "En cours",
  confirmed: "Confirmé",
  cancelled: "Annulé",
};

const statusStyle: Record<StatusColor, string> = {
  new: "bg-blue-900/40 text-blue-300 border border-blue-700/30",
  inProgress: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30",
  confirmed: "bg-green-900/40 text-green-300 border border-green-700/30",
  cancelled: "bg-red-900/40 text-red-300 border border-red-700/30",
};

export default function OperatorDashboard() {
  const { t } = useLanguage();
  const op = t.operator.dashboard;
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("overview");
  const [flights, setFlights] = useState<Flight[]>(INITIAL_FLIGHTS);
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [mounted, setMounted] = useState(false);

  // Add flight form state
  const [newFlight, setNewFlight] = useState({
    from: "", to: "", date: "", time: "", aircraft: "", seats: "8", price: "", type: "Empty Leg" as "Empty Leg" | "Charter",
  });
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);

  // CSV state
  const [csvText, setCsvText] = useState("");
  const [csvParsed, setCsvParsed] = useState<Flight[]>([]);
  const [csvError, setCsvError] = useState("");
  const [csvImported, setCsvImported] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lj-operator-flights");
    if (saved) {
      try { setFlights(JSON.parse(saved)); } catch {}
    }
    const savedReqs = localStorage.getItem("lj-operator-requests");
    if (savedReqs) {
      try { setRequests(JSON.parse(savedReqs)); } catch {}
    }
  }, []);

  const saveFlights = useCallback((updated: Flight[]) => {
    setFlights(updated);
    localStorage.setItem("lj-operator-flights", JSON.stringify(updated));
  }, []);

  const saveRequests = useCallback((updated: Request[]) => {
    setRequests(updated);
    localStorage.setItem("lj-operator-requests", JSON.stringify(updated));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/operator/login", { method: "DELETE" });
    router.push("/operator");
  };

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!newFlight.from || !newFlight.to || !newFlight.date || !newFlight.aircraft || !newFlight.price) {
      setAddError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const flight: Flight = {
      id: `f${Date.now()}`,
      from: newFlight.from,
      to: newFlight.to,
      date: newFlight.date,
      time: newFlight.time || "00:00",
      aircraft: newFlight.aircraft,
      seats: parseInt(newFlight.seats) || 8,
      price: parseFloat(newFlight.price) || 0,
      type: newFlight.type,
      status: "active",
    };
    saveFlights([flight, ...flights]);
    setNewFlight({ from: "", to: "", date: "", time: "", aircraft: "", seats: "8", price: "", type: "Empty Leg" });
    setAddSuccess(true);
    setTimeout(() => { setAddSuccess(false); setTab("flights"); }, 1800);
  };

  const handleDeleteFlight = (id: string) => {
    saveFlights(flights.filter((f) => f.id !== id));
  };

  const handleFlightStatus = (id: string, status: Flight["status"]) => {
    saveFlights(flights.map((f) => f.id === id ? { ...f, status } : f));
  };

  const handleRequestStatus = (id: string, status: Request["status"]) => {
    saveRequests(requests.map((r) => r.id === id ? { ...r, status } : r));
  };

  const handleCsvParse = () => {
    setCsvError("");
    setCsvParsed([]);
    if (!csvText.trim()) {
      setCsvError("Collez du contenu CSV avant de continuer.");
      return;
    }
    const lines = csvText.trim().split("\n").filter(Boolean);
    const parsed: Flight[] = [];
    for (const line of lines) {
      const parts = line.split(",").map((p) => p.trim());
      if (parts.length < 7) { setCsvError(`Ligne invalide : "${line}"`); return; }
      const [from, to, date, time, aircraft, seats, price, type] = parts;
      parsed.push({
        id: `csv-${Date.now()}-${Math.random()}`,
        from, to, date, time, aircraft,
        seats: parseInt(seats) || 8,
        price: parseFloat(price) || 0,
        type: (type?.toLowerCase().includes("charter") ? "Charter" : "Empty Leg") as "Empty Leg" | "Charter",
        status: "active",
      });
    }
    setCsvParsed(parsed);
  };

  const handleCsvConfirm = () => {
    saveFlights([...csvParsed, ...flights]);
    setCsvText("");
    setCsvParsed([]);
    setCsvImported(true);
    setTimeout(() => { setCsvImported(false); setTab("flights"); }, 1800);
  };

  const activeFlights = flights.filter((f) => f.status === "active").length;
  const newRequests = requests.filter((r) => r.status === "new").length;

  const inputClass = "w-full border border-white/10 bg-navy/60 text-white placeholder:text-white/20 px-3 py-2.5 font-sans text-[13px] focus:border-gold transition-colors";
  const labelClass = "block font-sans text-[10px] tracking-[0.15em] text-white/35 uppercase mb-1.5";

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "flights", label: `Vols publiés (${flights.length})` },
    { id: "add", label: "Ajouter un vol" },
    { id: "csv", label: "Importer CSV" },
    { id: "requests", label: `Demandes (${requests.length})` },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-navy">
      {/* Header */}
      <header className="bg-[#060D1A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LogoMark />
            <span className="font-sans text-[11px] tracking-[0.2em] text-white/35 uppercase hidden sm:block">
              Espace opérateur
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="font-sans text-[11px] tracking-[0.15em] text-white/45 hover:text-gold transition-colors border border-white/15 px-4 py-2"
          >
            {op.logout}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 border-b border-white/10 pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-sans text-[12px] tracking-wide px-4 py-3 whitespace-nowrap transition-all border-b-2 -mb-px ${
                tab === t.id
                  ? "text-gold border-gold"
                  : "text-white/40 border-transparent hover:text-white hover:border-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview */}
          {tab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h1 className="font-serif text-[32px] text-white mb-8">{op.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {[
                  { label: op.stats.active, value: String(activeFlights), color: "text-gold" },
                  { label: op.stats.requests, value: String(newRequests), color: "text-yellow-300" },
                  { label: op.stats.alerts, value: String(requests.length), color: "text-white/70" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-navy-card border border-white/12 p-8">
                    <p className={`font-serif text-[48px] ${stat.color} leading-none mb-2`}>{stat.value}</p>
                    <p className="font-sans text-[13px] text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setTab("add")}
                  className="bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#b8934a] transition-colors"
                >
                  + Ajouter un vol
                </button>
                <button
                  onClick={() => setTab("requests")}
                  className="border border-white/25 text-white/60 font-sans text-[12px] tracking-[0.2em] uppercase py-3.5 hover:border-gold hover:text-gold transition-all"
                >
                  Voir les demandes
                </button>
              </div>
            </motion.div>
          )}

          {/* Flights list */}
          {tab === "flights" && (
            <motion.div key="flights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-[28px] text-white">{op.flights.title}</h2>
                <button
                  onClick={() => setTab("add")}
                  className="font-sans text-[11px] tracking-[0.15em] bg-gold text-navy px-4 py-2 hover:bg-[#b8934a] transition-colors"
                >
                  + {op.flights.add}
                </button>
              </div>

              {flights.length === 0 ? (
                <p className="font-sans text-[13px] text-white/40 py-12 text-center">{op.flights.empty}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        {[op.flights.cols.route, op.flights.cols.date, op.flights.cols.aircraft, op.flights.cols.seats, op.flights.cols.price, op.flights.cols.type, "Statut", op.flights.cols.actions].map((col) => (
                          <th key={col} className="text-left font-sans text-[10px] tracking-[0.15em] text-white/40 uppercase pb-3 pr-4">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {flights.map((f) => (
                        <tr key={f.id} className="border-b border-white/8 hover:bg-navy-card/50 transition-colors">
                          <td className="py-3 pr-4">
                            <span className="font-serif text-[15px] text-white">{f.from}</span>
                            <span className="text-white/30 mx-2 font-sans text-[13px]">→</span>
                            <span className="font-serif text-[15px] text-white">{f.to}</span>
                          </td>
                          <td className="py-3 pr-4 font-sans text-[12px] text-white/60 whitespace-nowrap">{f.date} {f.time}</td>
                          <td className="py-3 pr-4 font-sans text-[12px] text-white/60">{f.aircraft}</td>
                          <td className="py-3 pr-4 font-sans text-[12px] text-white/60">{f.seats}</td>
                          <td className="py-3 pr-4 font-serif text-[14px] text-white">{f.price.toLocaleString()}€</td>
                          <td className="py-3 pr-4">
                            <span className="font-sans text-[10px] tracking-wide border border-white/20 text-white/50 px-2 py-0.5">
                              {f.type}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            <select
                              value={f.status}
                              onChange={(e) => handleFlightStatus(f.id, e.target.value as Flight["status"])}
                              className="font-sans text-[11px] bg-transparent border border-white/15 text-white/60 px-2 py-1 focus:border-accent transition-colors"
                            >
                              <option value="active" className="bg-navy-card">Actif</option>
                              <option value="filled" className="bg-navy-card">Complet</option>
                              <option value="cancelled" className="bg-navy-card">Annulé</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => handleDeleteFlight(f.id)}
                              className="font-sans text-[11px] text-red-400/60 hover:text-red-400 transition-colors"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Add flight */}
          {tab === "add" && (
            <motion.div key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h2 className="font-serif text-[28px] text-white mb-8">{op.addFlight.title}</h2>
              <form onSubmit={handleAddFlight} className="bg-navy-card border border-white/12 p-8 max-w-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{op.addFlight.from} *</label>
                    <input value={newFlight.from} onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })} placeholder="Paris Le Bourget" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.to} *</label>
                    <input value={newFlight.to} onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })} placeholder="Nice Côte d'Azur" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.date} *</label>
                    <input type="date" value={newFlight.date} onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })} className={inputClass + " text-white/60"} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.time}</label>
                    <input type="time" value={newFlight.time} onChange={(e) => setNewFlight({ ...newFlight, time: e.target.value })} className={inputClass + " text-white/60"} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.aircraft} *</label>
                    <input value={newFlight.aircraft} onChange={(e) => setNewFlight({ ...newFlight, aircraft: e.target.value })} placeholder="Citation XLS" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.seats}</label>
                    <input type="number" min="1" max="30" value={newFlight.seats} onChange={(e) => setNewFlight({ ...newFlight, seats: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.price} *</label>
                    <input type="number" min="0" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} placeholder="4500" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{op.addFlight.type}</label>
                    <select value={newFlight.type} onChange={(e) => setNewFlight({ ...newFlight, type: e.target.value as "Empty Leg" | "Charter" })} className={inputClass + " text-white/70"}>
                      {op.addFlight.types.map((t) => (
                        <option key={t} value={t} className="bg-navy-card">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {addError && <p className="font-sans text-[12px] text-red-400">{addError}</p>}
                {addSuccess && <p className="font-sans text-[12px] text-green-400">Vol publié avec succès.</p>}

                <div className="flex gap-3">
                  <button type="submit" className="bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#b8934a] transition-colors font-semibold">
                    {op.addFlight.cta}
                  </button>
                  <button type="button" onClick={() => setTab("flights")} className="border border-white/20 text-white/55 font-sans text-[12px] tracking-[0.15em] uppercase px-6 py-3 hover:border-gold hover:text-gold transition-all">
                    {op.addFlight.cancel}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* CSV import */}
          {tab === "csv" && (
            <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h2 className="font-serif text-[28px] text-white mb-3">{op.csv.title}</h2>
              <p className="font-sans text-[12px] text-white/40 mb-8 font-mono bg-navy-card border border-white/10 px-4 py-2 inline-block">
                {op.csv.format}
              </p>

              {csvImported ? (
                <div className="bg-navy-card border border-white/12 p-8 text-center">
                  <p className="font-sans text-[14px] text-green-400">
                    {csvParsed.length || "Les"} vols ont été importés avec succès.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl">
                  <textarea
                    value={csvText}
                    onChange={(e) => { setCsvText(e.target.value); setCsvParsed([]); setCsvError(""); }}
                    rows={8}
                    placeholder={"Paris Le Bourget,Nice Côte d'Azur,2026-05-01,10:00,Citation XLS,8,4500,Empty Leg\nGenève,Ibiza,2026-05-03,14:00,Falcon 2000,10,8900,Charter"}
                    className="w-full bg-navy-card border border-white/15 text-white/70 placeholder:text-white/20 p-4 font-mono text-[12px] focus:border-accent transition-colors resize-none"
                  />

                  {csvError && <p className="font-sans text-[12px] text-red-400">{csvError}</p>}

                  <button
                    onClick={handleCsvParse}
                    className="bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#b8934a] transition-colors"
                  >
                    Analyser le CSV
                  </button>

                  {csvParsed.length > 0 && (
                    <div>
                      <p className="font-sans text-[12px] text-white/50 mb-4">{op.csv.preview} — {csvParsed.length} vol(s)</p>
                      <div className="overflow-x-auto border border-white/10 mb-5">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10 bg-navy-card">
                              {["Départ", "Arrivée", "Date", "Heure", "Appareil", "Places", "Prix", "Type"].map((h) => (
                                <th key={h} className="text-left font-sans text-[10px] tracking-[0.12em] text-white/40 uppercase px-3 py-2">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {csvParsed.map((f, i) => (
                              <tr key={i} className="border-b border-white/8">
                                <td className="px-3 py-2 font-sans text-[12px] text-white">{f.from}</td>
                                <td className="px-3 py-2 font-sans text-[12px] text-white">{f.to}</td>
                                <td className="px-3 py-2 font-sans text-[12px] text-white/60">{f.date}</td>
                                <td className="px-3 py-2 font-sans text-[12px] text-white/60">{f.time}</td>
                                <td className="px-3 py-2 font-sans text-[12px] text-white/60">{f.aircraft}</td>
                                <td className="px-3 py-2 font-sans text-[12px] text-white/60">{f.seats}</td>
                                <td className="px-3 py-2 font-serif text-[13px] text-white">{f.price.toLocaleString()}€</td>
                                <td className="px-3 py-2 font-sans text-[11px] text-white/50">{f.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={handleCsvConfirm} className="bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#b8934a] transition-colors font-semibold">
                          {op.csv.confirm}
                        </button>
                        <button onClick={() => { setCsvParsed([]); setCsvText(""); }} className="border border-white/20 text-white/55 font-sans text-[12px] uppercase px-5 py-3 hover:border-gold hover:text-gold transition-all">
                          {op.csv.cancel}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Requests */}
          {tab === "requests" && (
            <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h2 className="font-serif text-[28px] text-white mb-8">{op.requests.title}</h2>

              {requests.length === 0 ? (
                <p className="font-sans text-[13px] text-white/40 py-12 text-center">{op.requests.empty}</p>
              ) : (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-navy-card border border-white/12 p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-serif text-[17px] text-white">{req.client}</p>
                          <span className={`font-sans text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 ${statusStyle[req.status as StatusColor]}`}>
                            {statusLabel[req.status as StatusColor]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <span className="font-sans text-[12px] text-white/55">{req.route}</span>
                          <span className="font-sans text-[12px] text-white/40">{req.date}</span>
                          <a href={`mailto:${req.email}`} className="font-sans text-[12px] text-white/45 hover:text-gold transition-colors">{req.email}</a>
                          <span className="font-sans text-[12px] text-white/40">{req.phone}</span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <select
                          value={req.status}
                          onChange={(e) => handleRequestStatus(req.id, e.target.value as Request["status"])}
                          className="font-sans text-[11px] bg-transparent border border-white/15 text-white/60 px-3 py-2 focus:border-accent transition-colors"
                        >
                          <option value="new" className="bg-navy-card">{op.requests.statuses.new}</option>
                          <option value="inProgress" className="bg-navy-card">{op.requests.statuses.inProgress}</option>
                          <option value="confirmed" className="bg-navy-card">{op.requests.statuses.confirmed}</option>
                          <option value="cancelled" className="bg-navy-card">{op.requests.statuses.cancelled}</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
