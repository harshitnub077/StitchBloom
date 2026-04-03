"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowLeft, Chrome, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignInPage() {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-background font-sans">
            {/* 1. IMMERSIVE LEFT SECTION (60% width on desktop) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full md:w-[60%] h-[40vh] md:h-full overflow-hidden group"
            >
                {/* Hero Image with Parallax/Zoom */}
                <motion.div 
                    initial={{ scale: 1.1, filter: "blur(10px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="/login-hero.png"
                        alt="Handcrafted Luxury Crochet Atelier"
                        className="absolute inset-0 w-full h-full object-cover"
                    />


                </motion.div>
                
                {/* Advanced Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Branded Heritage Overlay */}
                <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-between z-10">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <Link href="/" className="flex items-center gap-4 group">
                             <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:border-primary/50 transition-colors duration-500">
                                <Sparkles className="w-4 h-4 text-white" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-white text-lg font-heading tracking-[0.2em] font-bold">STITCH<span className="text-primary font-light">BLOOM</span></span>
                                <span className="text-white/40 text-[8px] tracking-[0.5em] uppercase">Handcrafted Legacy</span>
                             </div>
                        </Link>
                    </motion.div>

                    <div className="max-w-xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="inline-block px-4 py-1.5 border border-primary/30 bg-primary/10 backdrop-blur-xl text-primary text-[9px] tracking-[0.4em] uppercase mb-8"
                        >
                            The Heritage Collection
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-heading text-white leading-tight mb-6 tracking-tight"
                        >
                            Curating The Art Of <br />
                            <span className="italic font-light text-primary/80">Manual Precision</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="text-white/60 text-sm md:text-lg font-light leading-relaxed tracking-wide max-w-md hidden md:block"
                        >
                            Join our inner circle to explore unique handcrafted crochet creations, each carrying the soul of Indian craftsmanship.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="flex items-center gap-10 text-white/30 text-[10px] tracking-[0.4em] uppercase"
                    >
                        <div className="flex items-center gap-4">
                            <Globe className="w-4 h-4" />
                            <span>Worldwide Delivery</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secured Access</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* 2. AUTHENTICATION SECTION (40% width on desktop) */}
            <div className="w-full md:w-[40%] h-full bg-background flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
                {/* Subtle Geometric Textures */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[420px] relative z-10"
                >
                    {/* Return Navigation */}
                    <div className="mb-16">
                        <Link 
                            href="/" 
                            className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all duration-500"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
                            <span>Return to Gallery</span>
                        </Link>
                    </div>

                    {/* Portal Architecture */}
                    <div className="space-y-12">
                        <header>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-[40px] h-[1px] bg-primary" />
                                <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">Authentication</span>
                            </div>
                            <h2 className="text-4xl font-heading text-foreground tracking-tight mb-2 font-light">Portal Access</h2>
                            <p className="text-muted-foreground text-sm font-light tracking-wide lg:max-w-xs">
                                Enter your credentials to access the exclusive heritage collections.
                            </p>
                        </header>

                        <div className="space-y-10">
                            {/* Primary Auth Action */}
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-700 rounded-none opacity-0 group-hover:opacity-100" />
                                <Button 
                                    onClick={() => signIn("google", { callbackUrl: "/" })}
                                    className="w-full h-[72px] bg-foreground text-background hover:bg-white rounded-none tracking-[0.4em] uppercase text-[11px] font-black transition-all duration-700 flex items-center justify-center gap-6 relative group overflow-hidden shadow-2xl border border-white/5"
                                >
                                    <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:left-[100%] transition-all duration-1000" />
                                    
                                    <div className="relative flex items-center gap-5">
                                        <Chrome className="w-5 h-5 transition-transform duration-700 group-hover:rotate-[360deg]" />
                                        <span>Continue with Google</span>
                                    </div>
                                </Button>
                            </motion.div>

                            {/* Trust Architecture */}
                            <div className="pt-10 border-t border-white/5 space-y-8">
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] leading-relaxed">
                                    By entering the portal, you align with our <br />
                                    <Link href="/terms" className="text-primary/70 hover:text-primary transition-colors mx-1">Legacy Terms</Link> 
                                    and 
                                    <Link href="/privacy" className="text-primary/70 hover:text-primary transition-colors mx-1">Privacy Creed</Link>
                                </p>
                                
                                <div className="flex items-center gap-6 text-[9px] text-muted-foreground/40 uppercase tracking-[0.5em] font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary/30" />
                                        <span>SSL Encrypted</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary/30" />
                                        <span>Auth.js v5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Aesthetic Detail: Floating Signature */}
                <div className="absolute bottom-12 right-12 opacity-[0.03] select-none pointer-events-none hidden lg:block">
                    <span className="text-[12rem] font-heading font-black tracking-tighter leading-none italic">SB</span>
                </div>
            </div>
        </div>
    );
}
