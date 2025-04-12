"use client"; // Ensure Next.js treats this as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import authBg from "../../../../public/authBg.svg";
import login from "../../../../public/login.svg";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Exclude fake emails
    const fakeEmailDomains = ["example.com", "test.com", "fake.com"];
    const emailDomain = formData.email.split("@")[1];
    if (fakeEmailDomains.includes(emailDomain)) {
      toast.error("Please use a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      console.log("response is ", response.data);
      if (!response.data.data) {
        throw new Error(response.data.message || "Login failed");
      }
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success("Login successful!");
      }

      // Store user data in localStorage and cookies
      localStorage.setItem("user", response.data.data.accessToken);
      localStorage.setItem("loggedin", "true");
      localStorage.setItem("token", response.data.data.user.id);

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

      // Short delay for toast to be visible before redirect
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      console.error("error is ", error.message);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-t from-[#1A0330] to-[#480179] px-4 py-6 sm:py-8 md:py-12 relative">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      {/* Main Container */}
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-7xl md:h-[90vh] bg-gradient-to-b from-purple-900/40 to-purple-800/40 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl  relative"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20 "></div>

        <div className="relative flex flex-col md:flex-row h-full">
          {/* Login Form Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 md:px-10 md:py-0 z-10">
            <div className="w-full max-w-sm flex flex-col gap-6 md:gap-8">
              {/* Header */}
              <div className="text-center mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-white/70 text-sm">
                  Please sign in to continue
                </p>
              </div>

              {/* Email Input */}
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-white/60 transition-all duration-200"
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-11 pr-12 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-white/60 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot Password Link */}
              {/* <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div> */}

              {/* Login Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-purple-800/70 cursor-not-allowed"
                    : "bg-[#5705BC] hover:bg-[#6815CF] active:bg-[#4B0599]"
                } text-white font-medium shadow-md transition-all duration-300`}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center mt-2">
                <p className="text-white/70 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-white font-medium hover:text-purple-300 transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Image Section (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
            <div className="relative w-full h-full max-h-[500px]">
              <Image
                src={login}
                alt="Login illustration"
                className="w-full h-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
