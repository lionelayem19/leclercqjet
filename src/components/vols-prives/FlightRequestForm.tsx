"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
const schema = z.object({
  from: z.string().min(2, "Champ requis"),
  to: z.string().min(2, "Champ requis"),
  dateTime: z.string().min(1, "Champ requis"),
  passengers: z.string().min(1),
  jetType: z.string().min(1),
  name: z.string().min(2, "Champ requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Champ requis"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// Icônes dorées (contour), style cohérent avec le reste du site
function IconClock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10.5H13z" />
    </svg>
  );
}
function IconPlane() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15.5 13.5 12V5.5a1.5 1.5 0 0 0-3 0V12L3 15.5V17l7.5-2v3l-2 1.5V21l3.5-1 3.5 1v-1.5L14.5 18v-3l6.5 2z" />
    </svg>
  );
}
const WHY_ICONS = [IconClock, IconLock, IconGlobe, IconBolt];

export default function FlightRequestForm() {
  const { t, lang } = useLanguage();
  const vp = t.volsPrives;
  const c = vp.content;
  const isRTL = lang === "ar";
  const params = useSearchParams();
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (params.get("from")) setValue("from", params.get("from") as string);
    if (params.get("to")) setValue("to", params.get("to") as string);
    if (params.get("date")) setValue("dateTime", params.get("date") as string);
    if (params.get("passengers")) setValue("passengers", params.get("passengers") as string);
  }, [params, setValue]);

  // On ne redirige vers la confirmation que si l'email est réellement parti.
  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vol", ...data }),
      });
      if (!res.ok) {
        setSubmitError(true);
        return;
      }
    } catch {
      setSubmitError(true);
      return;
    }
    router.push("/vols-prives/confirmation");
  };

  const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gold/70 uppercase mb-2";
  const inputClass = "w-full border-b border-white/15 text-white placeholder:text-white/30 py-2.5 font-sans text-[14px] focus:border-gold transition-colors bg-transparent outline-none";
  const errorClass = "font-sans text-[11px] text-red-500 mt-1";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/vols-prives.png"
          alt="Vols privés"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.50)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase mb-4">
            {vp.hero.badge}
          </p>
          <h1 className="font-serif text-[36px] md:text-[56px] text-white mb-4 leading-tight">
            {vp.hero.title}
          </h1>
          <p
            className="text-white/50 max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(20px, 2.2vw, 26px)",
              lineHeight: 1.4,
            }}
          >
            {vp.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="py-16 px-6" style={{ paddingTop: "clamp(56px, 8vw, 88px)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center" dir={isRTL ? "rtl" : "ltr"} style={{ marginBottom: "clamp(32px, 5vw, 48px)" }}>
            <h2 className="vp-form-title">{c.formIntro.title}</h2>
            <div className="el-goldline" />
            <p className="vp-form-subtitle">{c.formIntro.subtitle}</p>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel p-8 md:p-12 space-y-8"
            style={{ borderTop: "3px solid #C9A96E", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}
          >
            {/* Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{vp.form.from}</label>
                <input
                  {...register("from")}
                  type="text"
                  placeholder={vp.form.fromPlaceholder}
                  autoComplete="off"
                  className={inputClass}
                />
                {errors.from && <p className={errorClass}>{errors.from.message}</p>}
              </div>
              <div>
                <label className={labelClass}>{vp.form.to}</label>
                <input
                  {...register("to")}
                  type="text"
                  placeholder={vp.form.toPlaceholder}
                  autoComplete="off"
                  className={inputClass}
                />
                {errors.to && <p className={errorClass}>{errors.to.message}</p>}
              </div>
            </div>

            {/* Date + Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{vp.form.date}</label>
                <input {...register("dateTime")} type="datetime-local" className={inputClass + " text-white [color-scheme:dark]"} />
                {errors.dateTime && <p className={errorClass}>{errors.dateTime.message}</p>}
              </div>
              <div>
                <label className={labelClass}>{vp.form.passengers}</label>
                <select {...register("passengers")} className={inputClass + " text-white"} defaultValue="2">
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)} className="text-text-dark">{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jet type */}
            <div>
              <label className={labelClass}>{vp.form.jetType}</label>
              <select {...register("jetType")} className={inputClass + " text-white"} defaultValue="">
                <option value="" disabled className="text-text-dark">{t.common.select}</option>
                {vp.form.jetTypes.map((type) => (
                  <option key={type} value={type} className="text-text-dark">{type}</option>
                ))}
              </select>
              {errors.jetType && <p className={errorClass}>Champ requis</p>}
            </div>

            <div className="h-px bg-white/10" />

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{vp.form.name}</label>
                <input {...register("name")} placeholder="Jean Dupont" className={inputClass} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>{vp.form.email}</label>
                <input {...register("email")} type="email" placeholder="jean@company.com" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>{vp.form.phone}</label>
              <input {...register("phone")} type="tel" placeholder="+33 6 XX XX XX XX" className={inputClass} />
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>

            <div>
              <label className={labelClass}>{vp.form.message}</label>
              <textarea {...register("message")} rows={4} placeholder={vp.form.messagePlaceholder} className={inputClass + " resize-none"} />
            </div>

            {submitError && (
              <p className="form-error" role="alert" dir={isRTL ? "rtl" : "ltr"}>
                {t.common.formError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-navy font-sans text-[12px] tracking-[0.22em] uppercase py-4 hover:bg-[#a8874a] transition-colors disabled:opacity-60 font-semibold"
            >
              {isSubmitting ? vp.form.sending : vp.form.cta}
            </button>
          </motion.form>
        </div>
      </section>

      {/* ── Pourquoi le vol privé ── */}
      <section className="vp-section" dir={isRTL ? "rtl" : "ltr"} style={{ padding: "clamp(64px, 9vw, 100px) 6% 0" }}>
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <p className="vp-eyebrow">{c.why.badge}</p>
          <div className="vp-why-grid">
            {c.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? WHY_ICONS[0];
              return (
                <div key={item.title} className="el-card" style={{ padding: "36px 28px", textAlign: "center" }}>
                  <span className="el-medallion vp-medallion" aria-hidden="true"><Icon /></span>
                  <h3 className="vp-card-title">{item.title}</h3>
                  <div className="el-goldline" />
                  <p className="vp-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section className="vp-section" dir={isRTL ? "rtl" : "ltr"} style={{ padding: "clamp(64px, 9vw, 100px) 6% 0" }}>
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <p className="vp-eyebrow">{c.how.badge}</p>
          <div className="vp-steps-grid">
            {c.how.steps.map((step, i) => (
              <div key={step.title} className="vp-step">
                <span className="vp-step-num" aria-hidden="true">{`0${i + 1}`}</span>
                <h3 className="vp-step-title">{step.title}</h3>
                <p className="vp-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nos appareils ── */}
      <section className="vp-section" dir={isRTL ? "rtl" : "ltr"} style={{ padding: "clamp(64px, 9vw, 100px) 6% clamp(80px, 11vw, 120px)" }}>
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <p className="vp-eyebrow">{c.fleet.badge}</p>
          <div className="vp-fleet-grid">
            {c.fleet.items.map((item) => (
              <div key={item.title} className="el-card" style={{ padding: "40px 32px", textAlign: "center" }}>
                <span className="el-medallion vp-medallion" aria-hidden="true"><IconPlane /></span>
                <h3 className="vp-card-title">{item.title}</h3>
                <div className="el-goldline" />
                <p className="vp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
