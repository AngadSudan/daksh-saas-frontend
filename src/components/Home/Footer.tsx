import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    {
      title: "Product",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Get Started",
      links: [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
      ],
    },
  ];

  // const socialLinks = [
  //   { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  //   { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  //   { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  //   { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  // ];

  return (
    <footer className="bg-gradient-to-br from-[#1A0330] to-[#290747] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src={logo}
                alt="logo"
                className="w-40 h-40 object-contain"
              />

              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#A57EED] bg-clip-text text-transparent">
                Daksh
              </h2>
            </div>
            <p className="text-gray-300 text-lg">
              Revolutionizing learning through AI-powered tools, seamless
              integrations, and intelligent task management.
            </p>
            {/* <div className="flex space-x-3 mt-8">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white hover:text-[#5705BC] transition duration-300 bg-[#480179] p-2.5 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-[#5705BC]/20"
                >
                  {social.icon}
                </Link>
              ))}
            </div> */}
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-2 gap-8">
            {quickLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-xl mb-6 text-[#A57EED]">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xl text-[#A57EED] mb-6">
              Get in Touch
            </h3>
            <div className="space-y-5">
              <Link
                href="mailto:angadsudan453@gmail.com"
                className="flex items-center space-x-4 group"
              >
                <Mail className="w-7 h-7 text-[#fff] group-hover:text-[#5705BC]" />

                <span className="text-gray-300 group-hover:text-white transition">
                  angadsudan453@gmail.com
                </span>
              </Link>
              <Link
                href="tel:+15551234567"
                className="flex items-center space-x-4 group"
              >
                <Phone className="w-7 h-7 text-[#fff] group-hover:text-[#5705BC]" />

                <span className="text-gray-300 group-hover:text-white transition">
                  +1 (555) 123-4567
                </span>
              </Link>
              <div className="flex items-center space-x-4 group">
                <MapPin className="w-7 h-7 text-[#fff] group-hover:text-[#5705BC]" />

                <span className="text-gray-300 group-hover:text-white transition">
                  123 Learning Lane, Tech City, ST 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#480179] mb-4"></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Daksh. All Rights Reserved.
          </p>
          <div className="flex space-x-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
