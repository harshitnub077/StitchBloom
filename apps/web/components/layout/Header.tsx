"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SearchBar } from "@/components/shop/SearchBar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const isLoaded = status !== "loading";
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
                isScrolled ? "bg-background/95 backdrop-blur-2xl border-b border-white/5 py-2 shadow-sm text-foreground" : "bg-transparent py-5 text-white"
            )}
        >
            {/* 1. Promo Bar - Only visible when not scrolled or subtle */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full bg-black/30 border-b border-white/10 text-white/90 text-[9px] sm:text-[10px] font-medium py-2.5 text-center tracking-[0.5em] uppercase backdrop-blur-md"
                    >
                        Complimentary Worldwide Delivery On The Heritage Collection
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Header Row */}
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4 mt-1">
                {/* Left: Search & Mobile Menu */}
                <div className="flex items-center gap-4 flex-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("md:hidden transition-colors rounded-none", isScrolled ? "text-foreground hover:bg-white/5" : "text-white hover:bg-white/10")}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5 stroke-1" /> : <Menu className="h-5 w-5 stroke-1" />}
                    </Button>
                    <div className={cn(
                        "hidden md:block w-full max-w-[240px] transition-all duration-700",
                        isScrolled ? "opacity-70 hover:opacity-100" : "opacity-90 hover:opacity-100 [&_input]:bg-white/5 [&_input]:text-white [&_input]:border-white/10 [&_input]:rounded-none [&_input::placeholder]:text-white/50 [&_svg]:text-white/50"
                     )}>
                        <SearchBar />
                    </div>
                </div>

                {/* Center: Logo */}
                <Link href="/" className="flex flex-col items-center justify-center flex-shrink-0 px-8 group py-2">
                    <div className="flex flex-col items-center">
                        <h1 className={cn(
                            "text-3xl md:text-4xl font-heading tracking-[0.1em] flex items-center gap-0 transition-colors duration-700",
                            isScrolled ? "text-foreground" : "text-white drop-shadow-lg text-opacity-90"
                        )}>
                            <span className="font-semibold">Stitch</span>
                            <span className={cn("font-light transition-colors duration-700 text-accent")}>Bloom</span>
                        </h1>
                        <span className={cn(
                            "text-[8px] tracking-[0.6em] uppercase transition-colors hidden md:block mt-2 font-medium",
                            isScrolled ? "text-foreground/50 group-hover:text-foreground/80" : "text-white/60 group-hover:text-white/90"
                        )}>
                            Handcrafted Crochet Creations
                        </span>
                    </div>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-1 sm:gap-8 flex-1">
                    <nav className="hidden lg:flex items-center gap-12">
                        {["Home", "Products", "About"].map((item) => (
                            <Link 
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                                className={cn(
                                    "text-[11px] uppercase tracking-[0.3em] font-light transition-all relative group py-2",
                                    isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-sm"
                                )}
                            >
                                {item}
                                <span className={cn(
                                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-500 group-hover:w-full opacity-60",
                                    isScrolled ? "bg-accent" : "bg-white"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className={cn("h-8 w-[1px] mx-2 hidden lg:block transition-colors", isScrolled ? "bg-white/10" : "bg-white/20")} />
                        {isLoaded && user ? (
                            <div className={cn("flex items-center gap-3", isScrolled ? "" : "text-white")}>
                                <button
                                    onClick={() => signOut()}
                                    className="text-[10px] uppercase font-bold tracking-widest hover:text-accent transition-colors hidden sm:block"
                                >
                                    Sign Out
                                </button>
                                <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-white/10 flex items-center justify-center text-xs font-heading">
                                            {user.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn("google")}
                                className={cn(
                                    "text-[10px] uppercase font-bold tracking-widest transition-colors hidden sm:block",
                                    isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                                )}
                            >
                                Login
                            </button>
                        )}

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className={cn("relative rounded-none transition-all", isScrolled ? "text-foreground/70 hover:text-foreground hover:bg-white/5" : "text-white/80 hover:text-white hover:bg-white/10")}>
                                <ShoppingBag className="h-[20px] w-[20px] stroke-[1]" />
                                {totalItems > 0 && (
                                    <span className={cn(
                                        "absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-none text-[8px] font-black shadow-sm",
                                        isScrolled ? "bg-accent text-background" : "bg-white text-background"
                                    )}>
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
                        className="md:hidden bg-background border-t border-white/5 p-8 absolute top-full left-0 right-0 overflow-hidden shadow-2xl"                    >
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
                                            className="text-2xl font-heading tracking-[0.2em] text-foreground/80 hover:text-accent transition-colors block py-2"                                            onClick={() => setIsMobileMenuOpen(false)}
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
