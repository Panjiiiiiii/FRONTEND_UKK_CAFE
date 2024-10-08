"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { MdOutlinePayments } from "react-icons/md";
import StatusModal from "@/components/StatusModal"; // Pastikan Anda menyesuaikan import

const page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [order, setOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const getOrder = async () => {
    const url = "http://localhost:4000/order/";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrder(response.data.data);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Cart item</h1>
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID transaksi</th>
              <th className="py-3 px-6 text-center">Tanggal transaksi</th>
              <th className="py-3 px-6 text-center">ID Kasir</th>
              <th className="py-3 px-6 text-center">ID Meja</th>
              <th className="py-3 px-6 text-center">Nama pelanggan</th>
              <th className="py-3 px-6 text-center">Status pembayaran</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 &&
              order.map((item) => (
                <tr
                  key={item.id_cart}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center">{item.id_transaksi}</td>
                  <td className="py-3 px-6 text-center">
                    {new Date(item.tgl_transaksi).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-6 text-center">{item.id_user}</td>
                  <td className="py-3 px-6 text-center">{item.id_meja}</td>
                  <td className="py-3 px-6 text-center">
                    {item.nama_pelanggan}
                  </td>
                  <td className="py-3 px-6 text-center">{item.status}</td>
                  <td className="py-3 px-6 text-center flex justify-center gap-3">
                    <button
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center gap-2"
                      onClick={() => openModal(item.id_transaksi)} // Buka modal ketika diklik
                    >
                      <MdOutlinePayments />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {isModalOpen && (
          <StatusModal id={selectedOrderId} onClose={closeModal} />
        )}
      </main>
    </div>
  );
};

export default page;
