"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { MdOutlinePayments } from "react-icons/md";
import StatusModal from "@/components/StatusModal"; // Pastikan Anda menyesuaikan import
import Pagination from "@/components/Pagination";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]); // Add orders state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  const getOrder = async () => {
    const url = "http://localhost:4000/order/";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data.data);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <h1 className="text-5xl font-bold">Order History</h1>
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Tanggal transaksi</th>
              <th className="py-3 px-6 text-center">Nomor Meja</th>
              <th className="py-3 px-6 text-center">Nama pelanggan</th>
              <th className="py-3 px-6 text-center">Status pembayaran</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 &&
              currentOrders.map((item) => (
                <tr
                  key={item.id_cart}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center">{item.id_transaksi}</td>
                  <td className="py-3 px-6 text-center">
                    {new Date(item.tgl_transaksi).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {item.meja.nomor_meja}
                  </td>
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

        <Pagination
          ordersPerPage={ordersPerPage}
          totalOrders={orders.length}
          paginate={paginate}
        />
      </main>
    </div>
  );
};

export default Page;
