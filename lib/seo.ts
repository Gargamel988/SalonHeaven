import type { Metadata } from "next";

const SITE_URL = "https://heavenkuafor.com";
const DEFAULT_TITLE =
  "Heaven Salon | Antakya'nın En İyi Güzellik ve Bakım Merkezi";
const SITE_SHORT_TITLE = "Heaven Salon";
const DEFAULT_DESCRIPTION =
  "Antakya'da profesyonel saç bakımı, cilt bakımı, lazer epilasyon ve güzellik hizmetleri. Heaven Salon ile güzelliğinize değer katın.";
const DEFAULT_TWITTER = "@heavensalon";
const DEFAULT_OG_IMAGE = {
  url: "/logo.png",
  width: 1200,
  height: 630,
  alt: "Heaven Salon - Antakya Güzellik ve Bakım Merkezi",
};

// Helper to convert relative paths to absolute URLs
const absoluteUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) return SITE_URL;
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  
  // URL constructor handles trailing slashes correctly if path starts with /
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
};

// Normalize image with defaults
const normalizeImage = (image?: OgImageDescriptor) => {
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    url: absoluteUrl(img.url),
    width: img.width ?? DEFAULT_OG_IMAGE.width,
    height: img.height ?? DEFAULT_OG_IMAGE.height,
    alt: img.alt ?? DEFAULT_OG_IMAGE.alt,
  };
};

// Build canonical path with trailing slash (Matching next.config.ts)
const buildCanonicalPath = (path?: string) => {
  if (!path || path === "/") return "/";
  // Ensure starts with / and ends with /
  let normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!normalizedPath.endsWith("/")) {
    normalizedPath = `${normalizedPath}/`;
  }
  return normalizedPath;
};

// Build alternates with languages as per Rule #4
const buildAlternates = (path: string) => {
  const canonical = buildCanonicalPath(path);
  const absoluteCanonical = absoluteUrl(canonical);

  return {
    canonical: canonical,
    languages: {
      "tr-TR": absoluteCanonical,
      "en-US": absoluteUrl(`/en${canonical}`),
      "de-DE": absoluteUrl(`/de${canonical}`),
      "x-default": absoluteCanonical,
    },
  };
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_SHORT_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Heaven Salon", url: SITE_URL }],
  creator: "Heaven Salon",
  publisher: "Heaven Salon",
  keywords: [
    "Heaven Salon",
    "Heaven Salon Antakya",
    "Heaven Güzellik Merkezi Antakya",
    "Antakya kuaför",
    "Hatay kuaför salonu",
    "Antakya bayan kuaför",
    "Antakya saç kesimi",
    "Antakya saç boyama",
    "Antakya keratin bakımı",
    "Antakya güzellik salonu",
    "Antakya cilt bakımı",
    "Antakya lazer epilasyon",
    "Antakya ağda epilasyon",
    "Antakya kaş tasarımı",
    "Antakya kalıcı makyaj",
    "Antakya manikür",
    "Antakya pedikür",
    "Antakya kalıcı oje",
    "Hatay güzellik merkezi",
    "Hatay epilasyon",
    "Defne kuaför",
  ],
  icons: {
    shortcut: "/favicon.ico",
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: buildAlternates("/"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_SHORT_TITLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [normalizeImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: DEFAULT_TWITTER,
    creator: DEFAULT_TWITTER,
    images: [absoluteUrl(DEFAULT_OG_IMAGE.url)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "beauty",
};

type OgImageDescriptor = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: OgImageDescriptor;
  noIndex?: boolean;
};

export const buildPageMetadata = ({
  title,
  description,
  path = "/",
  keywords,
  image,
  noIndex,
}: BuildMetadataOptions): Metadata => {
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const canonicalPath = buildCanonicalPath(path);
  const ogImage = normalizeImage(image);
  const absoluteCanonical = absoluteUrl(canonicalPath);

  const metadata: Metadata = {
    title,
    description: metaDescription,
    keywords,
    alternates: buildAlternates(path),
    openGraph: {
      type: "website",
      siteName: SITE_SHORT_TITLE,
      title: `${title} | ${SITE_SHORT_TITLE}`,
      description: metaDescription,
      url: absoluteCanonical,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_SHORT_TITLE}`,
      description: metaDescription,
      site: DEFAULT_TWITTER,
      creator: DEFAULT_TWITTER,
      images: [ogImage.url],
    },
  };

  if (typeof noIndex === "boolean") {
    metadata.robots = {
      index: !noIndex,
      follow: !noIndex,
    };
  }

  return metadata;
};

