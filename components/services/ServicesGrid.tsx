"use client";

import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { getTags } from "@/lib/services-utils";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ServicesGridProps {
  services: Service[];
  selectedCategory: string;
}

export default function ServicesGrid({
  services,
  selectedCategory,
}: ServicesGridProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {services.map((service, index) => {
            const tags = getTags(service.category, service.name);
            return (
              <ServiceCard
                key={service.id}
                service={service}
                tags={tags}
                index={index}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Servis yoksa mesaj */}
      <AnimatePresence>
        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 sm:py-16"
          >
            <motion.p
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-gray-500 text-base sm:text-lg"
            >
              Bu kategoride henüz servis bulunmamaktadır.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

