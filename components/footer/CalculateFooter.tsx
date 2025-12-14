"use client";
import { Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const workingHours = [
  { day: "Pazartesi - çarşamba", time: "08:30 - 22:00" },
  { day: "Perşembe - Cuma", time: "08:30 - 20:00" },
  { day: "Cumartesi", time: "08:30 - 22:00" },
  { day: "Pazar", time: "08:30 - 22:00" },
];

export default function CalculateFooter() {
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
        className="flex items-start flex-row gap-2"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="size-5 sm:size-6 text-red-500" />
        </motion.div>
        <p className="font-bold text-red-500 text-sm sm:text-base md:text-lg">Çalışma Saatleri</p>
      </motion.div>
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {workingHours.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-row gap-2 sm:gap-3 justify-between items-start"
          >
            <p className="font-bold text-xs sm:text-sm md:text-base flex-shrink-0">{item.day}</p>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base text-right">{item.time}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

