"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export default function CTASection() {
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const router = useRouter();
	const containerInView = useInView(containerRef);
	const contentInView = useInView(contentRef);

	const containerVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
	};

	const contentVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const titleVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	const descriptionVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.8, y: 20 },
		visible: { opacity: 1, scale: 1, y: 0 },
	};

	return (
	  <section className="container bg-gradient-to-r from-[#EE6983] to-[#DC7090] px-4 py-16">
		<motion.div
			ref={containerRef}
			variants={containerVariants}
			initial="hidden"
			animate={containerInView ? "visible" : "hidden"}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="p-12 text-center text-white relative overflow-hidden rounded-3xl"
		>
		  {/* Decorative background elements */}
		  <motion.div
			className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"
			animate={{
				scale: [1, 1.2, 1],
				opacity: [0.1, 0.2, 0.1],
			}}
			transition={{
				duration: 4,
				repeat: Infinity,
				ease: "easeInOut",
			}}
		  />
		  <motion.div
			className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"
			animate={{
				scale: [1, 1.2, 1],
				opacity: [0.1, 0.2, 0.1],
			}}
			transition={{
				duration: 4,
				repeat: Infinity,
				ease: "easeInOut",
				delay: 2,
			}}
		  />
		  
		  <motion.div
			ref={contentRef}
			variants={contentVariants}
			initial="hidden"
			animate={contentInView ? "visible" : "hidden"}
			className="relative z-10"
		  >
			<motion.h2
				variants={titleVariants}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="text-4xl md:text-5xl font-bold mb-4"
			>
			  Hemen Randevu Alın
			</motion.h2>
			<motion.p
				variants={descriptionVariants}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
			>
			  Hayalinizdeki görünüme kavuşmak için bugün bize ulaşın
			</motion.p>
			<motion.button
				onClick={() => router.push("/Booking")}
				variants={buttonVariants}
				transition={{ duration: 0.5, ease: "backOut" }}
				whileHover={{ 
					scale: 1.1, 
					y: -3,
					boxShadow: "0 15px 40px rgba(255, 255, 255, 0.3)",
					transition: { duration: 0.3, ease: "easeOut" }
				}}
				whileTap={{ scale: 0.95 }}
				className="bg-white cursor-pointer text-[#EE6983] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
			>
				<motion.span
					className="relative z-10"
					whileHover={{ x: 3 }}
					transition={{ duration: 0.3 }}
				>
					Randevu Oluştur
				</motion.span>
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100"
					initial={{ x: "-100%" }}
					whileHover={{ x: "100%" }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
				/>
			</motion.button>
		  </motion.div>
		</motion.div>
	  </section>
	);
  }