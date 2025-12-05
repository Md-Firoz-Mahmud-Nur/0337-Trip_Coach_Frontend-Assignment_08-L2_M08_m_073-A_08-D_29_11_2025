import type { Metadata } from "next";
import { Provider } from "react-redux";
import Header from "../components/header/Header";
import { store } from "../store/store";
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
        <Provider store={store}>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
