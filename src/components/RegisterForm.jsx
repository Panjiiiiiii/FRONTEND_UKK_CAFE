"use client";
import React, { useState } from "react";
import "../app/global.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const RegisterForm = ({ isLoad, toggle }) => {
  const [register, setRegister] = useState({
    nama_user: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = "http://localhost:4000/auth/signup";
      const response = await axios.post(api, register);
      const data = response.data;
      if (data) {
        toast.success("Register sukses!");
        toggle(!isLoad);
      }
    } catch (error) {
      toast.error("Register gagal. Silahkan cek kembali data anda.");
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
              Make new account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nama_user"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Nama user
                </label>
                <input
                  type="text"
                  name="nama_user"
                  id="nama_user"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-base md:text-lg"
                  placeholder="Nama lengkap"
                  required
                  value={register.nama_user}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-yellow-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-yellow-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-base md:text-lg"
                  placeholder="Username"
                  required
                  value={register.username}
                  onChange={handleChange}
                />
              </div>
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
                  value={register.email}
                  onChange={handleChange}
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
                  value={register.password}
                  onChange={handleChange}
                />
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="ml-2 text-sm text-yellow-900">
                    Show Password
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-900 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center sm:text-base md:text-lg"
              >
                Sign up
              </button>
              <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={() => toggle(!isLoad)}
                  className="text-yellow-900 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
