"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "../../../public/vercel.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLink = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-t from-[#1A0330] via-[#480179] to-[#5705BC] shadow-lg">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={logo}
              alt="daksh-logo"
              width={60}
              height={60}
              className="transition-transform hover:scale-110"
            />
            <span className="text-white text-xl font-bold tracking-wider hidden md:block">
              DAKSH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="
                  text-white
                  hover:text-white/90 
                  transition-colors 
                  font-medium 
                  text-lg
                  relative 
                  group
                "
              >
                {item.name}
                <span
                  className="
                    absolute -bottom-1 left-0 
                    w-0 h-0.5 bg-white 
                    group-hover:w-full 
                    transition-all 
                    duration-300
                  "
                />
              </Link>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/register"
              className="
                bg-white/10 
                text-white 
                px-4 py-2 
                rounded-full 
                hover:bg-white/20 
                transition-colors
              "
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="
                bg-white 
                text-[#5705BC] 
                px-6 py-2 
                rounded-full 
                hover:bg-white/90 
                transition-all 
                shadow-lg 
                hover:shadow-xl
              "
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="
              md:hidden 
              absolute 
              top-full 
              left-0 
              w-full 
              bg-gradient-to-r 
              from-[#1A0330] 
              via-[#480179] 
              to-[#5705BC] 
              shadow-2xl 
              z-50 
              px-4 
              py-6
            "
          >
            <nav className="space-y-4">
              {navLink.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="
                    block 
                    text-white 
                    py-2 
                    text-center 
                    hover:bg-white/10 
                    rounded-lg 
                    transition-colors
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col space-y-3 pt-4">
                <Link
                  href="/register"
                  className="
                    text-center 
                    bg-white/10 
                    text-white 
                    py-3 
                    rounded-full 
                    hover:bg-white/20 
                    transition-colors
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="
                    text-center 
                    bg-white 
                    text-[#5705BC] 
                    py-3 
                    rounded-full 
                    hover:bg-white/90 
                    transition-all 
                    shadow-lg
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
