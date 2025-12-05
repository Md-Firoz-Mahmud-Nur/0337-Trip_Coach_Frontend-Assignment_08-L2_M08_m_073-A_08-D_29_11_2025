import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trip Coach",
  description: "Explore the world with Trip Coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1 className="text-9xl bg-red-500">Trip Coach</h1>
        {children}
      </body>
    </html>
  );
}
