import HeroSection from "@/components/home/HeroSection";
import StatsAndWhySection from "@/components/home/StatsAndWhySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImageComparisonSlider from "@/components/home/ImageComparisonSlider";
import CTASection from "@/components/home/CTASection";
import { Metadata } from "next";

// app/page.tsx
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Heaven Salon | Antakya'nın Güzellik ve Bakım Merkezi",
  description: "Antakya'nın en kaliteli güzellik ve bakım merkezi. Saç bakımı, cilt bakımı, epilasyon ve daha fazlası.",
  path: "/",
});

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
