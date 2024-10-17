"use client";

import React from "react";
import {
  MdOutlineLogout,
} from "react-icons/md";

import { deleteLocalStorage } from "@/lib/localStorage";
import { FaClock, FaShoppingCart, FaStore } from "react-icons/fa";
import "../app/global.css";
import Link from "next/link";

function SideNavbar({ children }) {
  const handleLogout = () => {
    const data = deleteLocalStorage('data_user');
  };

  return (
    <div className="h-screen overflow-hidden flex">
      {/* Sidebar */}
      <div className="p-6 h-full bg-white border-r-2 z-20 lg:w-60 flex-shrink-0">
        <div className="flex flex-col justify-start items-center h-full">
          <h1 className="text-base text-center cursor-pointer font-bold text-gray-950 border-b border-gray-100 pb-4 w-full">
            Welcome Kasir !!!
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4 w-full">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
              <FaStore className="text-2xl text-yellow-900 group-hover:text-white" />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold w-full"
                href="/kasir"
              >
                Order
              </Link>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
              <FaShoppingCart className="text-2xl text-yellow-900 group-hover:text-white" />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold w-full"
                href="/kasir/cart"
              >
                Cart
              </Link>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
              <FaClock className="text-2xl text-yellow-900 group-hover:text-white" />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold w-full"
                href="/kasir/history"
              >
                History
              </Link>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-auto w-full">
            <div className="flex justify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
              <Link
                className="text-base text-gray-800 group-hover:text-white font-semibold w-full"
                onClick={() => {
                  handleLogout();
                }}
                href="/"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full h-screen bg-yellow-800 overflow-hidden p-5">
        {children}
      </div>
    </div>
  );
}

export default SideNavbar;
