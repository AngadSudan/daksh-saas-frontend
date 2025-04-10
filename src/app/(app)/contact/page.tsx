"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import bg from "../../../../public/contactBg.svg";
import character from "../../../../public/contactFig.svg";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setStatus({
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        message: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare data for EmailJS
    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: formData.message,
    };

    // EmailJS send method
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
      )
      .then((response) => {
        console.log(response);
        setStatus({
          message: "Message sent successfully!",
          type: "success",
        });
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl border-2 border-gray-300">
        {/* Character Section */}
        <div className="md:w-1/2 bg-gradient-to-br  p-6 flex items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center">
            {/* Replace with your actual 3D character image */}
            {/* <div className="relative w-64 h-64"> */}
            <Image
              src={character}
              alt="3D character sitting on clouds"
              width={400}
              height={400}
              className="hidden md:block object-contain"
            />
            {/* </div> */}
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <div className="flex gap-5">
              <ArrowLeft
                onClick={() => (window.location.href = "/")}
                className="w-10 h-10 my-auto text-gray-400"
              />
              <h2 className="text-3xl font-bold text-gray-800">
                Get in Touch.
              </h2>
            </div>
            <p className="text-gray-600 mt-2">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Inputs - Two Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Status Message */}
            {status.message && (
              <div
                className={`p-3 rounded text-sm ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
