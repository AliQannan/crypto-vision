"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, Bot, Sun, Moon } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Market", link: "/market" },
    { name: "Analysis", link: "pages/analysis" },
    { name: "Predictions", link: "/predictions" },
    { name: "API", link: "/api" },
    { name: "Trading", link: "/trading" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-50 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="../components/iconinf.png" alt="png" />
            {/* <Bot className="h-8 w-8 text-blue-600 dark:text-purple-400" /> */}
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              CryptoVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-center">
            {navLinks.map((ele) => (
              <Link
                key={ele.name}
                href={ele.link}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === ele.link
                    ? "text-blue-600 dark:text-purple-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                }`}
              >
                {ele.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="p-2 rounded-md">
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* Clerk Authentication Buttons */}
            <div className="hidden md:block">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <LogIn className="w-4 h-4 inline mr-2" /> Login
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map((ele) => (
              <Link
                key={ele.name}
                href={ele.link}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === ele.link
                    ? "text-blue-600 dark:text-purple-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400"
                }`}
              >
                {ele.name}
              </Link>
            ))}
            {/* Mobile Authentication Buttons */}
            <div className="mt-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <LogIn className="w-4 h-4 inline mr-2" /> Login
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
