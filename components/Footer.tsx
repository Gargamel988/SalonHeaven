"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FooterLink from "./footer/FooterLink";
import CalculateFooter from "./footer/CalculateFooter";
import ContactFooter from "./footer/ContactFooter";
import MapFooter from "./footer/MapFooter";

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-[#EE6983]/10 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-6 sm:gap-8 md:gap-6 lg:gap-8 justify-between container mx-auto"
      >
        <FooterLink />
        <CalculateFooter />
        <ContactFooter />
      </motion.div>
      <MapFooter />
    </motion.div>
  );
}
