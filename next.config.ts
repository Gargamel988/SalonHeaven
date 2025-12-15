import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // React Strict Mode - Geliştirme sırasında potansiyel sorunları yakalar
  reactStrictMode: true,

  // X-Powered-By header'ını kaldır (güvenlik)
  poweredByHeader: false,

  // Trailing slash - URL'lerin sonuna / ekler
  trailingSlash: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Modern image formats için optimizasyon
    formats: ['image/avif', 'image/webp'],
    // Cihaz boyutları için optimizasyon
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes için optimizasyon
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL (4 saat)
    minimumCacheTTL: 14400,
    // Image quality varsayılan olarak 75% (Image component'inde quality prop ile override edilebilir)
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // Compiler optimizations
  compiler: {
    // Production'da console.log'ları kaldır
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info'],
    } : false,
  },

  // Compression
  compress: true,

  // Redirects - www olmayan URL'leri www'ye yönlendir
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?!www\\.)heavenkuafor\\.com',
          },
        ],
        destination: 'https://www.heavenkuafor.com/:path*',
        permanent: true,
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
};

export default nextConfig;
