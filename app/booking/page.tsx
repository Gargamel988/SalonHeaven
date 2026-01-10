import BookingPage from '@/components/booking/BookingPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Randevu Al",
  description: "Heaven Salon'da online randevu alın. Kolayca randevu oluşturun ve istediğiniz tarih ve saatte hizmetlerimizden yararlanın. Antakya'nın en kaliteli güzellik merkezi.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Randevu Al - Heaven Salon",
    description: "Online randevu sistemi ile kolayca randevu oluşturun.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Heaven Salon Randevu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Randevu Al - Heaven Salon",
    description: "Online randevu sistemi ile kolayca randevu oluşturun.",
  },
};
export default function Booking() {
  return <BookingPage />
}
