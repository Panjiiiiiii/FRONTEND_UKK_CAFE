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
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
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

  const handleDeleteCart = async (id) => {
    try {
      const url = `http://localhost:4000/cart/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response){
        toast.success("Cart berhasil dihapus");
        window.location.reload();
        getCart();
      }
    } catch (error) {
      toast.error("Gagal menghapus cart");
    }
  }

  const handleEditCart = (cartItem) => {
    // Redirect to order page with cart details as query parameters
    router.push(`/kasir/?id_cart=${cartItem.id_cart}&id_user=${cartItem.id_user}&nomor_meja=${cartItem.meja.nomor_meja}&nama_pelanggan=${cartItem.nama_pelanggan}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster />
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">Cart Items</h1>
        <div className="mt-5 flex justify-end">
          <Link href="/kasir/">
            <button className="flex items-center bg-green-700 hover:bg-green-800 text-white text-md p-3 rounded-md font-bold transition-colors">
              <FaCartPlus className="mr-3" />
              Add Cart
            </button>
          </Link>
        </div>

        {/* Display message when cart is empty */}
        {cart.length === 0 ? (
          <p className="mt-5 text-center text-2xl text-gray-600">
            No items in cart
          </p>
        ) : (
          <div className="overflow-x-auto mt-10">
            <table className="w-full bg-gray-100 shadow-lg rounded-xl border-separate border-spacing-y-2 border-spacing-x-0">
              <thead>
                <tr className="bg-yellow-900 text-white text-[20px] leading-normal rounded-t-xl">
                  <th className="py-3 px-6 text-center">ID cart</th>
                  <th className="py-3 px-6 text-center">ID kasir</th>
                  <th className="py-3 px-6 text-center">Nomor meja</th>
                  <th className="py-3 px-6 text-center">Nama Pelanggan</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[16px] font-semibold">
                {cart.map((item) => (
                  <tr
                    key={item.id_cart}
                    className="bg-white hover:bg-gray-200 border-b border-gray-200 transition-all"
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
                        className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded transition-colors"
                        onClick={() => openModal(item.id_cart)}
                      >
                        <FaCartPlus />
                      </button>
                      <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition-colors"
                      onClick={()=>handleEditCart(item)}>
                        <CiEdit />
                      </button>
                      <button 
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-colors"
                      onClick={()=>handleDeleteCart(item.id_cart)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && <CartModal onClose={closeModal} id_cart={selectedCartId} />}
    </div>
  );
};

export default Page;
