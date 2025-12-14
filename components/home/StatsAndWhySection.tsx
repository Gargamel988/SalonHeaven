"use client";
import { Users, Award, Star, Clock, Sparkles, Zap, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
type Stat = {
  icon: React.ElementType;
  value: string;
  label: string;
};
type Reason = {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
};
const stats: Stat[] = [
  {
    icon: Users,
    value: "10K+",
    label: "Mutlu Müşteri",
  },
  {
    icon: Award,
    value: "15+",
    label: "Yıllık Tecrübe",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Müşteri Puanı",
  },
  {
    icon: Clock,
    value: "7/24",
    label: "Destek",
  },
];

const reasons: Reason[] = [
  {
    icon: Sparkles,
    title: "Profesyonel Ekip",
    description:
      "Alanında uzman ve deneyimli ekibimizle size en iyi hizmeti sunuyoruz.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Modern Teknoloji",
    description:
      "En son teknolojik cihazlar ve kaliteli ürünlerle hizmet veriyoruz.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Memnuniyet Garantisi",
    description:
      "Müşteri memnuniyeti bizim önceliğimiz. Size özel çözümler sunuyoruz.",
    gradient: "from-red-500 to-pink-500",
  },
];

export default function StatsAndWhySection() {
  const statsContainerRef = useRef(null);
  const reasonsContainerRef = useRef(null);
  const headerRef = useRef(null);

  const statsInView = useInView(statsContainerRef);
  const reasonsInView = useInView(reasonsContainerRef);
  const headerInView = useInView(headerRef);

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const statValueVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const statLabelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const reasonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const reasonCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="container bg-[#EE6983]/10 py-16">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="mb-16">
          <motion.div
            ref={statsContainerRef}
            variants={statsContainerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statCardVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon Container */}
                  <motion.div
                    variants={statCardVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#EE6983] to-[#DC7090] flex items-center justify-center mb-4 shadow-lg"
                  >
                    <IconComponent className="size-10 text-white" />
                  </motion.div>

                  {/* Value */}
                  <motion.p
                    variants={statValueVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                  >
                    {stat.value}
                  </motion.p>

                  {/* Label */}
                  <motion.p
                    variants={statLabelVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-gray-600 font-medium text-sm md:text-base"
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Why Heaven Section */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            variants={headerVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block bg-[#EE6983]/10 px-6 py-2 rounded-full mb-4"
          >
            <p className="text-[#EE6983] font-semibold">Neden Heaven?</p>
          </motion.div>
          <motion.h2
            variants={headerVariants}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Size Özel <span className="text-[#EE6983]">Hizmet</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Profesyonel ekibimiz ve kaliteli hizmetlerimizle güzelliğinizi
            keşfedin
          </motion.p>
        </motion.div>

        <motion.div
          ref={reasonsContainerRef}
          variants={reasonsContainerVariants}
          initial="hidden"
          animate={reasonsInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={index}
                variants={reasonCardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <IconComponent className="size-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
