"use client";

import { useEffect } from "react";
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

export default function FlightRequestForm() {
  const { t } = useLanguage();
  const vp = t.volsPrives;
  const params = useSearchParams();
  const router = useRouter();

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

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vol", ...data }),
      });
    } catch {}
    router.push("/vols-prives/confirmation");
  };

  const labelClass = "block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2";
  const inputClass = "w-full border-b border-gray-200 text-text-dark placeholder:text-gray-300 py-2.5 font-sans text-[14px] focus:border-navy transition-colors bg-transparent";
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
          <p className="font-sans text-[18px] text-white/50 max-w-lg mx-auto leading-relaxed">{vp.hero.subtitle}</p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-gray-100 p-8 md:p-12 space-y-8 shadow-card"
            style={{ borderTop: "3px solid #C9A96E" }}
          >
            {/* Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{vp.form.from}</label>
                <input
                  {...register("from")}
                  type="text"
                  placeholder="Ville ou aéroport de départ"
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
                  placeholder="Ville ou aéroport d'arrivée"
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
                <input {...register("dateTime")} type="datetime-local" className={inputClass + " text-gray-500"} />
                {errors.dateTime && <p className={errorClass}>{errors.dateTime.message}</p>}
              </div>
              <div>
                <label className={labelClass}>{vp.form.passengers}</label>
                <select {...register("passengers")} className={inputClass + " text-gray-700"} defaultValue="2">
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jet type */}
            <div>
              <label className={labelClass}>{vp.form.jetType}</label>
              <select {...register("jetType")} className={inputClass + " text-gray-700"} defaultValue="">
                <option value="" disabled>— Sélectionner —</option>
                {vp.form.jetTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.jetType && <p className={errorClass}>Champ requis</p>}
            </div>

            <div className="h-px bg-gray-100" />

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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy text-white font-sans text-[12px] tracking-[0.22em] uppercase py-4 hover:bg-navy-card transition-colors disabled:opacity-60 font-medium"
            >
              {isSubmitting ? vp.form.sending : vp.form.cta}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
