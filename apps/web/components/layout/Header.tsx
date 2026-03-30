"use client";

import Link from "next/link";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SearchBar } from "@/components/shop/SearchBar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
    const { user, isLoaded } = useUser();
    const cart = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate total items in cart
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header 
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 font-sans",
                isScrolled ? "bg-white/95 backdrop-blur-2xl border-b border-primary/10 py-1 shadow-sm" : "bg-transparent py-3"
            )}
        >
            {/* 1. Promo Bar - Only visible when not scrolled or subtle */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full bg-primary/5 text-primary/80 text-[10px] sm:text-[11px] font-medium py-2.5 text-center tracking-[0.4em] uppercase border-b border-primary/5"                    >
                        The Sacred Heritage Collection: Free Shipping Pan-India
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Header Row */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                {/* Left: Search & Mobile Menu */}
                <div className="flex items-center gap-2 flex-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <div className="hidden md:block w-full max-w-[220px] opacity-50 hover:opacity-100 transition-all duration-500">
                        <SearchBar />
                    </div>
                </div>

                {/* Center: Logo */}
                <Link href="/" className="flex flex-col items-center justify-center flex-shrink-0 px-6 group py-2">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl md:text-3xl font-heading tracking-[0.05em] text-primary flex items-center gap-0">
                            <span className="font-semibold">Stitch</span>
                            <span className="font-light text-accent-gold transition-all duration-700">Bloom</span>
                        </h1>
                        <span className="text-[7.5px] tracking-[0.6em] uppercase text-primary/50 group-hover:text-primary transition-colors hidden md:block mt-1 font-medium">
                            Handcrafted Crochet Creations
                        </span>
                    </div>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-1 sm:gap-6 flex-1">
                    <nav className="hidden lg:flex items-center gap-10">
                        {["Home", "Products", "About"].map((item) => (
                            <Link 
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                                className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60 hover:text-primary transition-all relative group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent-gold transition-all duration-500 group-hover:w-full opacity-60" />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-6 w-[1px] bg-primary/10 mx-2 hidden lg:block" />
                        {isLoaded && user ? (
                            <div className="scale-90 border border-primary/10 rounded-full p-0.5 hover:border-accent-gold/40 transition-colors">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        ) : (
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="icon" className="text-primary/60 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </Button>
                            </SignInButton>
                        )}

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative text-primary/60 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                                <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-gold text-[8px] font-black text-white shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#FCFBF7] border-t border-primary/10 p-8 absolute top-full left-0 right-0 overflow-hidden shadow-xl"                    >
                        <div className="space-y-10">
                            <SearchBar />
                            <div className="flex flex-col gap-8">
                                {["Home", "Products", "About"].map((item, idx) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                            className="text-2xl font-heading tracking-[0.2em] text-primary/80 hover:text-accent-gold transition-colors block py-2"                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.toUpperCase()}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
