import { supabase } from "@/lib/supabase";

export interface Booking {
  id?: string;
  selected_date: string;
  selected_time: string;
  full_name: string;
  phone: string;
  email?: string;
  description?: string;
  selected_services: {
    id: number;
    name: string;
    price: number;
  }[];
}

// Tüm randevuları getir
export const getBookings = async () => {
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

// Dolu saatleri getir (sadece tarih ve saat)
export const getBookedSlots = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("selected_date, selected_time");
  
  if (error) throw error;
  
  return data.map((booking: { selected_date: string; selected_time: string }) => ({
    date: booking.selected_date,
    time: booking.selected_time,
  }));
};

// Randevu oluştur
export const createBooking = async (booking: Omit<Booking, "id">) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Geçmiş tarihlerdeki randevuları sil (günlük temizlik için)
export const deleteOldBookings = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Tüm randevuları al ve geçmiş olanları filtrele
  const { data: allBookings, error: fetchError } = await supabase
    .from("bookings")
    .select("id, selected_date");

  if (fetchError) throw fetchError;

  // Geçmiş tarihleri bul
  const oldBookingIds = allBookings
    ?.filter((booking: { id: string; selected_date: string }) => {
      // Tarih karşılaştırması için parse et
      const bookingDate = parseTurkishDate(booking.selected_date);
      return bookingDate && bookingDate < today;
    })
    .map((booking: { id: string }) => booking.id) || [];

  if (oldBookingIds.length === 0) {
    return { deleted: 0 };
  }

  // Geçmiş randevuları sil
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .in("id", oldBookingIds);

  if (error) throw error;
  return { deleted: oldBookingIds.length, data };
};

// Türkçe tarih formatını Date objesine çevir
function parseTurkishDate(dateStr: string): Date | null {
  try {
    // "15 Ocak 2024" formatını parse et
    const months: { [key: string]: number } = {
      ocak: 0,
      şubat: 1,
      mart: 2,
      nisan: 3,
      mayıs: 4,
      haziran: 5,
      temmuz: 6,
      ağustos: 7,
      eylül: 8,
      ekim: 9,
      kasım: 10,
      aralık: 11,
    };

    const parts = dateStr.toLowerCase().split(" ");
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);

    if (isNaN(day) || isNaN(year) || month === undefined) return null;

    return new Date(year, month, day);
  } catch {
    return null;
  }
}
  