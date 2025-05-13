import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBar from "../components/SearchBar"
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather app",
  description: "An app that shows weather in your location and also search for any location's weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        <div className="navbar">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </div>
        {children}
      </body>
    </html>
  );
}
