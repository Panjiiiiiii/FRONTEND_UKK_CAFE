"use client";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold mb-6">Histori Kasir</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cashiers.map((item) => (
            <div
              key={item.id_user}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">{item.nama_user}</h2>
              <p className="text-gray-700 mb-2">ID Kasir: {item.id_user}</p>
              <p className="text-gray-700 mb-2">Email: {item.email}</p>
              <p className="text-gray-700 mb-4">
                Total Transaksi: {item.total_transaksi}
              </p>
              <Link href={`/kasir/${item.id_user}`}>
                <button className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-900">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
