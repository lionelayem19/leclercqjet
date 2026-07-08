"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactCTASection from "@/components/home/ContactCTASection";
import { useLanguage } from "@/contexts/LanguageContext";

const BADGE: Record<string, string> = {
  fr: "ÉVÉNEMENTS SPÉCIAUX", en: "SPECIAL EVENTS", zh: "特别活动", ar: "مناسبات خاصة",
};
const TITLE_PLAIN: Record<string, string> = {
  fr: "Vos plus beaux moments ", en: "Your finest moments ", zh: "您最美的时刻，", ar: "أجمل لحظاتك ",
};
const TITLE_ACCENT: Record<string, string> = {
  fr: "prennent de la hauteur", en: "take to the skies", zh: "翱翔于云端", ar: "ترتقي عالياً",
};
const SUBTITLE: Record<string, string> = {
  fr: "Chaque célébration mérite un écrin d'exception. Le ciel devient le vôtre.",
  en: "Every celebration deserves an exceptional setting. The sky becomes yours.",
  zh: "每一场庆典都值得非凡的舞台。天空，从此属于您。",
  ar: "كل احتفال يستحق إطاراً استثنائياً. السماء تصبح لك.",
};

const EVENTS: Record<string, { label: string; title: string; desc: string }[]> = {
  fr: [
    { label: "BABY SHOWER", title: "Célébrer l'attente, en première classe.", desc: "Une parenthèse délicate à 12 000 mètres pour honorer la future maman. Décoration florale pastel, mocktails signature, douceurs pâtissières créées sur mesure et album souvenir : nous orchestrons un moment d'une tendresse rare, suspendu au-dessus des nuages." },
    { label: "ANNIVERSAIRE", title: "Une année de plus, une altitude de plus.", desc: "Du dîner étoilé au champagne grand cru, de la playlist intime au gâteau d'exception signé par un chef pâtissier renommé. Que vous soyez deux ou douze, votre anniversaire devient une destination en soi, célébré là où personne ne l'oubliera." },
    { label: "MARIAGE", title: "Dire oui, plus près des étoiles.", desc: "Cérémonie d'exception, lune de miel inaugurée dès le décollage ou voyage des mariés vers une destination de rêve. Cabine habillée de blanc, pétales, champagne millésimé et service d'une discrétion absolue : nous transformons le plus beau jour en un souvenir inégalable." },
  ],
  en: [
    { label: "BABY SHOWER", title: "Celebrating the wait, in first class.", desc: "A delicate interlude at 12,000 metres to honour the mother-to-be. Pastel floral decor, signature mocktails, bespoke pastries and a keepsake album: we orchestrate a moment of rare tenderness, suspended above the clouds." },
    { label: "BIRTHDAY", title: "One more year, one more altitude.", desc: "From a starred dinner to grand cru champagne, from an intimate playlist to an exceptional cake by a renowned pastry chef. Whether you are two or twelve, your birthday becomes a destination in itself, celebrated where no one will forget it." },
    { label: "WEDDING", title: "Saying yes, closer to the stars.", desc: "An exceptional ceremony, a honeymoon begun at takeoff, or the newlyweds' journey to a dream destination. A cabin dressed in white, petals, vintage champagne and absolutely discreet service: we turn the most beautiful day into an unrivalled memory." },
  ],
  zh: [
    { label: "迎婴派对", title: "以头等舱的方式，庆祝期待。", desc: "在12,000米高空，为准妈妈献上一段温柔时光。柔和花艺、招牌无酒精鸡尾酒、定制甜点与纪念相册：我们编织一段悬于云端、格外温馨的时刻。" },
    { label: "生日庆典", title: "又长一岁，又高一程。", desc: "从星级晚宴到名庄香槟，从私密歌单到名厨定制蛋糕。无论两人或十二人，您的生日本身即是目的地，在无人会忘怀之处庆祝。" },
    { label: "婚礼", title: "在离星辰更近的地方，许下承诺。", desc: "非凡的仪式、自起飞即开启的蜜月，或新人前往梦想目的地的旅程。以白色装点的客舱、花瓣、年份香槟与绝对低调的服务：我们将最美的一天化为无可比拟的回忆。" },
  ],
  ar: [
    { label: "حفل استقبال المولود", title: "الاحتفال بالانتظار، في الدرجة الأولى.", desc: "لحظة رقيقة على ارتفاع 12,000 متر لتكريم الأم المنتظرة. زينة زهور باستيل، موكتيلات مميزة، حلويات مصممة خصيصاً وألبوم ذكريات: ننسّق لحظة من الحنان النادر، معلّقة فوق السحاب." },
    { label: "عيد ميلاد", title: "عام إضافي، وارتفاع إضافي.", desc: "من عشاء النجوم إلى شمبانيا الكرو الكبرى، من قائمة تشغيل حميمة إلى كعكة استثنائية من طاهٍ شهير. سواء كنتما اثنين أو اثني عشر، يصبح عيد ميلادك وجهة بحد ذاته، يُحتفل به حيث لن ينساه أحد." },
    { label: "زفاف", title: "قول “نعم”، أقرب إلى النجوم.", desc: "مراسم استثنائية، شهر عسل يبدأ منذ الإقلاع، أو رحلة العروسين إلى وجهة الأحلام. مقصورة مكسوّة بالأبيض، بتلات، شمبانيا معتّقة وخدمة بالغة التكتم: نحوّل أجمل يوم إلى ذكرى لا تُضاهى." },
  ],
};

