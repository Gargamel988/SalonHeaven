import React, { useState } from "react";
import servicesData from "@/app/data/Services.json";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

interface Services {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ServicesData {
  services: Services[];
}

interface ServicesSectionProps {
  selectedServices: Services[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Services[]>>;
}

export default function ServicesSection({ selectedServices, setSelectedServices }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("saç bakımı");

  const data = servicesData as ServicesData;
  const services = Array.isArray(data.services) ? data.services : [];

  const categories = services.map((service: Services) => service.category);
  const uniqueCategories = [...new Set(categories)];
  const filteredServices = selectedCategory
    ? services.filter(
        (service: Services) => service.category === selectedCategory
      )
    : [];

  const categoryDescriptions: { [key: string]: string } = {
    "saç kesimi": "Profesyonel saç kesimi hizmetleri ile hayalinizdeki görünüme kavuşun",
    "saç boyama": "Modern boyama teknikleri ile saçlarınıza renk katın",
    "saç bakımı": "Saçlarınızın sağlığı ve güzelliği için özel bakım hizmetleri",
    "lazer": "Kalıcı çözüm için lazer epilasyon hizmetleri",
    "Makyaj": "Özel günleriniz için profesyonel makyaj hizmetleri",
    "Manikür": "Ellerinizin güzelliği için bakım ve tasarım hizmetleri",
    "Kaş & Kirpik": "Yüz hatlarınızı öne çıkaran kaş ve kirpik bakımı",
    "Gelin Paketi": "Düğün gününüz için özel hazırlanmış paketler"
  };

  return (
    <section className="container flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full">
      {/* Kategori Butonları */}
      <div className="flex flex-wrap justify-start items-center gap-2 sm:gap-2.5">
        {uniqueCategories.map((category: string) => (
          <motion.button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#FF1770] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Seçilen Kategori Başlığı ve Açıklaması */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-2"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF1770] mb-1 sm:mb-2">
            {selectedCategory}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            {categoryDescriptions[selectedCategory] || "Bu kategorideki hizmetleri görüntülüyorsunuz"}
          </p>
        </motion.div>
      )}

      {/* Servis Kartları */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredServices.map((service: Services, index: number) => {
            const handleClick = () => {
              if (selectedServices.some((s) => s.id === service.id)) {
                setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
              } else {
                setSelectedServices([...selectedServices, service]);
              }
            };

            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={handleClick}
            
              className="cursor-pointer touch-manipulation select-none"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              <Card
                className={`rounded-xl overflow-hidden relative border-2 transition-all duration-300 cursor-pointer group h-full ${
                  selectedServices.some((s) => s.id === service.id)
                    ? "bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] border-[#FF1770] text-white shadow-lg"
                    : "bg-white border-gray-200 hover:border-[#FF1770] hover:shadow-lg shadow-sm"
                }`}
              >
                {selectedServices.some((s) => s.id === service.id) && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 bg-white rounded-full p-1 sm:p-1.5 shadow-md pointer-events-none">
                    <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF1770]" />
                  </div>
                )}
                <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gray-100">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={200}
                    height={200}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      selectedServices.some((s) => s.id === service.id)
                        ? "opacity-80"
                        : "group-hover:scale-105"
                    }`}
                  />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <CardTitle className={`text-sm sm:text-base font-bold mb-1 sm:mb-2 line-clamp-1 ${
                    selectedServices.some((s) => s.id === service.id) ? "text-white" : "text-gray-900"
                  }`}>
                    {service.name}
                  </CardTitle>
                  <CardDescription className={`text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 ${
                    selectedServices.some((s) => s.id === service.id) ? "text-white/90" : "text-gray-600"
                  }`}>
                    {service.description}
                  </CardDescription>
                  <p className={`text-sm sm:text-base font-bold ${
                    selectedServices.some((s) => s.id === service.id) 
                      ? "text-white" 
                      : "text-[#FF1770]"
                  }`}>
                    {selectedServices.some((s) => s.id === service.id) ? "✓ Seçildi" : `₺${service.price}`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Lütfen bir kategori seçin</p>
        </div>
      )}

      {/* Seçilen Hizmetler Özeti */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 sm:p-4 bg-gradient-to-r from-[#FF1770]/10 to-[#FF4D8A]/10 rounded-lg sm:rounded-xl border-2 border-[#FF1770]/20 shadow-md"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-1 h-5 sm:h-6 bg-[#FF1770] rounded-full" />
            <p className="text-xs sm:text-sm font-bold text-[#FF1770]">
              Seçilen Hizmetler ({selectedServices.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {selectedServices.map((service) => (
              <motion.span
                key={service.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-full text-[10px] sm:text-xs font-medium text-gray-700 border border-gray-300 hover:border-[#FF1770] hover:bg-[#FF1770]/5 transition-all duration-200"
              >
                {service.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
