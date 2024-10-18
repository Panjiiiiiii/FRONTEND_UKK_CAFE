"use client";
import React from "react";

const CardMenu = ({ menu, quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-yellow-900 transition-shadow hover:shadow-xl">
      <img
        src={`http://localhost:4000/menu/image/${menu.gambar}`}
        alt={menu.nama_menu}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-white truncate">{menu.nama_menu}</h3>
      <p className="text-lg text-white">Harga: Rp {menu.harga}</p>
      <p className="text-md text-white">{menu.deskripsi}</p>

      {/* Quantity Control */}
      <div className="flex items-center mt-4">
        <button
          className="bg-white text-yellow-900 font-bold px-3 py-1 rounded-full transition-colors"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="mx-4 text-lg text-white font-bold">{quantity}</span>
        <button
          className="bg-white text-yellow-900 font-bold px-3 py-1 rounded-full transition-colors"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CardMenu;
