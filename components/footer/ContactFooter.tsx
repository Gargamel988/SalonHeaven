"use client";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contact = [
  {
    icon: <MapPin className="size-5 sm:size-6 text-red-500" />,
    text: "Yağmur Apart, Zülüflühan Mah., 2 Sokak, Antakya/Hatay",
    link: "https://www.google.com/maps?q=Yağmur+Apart,+Zülüflühan+Mah.,+2+Sokak,+Antakya/Hatay",
  },
  {
    icon: <Phone className="size-5 sm:size-6 text-red-500" />,
    text: "Telefon:+90 507 031 4987",
    link: "tel:+905070314987",
  },
  {
    icon: <Mail className="size-5 sm:size-6 text-red-500" />,
    text: "Email:gamzecanturunç95@gmail.com",
    link: "mailto:gamzecanturunç95@gmail.com",
  },
];

export default function ContactFooter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col max-w-xs sm:max-w-sm md:max-w-2xs w-full px-4 sm:px-6 md:px-0 gap-3 sm:gap-4"
    >
      <motion.div
        variants={headerVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-start gap-2"
      >
        <p className="font-bold text-red-500 text-sm sm:text-base md:text-lg">İletişim</p>
      </motion.div>
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {contact.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex gap-2 sm:gap-2.5 items-start"
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 mt-0.5"
            >
              {item.icon}
            </motion.div>
            <p onClick={() => window.open(item.link, "_blank")} className=" cursor-pointer text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed hover:text-red-500 transition-all duration-300">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

