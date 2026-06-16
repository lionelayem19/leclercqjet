"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/contexts/ModalContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WaitlistModal() {
  const { isWaitlistOpen, selectedPlan, closeWaitlist } = useModal();
  const { t } = useLanguage();
  const m = t.modal;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, plan: selectedPlan }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          closeWaitlist();
          setEmail("");
          setFirstName("");
          setStatus("idle");
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isWaitlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm"
            onClick={closeWaitlist}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white border border-gray-100 w-full max-w-md p-8 pointer-events-auto shadow-card"
              style={{ borderTop: "3px solid #C9A96E" }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl text-text-dark mb-1">{m.title}</h2>
                  <p className="font-sans text-[13px] text-gray-400">{m.subtitle}</p>
                </div>
                <button
                  onClick={closeWaitlist}
                  className="text-gray-300 hover:text-navy transition-colors text-xl leading-none ml-4 mt-1"
                >
                  ×
                </button>
              </div>

              {selectedPlan && (
                <div className="bg-gold/5 border border-gold/20 px-4 py-2 mb-6">
                  <p className="font-sans text-[12px] text-gray-500">
                    {m.plan} :{" "}
                    <span className="text-navy font-semibold">{selectedPlan}</span>
                  </p>
                </div>
              )}

              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-sans text-[14px] text-gray-600">{m.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2">
                      {m.firstName}
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border-b border-gray-200 text-text-dark placeholder:text-gray-300 py-2 font-sans text-[14px] focus:border-navy transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-2">
                      {m.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-b border-gray-200 text-text-dark placeholder:text-gray-300 py-2 font-sans text-[14px] focus:border-navy transition-colors bg-transparent"
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-sans text-[12px] text-red-500">Une erreur est survenue.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-navy text-white font-sans text-[12px] tracking-[0.2em] uppercase py-3.5 hover:bg-navy-card transition-colors disabled:opacity-60 mt-2"
                  >
                    {status === "sending" ? m.sending : m.cta}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
