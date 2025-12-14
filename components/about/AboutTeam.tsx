"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const team = [
    {
      name: "Gamzecan Turunç",
      title: "Kurucu & Salon Sahibi",
      experience: "15 yıl tecrübe",
      initial: "G",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      name: "Sevcan Okaya",
      title: "Saç & Kıl Uzmanı",
      experience: "10 yıl tecrübe",
      initial: "S",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      name: "İsmail Abatay",
      title: "Saç Kaynak Uzmanı",
      experience: "8 yıl tecrübe",
      initial: "İ",
      gradient: "from-pink-400 to-pink-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };



  return (
    <section className="container px-4 py-20 flex flex-col items-center justify-center gap-4">
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-[#EE6983]/10 py-2 px-4 rounded-full w-fit"
      >
        <p className="text-[#FF1770]">Ekibimiz</p>
      </motion.div>

      <motion.h3
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl font-bold text-gray-900"
      >
        Uzman Kadromuz
      </motion.h3>
      <motion.p
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-gray-600"
      >
        Alanında uzman ve deneyimli ekibimiz, size en iyi hizmeti sunmak için
        burada
      </motion.p>
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {team.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className={`bg-gradient-to-r ${item.gradient} rounded-t-2xl h-64 flex items-center justify-center relative overflow-hidden`}
              variants={letterVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.span
                className="text-[120px] font-bold text-white/30 select-none"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {item.initial}
              </motion.span>
            </motion.div>
            <motion.div
              className="p-6 bg-white text-center"
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-1">
                {item.name}
              </h4>
              <p className="text-[#FF1770] font-medium mb-1">{item.title}</p>
              <p className="text-gray-600">{item.experience}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
