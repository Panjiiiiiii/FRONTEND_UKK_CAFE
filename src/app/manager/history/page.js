"use client";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import Pagination from "@/components/Pagination";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders per page
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getOrders = async () => {
    try {
      const url = "http://localhost:4000/order/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data.data;
      setOrders(result);
      setFilteredOrders(result); // Initially, all orders are shown
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter orders by date range
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.tgl_transaksi);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // If no date is selected, show all orders
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-5 text-gray-800">Histori Transaksi</h1>
        
        {/* Date Range Filter */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleFilter}
              className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded-lg"
            >
              Filter
            </button>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setFilteredOrders(orders);
                setCurrentPage(1);
              }}
              className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full mt-5 bg-white border-collapse">
            <thead>
              <tr className="bg-yellow-900 text-white text-[20px]">
                <th className="py-3 px-6 text-center">ID Transaksi</th>
                <th className="py-3 px-6 text-center">Tanggal Transaksi</th>
                <th className="py-3 px-6 text-center">Nama Pelanggan</th>
                <th className="py-3 px-6 text-center">Status Pemesanan</th>
                <th className="py-3 px-6 text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-[16px] font-semibold">
              {currentOrders.length > 0 ? (
                currentOrders.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-center">{item.id_transaksi}</td>
                    <td className="py-3 px-6 text-center">
                      {new Date(item.tgl_transaksi).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center">{item.nama_pelanggan}</td>
                    <td className="py-3 px-6 text-center">{item.status}</td>
                    <td className="py-3 px-6 text-center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(
                        item.Detail_transaksi.reduce(
                          (total, detail) => total + detail.total_harga,
                          0
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <div className="mt-8">
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={filteredOrders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
