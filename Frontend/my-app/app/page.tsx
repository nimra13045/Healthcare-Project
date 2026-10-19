import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import HowItWorks from "@/components/home/HowItWorks";
import OnlineConsultation from "@/components/home/OnlineConsultation";
import InternshipsSection from "@/components/home/InternshipsSection";
import AIAssistantSection from "@/components/home/AIAssistantSection";
import CommunitySection from "@/components/home/CommunitySection";
import TrustSection from "@/components/home/TrustSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedDoctors />
      <HowItWorks />
      <OnlineConsultation />
      <InternshipsSection />
      <AIAssistantSection />
      <CommunitySection />
      <TrustSection />
      <Footer />
    </main>
  );
}