import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";

const CashierDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the cashier ID from the route
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [orders, setOrders] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(null);

  const getUserOrder = async () => {
    const url = `http://localhost:4000/order/user/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data.data;
    setOrders(result);
    if (result.length > 0) {
      setCashierInfo(result[0].user);
    }
  };

  useEffect(() => {
    if (id) {
      getUserOrder();
    }
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Detail Kasir</h1>
      {cashierInfo && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{cashierInfo.nama_user}</h2>
          <p className="text-gray-600">Email: {cashierInfo.email}</p>
          <p className="text-gray-600">Total Transaksi: {orders.length}</p>
        </div>
      )}

      {/* Table for displaying transactions */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama Pelanggan</th>
            <th className="px-4 py-2">Nomor Meja</th>
            <th className="px-4 py-2">Tanggal Transaksi</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id_transaksi}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{order.nama_pelanggan}</td>
              <td className="border px-4 py-2">{order.meja.nomor_meja}</td>
              <td className="border px-4 py-2">
                {new Date(order.tgl_transaksi).toLocaleString()}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                {order.Detail_transaksi.reduce(
                  (total, detail) => total + detail.total_harga,
                  0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashierDetail;
