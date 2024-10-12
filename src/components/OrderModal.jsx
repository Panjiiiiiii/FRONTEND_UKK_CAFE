"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const OrderModal = ({ onClose, submitCart }) => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [tables, setTables] = useState([]);
  const [formTable, setFormTable] = useState({
    nomor_meja: "",
    nama_pelanggan: "",
  });

  const getTables = async () => {
    const urlTables = "http://localhost:4000/meja/";
    const response = await axios.get(urlTables, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTables(response.data.data);
  };

  useEffect(() => {
    getTables();
  }, []);

  const handleChange = (e) => {
    setFormTable({
      ...formTable,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nomor_meja, nama_pelanggan } = formTable;
    submitCart(nomor_meja, nama_pelanggan); // Kirim data ke submitCart
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
            <h3 className="text-lg font-bold text-yellow-900">Add table</h3>
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
                  htmlFor="nama_pelanggan"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  name="nama_pelanggan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                  required
                  value={formTable.nama_pelanggan}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label
              htmlFor="nomor_meja"
              className="block mb-2 text-sm font-medium text-gray-900 mt-3"
            >
              Nomor Meja
            </label>
            <select
              name="nomor_meja"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
              value={formTable.id_meja}
              onChange={handleChange}
              required
            >
              <option value="">
                Pilih nomor meja
              </option>
              {tables.map((table) => (
                <option key={table.nomor_meja} value={table.id_meja}>
                  {table.nomor_meja}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="text-white inline-flex mt-3 items-center bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add new cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
