"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Marquee } from "@/components/ui/marquee";
import { MoveRight, Star, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FCFBF7] text-primary selection:bg-primary selection:text-white pt-32 md:pt-40 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 flex items-center justify-center border-b border-primary/5">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <FadeIn delay={0.2}>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5C17C] mb-6 block font-bold">Our Sacred Heritage</span>
                        <h1 className="text-5xl md:text-8xl font-heading tracking-widest text-primary leading-tight mb-10">
                            The Heart of <br /> <span className="text-[#E5C17C] italic">Stitch</span>Bloom
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-primary/60 leading-relaxed max-w-2xl mx-auto">
                            We are the bridge between the ancient hands of Bharat and the modern sanctuaries of the world.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 md:py-40 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F5F0E8] border border-primary/5 group shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop"
                                alt="Artisan weaving"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-primary/90 to-transparent">
                                <span className="text-xs uppercase tracking-widest text-[#E5C17C] font-bold">Kolkata, West Bengal</span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <FadeIn direction="left">
                                <h2 className="text-4xl md:text-5xl font-heading tracking-widest text-primary uppercase leading-tight mb-8">
                                    The Preservation <br /> of Slow Art
                                </h2>
                                <p className="text-lg text-primary/70 font-light leading-relaxed mb-6">
                                    In a world consumed by the instant and the ephemeral, StitchBloom stands as a sanctuary for the deliberate. Every piece in our collection is born from a slow, meditative process of creation that cannot be mimicked by machines.
                                </p>
                                <p className="text-lg text-primary/70 font-light leading-relaxed">
                                    Founded in 2024, our mission is to ensure that the delicate techniques of crochet and traditional weaving do not fade into history. We work directly with master artisans in rural India, providing them an international platform and ensuring fair, sustainable livelihoods.
                                </p>
                            </FadeIn>

                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/10">
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-primary">40+</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40">Artisans</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-primary">12</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40">States</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl font-heading text-primary">100%</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40">Handmade</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-[#FCFBF7] border-t border-primary/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-12 rounded-[2rem] space-y-6 shadow-lg border border-primary/5 hover:-translate-y-2 transition-transform duration-500 text-center">
                            <Star className="h-10 w-10 text-[#E5C17C] mx-auto" strokeWidth={1.5} />
                            <h3 className="text-xl font-heading tracking-widest text-primary uppercase">Authenticity</h3>
                            <p className="text-sm text-primary/60 leading-relaxed font-light">
                                We never compromise on the origins of our products. Every artifact is verified for its artisanal roots and traditional technique.
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[2rem] space-y-6 shadow-lg border border-primary/5 hover:-translate-y-2 transition-transform duration-500 text-center">
                            <Heart className="h-10 w-10 text-[#E5C17C] mx-auto" strokeWidth={1.5} />
                            <h3 className="text-xl font-heading tracking-widest text-primary uppercase">Sovereignty</h3>
                            <p className="text-sm text-primary/60 leading-relaxed font-light">
                                We believe in the sovereignty of the artist. Our artisans set their own prices and lead the design directions of their collections.
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[2rem] space-y-6 shadow-lg border border-primary/5 hover:-translate-y-2 transition-transform duration-500 text-center">
                            <Shield className="h-10 w-10 text-[#E5C17C] mx-auto" strokeWidth={1.5} />
                            <h3 className="text-xl font-heading tracking-widest text-primary uppercase">Sustainability</h3>
                            <p className="text-sm text-primary/60 leading-relaxed font-light">
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
