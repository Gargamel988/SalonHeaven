"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#EE6983]/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Number */}
        <motion.div
          variants={numberVariants}
          className="mb-6 sm:mb-8"
        >
          <motion.h1
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#EE6983] via-[#FF1770] to-[#EE6983] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Sayfa Bulunamadı
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto"
        >
          Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.
          Ana sayfaya dönerek devam edebilirsiniz.
        </motion.p>

        {/* Animated Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-10 flex justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#EE6983]/20 to-[#FF1770]/20 flex items-center justify-center"
          >
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-[#EE6983]" />
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(238, 105, 131, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#EE6983] to-[#FF1770] text-white px-6 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Ana Sayfaya Dön
            </motion.button>
          </Link>

          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold text-base sm:text-lg hover:border-[#EE6983] hover:text-[#EE6983] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Git
          </motion.button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Popüler Sayfalar:</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { href: "/Services", label: "Hizmetlerimiz" },
              { href: "/About", label: "Hakkımızda" },
              { href: "/Booking", label: "Randevu Al" },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-[#EE6983] hover:text-[#FF1770] font-medium text-sm sm:text-base transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

