"use client";

import React, { useState } from "react";
import { MdOutlineLogout, MdMenu, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import "../app/global.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { deleteLocalStorage } from "@/lib/localStorage";

function SideNavbar({ children, title, navItems }) {
  const [isOpen, setIsOpen] = useState(true); // State untuk mengontrol apakah sidebar terbuka atau tertutup

  const handleLogout = () => {
    deleteLocalStorage("data_user");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Mengubah state untuk collapse/expand sidebar
  };

  return (
    <div className="h-screen overflow-hidden flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full bg-white border-r-2 z-20 lg:w-60 flex-shrink-0 p-6 transition-transform lg:translate-x-0`}
      >
        <div className="flex flex-col justify-start items-center h-full">
          {/* Tombol Back (untuk menyembunyikan sidebar di layar kecil) */}
          <div className="w-full flex justify-start items-center lg:hidden mb-4">
            <button
              className="flex items-center gap-2 text-yellow-900 hover:bg-yellow-900 hover:text-white p-2 rounded-md"
              onClick={() => setIsOpen(false)} // Menyembunyikan sidebar ketika tombol back diklik
            >
              <MdArrowBack className="text-2xl" />
              <span>Back</span>
            </button>
          </div>

          {/* Sidebar Title */}
          <h1 className="text-base text-center cursor-pointer font-bold text-gray-950 border-b border-gray-100 pb-4 w-full">
            Welcome {title} !!!
          </h1>

          {/* Navigation Items */}
          <div className="my-4 border-b border-gray-100 pb-4 w-full">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full"
              >
                <item.icon className="text-2xl text-yellow-900 group-hover:text-white" />
                <Link
                  className="text-base text-yellow-900 group-hover:text-white font-semibold w-full"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-auto w-full">
            <div className="flex justify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
              <Link
                className="text-base text-gray-800 group-hover:text-white font-semibold w-full"
                onClick={handleLogout}
                href="/"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button (Mobile View) */}
      <button
        className="absolute top-5 left-5 lg:hidden bg-yellow-900 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu className="text-2xl" />
      </button>

      {/* Content Area */}
      <div className={`w-full h-screen bg-yellow-800 overflow-hidden p-5 ${isOpen ? 'lg:ml-60' : 'lg:ml-0'}`}>
        {children}
      </div>
    </div>
  );
}

export default SideNavbar;
