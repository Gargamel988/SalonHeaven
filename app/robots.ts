import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/not-found", "/admin/", "/api/", "/dashboard/"],
      },
    ],
    sitemap: `https://heavenkuafor.com/sitemap.xml`,
  };
}
