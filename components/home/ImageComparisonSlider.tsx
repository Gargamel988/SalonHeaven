"use client";
import { ImageComparison } from "../image-comparison-slider";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ImageComparisonSlider() {
	const headerRef = useRef(null);
	const sliderRef = useRef(null);

	const headerInView = useInView(headerRef);
	const sliderInView = useInView(sliderRef);

	const headerVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	const badgeVariants = {
		hidden: { opacity: 0, scale: 0.8, rotate: -5 },
		visible: { opacity: 1, scale: 1, rotate: 0 },
	};

	const sliderVariants = {
		hidden: { opacity: 0, scale: 0.95, y: 30 },
		visible: { opacity: 1, scale: 1, y: 0 },
	};

	return (
	  <section className="container bg-[#EE6983]/10 px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
		<motion.div
			ref={headerRef}
			variants={headerVariants}
			initial="hidden"
			animate={headerInView ? "visible" : "hidden"}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="flex justify-center flex-col items-center gap-3 md:gap-4 mb-8 md:mb-10"
		>
		  <motion.div
			variants={badgeVariants}
			transition={{ duration: 0.5, ease: "backOut" }}
			className="text-center bg-[#EE6983]/10 p-3 md:p-4 rounded-full"
		  >
			<p className="text-[#FF1770] text-sm md:text-base">Hizmetlerimiz</p>
		  </motion.div>
		  <motion.p
			variants={headerVariants}
			transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
			className="text-[#303030] text-xl sm:text-2xl md:text-3xl font-bold text-center px-2"
		  >
			öne çıkan hizmetlerimiz
		  </motion.p>
		  <motion.p
			variants={headerVariants}
			transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
			className="text-[#303030] text-base md:text-lg text-center px-2 max-w-2xl"
		  >
			Profesyonel ekibimiz ve kaliteli ürünlerimizle size en iyi hizmeti
			sunuyoruz
		  </motion.p>
		</motion.div>
	
		<motion.div
			ref={sliderRef}
			variants={sliderVariants}
			initial="hidden"
			animate={sliderInView ? "visible" : "hidden"}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="w-full px-4"
		>
		  <ImageComparison
			beforeImage="/fotoOnce.jpeg"
			afterImage="/foto.jpeg"
			altBefore="Önce"
			altAfter="Sonra"
			
		  />
		</motion.div>
	  </section>
	);
  }
  