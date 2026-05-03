import React from "react";
import Script from "next/script";


interface JsonLdProps {
  data: any;
}

/**
 * A reusable JSON-LD component for structured data.
 * Rule #8: JSON-LD Structured Data is mandatory for Product, Article, and FAQ pages.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data);

  return (
    <Script
      id="json-ld-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
