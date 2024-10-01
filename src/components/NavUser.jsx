"use client";

import React from "react";
import {
  MdDashboard,
  MdOutlineLogout,
  MdTableRestaurant,
} from "react-icons/md";

import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";

import "../app/global.css";
import Link from "next/link";

function SideNavbar({ children }) {
  return (
    <div>
      <div className="flex flex-nowrap">
        <div className="p-6 w-2/3 h-screen bg-white border-r-2 z-20 top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-gray-950 border-b border-gray-100 pb-4 w-full">
              Welcome Admin !!!
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdDashboard className="text-2xl text-yellow-900 group-hover:text-white " />
                <Link
                  className="text-base text-yellow-900 group-hover:text-white font-semibold "
                  href="/admin"
                >
                  Dashboard
                </Link>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <IoMdPerson className="text-2xl text-yellow-900 group-hover:text-white " />
                <Link
                  className="text-base text-yellow-900 group-hover:text-white font-semibold "
                  href="/admin/user"
                >
                  Edit user
                </Link>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdTableRestaurant className="text-2xl text-yellow-900 group-hover:text-white " />
                <Link
                  className="text-base text-yellow-900 group-hover:text-white font-semibold "
                  href="/admin/table"
                >
                  Edit table
                </Link>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-yellow-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <IoFastFoodOutline className="text-2xl text-yellow-900 group-hover:text-white " />
                <Link
                  className="text-base text-yellow-900 group-hover:text-white font-semibold "
                  href="/admin/menu"
                >
                  Edit menu
                </Link>
              </div>
            </div>
            {/* setting  */}

            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* this is content area */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default SideNavbar;
