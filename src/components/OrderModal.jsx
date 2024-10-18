"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { Toaster, toast } from "react-hot-toast";

const OrderModal = ({ nama_pelanggan, nomor_meja, onClose, onSubmit }) => {
  const [meja, setMeja] = useState(nomor_meja);
  const [pelanggan, setPelanggan] = useState(nama_pelanggan);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(meja, pelanggan);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Submit Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nomor Meja</label>
            <input
              type="text"
              value={meja}
              onChange={(e) => setMeja(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama Pelanggan</label>
            <input
              type="text"
              value={pelanggan}
              onChange={(e) => setPelanggan(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;