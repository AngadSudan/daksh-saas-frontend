"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import authBg from "../../../../public/authBg.svg";
import login from "../../../../public/login.svg";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [errors, setErrors] = useState({ name: "", email: "", password: "" }); // Error state
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/register`,
        formData
      );

      if (!response.data.data) throw new Error(response.data.message);

      Cookies.set("user", response.data.data, {
        path: "/",
        sameSite: "strict",
      });
      Cookies.set("token", response.data.data.token, {
        path: "/",
        sameSite: "strict",
      });

      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-t from-[#1A0330] to-[#480179] px-4 py-8">
      <Toaster />

      <div
        className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(0px) brightness(0.8)",
          transition: "filter 0.3s ease-in-out",
        }}
      >
        {/* Main Container */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-white mb-6">
              CREATE ACCOUNT
            </h1>

            <div className="flex flex-col gap-5">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 pr-10 bg-white/20 text-white rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                className={`w-full p-3 rounded-full bg-[#5705BC] text-white transition duration-300 ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#5705BC]/80"
                }`}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Login Link */}
              <div className="text-center text-white/70">
                <Link href="/login" className="hover:text-white transition">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section (Hidden on Small Screens) */}
          <div className="hidden md:block md:w-1/2">
            <Image
              src={login}
              alt="signup-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
