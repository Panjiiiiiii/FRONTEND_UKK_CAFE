"use client";
import React, { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import "../app/global.css";
import { deleteLocalStorage } from "@/lib/localStorage";
import { Toaster, toast } from "react-hot-toast";

const ModalLogout = ({ onClose }) => {
  const handleLogout = () => {
    deleteLocalStorage(`data_user`);
    toast.success("Berhasil logout");
    window.location.reload();
    window.location.href = "/";
  };
  return (
    <div
      id="logout-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <Toaster />
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-bold text-yellow-900">
              Logout Confirmation
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-yellow-900 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 text-center">
            <MdOutlineLogout
              className="mx-auto text-yellow-900 mb-4"
              size={40}
            />
            <p className="text-gray-700 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-800 hover:bg-red-850 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Logout
              </button>
              <button
                onClick={()=>onClose()}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
