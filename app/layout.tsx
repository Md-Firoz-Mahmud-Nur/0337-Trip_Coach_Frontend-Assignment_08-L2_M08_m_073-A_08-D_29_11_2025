import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Coach - Local Travel",
  description:
    "Discover amazing guide packages and enjoy unforgettable travel experiences.",
  generator: "Next.js",
  authors: [{ name: "Md. Firoz Mahmud Nur", url: "https://nurweb.dev" }],
  keywords: [
    "Local",
    "Guide",
    "Travel",
    "Packages",
    "Trip Coach",
    "Vacation",
    "Holidays",
    "Adventure",
    "Tour",
  ],

  icons: {
    icon: "/tripCoach.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
