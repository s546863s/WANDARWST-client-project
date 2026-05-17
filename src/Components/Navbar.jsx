"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // মোবাইল মেনু ওপেন/ক্লোজ রাখার জন্য স্টেট
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // মেনু আইটেমগুলোর লিস্ট
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Add Destinations", path: "/add-destinations" },

    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="w-full bg-white text-gray-800 shadow-xs border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ১. বাম পাশের মেনু আইটেমসমূহ (ডেস্কটপ স্ক্রিন) */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={index}
                  href={item.path} 
                  className={`transition-colors pb-1 ${
                    isActive 
                      ? "text-cyan-600 border-b-2 border-cyan-600" 
                      : "text-gray-600 hover:text-cyan-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* ২. মাঝখানে লোগো (আপনার ইমেজ অনুযায়ী হুবহু সেন্টারে) */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-cyan-600 tracking-wide">
              Wanderlast
            </Link>
          </div>

          {/* ৩. ডান পাশের প্রোফাইল ও অথেনটিকেশন (ডেস্কটপ স্ক্রিন) */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/profile" 
              className={`flex items-center space-x-1 transition-colors ${
                pathname === "/profile" ? "text-cyan-600" : "text-gray-600 hover:text-cyan-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span>Profile</span>
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* ৪. মোবাইল মেনু বাটন (শুধু মোবাইল স্ক্রিনে দেখাবে) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-cyan-600 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                // মেনু ওপেন থাকলে ক্রস (X) আইকন দেখাবে
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                // মেনু ক্লোজ থাকলে হ্যামবার্গার (তিন টান) আইকন দেখাবে
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ৫. কাস্টম মোবাইল ড্রপডাউন মেনু (স্টেট true হলে স্লাইড ডাউন হবে) */}
      <div className={`md:hidden bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-3 shadow-lg">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium p-2 rounded-md ${
                pathname === item.path ? "text-cyan-600 bg-cyan-50/50" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-gray-100 my-2" />
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className={`block text-base font-medium p-2 rounded-md ${
              pathname === "/profile" ? "text-cyan-600 bg-cyan-50/50" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium p-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium p-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}