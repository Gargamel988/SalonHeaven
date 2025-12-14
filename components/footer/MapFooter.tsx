"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export default function MapFooter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const salonAddress =
    "Yağmur Apart, Zülüflühan Mahallesi, 2 Sokak, 31100 Antakya/Hatay";
  const encodedAddress = encodeURIComponent(salonAddress);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}&hl=tr&z=15&output=embed`;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // easeOut easing curve
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto mt-6 sm:mt-8 px-4 sm:px-6 md:px-8 lg:px-0"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl h-64 sm:h-72 md:h-80"
      >
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Heaven Salon Konum"
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
}

