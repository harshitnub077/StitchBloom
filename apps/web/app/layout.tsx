import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
