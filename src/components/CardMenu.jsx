"use client";
import React from "react";

const CardMenu = ({ menu, quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white">
      <img
        src={`http://localhost:4000/menu/image/${menu.gambar}`} // Assuming the image URL is in menu.gambar
        alt={menu.nama_menu}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-gray-800">{menu.nama_menu}</h3>
      <p className="text-lg text-gray-700">Harga: Rp {menu.harga}</p>
      <p className="text-md text-gray-500">{menu.deskripsi}</p>

      {/* Kontrol Kuantitas */}
      <div className="flex items-center mt-4">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-full"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="mx-4 text-lg text-gray-800">{quantity}</span>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-full"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CardMenu;
