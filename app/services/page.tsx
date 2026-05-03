import servicesData from "../data/Services.json";
import { getCategoriesFromData } from "@/lib/services-utils";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { buildPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";

export const metadata = buildPageMetadata({
  title: "Hizmetlerimiz",
  description: "Heaven Salon hizmetleri: Saç bakımı, saç boyama, cilt bakımı, el & ayak bakımı, kaş & kirpik, lazer ve epilasyon hizmetleri. Antakya'nın en kaliteli güzellik merkezi.",
  path: "/services",
});

export default function Services() {
  const categories = getCategoriesFromData();
  const services = servicesData.services;

  // JSON-LD ItemList for services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Heaven Salon Hizmetleri",
    "description": "Profesyonel saç, cilt ve vücut bakım hizmetlerimiz.",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "TRY"
        }
      }
    }))
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main>
        <h1 className="sr-only">Heaven Salon Hizmetlerimiz</h1>
        <ServicesPageClient
          services={services}
          categories={categories}
        />
      </main>
    </>
  );
}
