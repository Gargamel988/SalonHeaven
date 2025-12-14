"use client";

import { motion } from "framer-motion";

export default function Stepper({
  currentStep,
}: {
  currentStep: number;
}) {
  const progressVariants = {
    inactive: {
      backgroundColor: "#e5e7eb",
      scale: 1,
    },
    active: {
      backgroundColor: "#EE6983",
      scale: 1.1,
    },
  };


  return (
      <div className="flex w-full items-center justify-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        {/* Adım 1 */}
        <motion.div
          className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="size-8 sm:size-10 md:size-12 rounded-full flex items-center justify-center"
            variants={progressVariants}
            animate={currentStep >= 1 ? "active" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold">1</p>
          </motion.div>
          <p className="text-gray-500 text-xs sm:text-sm text-center">Hizmet</p>
        </motion.div>

        {/* Çubuk 1 - Adım 1 ve 2 arası */}
        <div className="flex-1 h-0.5 sm:h-1 bg-gray-200 rounded-full relative overflow-hidden mx-2 sm:mx-4 -mt-4 sm:-mt-6">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#EE6983] rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: currentStep >= 2 ? "100%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Adım 2 */}
        <motion.div
          className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="size-8 sm:size-10 md:size-12 rounded-full flex items-center justify-center"
            variants={progressVariants}
            animate={currentStep >= 2 ? "active" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold">2</p>
          </motion.div>
          <p className="text-gray-500 text-xs sm:text-sm text-center">tarih ve saat</p>
        </motion.div>

        {/* Çubuk 2 - Adım 2 ve 3 arası */}
        <div className="flex-1 h-0.5 sm:h-1 bg-gray-200 rounded-full relative overflow-hidden mx-2 sm:mx-4 -mt-4 sm:-mt-6">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#FF1770] rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: currentStep >= 3 ? "100%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Adım 3 */}
        <motion.div
          className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="size-8 sm:size-10 md:size-12 rounded-full flex items-center justify-center"
            variants={progressVariants}
            animate={currentStep === 3 ? "active" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold">3</p>
          </motion.div>
          <p className="text-gray-500 text-xs sm:text-sm text-center">Bilgileriniz</p>
        </motion.div>
      </div>


  );
}
