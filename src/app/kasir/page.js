"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import CardMenu from "@/components/CardMenu";
import OrderModal from "@/components/OrderModal";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [menus, setMenus] = useState([]);
  const [quantities, setQuantities] = useState({}); // State untuk kuantitas item
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [cartData, setCartData] = useState({
    id_meja: null,
    nama_pelanggan: "",
    items: [],
  }); // State untuk cart

  const getMenu = async () => {
    try {
      const urlMenu = "http://localhost:4000/menu/";
      const response = await axios.get(urlMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenus(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  // Fungsi untuk menambah atau mengurangi kuantitas item
  const increaseQuantity = (id_menu) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id_menu]: (prevQuantities[id_menu] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id_menu) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id_menu]: Math.max((prevQuantities[id_menu] || 0) - 1, 0),
    }));
  };

  // Cek apakah ada item di keranjang
  const hasItemsInCart = Object.values(quantities).some(
    (quantity) => quantity > 0
  );

  // Fungsi untuk mengirim data pesanan ke API
  const submitCart = async (meja, pelanggan) => {
    const items = Object.entries(quantities)
      .filter(([id_menu, quantity]) => quantity > 0)
      .map(([id_menu, quantity]) => ({ id_menu: parseInt(id_menu), quantity }));

    const cartPayload = {
      id_meja: meja,
      nama_pelanggan: pelanggan,
      items: items,
    };

    try {
      const urlCart = "http://localhost:4000/cart/";
      const response = await axios.post(urlCart, cartPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Pesanan berhasil disimpan!");
      // Reset state setelah berhasil disimpan
      setQuantities({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting cart:", error);
      alert("Gagal menyimpan pesanan.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <main>
        {/* Section Makanan */}
        <section className="mb-12">
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">Makanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menus
              .filter((menu) => menu.jenis === "MAKANAN")
              .map((menu) => (
                <CardMenu
                  key={menu.id_menu}
                  menu={menu}
                  quantity={quantities[menu.id_menu] || 0}
                  increaseQuantity={() => increaseQuantity(menu.id_menu)}
                  decreaseQuantity={() => decreaseQuantity(menu.id_menu)}
                />
              ))}
          </div>
        </section>

        {/* Section Minuman */}
        <section className="mb-12">
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">Minuman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menus
              .filter((menu) => menu.jenis === "MINUMAN")
              .map((menu) => (
                <CardMenu
                  key={menu.id_menu}
                  menu={menu}
                  quantity={quantities[menu.id_menu] || 0}
                  increaseQuantity={() => increaseQuantity(menu.id_menu)}
                  decreaseQuantity={() => decreaseQuantity(menu.id_menu)}
                />
              ))}
          </div>
        </section>

        {/* Tampilkan tombol jika ada item di keranjang */}
        {hasItemsInCart && (
          <div className="fixed bottom-10 right-10">
            <button
              className="bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Proceed to Order
            </button>
          </div>
        )}
      </main>

      {/* Modal untuk Order */}
      {isModalOpen && (
        <OrderModal
          onClose={() => setIsModalOpen(false)}
          submitCart={submitCart} // Tambahkan submitCart ke modal
        />
      )}
    </div>
  );
};

export default Page;
