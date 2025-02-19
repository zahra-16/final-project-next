// src/app/layout.tsx
"use client"; // Tambahkan ini agar bisa menggunakan HeroUIProvider

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

// Inisialisasi QueryClient
const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarFooter = pathname.startsWith("/auth");

  return (
    <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <AuthProvider>
              <Toaster />
              {!hideNavbarFooter && <Navbar />}
              <main>{children}</main>
              {!hideNavbarFooter && <Footer />}
            </AuthProvider>
          </HeroUIProvider>
        </QueryClientProvider>
      </body>
    </html>
    </ErrorBoundary>
  );
}



