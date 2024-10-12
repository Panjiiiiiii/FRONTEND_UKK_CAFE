"use client";
import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { getLocalStorage } from "@/lib/localStorage";
import { useState, useEffect } from "react";
import axios from "axios";

const dashboard = () => {
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
      console.log(orders);

      // Filter transaksi yang memiliki status pembayaran "lunas"
      const paidOrders = orders.filter(
        (order) => order.status === "lunas"
      );

      // Hitung total revenue hanya dari transaksi dengan status "lunas"
      const revenue = paidOrders.reduce((total, order) => {
        return (
          total +
          order.Detail_transaksi.reduce(
            (subtotal, detail) => subtotal + detail.total_harga,
            0
          )
        );
      }, 0);

      setTransaction(paidOrders); // Set hanya transaksi "lunas"
      setTotalRevenue(revenue); // Set total revenue dari transaksi "lunas"
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
        const kasir = user.filter(
          (user) => user.role === "KASIR"
        );
        setUsers(kasir)
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
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <div className="w-full flex flex-row mt-5 gap-5">
          <div className="w-full md:w-1/2 lg:w-1/3 bg-yellow-900 p-4 rounded-lg shadow-md text-white flex items-center">
            <IoMdPerson className="text-8xl m-3" />
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Total kasir</h3>
              <h1 className="text-4xl font-bold">{users.length}</h1>
            </div>
          </div>
          <div className="bg-yellow-700 p-4 rounded-lg shadow-md text-white flex items-center w-full md:w-1/2 lg:w-1/3">
            <GrTransaction className="text-8xl m-3" />
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Total transaksi</h3>
              <h3 className="text-4xl font-bold">{transaction.length}</h3>
            </div>
          </div>
          <div className="bg-yellow-600 p-4 rounded-lg shadow-md text-white flex items-center w-full md:w-1/2 lg:w-1/3">
            <FaMoneyBillAlt className="text-8xl m-3" />
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Total revenue</h3>
              <h1 className="text-4xl font-bold">
                Rp. {totalRevenue.toLocaleString()},00
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default dashboard;
