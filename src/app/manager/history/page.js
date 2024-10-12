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

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter orders by date range
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.tgl_transaksi);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // If no date is selected, show all orders
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Histori transaksi</h1>

        {/* Date Range Filter */}
        <div className="my-4">
          <label className="mr-2">Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 mr-4"
          />
          <label className="mr-2">End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 mr-4"
          />
          <button
            onClick={handleFilter}
            className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded mr-2"
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
            className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>

        {/* Orders Table */}
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID transaksi</th>
              <th className="py-3 px-6 text-center">Tanggal transaksi</th>
              <th className="py-3 px-6 text-center">Nama pelanggan</th>
              <th className="py-3 px-6 text-center">Status pemesanan</th>
              <th className="py-3 px-6 text-center">Subtotal</th>
              <th className="py-3 px-6 text-center">Detail transaksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[16px] font-semibold">
            {currentOrders.map((item, index) => (
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
                <td className="py-3 px-6 text-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Click here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Component */}
        <Pagination
          ordersPerPage={ordersPerPage}
          totalOrders={filteredOrders.length}
          paginate={paginate}
        />
      </main>
    </div>
  );
};

export default Page;
