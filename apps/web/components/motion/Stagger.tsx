"use client";

import { motion } from "framer-motion";

interface StaggerProps {
    children: React.ReactNode;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export function Stagger({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className = ""
}: StaggerProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
