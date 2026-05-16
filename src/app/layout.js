import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wanderlast - Book Your Journey",
  description: "A comprehensive travel platform built with Tailwind CSS v4",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* flex flex-col এবং min-h-full দেওয়ার কারণে 
        পেজের কন্টেন্ট কম হলেও ফুটার সবসময় নিচে থাকবে 
      */}
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        
        {/* ১. আপনার তৈরি করা কাস্টম Tailwind Navbar */}
        <Navbar />

        {/* ২. মেইন কন্টেন্ট এরিয়া (flex-1 পুরো খালি জায়গা দখল করে নিবে) */}
        <main className="flex-1">
          {children}
        </main>

        {/* ৩. আপনার তৈরি করা কাস্টম Tailwind Footer */}
        <Footer />

      </body>
    </html>
  );
}