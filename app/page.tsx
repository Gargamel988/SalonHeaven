import HeroSection from "@/components/home/HeroSection";
import StatsAndWhySection from "@/components/home/StatsAndWhySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImageComparisonSlider from "@/components/home/ImageComparisonSlider";
import CTASection from "@/components/home/CTASection";
import { Metadata } from "next";

// app/page.tsx
export const metadata: Metadata = {
  title: "Ana Sayfa", // template ile → "Heaven Salon | Ana Sayfa"
  description: "Antakya'nın en kaliteli güzellik ve bakım merkezi. Saç bakımı, cilt bakımı, epilasyon ve daha fazlası.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Heaven Salon - Antakya Güzellik Salonu",
    description: "Antakya'nın en kaliteli güzellik ve bakım merkezi.",
    images: [
      {
        url: "/og-home.jpg", // Ana sayfaya özel görsel
        width: 1200,
        height: 630,
        alt: "Heaven Salon Antakya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heaven Salon - Antakya Güzellik Salonu",
    description: "Antakya'nın en kaliteli güzellik ve bakım merkezi.",
  },
};

export default function Home() {
  
  return (
    <>
      <HeroSection />
      <StatsAndWhySection />
      <FeaturesSection />
      <ImageComparisonSlider />
      <CTASection />
    </>
  );
}
