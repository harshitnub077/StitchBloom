"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const slides = [
    {
        id: "hero1",
        url: "/images/hero/keychain.jpg",
        alt: "Artisanal Crochet Detail",
        subtitle: "The Pinnacle of Woven Mastery",
        title: "Crochetverse",
        desc: "Every loop is a silent conversation with history. Discover uncompromising luxury in handcrafted architecture."
    },
    {
        id: "hero2",
        url: "/images/hero/flower.jpg",
        alt: "Crochet Flowers",
        subtitle: "Botanical Sculptures",
        title: "Eternal Blooms",
        desc: "Delicate, hyper-realistic handcrafted crochets designed to transcend the transient nature of seasons."
    },
    {
        id: "hero3",
        url: "/images/hero/bag.jpg",
        alt: "Crochet Bags",
        subtitle: "Architectural Carryalls",
        title: "Woven Armor",
        desc: "Stunning, elegant handmade woven bags engineered as high-end designer statements."
    },
    {
        id: "hero4",
        url: "/images/hero/band.jpg",
        alt: "Hair Bands",
        subtitle: "Crowning Elegance",
        title: "Adorned Grace",
        desc: "Delicately stitched bands and head wraps laid out in monochromatic tones of pure luxury."
    },
];

export function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 7000); // 7 seconds pacing for ultimate luxury feeling
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-background">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: [0.4, 0.0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img
                        initial={{ scale: 1.1, objectPosition: "50% 50%" }}
                        animate={{ scale: 1, objectPosition: "50% 60%" }}
                        transition={{ duration: 12, ease: "linear" }}
                        src={slides[currentIndex].url}
                        alt={slides[currentIndex].alt}
                        className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] grayscale-[0.3]"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background/90" />
                </motion.div>
            </AnimatePresence>

            {/* Dynamic Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mt-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${currentIndex}`}
                        className="text-center flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.6, 0.3, 1] }}
                    >
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="inline-block uppercase tracking-[0.5em] text-[9px] md:text-[10px] text-white/80 mb-8 font-medium"
                        >
                            {slides[currentIndex].subtitle}
                        </motion.span>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-light text-white tracking-[0.2em] mb-10 leading-[1.2] group cursor-default">
                            <span className="block text-white group-hover:text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:tracking-[0.25em] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] uppercase">
                                {slides[currentIndex].title}
                            </span>
                        </h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="text-sm md:text-base font-light text-white/70 mb-14 max-w-xl mx-auto tracking-widest leading-loose"
                        >
                            {slides[currentIndex].desc}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="flex flex-col sm:flex-row gap-8 items-center justify-center pointer-events-auto"
                        >
                            <Link
                                href="/products"
                                className="group flex items-center gap-6 bg-transparent border border-white/30 text-white px-10 py-5 hover:bg-white hover:text-black transition-all duration-[600ms] backdrop-blur-sm"
                            >
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">The Archive</span>
                                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 stroke-1" />
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center gap-2 text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all duration-500"
                            >
                                <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Philosophy</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-6 items-center">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            i === currentIndex 
                            ? "bg-accent w-16 h-[2px] opacity-100" 
                            : "bg-white/30 w-6 h-[1px] hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
            {/* Subtle Vignette for cinematic focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_120%)] pointer-events-none z-10" />
        </div>
    );
}
