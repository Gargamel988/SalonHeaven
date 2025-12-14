"use client";
import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type About = {
  icon: React.ElementType;
  title: string;
};
const about: About[] = [
  {
    icon: CheckCircle,
    title: "Uzman Kadro",
  },
  {
    icon: CheckCircle,
    title: "Kaliteli Ürünler",
  },
  {
    icon: CheckCircle,
    title: "Modern Ekipman",
  },
  {
    icon: CheckCircle,
    title: "Güvenilir Hizmet",
  },
];
export default function AboutSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const leftInView = useInView(leftRef);
  const rightInView = useInView(rightRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const aboutItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const aboutContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -20, scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="container px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        ref={leftRef}
        variants={containerVariants}
        initial="hidden"
        animate={leftInView ? "visible" : "hidden"}
        className="flex flex-col gap-4"
      >
        <motion.div
          variants={badgeVariants}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="text-center bg-[#EE6983]/10 py-2 px-4 rounded-full w-fit"
        >
          <p className="text-[#FF1770]">Hikayemiz</p>
        </motion.div>
        <motion.h1
          variants={titleVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl font-bold text-gray-900"
        >
          Tutkumuz: Güzellik ve Mükemmellik
        </motion.h1>
        <motion.p
          variants={textVariants}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-gray-600 flex flex-col gap-4"
        >
          15 yıllık tecrübemizle, güzelliğinize ve bakımınıza değer katmak için
          hizmet veriyoruz. Kurulduğumuz günden bu yana müşteri memnuniyetini ön
          planda tutarak; saç, bakım ve güzellik alanında yenilikleri yakından
          takip ediyor, her misafirimize özel çözümler sunuyoruz.
          <span className="block">
            Alanında deneyimli ekibimiz, kaliteli ürünler ve hijyenik bir
            ortamda, modern ve klasik uygulamaları bir araya getirerek sizlere
            en iyi hizmeti sunmayı amaçlar. Amacımız; salonumuzdan her zaman
            kendinizi daha iyi, daha özgüvenli ve mutlu hissederek ayrılmanızı
            sağlamak.
          </span>
          <span className="block">
          Güzelliğinize özen gösteriyor, size yakışanı birlikte belirliyoruz.
          </span>
        </motion.p>
        <motion.div
          variants={aboutContainerVariants}
          className="grid grid-cols-2 gap-4 mt-4"
        >
          {about.map((item) => (
            <motion.div
              key={item.title}
              variants={aboutItemVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="size-6 text-[#EE6983]" />
              </motion.div>
              <h3 className="text-gray-900">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        ref={rightRef}
        variants={imageVariants}
        initial="hidden"
        animate={rightInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full min-h-[400px]"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUxMTUyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Heaven Salon Hakkımızda - Antakya Güzellik Salonu"
            fill
            className="object-cover rounded-xl"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate={
            rightInView ? (isImageHovered ? "hover" : "visible") : "initial"
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute -bottom-5 -left-10 bg-white shadow-2xl rounded-xl p-4 flex items-center gap-2 z-10"
          whileHover={{ y: -25, scale: 1.08, transition: { duration: 0.3 } }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            <Star className="size-10 text-[#EE6983]" />
          </motion.div>
          <div className="flex flex-col">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="text-2xl font-bold text-[#EE6983]"
            >
              15+
            </motion.p>
            <p className="text-gray-900">Yıllık Tecrübe</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
