import servicesData from "../data/Services.json";
import { getCategoriesFromData } from "@/lib/services-utils";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hizmetlerimiz",
  description: "Heaven Salon hizmetleri: Saç bakımı, saç boyama, cilt bakımı, el & ayak bakımı, kaş & kirpik, lazer ve epilasyon hizmetleri. Antakya'nın en kaliteli güzellik merkezi.",
  path: "/services",
});

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