const FINAL: Record<string, { eyebrow: string; title: string; desc: string; cta: string }> = {
  fr: { eyebrow: "ORGANISATION CLÉ EN MAIN", title: "Une seule équipe, chaque détail", desc: "De la scénographie de la cabine au choix du traiteur, des fleurs au photographe à bord, notre conciergerie événementielle prend tout en charge. Vous n'avez qu'à savourer l'instant.", cta: "Imaginer mon événement" },
  en: { eyebrow: "TURNKEY ORGANISATION", title: "One team, every detail", desc: "From cabin scenography to catering, from flowers to the onboard photographer, our events concierge handles everything. You simply savour the moment.", cta: "Imagine my event" },
  zh: { eyebrow: "全程托管", title: "一支团队，每个细节", desc: "从客舱布景到餐饮甄选，从鲜花到机上摄影师，我们的活动礼宾团队全权负责。您只需尽享此刻。", cta: "构想我的活动" },
  ar: { eyebrow: "تنظيم متكامل", title: "فريق واحد، كل التفاصيل", desc: "من تصميم المقصورة إلى اختيار المطعم، ومن الأزهار إلى المصوّر على المتن، تتولى خدمة الفعاليات لدينا كل شيء. ما عليك سوى الاستمتاع باللحظة.", cta: "لنتخيّل فعاليتي" },
};

// Étoiles dorées scintillantes — positions fixes (déterministes)
const STARS = [
  { top: "8%", left: "10%", delay: "0s" },
  { top: "15%", left: "84%", delay: "1.2s" },
  { top: "30%", left: "16%", delay: "0.6s" },
  { top: "42%", left: "88%", delay: "1.8s" },
  { top: "56%", left: "8%", delay: "0.9s" },
  { top: "68%", left: "82%", delay: "2.2s" },
  { top: "80%", left: "24%", delay: "1.5s" },
  { top: "90%", left: "64%", delay: "0.3s" },
];

const EVT_ICON = {
  width: 40, height: 40, fill: "none", viewBox: "0 0 24 24",
  stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round",
} as const;

// Poussette — Baby Shower
function IconBabyCarriage() {
  return (
    <svg {...EVT_ICON}>
      <path d="M4 13a8 8 0 0 1 16 0z" />
      <path d="M4 13h16" />
      <path d="M20 13V6h2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
}
// Gâteau — Anniversaire
function IconCake() {
  return (
    <svg {...EVT_ICON}>
      <path d="M4 20h16v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8z" />
      <path d="M4 15c1.3 0 1.3 1 2.6 1S8 15 9.3 15s1.3 1 2.7 1 1.3-1 2.6-1 1.4 1 2.7 1 1.3-1 2.7-1" />
      <path d="M8 10V7M12 10V6M16 10V7" />
      <path d="M8 4.5c0 .8-.6 1-.6 1M12 3.5c0 .9-.6 1.1-.6 1.1M16 4.5c0 .8-.6 1-.6 1" />
    </svg>
  );
}
// Diamant — Mariage
function IconDiamond() {
  return (
    <svg {...EVT_ICON}>
      <path d="M6 3h12l3 5-9 13L3 8z" />
      <path d="M3 8h18" />
      <path d="M9 3 7.5 8 12 21M15 3l1.5 5L12 21" />
    </svg>
  );
}

const EVENT_ICONS = [IconBabyCarriage, IconCake, IconDiamond];

// Baguette magique — bloc final
function IconWand() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21 16 10" />
      <path d="M15 3l.9 2.1L18 6l-2.1.9L15 9l-.9-2.1L12 6l2.1-.9z" />
      <path d="M19.5 11l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" />
    </svg>
  );
}

