"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { getLocalStorage } from "@/lib/localStorage";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import CartModal from "@/components/CartModal"; // Ensure CartModal is imported
import Pagination from "@/components/Pagination"; // Import Pagination component
import { BsFillPersonLinesFill, BsPerson, BsPersonFill } from "react-icons/bs"; // Icon for cart items
import Link from "next/link";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [cart, setCart] = useState([]);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [modal, setModal] = useState(false); // State for modal
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Adjust items per page as needed

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
      if (response) {
        toast.success("Cart berhasil dihapus");
        window.location.reload(); // Refresh page
        getCart(); // Refresh cart
      }
    } catch (error) {
      toast.error("Gagal menghapus cart");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Toaster />
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-yellow-800 mb-10">Cart Items</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {currentItems.map((item) => (
              <div key={item.id_cart} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-center mb-4">
                  <BsPersonFill className="text-yellow-800 mr-2" size={30} />
                  <h2 className="text-xl font-bold text-yellow-800">ID Cart: {item.id_cart}</h2>
                </div>
                <p className="text-yellow-800 mb-2 text-left font-semibold">Nomor Meja: {item.meja.nomor_meja}</p>
                <p className="text-yellow-800 mb-4 text-left font-semibold">Nama Pelanggan: {item.nama_pelanggan}</p>
                <div className="mt-auto flex justify-left gap-2">
                  <button
                    className="bg-yellow-700 hover:bg-yellow-800 text-white py-1 px-3 rounded transition-colors"
                    onClick={() => openModal(item.id_cart)}
                  >
                    <FaCartPlus />
                  </button>
                  <button
                    className="bg-yellow-700 hover:bg-yellow-800 text-white py-1 px-3 rounded transition-colors"
                    onClick={() => handleDeleteCart(item.id_cart)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Component */}
        <div className="mt-8">
          <Pagination
            ordersPerPage={itemsPerPage}
            totalOrders={cart.length}
            paginate={paginate}
            currentPage={currentPage} // Pass current page for pagination
          />
        </div>
      </main>
      {modal && <CartModal onClose={closeModal} id_cart={selectedCartId} />}
    </div>
  );
};

export default Page;
