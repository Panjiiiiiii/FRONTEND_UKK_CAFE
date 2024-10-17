"use client";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import Pagination from "@/components/Pagination"; // Ensure Pagination component is imported

const CashierDetail = ({ params }) => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Adjust orders per page as needed

  const getUserOrder = async () => {
    try {
      const url = `http://localhost:4000/order/user/${params.cashierSlug}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data.data;
      console.log(result);
      setOrders(result);

      // Set cashierInfo from the result's user data
      if (result.length > 0) {
        setCashierInfo(result[0].user);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold mb-4">Detail Kasir</h1>

        {/* Display cashier info if available */}
        {cashierInfo && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">{cashierInfo.nama_user}</h2>
            <p className="text-gray-600">Email: {cashierInfo.email}</p>
            <p className="text-gray-600">Total Transaksi: {orders.length}</p>
          </div>
        )}
        <h1 className="text-2xl font-semibold mb-4">Histori Transaksi</h1>

        {/* Table for displaying transactions */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-full">
              <thead>
                <tr className="bg-yellow-800 text-white text-left">
                  <th className="px-4 py-2">ID Transaksi</th>
                  <th className="px-4 py-2">Nama Pelanggan</th>
                  <th className="px-4 py-2">Nomor Meja</th>
                  <th className="px-4 py-2">Tanggal Transaksi</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-2">{item.id_transaksi}</td>
                    <td className="border px-4 py-2">{item.nama_pelanggan}</td>
                    <td className="border px-4 py-2">{item.meja.nomor_meja}</td>
                    <td className="border px-4 py-2">
                      {new Date(item.tgl_transaksi).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">
                      {item.Detail_transaksi.reduce(
                        (total, detail) => total + detail.total_harga,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Component */}
        <div className="mt-8">
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={orders.length}
            paginate={paginate}
            currentPage={currentPage} // Pass current page for pagination
          />
        </div>
      </div>
    </div>
  );
};

export default CashierDetail;
