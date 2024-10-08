"use client";

import React from "react";
import {
  MdDashboard,
  MdOutlineLogout,
  MdTableRestaurant,
} from "react-icons/md";

import { deleteLocalStorage } from "@/lib/localStorage";
import { IoMdPerson } from "react-icons/io";
import { FaClock, FaShoppingCart, FaStore } from "react-icons/fa";
import "../app/global.css";
import Link from "next/link";

function SideNavbar({ children }) {
  const handleLogout = () => {
    const data = deleteLocalStorage('data_user')
  }
  return (
    <div className="flex">
      <div className="fixed p-6 w-60 h-screen bg-white border-r-2 z-20 top-0 left-0">
        <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-gray-950 border-b border-gray-100 pb-4 w-full">
            Welcome Kasir !!!
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <FaStore className="text-2xl text-yellow-900 group-hover:text-white " />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold "
                href="/kasir"
              >
                Order
              </Link>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <FaShoppingCart className="text-2xl text-yellow-900 group-hover:text-white " />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold "
                href="/kasir/cart"
              >
                Cart
              </Link>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <FaClock className="text-2xl text-yellow-900 group-hover:text-white " />
              <Link
                className="text-base text-yellow-900 group-hover:text-white font-semibold "
                href="/kasir/history"
              >
                History
              </Link>
            </div>
          </div>
          {/* setting  */}

          {/* logout */}
          <div className="my-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
              <Link className="text-base text-gray-800 group-hover:text-white font-semibold "
              onClick={()=> {handleLogout()}}
              href="/">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* this is content area */}
      <div className="ml-60 p-5 w-full h-screen overflow-auto">{children}</div>
    </div>
  );
}

export default SideNavbar;
