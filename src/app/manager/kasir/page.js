"use client";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import Link from "next/link";
import Pagination from "@/components/Pagination"; // Ensure Pagination component is imported
import { BsFillPersonLinesFill } from "react-icons/bs";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6); // Adjust orders per page as needed

  const getTransaction = async () => {
    const url = "http://localhost:4000/order/";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data.data;
    setOrders(result);
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const groupedByCashier = orders.reduce((acc, order) => {
    const userId = order.user.id_user;
    if (!acc[userId]) {
      acc[userId] = {
        id_user: order.user.id_user,
        nama_user: order.user.nama_user,
        email: order.user.email,
        total_transaksi: 0,
        transactions: [],
      };
    }
    acc[userId].total_transaksi += 1;
    acc[userId].transactions.push(order);

    return acc;
  }, {});

  const cashiers = Object.values(groupedByCashier);

  // Pagination logic
  const indexOfLastCashier = currentPage * ordersPerPage;
  const indexOfFirstCashier = indexOfLastCashier - ordersPerPage;
  const currentCashiers = cashiers.slice(indexOfFirstCashier, indexOfLastCashier);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <main className="bg-white p-10 rounded-3xl shadow-lg">
        <h1 className="text-5xl font-bold mb-6 text-center">Histori Kasir</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCashiers.map((item) => (
            <div
              key={item.id_user}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <BsFillPersonLinesFill className="text-yellow-800 mr-2" size={30} />
                <h2 className="text-xl font-bold">{item.nama_user}</h2>
              </div>
              <p className="text-gray-700 mb-2">ID Kasir: {item.id_user}</p>
              <p className="text-gray-700 mb-2">Email: {item.email}</p>
              <p className="text-gray-700 mb-4">
                Total Transaksi: {item.total_transaksi}
              </p>
              <Link href={`/manager/kasir/${item.id_user}`}>
                <button className="bg-yellow-800 text-white py-2 px-4 rounded hover:bg-yellow-900">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <div className="mt-8">
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={cashiers.length}
            paginate={paginate}
            currentPage={currentPage} // Pass current page for pagination
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
