import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { title: "Product", links: ["Features", "Pricing", "Integrations"] },
    { title: "Company", links: ["About Us", "Careers", "Press"] },
    { title: "Resources", links: ["Blog", "Help Center", "Documentation"] },
    { title: "Legal", links: ["Terms", "Privacy", "Cookies"] },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, href: "#" },
    { icon: <Twitter className="w-6 h-6" />, href: "#" },
    { icon: <Instagram className="w-6 h-6" />, href: "#" },
    { icon: <Linkedin className="w-6 h-6" />, href: "#" },
  ];

  return (
    <footer className="bg-[#1A0330] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="bg-[#5705BC] p-2 rounded-full">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Daksh</h2>
          </div>
          <p className="text-gray-300">
            Revolutionizing learning through AI-powered tools, seamless
            integrations, and intelligent task management.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-white hover:text-[#5705BC] transition duration-300 bg-[#480179] p-3 rounded-full hover:bg-[#5705BC]/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-2 gap-8">
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-xl mb-4 text-[#5705BC]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-xl text-[#5705BC]">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-[#5705BC]" />
              <span>support@learnsync.pro</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-[#5705BC]" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-[#5705BC]" />
              <span>123 Learning Lane, Tech City, ST 12345</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-[#480179] mt-12 pt-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} LearnSync Pro. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
