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
        <div className="flex flex-col gap-4">
            <motion.div 
                className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted border"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
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
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            {images.length > 1 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-4 overflow-x-auto pb-2"
                >
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
                                selectedImage === image
                                    ? "border-primary"
                                    : "border-transparent opacity-75 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${name} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
