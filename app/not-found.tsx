import { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Sayfa Bulunamadı | Salon Heaven",
  description: "Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönerek devam edin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
