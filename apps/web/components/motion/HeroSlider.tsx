"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: "SXH82pWUWNA",
        url: "https://images.unsplash.com/photo-1614633833026-00206faf3f3f?q=80&w=2000&auto=format&fit=crop",
        alt: "Artisanal Crochet Flowers - Blue Collection"
    },
    {
        id: "3hMBR9qOJhw",
        url: "https://images.unsplash.com/photo-1544441892-0b815668ca82?q=80&w=2000&auto=format&fit=crop",
        alt: "Curated Teal Crochet Accents"
    },
    {
        id: "kwrYG3RdVt4",
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop",
        alt: "Modern Crochet Floral Arrangement"
    },
    {
        id: "oo9O353W2Ng",
        url: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=2000&auto=format&fit=crop",
        alt: "Soft Yellow Artisan Blooms"
    },
    {
        id: "Tyua51SsjZA",
        url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2000&auto=format&fit=crop",
        alt: "StitchBloom Signature Crochet Tulips"
    }
];

export function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-zinc-950 z-10" />
                    <img
                        src={slides[currentIndex].url}
                        alt={slides[currentIndex].alt}
                        className="w-full h-full object-cover filter grayscale-[0.3] contrast-[1.1] brightness-[0.6]"
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-12 h-1 rounded-full transition-all duration-500 ${
                            i === currentIndex ? "bg-accent-saffron w-20" : "bg-white/20"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
