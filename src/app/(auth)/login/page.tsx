"use client"; // Ensure Next.js treats this as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import authBg from "../../../../public/authBg.svg";
import login from "../../../../public/login.svg";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false); // Prevents server-side execution
  const router = useRouter();

  // Ensure client-side rendering before accessing localStorage
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        router.push("/home");
      }
    }
  }, [router]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login submission
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      if (!response.data.data) {
        throw new Error(response.data.message);
      }

      // Store user data in localStorage and cookies
      localStorage.setItem("user", response.data.data.accessToken);
      localStorage.setItem("loggedin", "true");

      Cookies.set("user", JSON.stringify(response.data.data.user), {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("token", response.data.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      router.push("/home");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <div className="min-h-screen w-full grid place-items-center bg-gradient-to-t from-[#1A0330] to-[#480179] px-4 py-8 relative">
      <Toaster />
      <div
        className="w-full md:w-[80%] h-auto md:h-[90vh] m-auto rounded-3xl overflow-hidden shadow-2xl relative"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col md:flex-row items-center p-6 md:p-10 lg:p-20">
          {/* Login Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-8 md:gap-10">
            <h1 className="text-center text-2xl md:text-3xl font-semibold text-white">
              LOGIN ACCOUNT
            </h1>
            <div className="flex flex-col gap-6 md:gap-10 w-full max-w-md">
              {/* Email Input */}
              <div className="relative w-full flex justify-center">
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full max-w-[80%] p-4 h-12 bg-white/20 text-white rounded-full border-2 border-white/30 focus:outline-none focus:border-purple-500 placeholder-white/70 backdrop-blur-sm"
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full max-w-[80%] p-4 h-12 bg-white/20 text-white rounded-full border-2 border-white/30 focus:outline-none focus:border-purple-500 placeholder-white/70 backdrop-blur-sm pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[15%] top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              <div className="w-full flex justify-center">
                <button
                  className="w-full max-w-[80%] p-3 rounded-full bg-[#5705BC] text-white hover:bg-[#5705BC]/70 backdrop-blur-sm transition-all duration-300"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <Link
                  href="/register"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Don&apos;t have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Login Image */}
          <div className="hidden md:block md:w-1/2 h-full">
            <Image
              src={login}
              alt="login-image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
