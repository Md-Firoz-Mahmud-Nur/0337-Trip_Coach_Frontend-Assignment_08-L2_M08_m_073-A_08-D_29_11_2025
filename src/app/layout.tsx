import type { Metadata } from "next";
import Header from "../components/header/Header";
import { Providers } from "../components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trip Coach",
  description: "Explore the world with Trip Coach",
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
      <body>
        <Providers>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
