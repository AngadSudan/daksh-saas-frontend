"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo.png";
import au from "../../../public/au.svg";
import { X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3 md:mt-2 max-w-full md:max-w-7xl mx-auto md:rounded-full border border-gray-100"
          : "bg-transparent py-2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex gap-1 z-10 items-center">
            <Image
              src={logo}
              alt="Daksh Logo"
              className={`transition-all duration-300 object-contain ${
                isScrolled ? "h-10 w-10" : "h-12 w-12 md:h-16 md:w-16"
              }`}
            />
            <h1
              className={`font-semibold my-auto text-left transition-all duration-300 ${
                isScrolled ? "text-lg md:text-xl" : "text-xl md:text-3xl"
              }`}
            >
              Daksh
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-2 font-medium transition-all duration-200 relative ${
                  pathname === link.href
                    ? "text-[#5417A3]"
                    : "text-gray-700 hover:text-[#5417A3]"
                } ${isScrolled ? "text-sm" : "text-base"}`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5417A3] transform transition-transform duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className={`font-medium text-[#410F80] border-r-2 border-[#410F80] pr-2 transition-all duration-300 ${
                isScrolled ? "text-sm" : "text-base"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className={`font-medium flex items-center gap-2 text-[#5417A3] transition-all duration-300 ${
                isScrolled ? "text-sm" : "text-base"
              }`}
            >
              <span>Register</span>
              <Image
                src={au}
                alt="arrow-up"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-10 p-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-5 flex flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "transform rotate-45 translate-y-1" : "mb-1"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "mb-1"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-40 md:hidden transition-transform duration-300 ease-in-out shadow-xl ${
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 px-6 overflow-y-auto">
          <div className="border-b border-gray-100 pb-6 mb-6">
            <Image
              src={logo}
              alt="Daksh Logo"
              className="h-20 w-20 object-contain mx-auto mb-2"
            />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-center">Daksh</h2>
              <X
                onClick={() => setIsMenuOpen(false)}
                className="h-6 w-6 text-gray-400 hover:text-[410F80]"
              />
            </div>
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-2 px-3 font-medium rounded-lg transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#5417A3] bg-purple-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto mb-10 flex flex-col space-y-4 pt-6 border-t border-gray-100">
            <Link
              href="/login"
              className="py-2 px-4 font-medium text-[#410F80] text-center border border-[#410F80] rounded-lg hover:bg-[#410F80]/5 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 font-medium text-white text-center bg-[#5417A3] rounded-lg hover:bg-[#410F80] transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Register</span>
              <Image
                src={au}
                alt="arrow-up"
                className="w-4 h-4 object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
