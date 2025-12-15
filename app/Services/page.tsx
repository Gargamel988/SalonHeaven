import servicesData from "../data/Services.json";
import { getCategoriesFromData } from "@/lib/services-utils";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Heaven Salon hizmetleri: Saç bakımı, saç boyama, cilt bakımı, el & ayak bakımı, kaş & kirpik, lazer ve epilasyon hizmetleri. Antakya'nın en kaliteli güzellik merkezi.",
  alternates: {
    canonical: "/Services",
  },
  openGraph: {
    title: "Hizmetlerimiz - Heaven Salon Antakya",
    description: "Saç bakımı, cilt bakımı, epilasyon ve daha fazlası. Antakya'nın en kaliteli güzellik merkezi.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Heaven Salon Hizmetler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetlerimiz - Heaven Salon",
    description: "Antakya'nın en kaliteli güzellik ve bakım merkezi hizmetleri.",
  },
};

export default function Services() {
  const categories = getCategoriesFromData();
  const services = servicesData.services;

  return (
    <ServicesPageClient
      services={services}
      categories={categories}
    />
  );
}
