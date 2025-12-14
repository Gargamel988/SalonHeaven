"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {  useRef } from "react";
import {useRouter} from "next/navigation";

export default function HeroSection() {

	const router = useRouter();

	const containerRef = useRef(null);
	const isInView = useInView(containerRef);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const badgeVariants = {
		hidden: { opacity: 0, y: -15, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	return (
	  <section className="container h-screen relative">
		<div className="absolute inset-0 ">
		  <Image
			src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUxMTUyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
			alt="Heaven Salon Antakya - Güzellik ve Bakım Merkezi İç Mekan"
			fill
			className="object-cover"
			priority
		  />
		  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#EE6983]/40 " />
		</div>
		<motion.div 
			ref={containerRef}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			className="absolute flex flex-col items-center justify-center gap-3 sm:gap-4 inset-0 z-10 px-4 sm:px-6 md:px-8"
		>
		  <motion.div 
			variants={badgeVariants}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full backdrop-blur-xl border-2 border-white/10"
		  >
			<Star className="size-3 sm:size-4 md:size-5 lg:size-6 text-[#EE6983] animate-pulse" />
			<p className="text-white text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">Premium Saç Bakım Stüdyosu</p>
		  </motion.div>
		  
		  <motion.div 
			variants={itemVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="text-center text-white px-2"
		  >
			<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">Güzelliğinizi Keşfedin</p>
			<p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#EE6983] leading-tight">Hayalinizdeki Saçlara Kavuşun</p>
		  </motion.div>
		  
		  <motion.p 
			variants={itemVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="text-center max-w-xl text-white text-sm sm:text-base md:text-lg px-2 sm:px-4"
		  >
			 uzman kadromuz ve son teknoloji ekipmanlarımızla
			size özel çözümler sunuyoruz
		  </motion.p>
		  
		  <motion.div 
			variants={itemVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
		  >
			<motion.button 
				onClick={() => router.push("/Booking")}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.98 }}
				className="bg-[#FF1770] text-white px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full hover:shadow-lg shadow-[#FF1770] transition-all duration-300 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
			>
			  Randevu Al
			</motion.button>
			<motion.button 
				onClick={() => router.push("/Services")}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.98 }}
				className="backdrop-blur-lg bg-white/10 text-white border border-white/30 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:shadow-lg shadow-white/30 transition-all duration-300 cursor-pointer hover:backdrop-blur-2xl text-sm sm:text-base w-full sm:w-auto"
			>
			  Hizmetlerimiz
			</motion.button>
		  </motion.div>
		</motion.div>
	  </section>
	);
  }