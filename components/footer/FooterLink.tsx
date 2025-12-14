"use client";
import Link from "next/link";
import { Moon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaInstagram, FaTiktok, FaTwitter, FaFacebook } from "react-icons/fa";
import Image from "next/image";

type FooterLinkItem = {
  icon: React.ReactNode;
  link: string;
  name: string;
  gradient: string;
  iconColor: string;
};

const footerLinks: FooterLinkItem[] = [
  {
    icon: <FaInstagram className="size-4 sm:size-5 md:size-6" />,
    link: "https://www.instagram.com/heavenn_beauty?utm_source=qr&igsh=dTQ0N3hzbG53bzRt",
    name: "Instagram",
    gradient: "from-purple-600 via-pink-600 to-orange-500",
    iconColor: "text-purple-600",
  },
  {
    icon: <FaTiktok className="size-4 sm:size-5 md:size-6" />,
    link: "https://tiktok.com",
    name: "TikTok",
    gradient: "from-black via-gray-800 to-gray-900",
    iconColor: "text-black",
  },
];

export default function FooterLink() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col gap-3 sm:gap-4 max-w-xs sm:max-w-sm md:max-w-2xs w-full px-4 sm:px-6 md:px-0"
    >
      <motion.div
        variants={logoVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-1.5 sm:gap-2"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Image src="/logo.png" alt="logo" width={100} height={100} className="size-7 sm:size-8 md:size-10 lg:size-12 *:text-[#EE6983] rounded-full" />
        </motion.div>
        <Link
          href="/"
          className="flex flex-col font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#EE6983] to-[#DC7090] bg-clip-text text-transparent hover:from-[#DC7090] hover:to-[#EE6983] transition-all duration-300 leading-tight"
        >
          <motion.span
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Salon
          </motion.span>
          <motion.span
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#DC7090] to-[#EE6983] bg-clip-text text-transparent"
          >
            Heaven
          </motion.span>
        </Link>
      </motion.div>

      <motion.p
        variants={descriptionVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-gray-600 leading-relaxed font-medium text-xs sm:text-sm md:text-base max-w-full"
      >
        Salon Heaven, bir estetik salonudur. Profesyonel ekibimiz ve kaliteli
        hizmetlerimizle güzelliğinizi keşfedin.
      </motion.p>

      <motion.div
        variants={socialContainerVariants}
        className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4"
      >
        {footerLinks.map((item, index) => (
          <motion.div
            key={index}
            variants={socialItemVariants}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div
              className={`rounded-full bg-[#EE6983]/20 hover:bg-gradient-to-br ${item.gradient} backdrop-blur-md border-2 border-white/40 cursor-pointer p-2 sm:p-2.5 md:p-3 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110`}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white group-hover:text-white transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center"
                >
                  {item.icon}
                </motion.div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

