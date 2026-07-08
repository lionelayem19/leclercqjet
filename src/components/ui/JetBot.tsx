"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const PHONE_DISPLAY = "+33 6 98 85 57 37";
const PHONE_TEL = "tel:+33698855737";
const WHATSAPP_URL = "https://wa.me/33698855737";
const EMAIL = "contact@leclercqjetinternational.com";

type QA = { id: string; q: string; a: string };

type Content = {
  title: string;
  status: string;
  welcome: string;
  advisor: string;
  advisorReply: string;
  call: string;
  whatsapp: string;
  email: string;
  ariaOpen: string;
  ariaClose: string;
  tease: string;
  ariaDismissTease: string;
  qa: QA[];
};

const CONTENT: Partial<Record<Lang, Content>> = {
  fr: {
    title: "JET'BOT",
    status: "Disponible 24h/24",
    welcome:
      "Bonjour et bienvenue chez Leclercq'Jet. Je suis JET'BOT, votre conciergerie. Comment puis-je vous accompagner ?",
    advisor: "Parler à un conseiller",
    advisorReply:
      "Avec plaisir. Notre équipe vous répond personnellement, 7j/7 :",
    call: "Appeler",
    whatsapp: "WhatsApp",
    email: "Email",
    ariaOpen: "Ouvrir le chat JET'BOT",
    ariaClose: "Fermer le chat",
    tease: "Une question ? Discutez avec JET'BOT",
    ariaDismissTease: "Masquer le message",
    qa: [
      {
        id: "book",
        q: "Comment réserver un vol ?",
        a: "Nos vols sur-mesure sont organisés dans les plus brefs délais. Décrivez-nous votre trajet et nous trouvons l'appareil idéal.",
      },
      {
        id: "price",
        q: "Quels sont vos tarifs ?",
        a: "Chaque devis est personnalisé selon votre trajet, l'appareil et vos préférences. Réponse dans les plus brefs délais, 7j/7.",
      },
      {
        id: "pets",
        q: "Puis-je voyager avec mon animal ?",
        a: "Bien sûr. Vos animaux voyagent avec vous en cabine, avec plateaux de luxe et menus sur-mesure.",
      },
      {
        id: "events",
        q: "Organisez-vous des événements ?",
        a: "Nous orchestrons mariages, lunes de miel et célébrations à bord. Un moment unique, à 12 000 mètres.",
      },
    ],
  },
  en: {
    title: "JET'BOT",
    status: "Available 24/7",
    welcome:
      "Hello and welcome to Leclercq'Jet. I'm JET'BOT, your concierge. How may I assist you?",
    advisor: "Speak to an advisor",
    advisorReply:
      "With pleasure. Our team will respond to you personally, 7 days a week:",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    ariaOpen: "Open JET'BOT chat",
    ariaClose: "Close chat",
    tease: "A question? Chat with JET'BOT",
    ariaDismissTease: "Dismiss message",
    qa: [
      {
        id: "book",
        q: "How do I book a flight?",
        a: "Our bespoke flights are arranged at very short notice. Tell us your route and we'll find the ideal aircraft.",
      },
      {
        id: "price",
        q: "What are your rates?",
        a: "Every quote is tailored to your route, the aircraft and your preferences. A reply as soon as possible, 7 days a week.",
      },
      {
        id: "pets",
        q: "Can I travel with my pet?",
        a: "Of course. Your pets travel with you in the cabin, with luxury trays and bespoke menus.",
      },
      {
        id: "events",
        q: "Do you organise events?",
        a: "We orchestrate weddings, honeymoons and celebrations on board. A unique moment, at 12,000 metres.",
      },
    ],
  },
};

function PlaneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.9 4.2-2.4 2.4-1.9-.4a.5.5 0 0 0-.5.8l2 2 2 2a.5.5 0 0 0 .8-.5l-.4-1.9 2.4-2.4 4.2 3.9a.5.5 0 0 0 .8-.5Z" />
    </svg>
  );
}

type Msg =
  | { from: "bot" | "user"; kind: "text"; text: string }
  | { from: "bot"; kind: "typing" }
  | { from: "bot"; kind: "contact"; text: string };

