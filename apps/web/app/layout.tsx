import type { Metadata } from "next";
import { Manrope, Cinzel } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const heading = Cinzel({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://stitchbloom.in'),
    title: {
        default: "StitchBloom | Handcrafted Crochet Creations",
        template: "%s | StitchBloom"
    },
    description: "Discover unique handcrafted crochet creations by Indian artisans. Shop home décor, accessories, textiles and more.",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "/",
        siteName: "StitchBloom",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "StitchBloom – Handcrafted Crochet Creations"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@stitchbloomindia"
    }
};

import { ClerkProvider } from "@clerk/nextjs";

// ... imports

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={cn(
                        "min-h-screen bg-[#FCFBF7] font-sans antialiased text-primary",
                        sans.variable,
                        heading.variable,
                        "scroll-smooth"
                    )}
                >
                    <CustomCursor />
                    <SmoothScrollProvider>
                        <div className="relative flex min-h-screen flex-col">
                            <Header />
                            <div className="flex-1">{children}</div>
                        </div>
                    </SmoothScrollProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
