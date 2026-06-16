import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ServicesSection from "@/components/home/ServicesSection";
import ConciergerieSection from "@/components/home/ConciergerieSection";
import OnboardExperiencesSection from "@/components/home/OnboardExperiencesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import MembershipsSection from "@/components/home/MembershipsSection";
import CharterManagementSection from "@/components/home/CharterManagementSection";
import FAQSection from "@/components/home/FAQSection";
import WeatherBand from "@/components/home/WeatherBand";
import ContactCTASection from "@/components/home/ContactCTASection";
import GoldParticles from "@/components/ui/GoldParticles";

export default function HomePage() {
  return (
    <>
      <GoldParticles />
      <Navbar />
      <main>
        <HeroSection />
        <WhyUsSection />
        <StatsSection />
        <ExperienceSection />
        <ServicesSection />
        <ConciergerieSection />
        <OnboardExperiencesSection />
        <HowItWorksSection />
        <MembershipsSection />
        <CharterManagementSection />
        <FAQSection />
        <WeatherBand />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
