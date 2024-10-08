import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const StatusModal = ({ id, onClose }) => {
  const [status, setStatus] = useState("belum_bayar"); // Default status
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(getLocalStorage("data_user")).token; // Ambil token dari localStorage

    try {
      const response = await axios.put(
        `http://localhost:4000/order/${id}/`, // URL endpoint untuk update status
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      onClose(); // Tutup modal setelah sukses
    } catch (error) {
      setMessage(error.response.data.message || "Terjadi kesalahan");
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
            <h3 className="text-lg font-bold text-yellow-900">Ubah status pembayaran</h3>
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
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 mt-3"
            >
              Pilih Status Pembayaran
            </label>
            <select
              name="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
              value={status}
              onChange={handleChange}
              required
            >
              <option value="belum_bayar">Belum Lunas</option>
              <option value="lunas">Lunas</option>
              <option value="batal">Batal</option>
            </select>
            {message && <p className="text-red-600">{message}</p>}
            <button
              type="submit"
              className="text-white inline-flex mt-3 items-center bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Ubah Status Pembayaran
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
