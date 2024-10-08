"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const CartModal = ({ onClose, id_cart }) => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const url = `http://localhost:4000/cart/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data) {
        setCartData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const placeOrder = async (id) => {
    try {
      const url = `http://localhost:4000/order/${id}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        alert("Order berhasil");
        onClose();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id_cart) {
      fetchData(id_cart);
    }
  }, [id_cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cartData) {
    return <div>Data tidak ditemukan</div>;
  }

  const {
    id_cart: cartId,
    nama_pelanggan,
    meja,
    user,
    KeranjangMenu,
  } = cartData;

  const totalHarga = KeranjangMenu.reduce((total, item) => {
    return total + item.menu.harga * item.quantity;
  }, 0);

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-bold text-yellow-900">Cart Item</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-yellow-900 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="mb-4 text-sm">
              <p>
                <strong>ID Cart:</strong> {cartId}
              </p>
              <p>
                <strong>Nama Pelanggan:</strong> {nama_pelanggan}
              </p>
              <p>
                <strong>Nomor Meja:</strong> {meja.nomor_meja}
              </p>
            </div>
            <hr className="my-4" />
            <div className="mb-4 text-sm">
              <p>
                <strong>Nama Kasir:</strong> {user.nama_user}
              </p>
            </div>
            <hr className="my-4" />
            <div className="mb-4 text-sm">
              <h4 className="text-lg font-bold mb-2">Daftar Menu</h4>
              <ul>
                {KeranjangMenu.map((item) => (
                  <li
                    key={item.id_menu}
                    className="mb-3 border-b pb-2 flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>{item.menu.nama_menu}</strong> (
                        {item.menu.jenis})
                      </p>
                      <p>Jumlah: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>
                        <strong>Harga menu</strong>
                      </p>
                      <p>Rp {item.menu.harga.toLocaleString()}</p>
                      <p>
                        <strong>Total:</strong> Rp{" "}
                        {(item.menu.harga * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="my-4" />
            <div className="mb-4 text-sm flex justify-between items-center">
              <strong>Total</strong>
              <strong>Rp {totalHarga.toLocaleString()}</strong>
            </div>
            <hr className="my-4" />
            <button
              type="button"
              className="text-white inline-flex mt-3 items-center bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => placeOrder(cartId)}
            >
              Place order
            </button>
            <button
              type="button"
              className="text-white inline-flex mt-3 items-center bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
