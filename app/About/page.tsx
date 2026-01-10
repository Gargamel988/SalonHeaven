import AboutSection from "@/components/about/AboutSection";
import ValuesSection from "@/components/about/ValuesSection";
import AboutTeam from "@/components/about/AboutTeam";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Heaven Salon hakkında bilgi edinin. Antakya'da güzellik ve bakım sektöründe deneyimli ekibimiz, değerlerimiz ve hikayemiz.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Hakkımızda - Heaven Salon Antakya",
    description: "Antakya'da güzellik ve bakım sektöründe deneyimli ekibimiz ve değerlerimiz.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Heaven Salon Hakkımızda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Heaven Salon",
    description: "Antakya'nın en kaliteli güzellik merkezi hakkında bilgi.",
  },
};

export default function About() {
  return (
    <>
      <AboutSection />
      <ValuesSection />
      <AboutTeam />
    </>
  );
}
