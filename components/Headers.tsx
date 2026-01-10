"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import StaggeredMenu, { StaggeredMenuSocialItem } from "./StaggeredMenu";
import { StaggeredMenuItem } from "./StaggeredMenu";

export default function Headers() {
  const pathname = usePathname();

  const normalizedPathname =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
  const logoVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const navLinks: { label: string; link: string }[] = [
    { label: "Anasayfa", link: "/" },
    { label: "Hizmetlerimiz", link: "/services" },
    { label: "Hakkımızda", link: "/about" },
  ];
  const StaggeredMenuItems: StaggeredMenuItem[] = [
    { label: "Anasayfa", ariaLabel: "Anasayfa", link: "/" },
    { label: "Hizmetlerimiz", ariaLabel: "Hizmetlerimiz", link: "/services" },
    { label: "Hakkımızda", ariaLabel: "Hakkımızda", link: "/about" },
    { label: "Randevu Al", ariaLabel: "Randevu Al", link: "/booking" },
  ];
  const staggeredMenuItems = StaggeredMenuItems.map((link) => ({
    label: link.label,
    ariaLabel: link.label,
    link: link.link,
  }));

  const staggeredMenuSocialItems: StaggeredMenuSocialItem[] = [
    {
      label: "Instagram",
      link: "https://www.instagram.com/heavenn_beauty?utm_source=qr&igsh=dTQ0N3hzbG53bzRt",
    },
    { label: "tiktok", link: "https://www.tiktok.com/@heaven_salon" },
  ];

  return (
    <>
      {/* Mobile Menu - StaggeredMenu */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50  ">
        <StaggeredMenu
          items={staggeredMenuItems}
          position="right"
          colors={["#EE6983", "#DC7090", "#FF1770"]}
          accentColor="#EE6983"
          isFixed={true}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#EE6983"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          logoUrl="/logo.webp"
          closeOnClickAway={false}
          socialItems={staggeredMenuSocialItems}
        />
      </div>

      {/* Desktop Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 bg-white p-3 md:p-4 px-4 md:px-6 lg:px-10  justify-between items-center shadow-sm hidden md:flex"
      >
        <motion.div
          variants={logoVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center font-bold text-xl md:text-2xl gap-1.5 md:gap-2 "
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Image
              src="/logo.webp"
              alt="logo"
              width={100}
              height={100}
              className="size-8 md:size-10 rounded-full lg:size-12 text-[#EE6983]"
              priority={true}
            />
          </motion.div>
          <Link
            href="/"
            className="text-[#EE6983]  flex flex-col text-xl md:text-2xl"
          >
            Salon<span>Heaven</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex gap-4 md:gap-6 lg:gap-10 items-center font-family-cormorant-garamond text-base md:text-lg lg:text-xl"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.link}
              variants={navItemVariants}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group cursor-pointer p-1 md:p-2 relative"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.link}
                  prefetch={true}
                  className={`text-black group-hover:text-[#EE6983] transition-colors duration-200 whitespace-nowrap ${normalizedPathname === link.link ? "text-[#EE6983]" : ""
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
              {normalizedPathname === link.link && (
                <motion.div
                  layoutId="activeBorder"
                  initial={false}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE6983]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={buttonVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="group cursor-pointer font-family-cormorant-garamond text-sm md:text-base lg:text-xl px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#EE6983] to-[#DC7090] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)",
          }}
        >
          <Link
            href="/booking"
            prefetch={true}
            className="text-white p-2 md:p-3 whitespace-nowrap"
          >
            Hemen Randevu Al!
          </Link>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#DC7090] via-[#EE6983] to-[#FF1770] opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
