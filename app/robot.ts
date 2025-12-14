import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/not-found"],
      },
    ],
    sitemap: `https://heavensalon.com/sitemap.xml`,
  };
}
