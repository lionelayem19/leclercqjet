"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
  fr: [
    { q: "Comment réserver un vol privé avec Leclercq'Jet ?", a: "Il vous suffit de remplir notre formulaire de demande en ligne ou de nous contacter directement par téléphone. Notre équipe vous répond dans les plus brefs délais avec une sélection d'appareils disponibles et un devis personnalisé." },
    { q: "Quels sont les délais de réservation ?", a: "Nous pouvons organiser un vol dans des délais très courts pour les destinations européennes, et sous 4 à 6 heures pour les vols intercontinentaux, sous réserve de disponibilité des appareils." },
    { q: "Qu'est-ce qu'un vol partagé et comment en profiter ?", a: "Un vol partagé est un vol de repositionnement d'un appareil sans passager commercial. Nous proposons ces vols à des tarifs réduits jusqu'à 75%. Consultez notre page Vols Partagés pour les disponibilités en temps réel." },
    { q: "Quelle est votre zone de vol ?", a: "Nous couvrons l'Europe, le Moyen-Orient, l'Afrique du Nord, l'Asie et les Amériques. Notre réseau d'opérateurs certifiés nous permet de proposer des départs depuis plus de 300 aéroports." },
    { q: "Comment fonctionne votre service de conciergerie ?", a: "Notre service de conciergerie prend en charge l'intégralité de votre voyage : transfert privé, accès salon FBO, restauration à bord sur mesure, hôtel, activités. Un seul interlocuteur pour toutes vos demandes." },
    { q: "Quelles sont les formules d'abonnement disponibles ?", a: "Nous proposons trois formules : Aube, Azur et Astre. Chaque formule offre des heures de vol prépayées, des tarifs préférentiels, et des services de conciergerie dédiés." },
  ],
  en: [
    { q: "How do I book a private flight with Leclercq'Jet?", a: "Simply fill out our online request form or contact us directly by phone. Our team will respond promptly with a selection of available aircraft and a personalised quote." },
    { q: "What are the booking lead times?", a: "We can arrange a flight at very short notice for European destinations, and within 4 to 6 hours for intercontinental flights, subject to aircraft availability." },
    { q: "What is a shared flight and how can I benefit from it?", a: "A shared flight is a repositioning flight with no commercial passengers. We offer these flights at discounts of up to 75%. Visit our Shared Flights page for real-time availability." },
    { q: "What is your flight coverage area?", a: "We cover Europe, the Middle East, North Africa, Asia and the Americas. Our network of certified operators allows us to offer departures from over 300 airports." },
    { q: "How does your concierge service work?", a: "Our concierge service handles every aspect of your journey: private transfer, FBO lounge access, custom in-flight catering, hotel, activities. One point of contact for all your requests." },
    { q: "What membership plans are available?", a: "We offer three plans: Aube, Azur and Astre. Each includes prepaid flight hours, preferential rates, and dedicated concierge services." },
  ],
  zh: [
    { q: "如何预订Leclercq'Jet私人飞机？", a: "只需填写在线申请表或直接致电。我们的团队将尽快回复，提供可用飞机选择和个性化报价。" },
    { q: "预订提前期是多少？", a: "欧洲目的地可在极短时间内安排，洲际航班为4至6小时，取决于飞机可用性。" },
    { q: "什么是空腿航班？", a: "空腿航班是无商业乘客的调机航班，我们以高达75%的折扣提供此类航班。" },
    { q: "您的飞行覆盖范围？", a: "我们覆盖欧洲、中东、北非、亚洲和美洲，可从300多个机场起飞。" },
    { q: "礼宾服务如何运作？", a: "我们的礼宾服务处理行程每个环节：专车接送、FBO休息室、定制餐饮、酒店及活动。" },
    { q: "有哪些会员方案？", a: "我们提供三种方案：Aube、Azur 和 Astre，均包含预付飞行时数和专属礼宾服务。" },
  ],
  ar: [
    { q: "كيف أحجز رحلة خاصة؟", a: "ما عليك سوى ملء نموذج الطلب أو الاتصال بنا. سيرد فريقنا في أقرب وقت بخيارات الطائرات وعرض سعر مخصص." },
    { q: "ما هي مهل الحجز؟", a: "يمكننا ترتيب رحلة في وقت وجيز للوجهات الأوروبية، و4 إلى 6 ساعات للرحلات القارية." },
    { q: "ما هي رحلة الساق الفارغة؟", a: "رحلة إعادة تموضع بدون مسافرين تجاريين، بخصومات تصل إلى 75%." },
    { q: "ما نطاق رحلاتكم؟", a: "نغطي أوروبا والشرق الأوسط وشمال أفريقيا وآسيا والأمريكتين، من أكثر من 300 مطار." },
    { q: "كيف تعمل خدمة الكونسيرج؟", a: "تتولى خدمتنا كل جوانب رحلتك: النقل الخاص، صالة FBO، الطعام المخصص، الفندق والأنشطة." },
    { q: "ما خطط العضوية المتاحة؟", a: "نقدم ثلاث خطط: Aube وAzur وAstre، تشمل ساعات طيران مدفوعة وخدمات كونسيرج مخصصة." },
  ],
};

const LABELS: Record<string, { badge: string; title: string; subtitle: string }> = {
  fr: { badge: "FAQ", title: "Questions Fréquentes", subtitle: "Tout ce que vous devez savoir avant de réserver." },
  en: { badge: "FAQ", title: "Frequently Asked Questions", subtitle: "Everything you need to know before booking." },
  zh: { badge: "常见问题", title: "常见问题解答", subtitle: "预订前您需要了解的一切。" },
  ar: { badge: "الأسئلة الشائعة", title: "الأسئلة الشائعة", subtitle: "كل ما تحتاج معرفته قبل الحجز." },
};

export default function FAQSection() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = FAQ_DATA[lang] || FAQ_DATA.fr;
  const labels = LABELS[lang] || LABELS.fr;

  return (
    <section
      className="section-pad"
      style={{
        backgroundColor: "#f8f5f0",
        paddingLeft: "8%",
        paddingRight: "8%",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <SectionEyebrow tone="beige">{labels.badge}</SectionEyebrow>
            <h2 className="title-gold font-serif section-title mb-5" style={{ color: "#8B6F3F", WebkitTextFillColor: "#8B6F3F" }}>
              {labels.title}
            </h2>
            <p className="font-sans section-body" style={{ color: "#4b5563" }}>
              {labels.subtitle}
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ borderBottom: "1px solid #F0F0F0" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{ padding: "20px 0", gap: "16px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span className="font-sans font-semibold" style={{ fontSize: "15px", color: "#0A1628", lineHeight: 1.5 }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      color: "#C9A96E",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="font-sans pb-6" style={{ fontSize: "16px", color: "#666666", lineHeight: 1.85 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
