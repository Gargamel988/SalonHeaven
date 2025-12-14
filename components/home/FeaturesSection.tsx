"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
type Feature = {
	title: string;
	description: string;
	price: string;
	image: string;
	features: string[];
}

const features: Feature[] = [
	{
	  title: "Saç Kesimi & Şekillendirme",
	  description: "Yüz şeklinize ve saç tipinize uygun profesyonel kesim",
	  price: "350₺",
	  image:
		"/sackesimi.jpg",
	  features: ["Saç Analizi", "Profesyonel Kesim", "Şekillendirme"],
	},
	{
	  title: "Saç Boyama & Highlights",
	  description: "Doğal ve canlı renklerle modern boyama teknikleri",
	  price: "800₺",
	  image:
		"/sacboyama.webp",
	  features: ["Renk Konsültasyonu", "Premium Boya", "Bakım Maskesi"],
	},
	{
	  title: "Keratin Bakımı",
	  description: "Saçlarınızı besleyen ve onaran lüks bakım",
	  price: "1200₺",
	  image:
		"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
	  features: ["Derin Bakım", "Keratin Tedavisi", "Parlak Görünüm"],
	},
  ];

export default function FeaturesSection() {
	const headerRef = useRef(null);
	const featuresContainerRef = useRef(null);
	const ctaRef = useRef(null);
	const router = useRouter();
	const headerInView = useInView(headerRef);
	const featuresInView = useInView(featuresContainerRef);
	const ctaInView = useInView(ctaRef);

	const headerVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	const badgeVariants = {
		hidden: { opacity: 0, scale: 0.8, rotate: -5 },
		visible: { opacity: 1, scale: 1, rotate: 0 },
	};

	const featuresContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.2,
			},
		},
	};

	const featureCardVariants = (index: number) => ({
		hidden: { 
			opacity: 0, 
			y: 50,
			x: index % 2 === 0 ? -30 : 30,
			scale: 0.9,
			rotateY: index % 2 === 0 ? -15 : 15,
		},
		visible: { 
			opacity: 1, 
			y: 0,
			x: 0,
			scale: 1,
			rotateY: 0,
		},
	});

	const imageVariants = {
		hidden: { scale: 1.2, opacity: 0 },
		visible: { scale: 1, opacity: 1 },
	};

	const priceTagVariants = {
		hidden: { opacity: 0, scale: 0, rotate: -180 },
		visible: { opacity: 1, scale: 1, rotate: 0 },
	};

	const featureItemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	};

	const featureListVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const ctaVariants = {
		hidden: { opacity: 0, scale: 0.8, y: 20 },
		visible: { opacity: 1, scale: 1, y: 0 },
	};

	return (
	  <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
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
			ref={featuresContainerRef}
			variants={featuresContainerVariants}
			initial="hidden"
			animate={featuresInView ? "visible" : "hidden"}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto max-w-7xl"
		>
		  {features.map((feature, index) => (
			<motion.div
			  key={index}
			  variants={featureCardVariants(index)}
			  transition={{ duration: 0.6, ease: "easeOut" }}
			  whileHover={{ 
				y: -8, 
				scale: 1.02,
				transition: { duration: 0.3, ease: "easeOut" }
			  }}
			  className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-lg hover:shadow-2xl transition-shadow"
			>
			  {/* Image with Price Tag */}
			  <motion.div 
				variants={imageVariants}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="relative aspect-[4/3] overflow-hidden"
			  >
				<Image
				  src={feature.image}
				  alt={feature.title}
				  fill
				  className="object-cover"
				  loading="lazy"
				  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				{/* Price Tag */}
				<motion.div
					variants={priceTagVariants}
					transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
					className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#EE6983] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-lg shadow-lg"
				>
				  {feature.price}
				</motion.div>
			  </motion.div>
  
			  {/* Card Content */}
			  <div className="flex flex-1 flex-col p-4 md:p-6">
				<motion.h3
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="text-xl md:text-2xl font-bold text-[#EE6983] mb-2 md:mb-3"
				>
				  {feature.title}
				</motion.h3>
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-sm md:text-base text-gray-600 mb-4 md:mb-6"
				>
				  {feature.description}
				</motion.p>
  
				{/* Features List */}
				<motion.div
					variants={featureListVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6"
				>
				  {feature.features.map((item, idx) => (
					<motion.div
						key={idx}
						variants={featureItemVariants}
						transition={{ duration: 0.4, ease: "easeOut" }}
						className="flex items-center gap-2"
					>
					  <Check className="size-4 md:size-5 text-[#EE6983] flex-shrink-0" />
					  <p className="text-sm md:text-base text-gray-700">{item}</p>
					</motion.div>
				  ))}
				</motion.div>
  
				{/* Button */}
				<motion.button
					onClick={() => router.push("/Booking")}

					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.6 }}
					whileHover={{ 
						scale: 1.05, 
						y: -3,
						boxShadow: "0 8px 25px rgba(238, 105, 131, 0.5)",
						transition: { duration: 0.3, ease: "easeOut" }
					}}
					whileTap={{ scale: 0.98 }}
					className="w-full rounded-full cursor-pointer bg-gradient-to-r from-[#EE6983] to-[#DC7090] text-white py-2.5 md:py-3 font-semibold text-sm md:text-base hover:from-[#DC7090] hover:to-[#EE6983] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
				>
					<motion.span
						className="relative z-10 flex items-center justify-center gap-2"
						whileHover={{ x: 5 }}
						transition={{ duration: 0.3 }}
					>
						Randevu Al
						<motion.span
							animate={{ x: [0, 5, 0] }}
							transition={{ 
								duration: 1.5, 
								repeat: Infinity, 
								ease: "easeInOut" 
							}}
						>
							→
						</motion.span>
					</motion.span>
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-[#DC7090] to-[#EE6983] opacity-0 group-hover:opacity-100"
						initial={{ x: "-100%" }}
						whileHover={{ x: "100%" }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
					/>
				</motion.button>
			  </div>
			</motion.div>
		  ))}
		</motion.div>
		<motion.div
			ref={ctaRef}
			variants={ctaVariants}
			initial="hidden"
			animate={ctaInView ? "visible" : "hidden"}
			transition={{ duration: 0.6, ease: "backOut" }}
			className="flex justify-center my-8 md:my-10"
		>
		  <motion.button
			onClick={() => router.push("/Booking")}
			whileHover={{ 
				scale: 1.1, 
				y: -5,
				boxShadow: "0 15px 40px rgba(238, 105, 131, 0.5)",
				transition: { duration: 0.3, ease: "easeOut" }
			}}
			whileTap={{ scale: 0.95 }}
			className="bg-[#EE6983] shadow-lg hover:shadow-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden group text-sm md:text-base"
		  >
			<motion.span
				className="relative z-10 flex items-center justify-center gap-2 font-semibold"
				whileHover={{ x: 5 }}
				transition={{ duration: 0.3 }}
			>
				hemen randevu al
				<motion.span
					animate={{ x: [0, 5, 0] }}
					transition={{ 
						duration: 1.5, 
						repeat: Infinity, 
						ease: "easeInOut" 
					}}
				>
					→
				</motion.span>
			</motion.span>
			<motion.div
				className="absolute inset-0 bg-gradient-to-r from-[#DC7090] via-[#EE6983] to-[#FF1770] opacity-0 group-hover:opacity-100"
				initial={{ x: "-100%" }}
				whileHover={{ x: "100%" }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
			/>
		  </motion.button>
		</motion.div>
	  </section>
	);
  }
  