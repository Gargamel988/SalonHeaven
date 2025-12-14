"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Stepper from "./Stepper";
import ServicesSection from "./ServicesSection";
import DateSection from "./DateSection";
import FormSection from "./FormSection";
import { BookingFormData } from "@/app/scheme/scheme";
import Link from "next/link";
import { useInsertBooking } from "@/hook/insertbooking";
interface Services {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);
  const [direction, setDirection] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const insertBooking = useInsertBooking();

  const sendToWhatsApp = (data: BookingFormData) => {
    // WhatsApp numarası - .env.local'den al veya direkt yaz
    let whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""; // Kendi numaranızı yazın

    // Numarayı temizle (sadece rakamlar, + işareti kalsın)
    whatsappNumber = whatsappNumber.replace(/[^\d+]/g, "");

    // Seçilen hizmetlerin listesi
    const servicesList = selectedServices
      .map((service) => `• ${service.name} - ₺${service.price}`)
      .join("\n");

    const totalPrice = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // Mesaj formatı
    const message =
      `*Yeni Randevu Talebi*\n\n` +
      `*Ad Soyad:* ${data.fullName}\n` +
      `*Telefon:* ${data.phone}\n` +
      (data.email ? `*E-posta:* ${data.email}\n` : ``) +
      `*Tarih:* ${selectedDate}\n` +
      `*Saat:* ${selectedTime}\n\n` +
      `*Seçilen Hizmetler:*\n${servicesList}\n\n` +
      `*Toplam Tutar:* ₺${totalPrice}\n\n` +
      (data.description ? `*Açıklama:*\n${data.description}\n\n` : ``) +
      `_Bu mesaj web sitesinden otomatik olarak gönderilmiştir._`;

    // URL encode
    const encodedMessage = encodeURIComponent(message);

    // Mobil cihaz tespiti
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Mobilde WhatsApp uygulamasını aç, desktop'ta WhatsApp Web'i aç
    let whatsappUrl: string;
    
    if (isMobile) {
      // iOS için whatsapp:// protokolü (uygulamayı direkt açar ve mesajı gösterir)
      if (isIOS) {
        // iOS'ta numaradan + işaretini kaldır
        const cleanNumber = whatsappNumber.replace(/\+/g, "");
        whatsappUrl = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
      } 
      // Android ve diğer mobil cihazlar için wa.me (mesajı otomatik gösterir)
      else {
        whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      }
    } else {
      // Desktop'ta WhatsApp Web'i aç
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    }

    // Mobilde direkt yönlendirme, desktop'ta yeni sekmede aç
    if (isMobile) {
      if (isIOS) {
        // iOS'ta whatsapp:// protokolü için
        window.location.href = whatsappUrl;
        // Fallback: Eğer WhatsApp açılmazsa api.whatsapp.com'a yönlendir
        setTimeout(() => {
          const cleanNumber = whatsappNumber.replace(/\+/g, "");
          window.location.href = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
        }, 1000);
      } else {
        // Android ve diğer mobil cihazlar için
        window.location.href = whatsappUrl;
      }
    } else {
      const whatsappWindow = window.open(whatsappUrl, "_blank");
      if (!whatsappWindow) {
        alert("Popup engellendi! Lütfen tarayıcı ayarlarından popup izni verin.");
      }
    }
  };

  const handleSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);

      // Supabase'e randevu kaydet
      insertBooking.mutate(
        {
          selected_date: selectedDate || "",
          selected_time: selectedTime || "",
          full_name: data.fullName,
          phone: data.phone,
          email: data.email || "",
          description: data.description || "",
          selected_services: selectedServices.map((service) => ({
            id: service.id,
            name: service.name,
            price: service.price,
          })),
        },
        {
          onSuccess: () => {
            // WhatsApp'a gönder
            sendToWhatsApp(data);
            setSuccess(true);
          },
          onError: (error: Error) => {
            console.error("Booking error:", error);
            alert(error.message || "Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
          },
        }
      );
    } catch (error) {
      console.error("Booking request error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  const handleNext = () => {
    if (currentStep === 1 && selectedServices.length === 0) return;
    if (
      currentStep === 2 &&
      (selectedDate === null || selectedTime === null || selectedTime === "")
    )
      return;
    setDirection(1);
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  if (success) {
    return (
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-2xl"
        >
          {/* Success Icon with animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            {/* Background circle with pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Check icon */}
            <motion.div
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] flex items-center justify-center shadow-2xl"
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <motion.svg
                width="48"
                height="48"
                className="sm:w-14 sm:h-14 md:w-16 md:h-16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            </motion.div>
            {/* Sparkles around */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-80px)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FF1770] to-[#FF4D8A]" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Success text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-4"
          >
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF1770] to-[#FF4D8A] bg-clip-text text-transparent text-center px-4"
            >
              Randevunuz Başarıyla Oluşturuldu!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-base sm:text-lg text-center px-4"
            >
              En kısa sürede sizinle iletişime geçeceğiz.
            </motion.p>
          </motion.div>

          {/* Confetti effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 mt-4"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FF1770] to-[#FF4D8A]"
                animate={{
                  y: [0, -20, 0],
                  x: [0, (i - 2) * 10, 0],
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Back to home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Link href="/" className="w-full sm:w-auto">
              <motion.button
                className="relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF1770] to-[#FF4D8A] text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg shadow-[#FF1770]/30 group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 23, 112, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  initial={false}
                >
                  Anasayfaya Dön
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FF1770]/10 py-2 px-4 rounded-full w-fit"
        >
          <p className="text-[#FF1770] text-sm sm:text-base">Randevu Oluştur</p>
        </motion.div>
        <motion.h4
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center px-4"
        >
          Sadece birkaç adımda randevunuzu oluşturun
        </motion.h4>
      </div>
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] sm:min-h-screen gap-4 sm:gap-6">
        <Stepper currentStep={currentStep} />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex items-center justify-center max-w-7xl mx-auto w-full "
          >
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <ServicesSection
                  selectedServices={selectedServices}
                  setSelectedServices={setSelectedServices}
                />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <DateSection
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <FormSection onSubmit={handleSubmit} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-7xl px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AnimatePresence>
            {currentStep > 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 3 ? "w-full" : "w-full sm:w-1/2"}
              >
                <motion.button
                  onClick={handlePrev}
                  className="relative overflow-hidden w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 group"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "#FF1770",
                    boxShadow: "0 4px 12px rgba(255, 23, 112, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    initial={false}
                  >
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </motion.svg>
                    Geri
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {currentStep < 3 ? (
              <motion.div
                key="ileri"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 1 ? "w-full" : "w-full sm:w-1/2"}
              >
                <motion.button
                  onClick={handleNext}
                  // neden olmuyor
                  disabled={
                    currentStep === 1
                      ? selectedServices.length === 0
                      : currentStep === 2
                      ? selectedDate === null ||
                        selectedTime === null ||
                        selectedTime === ""
                      : false
                  }
                  className={`relative overflow-hidden w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF1770] to-[#FF4D8A] text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg shadow-[#FF1770]/30 group ${
                    currentStep === 1
                      ? selectedServices.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                      : currentStep === 2
                      ? selectedDate === null ||
                        selectedTime === null ||
                        selectedTime === ""
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                      : ""
                  }`}
                  whileHover={
                    currentStep === 1 && selectedServices.length === 0
                      ? {}
                      : currentStep === 2 &&
                        (selectedDate === null ||
                          selectedTime === null ||
                          selectedTime === "")
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: "0 8px 20px rgba(255, 23, 112, 0.4)",
                        }
                  }
                  whileTap={
                    currentStep === 1 && selectedServices.length === 0
                      ? {}
                      : currentStep === 2 &&
                        (selectedDate === null ||
                          selectedTime === null ||
                          selectedTime === "")
                      ? {}
                      : { scale: 0.98 }
                  }
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    initial={false}
                  >
                    İleri
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </motion.svg>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="tamamla"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={
                  currentStep === 3 && currentStep > 1 ? "w-full" : "w-full"
                }
              >
                <motion.button
                  type="submit"
                  form="booking-form"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF1770] via-[#FF4D8A] to-[#FF1770] text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg shadow-[#FF1770]/30 group ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  whileHover={
                    isSubmitting
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(255, 23, 112, 0.5)",
                        }
                  }
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    initial={false}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.svg
                          className="animate-spin"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </motion.svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <motion.svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                        Tamamla
                      </>
                    )}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF1770] via-[#FF4D8A] to-[#FF1770]"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