export default function EvenementsPage() {
  const { lang } = useLanguage();
  const events = EVENTS[lang] || EVENTS.fr;
  const final = FINAL[lang] || FINAL.fr;

  return (
    <>
      <Navbar />
      <main className="bg-navy">
        {/* Hero */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "60vh", backgroundColor: "#0A1628", paddingTop: "72px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cabine.png"
            alt="Cabine événement jet privé"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(10,22,40,0.55), rgba(10,22,40,0.72))" }} />
          <div className="relative z-10 text-center px-6 py-20" style={{ maxWidth: "820px" }}>
            <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, fontSize: "14px", letterSpacing: "6px", color: "#E8C77E", textShadow: "0 1px 6px rgba(0,0,0,0.6)", marginBottom: "18px" }}>
              {BADGE[lang] || BADGE.fr}
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 50px)", lineHeight: 1.15, color: "#FFFFFF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {TITLE_PLAIN[lang] || TITLE_PLAIN.fr}
              <span style={{ fontStyle: "italic", color: "#E8C77E" }}>{TITLE_ACCENT[lang] || TITLE_ACCENT.fr}</span>
            </h1>
            <p className="mx-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "19px", color: "#f8f5f0", lineHeight: 1.7, maxWidth: "600px", marginTop: "18px", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              {SUBTITLE[lang] || SUBTITLE.fr}
            </p>
          </div>
        </section>

        {/* Ambiance événementielle — style éditorial (100% CSS pur) */}
        <div className="detente-spa">
          <div className="detente-spa__halo" aria-hidden="true" />
          {STARS.map((s, i) => (
            <span key={i} className="spa-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true" />
          ))}

          {/* Entrées éditoriales numérotées */}
          <section className="relative" style={{ padding: "80px 8% 40px", zIndex: 1 }}>
            <div className="max-w-4xl mx-auto">
              {events.map((evt, i) => {
                const Icon = EVENT_ICONS[i] ?? EVENT_ICONS[0];
                return (
                  <div key={i} className="evt-entry">
                    <div className="evt-entry__left">
                      <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "22px", color: "#C9A96E" }}>
                        {`Nº 0${i + 1}`}
                      </span>
                      <span style={{ color: "#E8C77E", display: "flex" }} aria-hidden="true"><Icon /></span>
                    </div>
                    <div className="evt-entry__body">
                      <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "12px" }}>
                        {evt.label}
                      </p>
                      <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(24px, 3.5vw, 30px)", lineHeight: 1.25, color: "#FFFFFF", marginBottom: "16px" }}>
                        {evt.title}
                      </h2>
                      <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bloc final — Organisation clé en main (épuré, centré) */}
          <section className="relative text-center" style={{ padding: "60px 8% 100px", zIndex: 1 }}>
            <div className="max-w-2xl mx-auto">
              <span style={{ color: "#E8C77E", display: "inline-flex", marginBottom: "20px" }} aria-hidden="true"><IconWand /></span>
              <p className="uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.3em", color: "#C9A96E", marginBottom: "12px" }}>
                {final.eyebrow}
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, color: "#FFFFFF", marginBottom: "18px" }}>
                {final.title}
              </h2>
              <p className="mx-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "560px", marginBottom: "36px" }}>
                {final.desc}
              </p>
              <Link href="/contact" className="pet-cta">
                {final.cta}
              </Link>
            </div>
          </section>
        </div>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
