"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background Textures */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>
            
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[480px] relative z-10"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-12">
                    <Link href="/" className="group flex flex-col items-center">
                        <h1 className="text-4xl font-heading tracking-[0.1em] flex items-center gap-0 text-foreground">
                            <span className="font-semibold">Stitch</span>
                            <span className="font-light text-accent">Bloom</span>
                        </h1>
                        <span className="text-[10px] tracking-[0.6em] uppercase mt-3 font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors">
                            Handcrafted Crochet Creations
                        </span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-black/[0.03] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-14 rounded-[2px] relative overflow-hidden group">
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent -mr-12 -mt-12 transition-all duration-700 group-hover:mr-[-10px] group-hover:mt-[-10px]" />
                    
                    <div className="relative text-center">
                        <h2 className="text-2xl font-heading tracking-widest text-foreground font-light mb-4">
                            WELCOME BACK
                        </h2>
                        <p className="text-xs text-foreground/50 uppercase tracking-[0.2em] mb-12">
                            Enter the world of handcrafted heritage
                        </p>

                        <div className="space-y-6">
                            {/* Google Auth Button */}
                            <Button 
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                className="w-full h-14 bg-black text-white hover:bg-black/90 rounded-none tracking-[0.3em] uppercase text-[10px] font-black transition-all duration-500 hover:shadow-2xl hover:translate-y-[-2px] group/btn flex items-center justify-center gap-4 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Sign In With Google</span>
                            </Button>

                            <p className="text-[9px] text-foreground/40 uppercase tracking-[0.2em] pt-4">
                                By signing in, you agree to our 
                                <br />
                                <Link href="/terms" className="hover:text-accent underline underline-offset-4 mx-1 transition-colors">Terms of Service</Link> 
                                & 
                                <Link href="/privacy" className="hover:text-accent underline underline-offset-4 mx-1 transition-colors">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-12 text-center">
                    <Link 
                        href="/" 
                        className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-accent transition-all duration-500"
                    >
                        ← BACK TO STORE
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
