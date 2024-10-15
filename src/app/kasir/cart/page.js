"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { getLocalStorage } from "@/lib/localStorage";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import CartModal from "@/components/CartModal"; // Pastikan CartModal diimport

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false); // State untuk modal
  const [selectedCartId, setSelectedCartId] = useState(null);

  const getCart = async () => {
    const url = "http://localhost:4000/cart/";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCart(response.data.data);
  };

  useEffect(() => {
    getCart();
  }, []);

  const openModal = (id_cart) => {
    setSelectedCartId(id_cart);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedCartId(null);
  };

  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Cart item</h1>
        <div className="mt-5 justify-end">
          <Link href="/kasir/">
            <button className="flex items-center bg-green-900 text-white text-md p-3 rounded-md font-bold">
              <FaCartPlus className="mr-3" />
              Add Cart
            </button>
          </Link>
        </div>

        {/* Jika cart kosong, tampilkan pesan "No item in cart" */}
        {cart.length === 0 ? (
          <p className="mt-5 text-center text-2xl text-gray-600 ">
            No item in cart
          </p>
        ) : (
          <table className="w-full mt-5 border-separate">
            <thead>
              <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
                <th className="py-3 px-6 text-center">ID cart</th>
                <th className="py-3 px-6 text-center">ID kasir</th>
                <th className="py-3 px-6 text-center">Nomor meja</th>
                <th className="py-3 px-6 text-center">Nama Pelanggan</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item.id_cart}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center">{item.id_cart}</td>
                  <td className="py-3 px-6 text-center">{item.id_user}</td>
                  <td className="py-3 px-6 text-center">
                    {item.meja.nomor_meja}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {item.nama_pelanggan}
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center gap-3">
                    <button
                      className="bg-green-900 text-white py-1 px-3 rounded hover:bg-green-700"
                      onClick={() => openModal(item.id_cart)} // Buka modal ketika diklik
                    >
                      <FaCartPlus />
                    </button>
                    <button className="bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">
                      <CiEdit />
                    </button>
                    <button className="bg-red-900 text-white py-1 px-3 rounded hover:bg-red-700">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {modal && <CartModal onClose={closeModal} id_cart={selectedCartId} />}
    </div>
  );
};

export default Page;
