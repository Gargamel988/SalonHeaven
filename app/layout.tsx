import "./globals.css";
import Headers from "@/components/Headers";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import Providers from "./providers";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

};

export const metadata: Metadata = {
  title: {
    default: "Heaven Salon",
    template: " Heaven Salon | %s ",
  },
  description: "Antakya'nın en kaliteli güzellik ve bakım merkezi. Saç bakımı, cilt bakımı, epilasyon ve daha fazlası.",
  keywords: [
    "Antakya kuaför",
    "Antakya güzellik salonu",
    "Hatay kuaför",
    "Antakya epilasyon",
    "Antakya saç bakımı",
    "Antakya cilt bakımı",
    "Antakya manikür pedikür",
    "Heaven Salon Antakya",
    "Heaven Salon Hatay",
    "Heaven Salon güzellik merkezi",
    "Antakya'da en iyi kuaför",
    "Hatay'da lazer epilasyon",
  ],
  alternates: {
    canonical: "/"
  
  },
  metadataBase: new URL("https://heavenkuafor.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Heaven Salon",
    description:
      "Antakya'nın en kaliteli güzellik ve bakım merkezi. Saç bakımı, cilt bakımı, epilasyon ve daha fazlası.",
    siteName: "Heaven Salon",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Heaven Salon",
        type: "image/png",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


const gingerBrand = localFont({
  src: "../fonts/GingerBrand.otf",
  variable: "--font-ginger-brand",
  preload: true,
  display: "swap",
});



const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  preload: true,
  display: "swap",
});
const interFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Heaven Salon",
    "description": "Antakya'nın en kaliteli güzellik ve bakım merkezi",
    "url": "https://heavenkuafor.com",
    "telephone": "+90-326-XXX-XXXX",
    "priceRange": "$$",
    
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kurtuluş Caddesi No:123",
      "addressLocality": "Antakya",
      "addressRegion": "Hatay",
      "postalCode": "31000",
      "addressCountry": "TR"
    },
    
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.2020",
      "longitude": "36.1609"
    },
    
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
    ],
    
    "image": [
      "https://heavenkuafor.com/logo.png",
    ],
  };
  return (
    <html lang="tr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className={`${gingerBrand.variable}  ${cormorantGaramond.variable} ${interFont.className}`}>
        <Providers>
          <Headers />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
