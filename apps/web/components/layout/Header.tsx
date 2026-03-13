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
        <header className="w-full bg-white shadow-sm font-sans flex flex-col">
            {/* 1. Promo Bar */}
            <div className="w-full bg-primary text-primary-foreground text-xs font-medium py-2.5 text-center tracking-widest uppercase transition-colors">
                FESTIVE SALE: FREE SHIPPING ACROSS INDIA | USE CODE : BHARAT10
            </div>

            {/* 2. Main Header Row (Logo Centered, Search Left, Icons Right) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Left: Mobile Menu & Search */}
                <div className="flex items-center gap-4 flex-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <div className="hidden md:block w-64">
                        <SearchBar />
                    </div>
                </div>

                {/* Center: Logo */}
                <Link href="/" className="flex flex-col items-center justify-center flex-1">
                    <span className="text-3xl font-bold font-heading tracking-wider text-foreground">
                        Stitch<span className="text-primary font-normal">Bloom</span>
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-2 flex-1">
                    {isLoaded && user ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </Button>
                        </SignInButton>
                    )}

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* 3. Navigation Links Row */}
            <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-gray-100">
                <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Home
                </Link>
                <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Shop All
                </Link>
                <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    About
                </Link>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-white border-gray-100"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <div className="w-full">
                                <SearchBar />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Shop All
                                </Link>
                                <Link
                                    href="/about"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
