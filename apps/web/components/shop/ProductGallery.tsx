"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col gap-6">
            <motion.div 
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-white border border-primary/5 shadow-sm p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#F5F0E8] group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src={selectedImage}
                                alt={name}
                                fill
                                className="object-contain p-8 group-hover:scale-105 transition-transform duration-[1500ms]"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
            {images.length > 1 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
                >
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-2xl border bg-white p-2 transition-all",
                                selectedImage === image
                                    ? "border-[#1A4D3E] shadow-md"
                                    : "border-primary/5 opacity-70 hover:opacity-100 hover:border-primary/10"
                            )}
                        >
                            <div className="w-full h-full relative rounded-lg overflow-hidden bg-[#F5F0E8]">
                                <Image
                                    src={image}
                                    alt={`${name} thumbnail ${index + 1}`}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
