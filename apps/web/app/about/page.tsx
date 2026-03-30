"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Marquee } from "@/components/ui/marquee";
import { MoveRight, Star, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-24 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 flex items-center justify-center border-b border-white/5">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <FadeIn delay={0.2}>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-medium">Our Sacred Heritage</span>
                        <h1 className="text-5xl md:text-8xl font-heading tracking-widest text-white leading-tight uppercase mb-10">
                            The Heart of <br /> <span className="text-white/40 italic">Stitch</span>Bloom
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl mx-auto">
                            We are the bridge between the ancient hands of Bharat and the modern sanctuaries of the world.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 md:py-40 bg-zinc-950">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop"
                                alt="Artisan weaving"
                                className="w-full h-full object-cover filter grayscale opacity-70 group-hover:scale-110 transition-transform duration-[2000ms]"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black to-transparent">
                                <span className="text-xs uppercase tracking-widest text-white/40">Kolkata, West Bengal</span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <FadeIn direction="left">
                                <h2 className="text-4xl md:text-5xl font-heading tracking-widest text-white uppercase leading-tight">
                                    The Preservation <br /> of Slow Art
                                </h2>
                                <p className="text-lg text-white/60 font-light leading-relaxed">
                                    In a world consumed by the instant and the ephemeral, StitchBloom stands as a sanctuary for the deliberate. Every piece in our collection is born from a slow, meditative process of creation that cannot be mimicked by machines.
                                </p>
                                <p className="text-lg text-white/60 font-light leading-relaxed">
                                    Founded in 2024, our mission is to ensure that the delicate techniques of crochet and traditional weaving do not fade into history. We work directly with master artisans in rural India, providing them an international platform and ensuring fair, sustainable livelihoods.
                                </p>
                            </FadeIn>

                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-white">40+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">Artisans</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-white">12</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">States</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-white">100%</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">Handmade</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-black border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="glass p-10 rounded-3xl space-y-6">
                            <Star className="h-8 w-8 text-white/40" />
                            <h3 className="text-xl font-heading tracking-widest text-white uppercase">Authenticity</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">
                                We never compromise on the origins of our products. Every artifact is verified for its artisanal roots and traditional technique.
                            </p>
                        </div>
                        <div className="glass p-10 rounded-3xl space-y-6">
                            <Heart className="h-8 w-8 text-white/40" />
                            <h3 className="text-xl font-heading tracking-widest text-white uppercase">Sovereignty</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">
                                We believe in the sovereignty of the artist. Our artisans set their own prices and lead the design directions of their collections.
                            </p>
                        </div>
                        <div className="glass p-10 rounded-3xl space-y-6">
                            <Shield className="h-8 w-8 text-white/40" />
                            <h3 className="text-xl font-heading tracking-widest text-white uppercase">Sustainability</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">
                                Our materials are sourced with the planet in mind, using organic cotton, recycled yarns, and zero-plastic packaging.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-heading tracking-[0.3em] text-white uppercase mb-12">
                            Join Our Journey
                        </h2>
                        <Link href="/products" className="inline-flex items-center gap-6 glass px-12 py-6 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 group/btn">
                            <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Explore the archive</span>
                            <MoveRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            <Marquee text="ARTISANAL • SOVEREIGN • BHARATIYA • SUSTAINABLE • HANDCRAFTED • HERITAGE • " speed={40} />
        </main>
    );
}
