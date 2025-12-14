import servicesData from "@/app/data/Services.json";

// Kategori ikonları mapping
export const categoryIcons: Record<string, string> = {
  "saç bakımı": "✂️",
  "saç boyama": "🎨",
  "cilt bakımı": "💆",
  "el & ayak bakımı": "💅",
  "kaş & kirpik": "👁️",
  "lazer": "⚡",
  "epilasyon": "🪒",
};

// Kategori isimlerini düzenleme fonksiyonu
export const formatCategoryName = (category: string): string => {
  const nameMap: Record<string, string> = {
    "saç bakımı": "Saç Bakımı",
    "saç boyama": "Boyama",
    "cilt bakımı": "Cilt Bakımı",
    "el & ayak bakımı": "El & Ayak Bakımı",
    "kaş & kirpik": "Kaş & Kirpik",
    "lazer": "Lazer",
    "epilasyon": "Epilasyon",
  };
  return nameMap[category] || category;
};

// Kategorileri Services.json'dan çek
export const getCategoriesFromData = () => {
  const uniqueCategories = Array.from(
    new Set(servicesData.services.map((service) => service.category))
  );

  return [
    { id: "all", name: "Tümü", icon: "⭐", category: "all" },
    ...uniqueCategories.map((category) => ({
      id: category,
      name: formatCategoryName(category),
      icon: categoryIcons[category] || "✨",
      category: category,
    })),
  ];
};

// Kategoriye göre tag'ler
export const getTags = (category: string, name: string): string[] => {
  if (category === "saç bakımı") {
    if (name.includes("Fön") || name.includes("Maşa")) {
      return ["Yıkama", "Fön", "Şekillendirme"];
    }
    return ["Saç Analizi", "Yıkama", "Bakım", "Fön"];
  }
  if (category === "saç boyama") {
    return ["Renk Danışmanlığı", "Premium Boya", "Bakım"];
  }
  if (category === "cilt bakımı") {
    return ["Cilt Analizi", "Temizleme", "Bakım"];
  }
  if (category === "el & ayak bakımı") {
    return ["El Bakımı", "Oje", "Şekillendirme"];
  }
  if (category === "kaş & kirpik") {
    return ["Tasarım", "Şekillendirme"];
  }
  return ["Profesyonel", "Kaliteli"];
};

