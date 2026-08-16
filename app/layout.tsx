import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";  
import Header from "./Header";  
import Footer from "./Footer";  

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarivus — Ochelari și rame premium",
  description:
    "Ochelari de soare, rame și lentile premium, cu consultație optometrică. Clarivus — claritate în fiecare privire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><CartProvider>
  <Header />
  {children}
   <Footer />
</CartProvider></body>
    </html>
  );
}
