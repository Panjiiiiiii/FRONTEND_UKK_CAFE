"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import CardMenu from "@/components/CardMenu";
import OrderModal from "@/components/OrderModal";
import { Toaster, toast } from "react-hot-toast";
import { MdMenu, MdRestaurantMenu } from "react-icons/md";

const Page = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [menus, setMenus] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const hasItemsInCart = Object.values(quantities).some(
    (quantity) => quantity > 0
  );

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
      toast.success("Pesanan berhasil disimpan.");
      setQuantities({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting cart:", error);
      toast.error("Gagal menyimpan pesanan.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      <div className="p-8 bg-gray-100 overflow-y-auto rounded-md flex-grow lg:m-auto lg:mb-10">
        <main>
          {/* Sticky Header and Search */}
          <section className="sticky top-4 z-10 bg-yellow-900 transition-shadow shadow-xl rounded-md mb-12 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              {/* Heading */}
              <div className="flex-row items-center mb-4 md:mb-0">
                <MdRestaurantMenu className="text-2xl text-white"/>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-0">
                  List Menu
                </h2>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-400 rounded-lg w-full md:w-auto"
              />
            </div>
          </section>

          {/* Section Makanan */}
          <h3 className="text-4xl font-bold mb-5 text-center text-yellow-800">Makanan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {menus
              .filter(
                (menu) =>
                  menu.jenis === `MAKANAN` &&
                  menu.nama_menu
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
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

          {/* Section Minuman */}
          <h3 className="text-4xl font-bold mb-5 text-center text-yellow-800">Minuman</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menus
              .filter(
                (menu) =>
                  menu.jenis === `MINUMAN` &&
                  menu.nama_menu
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
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
        </main>

        {hasItemsInCart && (
          <div className="fixed bottom-10 right-10">
            <button
              className="bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              Proceed to Order
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <OrderModal
          onClose={() => setIsModalOpen(false)}
          submitCart={submitCart}
        />
      )}
    </div>
  );
};

export default Page;
