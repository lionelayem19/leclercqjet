import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import NotreHistoireSection from "@/components/home/NotreHistoireSection";
import BookBlock from "@/components/ui/BookBlock";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ServicesSection from "@/components/home/ServicesSection";
import ConciergerieSection from "@/components/home/ConciergerieSection";
import SignatureWellnessSection from "@/components/home/SignatureWellnessSection";
import OnboardExperiencesSection from "@/components/home/OnboardExperiencesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import MembershipsSection from "@/components/home/MembershipsSection";
import CharterManagementSection from "@/components/home/CharterManagementSection";
import FAQSection from "@/components/home/FAQSection";
import WeatherBand from "@/components/home/WeatherBand";
import ContactCTASection from "@/components/home/ContactCTASection";
import GoldParticles from "@/components/ui/GoldParticles";
import SectionBlend from "@/components/ui/SectionBlend";

// Couleurs de fond des sections (utilisées pour fondre les jonctions)
const NAVY = "#0A1628";
const IVOIRE = "#f8f5f0";
const WHITE = "#ffffff";
const FOOTER = "#030810";

export default function HomePage() {
  return (
    <>
      <GoldParticles />
      <Navbar />
      <main>
        <HeroSection />
        <NotreHistoireSection />
        <BookBlock />
        <div
          aria-hidden="true"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, #0A1628, #f8f5f0)",
          }}
        />
        <WhyUsSection />
        <SectionBlend from={IVOIRE} to={NAVY} />
        <StatsSection />
        <ExperienceSection />
        <SectionBlend from={NAVY} to={WHITE} />
        <ServicesSection />
        <div
          aria-hidden="true"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, #f8f5f0, #0A1628)",
          }}
        />
        <ConciergerieSection />
        <SignatureWellnessSection />
        <OnboardExperiencesSection />
        <SectionBlend from={NAVY} to={IVOIRE} />
        <HowItWorksSection />
        <SectionBlend from={IVOIRE} to={NAVY} />
        <MembershipsSection />
        <CharterManagementSection />
        <SectionBlend from={NAVY} to={IVOIRE} />
        <FAQSection />
        <SectionBlend from={IVOIRE} to={NAVY} />
        <WeatherBand />
        <SectionBlend from={NAVY} to={IVOIRE} />
        <ContactCTASection />
        <SectionBlend from={IVOIRE} to={FOOTER} />
      </main>
      <Footer />
    </>
  );
}
