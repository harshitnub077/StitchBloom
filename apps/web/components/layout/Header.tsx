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
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-background/60 backdrop-blur-xl border-b border-border shadow-lg"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold font-heading tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 block">
                            CrochetVerse
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/products" className="relative py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            Shop
                        </Link>
                        <Link href="/about" className="relative py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            About
                        </Link>
                        <SearchBar />
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                                <ShoppingBag className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {isLoaded && user ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <SignInButton mode="modal">
                                <Button size="sm" className="hidden md:flex">Sign In</Button>
                            </SignInButton>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
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
                        className="md:hidden border-b bg-background"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/products"
                                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                                <Link
                                    href="/about"
                                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                            </div>
                            <div className="px-4">
                                <SearchBar />
                            </div>
                            {!user && (
                                <div className="px-4 pt-2">
                                    <SignInButton mode="modal">
                                        <Button className="w-full">Sign In</Button>
                                    </SignInButton>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
