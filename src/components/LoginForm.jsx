"use client";
import React, { useState } from "react";
import "../app/global.css";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = "http://localhost:4000/auth/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, {
        email,
        password,
      });
      const data = response.data;
      if (data) {
        const storage = localStorage.setItem('data_user', JSON.stringify(data))
        console.log(storage)
        if(data.data.role === "MANAJER"){
          window.location.href = '/manager'
        } else if(data.data.role === "KASIR") {
          window.location.href = '/kasir'
        } else {
          window.location.href = '/admin'
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        style={{
          backgroundImage: 'url("/assets/background.jpg")', // Ganti dengan URL gambar background kamu
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full bg-white bg-opacity-80 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-yellow-900"
            >
              <img className="w-8 h-8 mr-2" src="/icons/coffee.png" alt="logo" />
              Wikusama Cafe
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <a
                  href="#"
                  className="text-sm font-medium text-yellow-900 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-900 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-yellow-900">
                Don’t have an account yet?{" "}
                <a href="#" className="font-bold hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
