import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";

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
        <Provider store={store}>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
