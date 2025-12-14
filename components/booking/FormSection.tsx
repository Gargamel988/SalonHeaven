"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingScheme, BookingFormData } from "@/app/scheme/scheme";
import { Textarea } from "../ui/textarea";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { UserIcon, PhoneIcon, MailIcon, FileTextIcon, Loader2Icon } from "lucide-react";

interface FormSectionProps {
  onSubmit: (data: BookingFormData) => void;
}

export default function FormSection({ onSubmit }: FormSectionProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors ,isLoading ,isReady},
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingScheme),
  });
  const radius = 300;
  const [visible, setVisible] = React.useState(false);
  const [phoneValue, setPhoneValue] = React.useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Telefon numarasını formatla (4 3 2 2)
  function formatPhoneNumber(value: string): string {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, '');
    
    // Maksimum 11 rakam (0 + 10 rakam)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Formatla: 4 3 2 2 (örn: 0555 123 45 67)
    if (limitedNumbers.length <= 4) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 4)} ${limitedNumbers.slice(4)}`;
    } else if (limitedNumbers.length <= 9) {
      return `${limitedNumbers.slice(0, 4)} ${limitedNumbers.slice(4, 7)} ${limitedNumbers.slice(7)}`;
    } else {
      return `${limitedNumbers.slice(0, 4)} ${limitedNumbers.slice(4, 7)} ${limitedNumbers.slice(7, 9)} ${limitedNumbers.slice(9)}`;
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    const cleanedValue = formattedValue.replace(/\s/g, '');
    
    setPhoneValue(formattedValue);
    setValue("phone", cleanedValue, { shouldValidate: true });
  }

  // Form submit'te telefon numarasını temizle (boşlukları kaldır)
  const handleFormSubmit = (data: BookingFormData) => {
    const cleanedData = {
      ...data,
      phone: data.phone.replace(/\s/g, ''),
    };
    onSubmit(cleanedData);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  if (isLoading ) {
    return (
<section className="container mx-auto max-w-7xl flex flex-col gap-6 px-4 sm:px-6 md:px-8 py-6 w-full">
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-t-2 border-b-2 border-[#FF1770] flex items-center justify-center">
      <Loader2Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF1770]" />
    </div>
    
  </div>
</section>


    );
  }
  return (
    <section className="container mx-auto max-w-7xl flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full">
      {/* Başlık */}
      <motion.div
        style={{
          background: useMotionTemplate`
		radial-gradient(
		  ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
		  #FF1770,
		  transparent 90%
		)
	  `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group rounded-lg p-[5px] transition duration-300 w-full"
      >
        <div className="min-w-0 mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 group-hover:border-[#FF1770]/10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] rounded-lg sm:rounded-xl shadow-lg">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                İletişim Bilgileriniz
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Randevu için gerekli bilgileri doldurun
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            id="booking-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl mx-auto"
          >
            {/* Ad Soyad */}
            <motion.div variants={itemVariants} className="w-full">
              <Label
                htmlFor="fullName"
                className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1770]" />
                Adınız ve Soyadınız
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                inputMode="text"
                placeholder="Örn: Ahmet Yılmaz"
                autoComplete="name"
                autoFocus={true}
                className={`py-3 sm:py-4 px-3 text-sm sm:text-base
				${errors.fullName ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                >
                   {errors.fullName.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="w-full">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <MailIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1770]" />
                E-posta (İsteğe Bağlı)
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Örn: ahmet@gmail.com"
                inputMode="email"
                autoComplete="email"
                className={`text-sm sm:text-base ${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                >
                   {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Telefon */}
            <motion.div variants={itemVariants} className="w-full">
              <Label
                htmlFor="phone"
                className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <PhoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1770]" />
                Telefon Numarası
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneValue}
                onChange={handlePhoneChange}
                inputMode="numeric"
                maxLength={14}
                autoComplete="tel"
                placeholder="Örn: 0555 123 45 67"
                className={`text-sm sm:text-base ${
                  errors.phone ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                >
                    {errors.phone.message}
                </motion.p>
              )}
            </motion.div>

            {/* Açıklama */}
            <motion.div variants={itemVariants} className="w-full">
              <Label
                htmlFor="description"
                className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <FileTextIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1770]" />
                Açıklama (İsteğe Bağlı)
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Randevu ile ilgili özel isteklerinizi buraya yazabilirsiniz..."
                className={`text-sm sm:text-base ${
                  errors.description ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                >
                   {errors.description.message}
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
