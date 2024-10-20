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

  const getTransaction = async () => {
    try {
      const url = "http://localhost:4000/order/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data.data;

      // Filter only transactions with status "lunas"
      const paidOrders = orders.filter((order) => order.status === "lunas");

      // Calculate total revenue from transactions with status "lunas"
      const revenue = paidOrders.reduce((total, order) => {
        return total + order.Detail_transaksi.reduce((subtotal, detail) => subtotal + detail.total_harga, 0);
      }, 0);

      setTransaction(paidOrders);
      setTotalRevenue(revenue);
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

  useEffect(() => {
    getTransaction();
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <main className="w-full max-w-6xl text-center bg-white p-5 lg:p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-5 text-gray-800">Dashboard</h1>
        <h1 className="text-xl lg:text-2xl font-semibold mb-10 text-gray-800">Live Data Manager</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Cashier */}
          <div className="bg-yellow-900 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <IoMdPerson className="text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-lg lg:text-2xl font-light mb-3">Total Kasir</h3>
              <h1 className="text-2xl lg:text-4xl font-bold">{users.length}</h1>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="bg-yellow-700 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <GrTransaction className="text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-lg lg:text-2xl font-light mb-3">Total Transaksi</h3>
              <h1 className="text-2xl lg:text-4xl font-bold">{transaction.length}</h1>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-yellow-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between">
            <FaMoneyBillAlt className="text-4xl lg:text-8xl m-3" />
            <div className="text-right">
              <h3 className="text-lg lg:text-2xl font-light mb-3">Total Revenue</h3>
              <h1 className="text-2xl lg:text-4xl font-bold">Rp. {totalRevenue.toLocaleString()},00</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
