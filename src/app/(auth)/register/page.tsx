"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import authBg from "../../../../public/authBg.svg";
import login from "../../../../public/login.svg";
import { Eye, EyeOff } from "lucide-react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/user/register`,
        formData
      );
      console.log(response);
      if (!response.data.data) {
        throw new Error(response.data.message);
      }

      Cookies.set("user", response.data.data, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("token", response.data.data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full grid place-items-center bg-gradient-to-t from-[#1A0330] to-[#480179] px-2 sm:px-4 py-4 sm:py-8 relative">
      <Toaster />
      <div
        className="w-full md:w-[80%] h-auto md:h-[90vh] m-auto rounded-3xl overflow-hidden shadow-2xl relative"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col  md:flex-row items-center p-4 sm:p-6 md:p-10 lg:p-20">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              CREATE ACCOUNT
            </h1>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full max-w-md px-2 sm:px-0">
              <div className="relative w-full flex justify-center">
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full max-w-[80%] p-2 sm:p-3 md:p-4 h-10 sm:h-11 md:h-12 
                    bg-white/20 text-white 
                    rounded-full border-2 border-white/30
                    focus:outline-none focus:border-purple-500
                    placeholder-white/70
                    backdrop-blur-sm
                    text-sm sm:text-base
                  "
                />
              </div>

              <div className="relative w-full flex justify-center">
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full max-w-[80%] p-2 sm:p-3 md:p-4 h-10 sm:h-11 md:h-12 
                    bg-white/20 text-white 
                    rounded-full border-2 border-white/30
                    focus:outline-none focus:border-purple-500
                    placeholder-white/70
                    backdrop-blur-sm
                    text-sm sm:text-base
                  "
                />
              </div>

              <div className="relative w-full flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full max-w-[80%] p-2 sm:p-3 md:p-4 h-10 sm:h-11 md:h-12 
                    bg-white/20 text-white 
                    rounded-full border-2 border-white/30
                    focus:outline-none focus:border-purple-500
                    placeholder-white/70
                    backdrop-blur-sm pr-10 sm:pr-12
                    text-sm sm:text-base
                  "
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[15%] top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              <div className="w-full flex justify-center">
                <button
                  className="
                    w-full max-w-[80%] p-2 sm:p-3 rounded-full 
                    bg-[#5705BC] text-white 
                    hover:bg-[#5705BC]/70 
                    backdrop-blur-sm 
                    transition-all duration-300
                    text-sm sm:text-base
                  "
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 h-full">
            <Image
              src={login}
              alt="signup-image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
