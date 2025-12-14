"use client";
import { Award, Heart, Target, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Value = {
	icon: React.ElementType;
	title: string;
	description: string;
}

export default function ValuesSection() {
	const containerRef = useRef(null);
	const headerRef = useRef(null);
	const isInView = useInView(containerRef);
	const headerInView = useInView(headerRef);

	const values: Value[] = [
	  {
		icon: Heart,
		title: "müşteri memnuniyeti",
		description: "Her müşterimiz bizim için özel ve değerlidir.",
	  },
	  {
		icon: Award,
		title: "Kaliteli",
		description: "Sadece en iyi ürünleri ve teknikleri kullanırız.",
	  },
	  {
		icon: Users,
		title: "Profesyonellik",
		description: "Uzman ve deneyimli ekibimizle hizmetinizdeyiz.",
	  },
	  {
		icon: Target,
		title: "İnovasyont",
		description: "Sürekli gelişen trendleri takip ederiz.",
	  },
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const badgeVariants = {
		hidden: { opacity: 0, scale: 0.8, rotate: -5 },
		visible: { 
			opacity: 1, 
			scale: 1, 
			rotate: 0,
		},
	};

	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.9 },
		visible: { 
			opacity: 1, 
			y: 0, 
			scale: 1,
		},
	};

	const iconVariants = {
		hidden: { opacity: 0, scale: 0, rotate: -180 },
		visible: { 
			opacity: 1, 
			scale: 1, 
			rotate: 0,
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { 
			opacity: 1, 
			y: 0,
		},
	};

	return (
	  <section className="container px-4 py-20 flex flex-col items-center justify-center gap-8">
		<motion.div 
			ref={headerRef}
			variants={containerVariants}
			initial="hidden"
			animate={headerInView ? "visible" : "hidden"}
			className="flex flex-col items-center justify-center gap-5"
		>
		  <motion.div 
			variants={badgeVariants}
			transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
			className="text-center bg-[#EE6983]/10 py-2 px-4 rounded-full w-fit"
		  >
			<p className="text-[#FF1770]">Değerlerimiz</p>
		  </motion.div>
		  <motion.h2 
			variants={titleVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="text-3xl md:text-4xl font-bold text-gray-900 text-center"
		  >
			Bizi Farklı Kılan Değerler
		  </motion.h2>
		</motion.div>
		<motion.div 
			ref={containerRef}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full"
		>
		  {values.map((item) => (
			<motion.div 
				key={item.title} 
				variants={cardVariants}
				transition={{ duration: 0.5, ease: "easeOut" }}
				whileHover={{ 
					y: -10, 
					scale: 1.05,
					transition: { duration: 0.3, ease: "easeOut" }
				}}
				className="flex flex-col items-center justify-center text-center gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
			>
			  <motion.div 
				variants={iconVariants}
				transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
				whileHover={{ 
					scale: 1.2, 
					rotate: [0, -10, 10, -10, 0],
					transition: { duration: 0.5 }
				}}
				className="bg-gradient-to-br from-[#EE6983] to-[#DC7090] p-4 rounded-full shadow-lg"
			  >
				<item.icon className="size-8 text-white" />
			  </motion.div>
			  <motion.h3 
				variants={textVariants}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="text-2xl font-bold text-gray-900"
			  >
				{item.title}
			  </motion.h3>
			  <motion.p 
				variants={textVariants}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="text-gray-600 leading-relaxed"
			  >
				{item.description}
			  </motion.p>
			</motion.div>
		  ))} 
		</motion.div>
	  </section>
	);
  }
  