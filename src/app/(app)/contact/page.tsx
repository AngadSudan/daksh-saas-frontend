"use client";
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Image as ImageIcon,
} from "lucide-react";

const ContactForm = () => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous status
    setStatus({ message: "", type: "" });

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    // EmailJS send method
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY")
      .then((response) => {
        console.log(response);
        setStatus({
          message: "Message sent successfully!",
          type: "success",
        });
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setStatus({
          message: "Failed to send message. Please try again.",
          type: "error",
        });
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0330] via-[#480179] to-[#5705BC] flex items-center justify-center px-4 py-12">
      <div
        className="
        w-full max-w-5xl 
        bg-white/10 
        backdrop-blur-lg 
        rounded-3xl 
        shadow-2xl 
        overflow-hidden 
        grid md:grid-cols-2 
        gap-8 
        border border-white/20
      "
      >
        {/* Image Placeholder Section */}
        <div
          className="
          hidden md:flex 
          items-center 
          justify-center 
          bg-gradient-to-br 
          from-[#480179] 
          to-[#5705BC] 
          relative
        "
        >
          <div
            className="
            absolute 
            inset-0 
            bg-[#5705BC]/20 
            backdrop-blur-sm
          "
          ></div>
          <div
            className="
            z-10 
            text-center 
            text-white 
            flex 
            flex-col 
            items-center 
            space-y-4 
            p-8
          "
          >
            <ImageIcon className="w-32 h-32 text-white/50" />
            <h3 className="text-2xl font-bold">Your Image Goes Here</h3>
            <p className="text-white/70 text-center">
              This space is reserved for a relevant image or graphic that
              complements your contact form design.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="text-purple-300 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="
                  w-full pl-12 pr-4 py-4 
                  bg-white/10 text-white 
                  placeholder-purple-300 
                  rounded-xl 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-white/30
                  group-focus-within:ring-2
                  transition-all
                "
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-purple-300 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="
                  w-full pl-12 pr-4 py-4 
                  bg-white/10 text-white 
                  placeholder-purple-300 
                  rounded-xl 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-white/30
                  group-focus-within:ring-2
                  transition-all
                "
              />
            </div>

            {/* Message Textarea */}
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <MessageSquare className="text-purple-300 group-focus-within:text-white transition-colors" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                // rows="5"
                className="
                  w-full pl-12 pr-4 py-4 
                  bg-white/10 text-white 
                  placeholder-purple-300 
                  rounded-xl 
                  focus:outline-none 
                  focus:ring-2 
                  resize-none
                  focus:ring-white/30
                  group-focus-within:ring-2
                  transition-all
                "
              />
            </div>

            {/* Status Message */}
            {status.message && (
              <div
                className={`
                  p-4 rounded-xl text-center
                  ${
                    status.type === "success"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }
                `}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full bg-white text-[#5705BC] 
                py-4 rounded-xl 
                font-semibold 
                hover:bg-purple-100 
                transition duration-300 
                flex items-center 
                justify-center 
                space-x-3
                group
              "
            >
              <Send className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
