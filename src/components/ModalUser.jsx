"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const Modal = ({ onClose, user, isEdit }) => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  // State untuk form
  const [formUser, setFormUser] = useState({
    nama_user: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  console.log(formUser);
  // Use effect untuk mengisi form jika mode edit
  useEffect(() => {
    if (isEdit && user) {
      setFormUser({
        nama_user: user.nama_user || "",
        username: user.username || "",
        email: user.email || "",
        password: "", // Jangan isi password untuk keamanan
        role: user.role || "",
      });
    } else {
      setFormUser({
        nama_user: "",
        username: "",
        email: "",
        password: "",
        role: "",
      });
    }
  }, [isEdit, user]);

  // Mengubah nilai form
  const handleChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk mengirim form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEdit
        ? `http://localhost:4000/user/${user.id}`
        : "http://localhost:4000/user/";
      const method = isEdit ? "put" : "post";
      const response = await axios[method](url, formUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      onClose(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-bold text-yellow-900 ">
              {isEdit ? "Update User" : "Create New User"}
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
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="nama_user"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama User
                </label>
                <input
                  type="text"
                  name="nama_user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required=""
                  value={formUser.nama_user}
                  onChange={handleChange}
                />

                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required=""
                  value={formUser.username}
                  onChange={handleChange}
                />

                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required = ""
                  value={formUser.email}
                  onChange={handleChange}
                />

                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  value={formUser.password}
                  onChange={handleChange}
                />

                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                >
                  Role
                </label>
                <select
                  name="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={formUser.role}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="KASIR">KASIR</option>
                  <option value="MANAJER">MANAJER</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex mt-3 items-center bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isEdit ? "Update User" : "Add New User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
