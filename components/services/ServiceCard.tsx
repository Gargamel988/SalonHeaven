"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ServiceCardProps {
  service: Service;
  tags: string[];
  index: number;
}

export default function ServiceCard({ service, tags, index }: ServiceCardProps) {
  const displayPrice = service.price === 0 ? "Fiyat Sorun" : `${service.price}₺`;
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Görsel Container */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full"
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        {/* Fiyat Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-[#EE6983] to-[#FF1770] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold text-white"
        >
          {displayPrice}
        </motion.div>
      </div>

      {/* İçerik */}
      <div className="p-4 sm:p-5">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="text-lg sm:text-xl font-bold text-gray-900 mb-2"
        >
          {service.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2"
        >
          {service.description}
        </motion.p>

        {/* Tag'ler */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.6 + tagIndex * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1 }}
              className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-full"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Randevu Al Butonu */}
        <motion.button
          onClick={() => router.push("/booking")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(238, 105, 131, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full cursor-pointer bg-gradient-to-r from-[#EE6983] to-[#FF1770] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold"
        >
          Randevu Al →
        </motion.button>
      </div>
    </motion.div>
  );
}

