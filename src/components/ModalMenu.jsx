"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const Modal = ({ onClose, menu, isEdit }) => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;

  const [formMenu, setFormMenu] = useState({
    nama_menu: "",
    jenis: "",
    deskripsi: "",
    harga: "",
  });

  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    if (isEdit && menu) {
      setFormMenu({
        nama_menu: menu.nama_menu || "",
        jenis: menu.jenis || "",
        deskripsi: menu.deskripsi || "",
        harga: menu.harga || "",
      });
      setGambar(null);
    } else {
      setFormMenu({
        nama_menu: "",
        jenis: "",
        deskripsi: "",
        harga: "",
      });
    }
    setGambar(null);
  }, [isEdit, menu]);

  // Mengubah nilai form
  const handleChange = (e) => {
    setFormMenu({
      ...formMenu,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setGambar(e.target.files[0]);
  };
  // console.log(gambar)
  // Fungsi untuk mengirim form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields to formData
    formData.append("nama_menu", formMenu.nama_menu);
    formData.append("jenis", formMenu.jenis);
    formData.append("deskripsi", formMenu.deskripsi);
    formData.append("harga", formMenu.harga);

    if (gambar) {
      formData.append("gambar", gambar);
    }
    console.log(formData)
    try {
      const url = isEdit
        ? `http://localhost:4000/menu/${menu.id_menu}`
        : "http://localhost:4000/menu/";
      const method = isEdit ? "put" : "post";
      const response = await axios[method](url, formMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "multipart/form-data",
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
              {isEdit ? "Update Menu" : "Create New Menu"}
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
                  htmlFor="nama_menu"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Menu
                </label>
                <input
                  type="text"
                  name="nama_menu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required=""
                  value={formMenu.nama_menu}
                  onChange={handleChange}
                />
                <label
                  htmlFor="jenis"
                  className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                >
                  Jenis
                </label>
                <select
                  name="jenis"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  value={formMenu.jenis}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  <option value="MAKANAN">MAKANAN</option>
                  <option value="MINUMAN">MINUMAN</option>
                </select>
                <label
                  htmlFor="harga"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Harga
                </label>
                <input
                  type="number"
                  name="harga"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required=""
                  value={formMenu.harga}
                  onChange={handleChange}
                />
                <label
                  htmlFor="deskripsi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  value={formMenu.deskripsi}
                  onChange={handleChange}
                ></textarea>
                <label
                  htmlFor="gambar"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gambar
                </label>
                <input
                  type="file"
                  name="gambar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  onChange={handleFile}
                  accept="image/*"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex mt-3 items-center bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isEdit ? "Update Menu" : "Add New Menu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
