"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LogoMark from "@/components/ui/LogoMark";

export default function OperatorLoginPage() {
  const { t } = useLanguage();
  const op = t.operator.login;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/operator/dashboard");
      } else {
        setError(op.error);
      }
    } catch {
      setError(op.error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-b border-white/10 text-white placeholder:text-white/20 py-2.5 font-sans text-[14px] focus:border-gold transition-colors bg-transparent";
  const labelClass =
    "block font-sans text-[11px] tracking-[0.15em] text-white/35 uppercase mb-2";

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <LogoMark />
        </div>

        {/* Card */}
        <div
          className="bg-navy-card border border-white/8 p-8"
          style={{ borderTop: "2px solid #C9A96E" }}
        >
          <h1 className="font-serif text-[28px] text-white mb-1">{op.title}</h1>
          <p className="font-sans text-[12px] text-white/30 mb-8 tracking-wide">
            Accès réservé à l&apos;équipe LECLERCQ&apos;JET
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>{op.email}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@leclercqjet.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{op.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className={inputClass}
              />
            </div>

            {error && (
              <p className="font-sans text-[12px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy font-sans text-[12px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#b8934a] transition-colors disabled:opacity-60 font-semibold"
            >
              {loading ? "Connexion..." : op.cta}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-[11px] text-white/20 mt-6">
          LECLERCQ&apos;JET INTERNATIONAL — Espace opérateur
        </p>
      </motion.div>
    </main>
  );
}