export default function JetBot() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] ?? CONTENT.fr!;

  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<Msg[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [tease, setTease] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const seeded = useRef(false);
  const teaseDone = useRef(false); // once dismissed or chat opened, never show again

  // Surface the teaser bubble after a few seconds, unless already engaged.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!teaseDone.current) setTease(true);
    }, 5500);
    return () => clearTimeout(t);
  }, []);

  function dismissTease() {
    teaseDone.current = true;
    setTease(false);
  }

  // Seed the welcome message once, the first time the window opens.
  useEffect(() => {
    if (open && !seeded.current) {
      seeded.current = true;
      setThread([{ from: "bot", kind: "text", text: c.welcome }]);
    }
  }, [open, c.welcome]);

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread, open]);

  // Clear any pending timers on unmount.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function pushBotReply(reply: Msg) {
    setBusy(true);
    setThread((prev) => [...prev, { from: "bot", kind: "typing" }]);
    const t = setTimeout(() => {
      setThread((prev) => {
        const next = prev.filter((m) => m.kind !== "typing");
        return [...next, reply];
      });
      setBusy(false);
    }, 750);
    timers.current.push(t);
  }

  function handleQuestion(item: QA) {
    if (busy) return;
    setThread((prev) => [...prev, { from: "user", kind: "text", text: item.q }]);
    setAsked((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    pushBotReply({ from: "bot", kind: "text", text: item.a });
  }

  function handleAdvisor() {
    if (busy) return;
    setThread((prev) => [...prev, { from: "user", kind: "text", text: c.advisor }]);
    pushBotReply({ from: "bot", kind: "contact", text: c.advisorReply });
  }

  const remaining = c.qa.filter((item) => !asked.includes(item.id));

  return (
    <>
      {tease && !open && (
        <div className="jetbot-tease" role="status">
          <span>{c.tease}</span>
          <button type="button" className="jetbot-tease__close" aria-label={c.ariaDismissTease} onClick={dismissTease}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}

      <button
        type="button"
        className="jetbot-fab"
        aria-label={open ? c.ariaClose : c.ariaOpen}
        aria-expanded={open}
        onClick={() => {
          dismissTease();
          setOpen((v) => !v);
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <PlaneIcon size={24} />
        )}
      </button>

      {open && (
        <div className="jetbot-window" role="dialog" aria-label={c.title}>
          <div className="jetbot-header">
            <span className="jetbot-avatar">
              <PlaneIcon size={20} />
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {c.title}
              </p>
              <p
                className="font-sans"
                style={{ fontSize: "11px", color: "#9fb0c3", margin: "2px 0 0", display: "flex", alignItems: "center" }}
              >
                <span className="jetbot-dot" />
                {c.status}
              </p>
            </div>
            <button type="button" className="jetbot-close" aria-label={c.ariaClose} onClick={() => setOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="jetbot-body" ref={bodyRef}>
            {thread.map((m, i) => {
              if (m.kind === "typing") {
                return (
                  <div className="jetbot-row" key={`typing-${i}`}>
                    <span className="jetbot-mini-avatar">
                      <PlaneIcon size={15} />
                    </span>
                    <div className="jetbot-bubble jetbot-bubble--bot">
                      <span className="jetbot-typing" aria-label="...">
                        <span /> <span /> <span />
                      </span>
                    </div>
                  </div>
                );
              }
              if (m.from === "user") {
                return (
                  <div className="jetbot-row jetbot-row--user" key={i}>
                    <div className="jetbot-bubble jetbot-bubble--user">{m.text}</div>
                  </div>
                );
              }
              return (
                <div className="jetbot-row" key={i}>
                  <span className="jetbot-mini-avatar">
                    <PlaneIcon size={15} />
                  </span>
                  <div className="jetbot-bubble jetbot-bubble--bot">
                    {m.text}
                    {m.kind === "contact" && (
                      <div className="jetbot-contact">
                        <a href={PHONE_TEL}>📞 {c.call} · {PHONE_DISPLAY}</a>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">💬 {c.whatsapp}</a>
                        <a href={`mailto:${EMAIL}`}>✉️ {c.email} · {EMAIL}</a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="jetbot-options">
            {remaining.map((item) => (
              <button key={item.id} type="button" className="jetbot-chip" onClick={() => handleQuestion(item)} disabled={busy}>
                {item.q}
              </button>
            ))}
            <button type="button" className="jetbot-chip jetbot-chip--accent" onClick={handleAdvisor} disabled={busy}>
              {c.advisor}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
