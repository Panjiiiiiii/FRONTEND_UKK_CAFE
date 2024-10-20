"use client";
import React, { useState, useEffect } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";

const Dashboard = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [transaction, setTransaction] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filteredRevenue, setFilteredRevenue] = useState(0);
  const [filteredTransactionCount, setFilteredTransactionCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getTransaction = async () => {
    try {
      const url = "http://localhost:4000/order/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data.data;

      const paidOrders = orders.filter((order) => order.status === "lunas");

      const totalRevenue = paidOrders.reduce((total, order) => {
        return total + order.Detail_transaksi.reduce((subtotal, detail) => subtotal + detail.total_harga, 0);
      }, 0);

      setTransaction(paidOrders);
      setTotalRevenue(totalRevenue);
      setFilteredRevenue(totalRevenue); // Set default filtered revenue to total revenue
      setFilteredTransactionCount(paidOrders.length); // Set default filtered transaction count to total transactions
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const url = "http://localhost:4000/user/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data.data;
      if (user) {
        const kasir = user.filter((user) => user.role === "KASIR");
        setUsers(kasir);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterTransactionsByDate = () => {
    if (startDate && endDate) {
      const filteredOrders = transaction.filter(
        (order) => new Date(order.createdAt) >= new Date(startDate) && new Date(order.createdAt) <= new Date(endDate)
      );

      const filteredRevenue = filteredOrders.reduce((total, order) => {
        return total + order.Detail_transaksi.reduce((subtotal, detail) => subtotal + detail.total_harga, 0);
      }, 0);

      setFilteredRevenue(filteredRevenue);
      setFilteredTransactionCount(filteredOrders.length);
    }
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredRevenue(totalRevenue); // Reset to total revenue
    setFilteredTransactionCount(transaction.length); // Reset to total transaction count
  };

  useEffect(() => {
    getTransaction();
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-y-auto">
      <main className="w-full max-w-6xl text-center bg-white p-5 lg:p-10 rounded-3xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-gray-800">Dashboard</h1>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-10 text-gray-800">Live Data Manager</h1>

        {/* Input range kalender */}
        <div className="mb-10 flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-5">
          <div>
            <label htmlFor="startDate" className="block mb-2 text-base md:text-lg font-medium text-gray-700">
              Tanggal Mulai
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-2 text-base md:text-lg font-medium text-gray-700">
              Tanggal Selesai
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Tombol Filter dan Clear */}
        <div className="mb-10 flex justify-center gap-4">
          <button
            className="px-5 py-2 w-28 bg-yellow-800 font-bold text-white rounded-md shadow-md hover:bg-yellow-700"
            onClick={filterTransactionsByDate}
          >
            Filter
          </button>
          <button
            className="px-5 py-2 w-28 bg-yellow-800 font-bold text-white rounded-md shadow-md hover:bg-yellow-700"
            onClick={clearFilter}
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Kasir */}
          <div className="bg-yellow-800 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <IoMdPerson className="text-3xl md:text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-sm md:text-lg lg:text-2xl font-light mb-3">Total Kasir</h3>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">{users.length}</h1>
            </div>
          </div>

          {/* Total Transaksi dalam Rentang Tanggal */}
          <div className="bg-yellow-800 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <GrTransaction className="text-3xl md:text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-sm md:text-lg lg:text-2xl font-light mb-3">Total Transaksi</h3>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">{filteredTransactionCount}</h1>
            </div>
          </div>

          {/* Pendapatan Berdasarkan Rentang Tanggal */}
          <div className="bg-yellow-800 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <FaMoneyBillAlt className="text-3xl md:text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-sm md:text-lg lg:text-2xl font-light mb-3">Income</h3>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Rp. {filteredRevenue.toLocaleString()},00</h1>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Dashboard;
