"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";
import Hero from "./Hero";
import { Suspense, useEffect, useRef, useState } from "react";
import { RefProvider } from "./components/RefProvider";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import LoadingScreen from "./components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show the loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>
            <RefProvider>
              <Navbar />
              {children}
            </RefProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
