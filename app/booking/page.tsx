import BookingPage from '@/components/booking/BookingPage'
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Randevu Al",
  description: "Heaven Salon'da online randevu alın. Kolayca randevu oluşturun ve istediğiniz tarih ve saatte hizmetlerimizden yararlanın. Antakya'nın en kaliteli güzellik merkezi.",
  path: "/booking",

});
export default function Booking() {
  return <BookingPage />
}
