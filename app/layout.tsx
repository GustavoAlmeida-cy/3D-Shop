// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/sections/Cart"; // Pode ajustar para contexts/providers se reorganizar

// Fontes personalizadas com fallbacks e melhor performance
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// Metadados completos
export const metadata: Metadata = {
  title: "3D Shop",
  description: "Interactive 3D shopping experience.",
  openGraph: {
    title: "3D Shop",
    description: "Explore interactive 3D products in an immersive experience.",
    url: "https://3dshop.com",
    siteName: "3D Shop",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
