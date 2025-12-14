"use client";

import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-[90px] md:top-24 z-20 bg-white border-b border-gray-200 shadow-sm w-full overflow-hidden"
    >
      <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth py-3 sm:py-4 touch-pan-x">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-6 lg:px-8" style={{ minWidth: 'max-content' }}>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all duration-300 shrink-0 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#EE6983] to-[#FF1770] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <motion.span
                animate={{
                  rotate:
                    selectedCategory === category.id
                      ? [0, -10, 10, -10, 0]
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg"
              >
                {category.icon}
              </motion.span>
              <span className="font-medium text-xs sm:text-sm md:text-base">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

