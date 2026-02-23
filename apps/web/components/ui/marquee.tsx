"use client";

import { motion } from "framer-motion";

export function Marquee({ text, speed = 20 }: { text: string; speed?: number }) {
    return (
        <div className="relative flex overflow-x-hidden border-y border-white/20 bg-black py-4 w-full">
            <div className="animate-marquee whitespace-nowrap flex space-x-8 items-center">
                <motion.div
                    className="flex space-x-16"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: speed,
                    }}
                >
                    <span className="text-4xl md:text-6xl font-heading tracking-widest uppercase text-white font-light">
                        {text}
                    </span>
                    <span className="text-4xl md:text-6xl font-heading tracking-widest uppercase text-white font-light">
                        {text}
                    </span>
                    <span className="text-4xl md:text-6xl font-heading tracking-widest uppercase text-white font-light">
                        {text}
                    </span>
                    <span className="text-4xl md:text-6xl font-heading tracking-widest uppercase text-white font-light">
                        {text}
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
