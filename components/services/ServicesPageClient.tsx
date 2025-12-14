"use client";

import { useState, useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import ServicesGrid from "./ServicesGrid";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ServicesPageClientProps {
  services: Service[];
  categories: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
}

export default function ServicesPageClient({
  services,
  categories,
}: ServicesPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Kategoriye göre servisleri filtrele
  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") {
      return services;
    }
    return services.filter(
      (service) => service.category === selectedCategory
    );
  }, [selectedCategory, services]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ServicesGrid
        services={filteredServices}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

