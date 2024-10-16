"use client";
import React, { useState } from "react";
import "../app/global.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const LoginForm = ({ isLoad, toggleForgotPassword, toggleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const api = "http://localhost:4000/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, {
        email,
        password,
      });
      const data = response.data;
      console.log(data)
      if (data.status === "Fail") {
        toast.error("Login failed your email/password is false"); // Notifikasi error
      } else {
        localStorage.setItem("data_user", JSON.stringify(data));
        toast.success("Login successful!"); // Notifikasi sukses
        if (data.data.role === "MANAJER") {
          window.location.href = "/manager";
        } else if (data.data.role === "KASIR") {
          window.location.href = "/kasir";
        } else {
          window.location.href = "/admin";
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials."); // Notifikasi error
    }
  };

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div
        className="flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-screen md:h-screen lg:py-0"
        style={{
          backgroundImage: 'url("/assets/background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full bg-white bg-opacity-80 rounded-lg shadow md:mt-0 sm:max-w-md xl:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-yellow-900"
            >
              <img
                className="w-8 h-8 mr-2"
                src="/icons/coffee.png"
                alt="logo"
              />
              Wikusama Cafe
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-base md:text-lg"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-base md:text-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-password"
                    className="mr-2"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="show-password"
                    className="text-sm font-medium text-yellow-900"
                  >
                    Show Password
                  </label>
                </div>
                <a
                  onClick={() => toggleForgotPassword(true)}
                  href="#"
                  className="text-sm font-medium text-yellow-900 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-900 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center sm:text-base md:text-lg"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-yellow-900 text-center">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  onClick={() => toggleRegister(true)}
                  className="font-bold hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
