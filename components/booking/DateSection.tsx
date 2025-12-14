"use client";
import React, { useMemo } from "react";
import { CalendarIcon, CheckIcon, ClockIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBookedSlots } from "@/utils/services";

export default function DateSection({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: string | null;
  setSelectedDate: (fullDate: string) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}) {
  const { date, days } = useMemo(() => {
    const date = new Date();
    const day = date.getDate();
    const days = Array.from({ length: 7 }, (_, i) => day + i);
    return { date, days };
  }, []);

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const { daysArray, month, weekday, fullDates } = useMemo(() => {
    const daysArray = days.map((day) =>
      new Date(date.getFullYear(), date.getMonth(), day).toLocaleString(
        "tr-TR",
        { day: "2-digit" }
      )
    );
    const month = days.map((day) =>
      new Date(date.getFullYear(), date.getMonth(), day).toLocaleString(
        "tr-TR",
        { month: "short" }
      )
    );
    const weekday = days.map((day) =>
      new Date(date.getFullYear(), date.getMonth(), day).toLocaleString(
        "tr-TR",
        { weekday: "short" }
      )
    );
    const fullDates = days.map((day) => {
      const dateObj = new Date(date.getFullYear(), date.getMonth(), day);
      return dateObj.toLocaleString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    });
    return {
      daysArray,
      month,
      weekday,
      fullDates,
    };
  }, [date, days]);

  const isToday = (dayIndex: number) => {
    const today = new Date();
    return days[dayIndex] === today.getDate();
  };

  // React Query ile Supabase'den kayıtlı randevuları oku
  const { data: bookedSlots = [] } = useQuery({
    queryKey: ["bookedSlots"],
    queryFn: getBookedSlots,
  });

  // Belirli bir tarih ve saat kombinasyonunun dolu olup olmadığını kontrol et
  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.some(
      (slot: { date: string; time: string }) => slot.date === date && slot.time === time
    );
  };

  // Belirli bir tarihte tüm saatlerin dolu olup olmadığını kontrol et
  const isDateFullyBooked = (date: string) => {
    // O tarihte dolu olan saatleri bul
    const bookedTimesForDate = bookedSlots
      .filter((slot: { date: string; time: string }) => slot.date === date)
      .map((slot: { date: string; time: string }) => slot.time);
    
    // Eğer tüm saatler doluysa true döndür
    return times.every((time) => bookedTimesForDate.includes(time));
  };

  return (
    <section className="container mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8 md:gap-10 w-full px-4 sm:px-6 md:px-0">
      {/* Başlık */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] rounded-lg sm:rounded-xl shadow-lg">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Randevu Tarihinizi Seçiniz
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Uygun olduğunuz tarihi seçin
            </p>
          </div>
        </div>

        {/* Tarih Kartları */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
          {daysArray.map((day, index) => {
            const isSelected = selectedDate !== null && 
              selectedDate === fullDates[index];
            const today = isToday(index);

            // Tarih seçilebilir, ama o gün içindeki tüm saatler doluysa disable et
            const isDisabled = isDateFullyBooked(fullDates[index]) && !isSelected;

            return (
              <button
                disabled={isDisabled}
                key={`day-${days[index]}-${index}`}
                onClick={() => !isDisabled && setSelectedDate(fullDates[index])}
                className={`relative overflow-hidden rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-2 sm:px-4 md:px-6 border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] border-[#FF1770] text-white shadow-lg shadow-[#FF1770]/30"
                    : isDisabled
                    ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                    : "bg-white border-gray-200 text-gray-900 hover:border-[#FF1770]/50 hover:shadow-md"
                } ${today && !isSelected && !isDisabled ? "ring-2 ring-[#FF1770]/30" : ""}`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
                    <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                {today && !isSelected && (
                  <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF1770] rounded-full" />
                )}
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <p
                    className={`text-[10px] sm:text-xs font-medium ${
                      isSelected ? "text-white/90" : "text-gray-500"
                    }`}
                  >
                    {weekday[index]}
                  </p>
                  <p
                    className={`text-lg sm:text-xl md:text-2xl font-bold ${
                      isSelected ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {day}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs font-medium ${
                      isSelected ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {month[index]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Saat Seçimi */}
      {selectedDate && (
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#FF1770] to-[#FF4D8A] rounded-lg sm:rounded-xl shadow-lg">
            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Randevu Saatini Seçiniz
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">Uygun olduğunuz saati seçin</p>
          </div>
        </div>

        {/* Saat Butonları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
          {times.map((time) => {
            const isSelected = selectedTime === time;
            const slotBooked = selectedDate !== null && isSlotBooked(selectedDate, time);
            const isDisabled = slotBooked && !isSelected;

            return (
              <button
                key={time}
                disabled={isDisabled}
                onClick={() => !isDisabled && setSelectedTime(time)}
                className={`relative overflow-hidden rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#FF1770] to-[#FF4D8A] border-[#FF1770] text-white shadow-lg shadow-[#FF1770]/30"
                    : isDisabled
                    ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                    : "bg-white border-gray-200 text-gray-900 hover:border-[#FF1770]/50 hover:shadow-md"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
                    <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <span className="text-sm sm:text-base font-semibold">{time}</span>
              </button>
            );
          })}
          </div>
        </div>
      )}
    </section>
  );
}
