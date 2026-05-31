import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastNotification } from "@/components/ui/Toast";
import { NavigationLoader } from "@/components/layout/NavigationLoader";
import { InitialLoader } from "@/components/layout/InitialLoader";

export const metadata: Metadata = {
  title: "MOXY | Curated Luxury Clothing & Avant-Garde Design",
  description: "Experience the MOXY Universe. Curating avant-garde design, timeless elegance, and premium double-faced cashmere outerwear.",
  keywords: ["luxury fashion", "couture", "moxy", "avant-garde", "designer clothing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased select-none scroll-smooth">
      <body className="min-h-full bg-brand-bg text-brand-text flex flex-col antialiased">
        <CartProvider>
          <InitialLoader>
            <NavigationLoader />
            {children}
          </InitialLoader>
          <ToastNotification />
        </CartProvider>
      </body>
    </html>
  );
}
