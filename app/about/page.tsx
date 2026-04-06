import AboutSection from "@/components/about/AboutSection";
import ValuesSection from "@/components/about/ValuesSection";
import AboutTeam from "@/components/about/AboutTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hakkımızda",
  description: "Heaven Salon hakkında bilgi edinin. Antakya'da güzellik ve bakım sektöründe deneyimli ekibimiz, değerlerimiz ve hikayemiz.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <AboutSection />
      <ValuesSection />
      <AboutTeam />
    </>
  );
}
