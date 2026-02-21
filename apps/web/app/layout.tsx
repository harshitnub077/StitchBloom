import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import { CustomCursor } from "@/components/ui/custom-cursor";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const heading = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://crochetverse.com'),
    title: {
        default: "CrochetVerse | Handcrafted with Love",
        template: "%s | CrochetVerse"
    },
    description: "Discover unique, handcrafted crochet items. From amigurumi to wearables, find the perfect handmade gift.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "CrochetVerse",
        images: [
            {
                url: "/og-image.jpg", // Needs to exist in public
                width: 1200,
                height: 630,
                alt: "CrochetVerse"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@crochetverse"
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
                        "min-h-screen bg-background font-sans antialiased text-foreground",
                        sans.variable,
                        heading.variable,
                        "dark scroll-smooth"
                    )}
                >
                    <CustomCursor />
                    <SmoothScroll>
                        <div className="relative flex min-h-screen flex-col">
                            <Header />
                            <div className="flex-1">{children}</div>
                        </div>
                    </SmoothScroll>
                </body>
            </html>
        </ClerkProvider>
    );
}
